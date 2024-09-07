---
title: 'Applying Object Oriented Programming (OOP) on Nuxt 3 Nitro Server'
description: 'Applying Object Oriented Programming (OOP) on Nuxt 3 Nitro Server description text pio pio...'
category: 'Backend'
image: '/content_img/about/manguito_small.jpg'
githubUrl: 'https://github.com/bobbykim89'
linkedinUrl: 'https://www.linkedin.com/in/sihun-kim-9baa17165/'
emailAddress: 'bobby.sihun.kim@gmail.com'
date: 2024-08-25
---

::hero{:image-src="image" :rounded="true" :gradient="true"}

## Applying Object Oriented Programming (OOP) on Nuxt 3 Nitro Server

::

::abstract

Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa voluptatibus nam facilis nisi, alias quae aliquid quam nobis, dolor cumque tenetur adipisci eos tempore reprehenderit dolores molestias quisquam!

::

Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa voluptatibus nam facilis nisi, alias quae aliquid quam nobis, dolor cumque tenetur adipisci eos tempore reprehenderit dolores molestias quisquam! Hic, dignissimos. Aut veniam molestias architecto quia rerum nihil sapiente a ab voluptates blanditiis inventore cum tempora, eveniet ipsa in id aliquam.

::code-block{path="/server/plugins/connectDb.ts" type="typescript"}

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
    return `mongodb+srv://${this.config.mongoId}:
    ${this.config.mongoPw}@${this.config.mongoClusterName}.
    ${this.config.mongoUrl}.mongodb.net/
    ${this.config.mongoDBName}?retryWrites=true&w=majority`
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

::

Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa voluptatibus nam facilis nisi, alias quae aliquid quam nobis, dolor cumque tenetur adipisci eos tempore reprehenderit dolores molestias quisquam! Hic, dignissimos. Aut veniam molestias architecto quia rerum nihil sapiente a ab voluptates blanditiis inventore cum tempora, eveniet ipsa in id aliquam.

::contact-buttons{:github-url="githubUrl" :linkedinUrl="linkedinUrl" :email-address="emailAddress"}

::
