---
title: 'Connecting MongoDB to Nuxt via Nitro Server Plugins'
description: 'How to set up a persistent MongoDB connection in Nuxt using a Nitro server plugin, and why this approach makes full-stack deployment surprisingly clean.'
category: 'Backend'
image: '/content_img/blog/coding_banner.webp'
githubUrl: 'https://github.com/bobbykim89'
linkedinUrl: 'https://www.linkedin.com/in/bobbykim89/'
emailAddress: 'bobby.sihun.kim@gmail.com'
date: '2024-08-25'
---

::hero{:image-src="image" :rounded="true" :gradient="true"}

## Connecting MongoDB to Nuxt via Nitro Server Plugins

::

::abstract

One of the things I appreciate most about Nuxt is that it is not just a frontend framework. Thanks to Nitro, it ships with a fully capable server engine that lets you handle backend logic, API routes, and server lifecycle events all in one place. That means you can run a full-stack application through a single deployment pipeline, without managing a separate Express or NestJS server alongside your frontend.

This post walks through how I set up a persistent MongoDB connection in a Nuxt app using a Nitro server plugin, along with some improvements I made along the way.

::

<br/>

## Why Nitro Server Plugins?

<br/>

Nitro server plugins live in the `/server/plugins` directory and run once when the server starts. This makes them the perfect place to initialize things like database connections. You connect once, and the connection stays alive for the lifetime of the server process.

Compare this to initializing a DB connection inside individual API route handlers, where you risk opening a new connection on every request. With a server plugin, you get a clean, predictable connection lifecycle with no repeated overhead.

<br/>

## The Original Approach

<br/>

Here is how I first set it up. It works, and honestly there is nothing wrong with it:

```ts
import { useRuntimeConfig } from '#imports'
import { RuntimeConfig } from '@nuxt/schema'
import { connect, disconnect } from 'mongoose'

class DatabaseConfig {
  private config: RuntimeConfig

  constructor() {
    this.config = useRuntimeConfig()
  }

  private setMongoUrl = (): string => {
    return `mongodb+srv://${this.config.mongoId}:${this.config.mongoPw}@${this.config.mongoClusterName}.${this.config.mongoUrl}.mongodb.net/${this.config.mongoCollectionName}?retryWrites=true&w=majority`
  }

  private disconnectDb = async (): Promise<void> => {
    console.log('disconnecting from db..')
    await disconnect()
    console.log('terminating the process..')
    process.exit(1)
  }

  public connectDb = async (): Promise<void> => {
    const dbUrl = this.setMongoUrl()
    try {
      console.log('attempting to connect DB..')
      console.log('Environment: ', process.env.NODE_ENV)
      await connect(dbUrl)
      console.log('successfully connected to DB!')
    } catch (error) {
      console.error(error)
      this.disconnectDb()
    }
  }
}

export default defineNitroPlugin(async () => {
  const dbConfig = new DatabaseConfig()
  await dbConfig.connectDb()
})
```

This gets the job done. The class-based structure keeps things organized, and wrapping everything in `defineNitroPlugin` ensures the connection is established at server startup.

There are two things I wanted to clean up though.

<br/>

## What I Improved

<br/>

### 1. Removing `process.exit(1)`

The original `disconnectDb` method calls `process.exit(1)` on a connection failure, which is a hard crash. That is fine in some contexts, but in a Nitro environment it can interfere with the server's own lifecycle management and make errors harder to trace. Instead, just throwing the error lets Nitro handle it gracefully and keeps the logs cleaner.

<br/>

### 2. Simplifying the connection string

Building the MongoDB URI from five separate environment variables works, but it adds a lot of moving parts. A single `MONGO_URI` variable is easier to manage, less error-prone, and maps more naturally to how MongoDB Atlas actually presents your connection string.

<br/>

## The Improved Version

```ts
import { connect } from 'mongoose'

export default defineNitroPlugin(async () => {
  const config = useRuntimeConfig()
  const uri = config.mongoUri

  if (!uri) {
    throw new Error('MONGO_URI is not defined in runtime config')
  }

  try {
    console.log('Attempting to connect to DB...')
    console.log('Environment:', process.env.NODE_ENV)
    await connect(uri)
    console.log('Successfully connected to DB!')
  } catch (error) {
    console.error('Failed to connect to DB:', error)
    throw error
  }
})
```

And in your `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  runtimeConfig: {
    mongoUri: process.env.MONGO_URI,
  },
})
```

And your `.env` file:

```
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<collection>?retryWrites=true&w=majority
```

Much cleaner. One variable, one source of truth, and the error handling lets the server manage its own lifecycle instead of forcing a hard exit.

<br/>

## The Bigger Picture: One Deployment Pipeline

<br/>

What makes this setup genuinely nice is that your entire app, frontend, API routes, and database connection, lives in one Nuxt project. When you deploy, everything goes together. No separate backend service to manage, no cross-origin configuration to wrestle with, no extra CI/CD pipeline to maintain.

For projects like [Mango Planner](https://github.com/bobbykim89/mango-planner-v2) and [Manguito Page](https://github.com/bobbykim89/manguito-page), this approach let me ship a full-stack app with the same simplicity as deploying a static site. That is one of my favorite things about building with Nuxt.

<br/>

If you are building something full-stack with Nuxt and MongoDB, this pattern is a solid starting point. It is simple, reliable, and keeps your project structure sane as things grow.

::contact-buttons{:github-url="githubUrl" :linkedinUrl="linkedinUrl" :email-address="emailAddress"}

::
