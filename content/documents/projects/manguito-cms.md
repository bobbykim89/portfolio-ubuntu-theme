---
title: 'Manguito CMS (In Progress)'
fileName: 'manguito cms.ts'
type: 'ts'
imageUrl: '/content_img/projects/manguito_cms.webp'
githubUrl: 'https://github.com/bobbykim89/manguito-cms'
---

::hero{:image-src="imageUrl" :rounded="false" :gradient="true" alt="manguito CMS banner image"}

## Manguito CMS (In Progress)

::

::abstract

A self-hosted, developer-first headless CMS where a single JSON or YAML schema file is the source of truth for everything: the database table, the REST API endpoints, and the admin panel forms. Built for developer teams that want a code-first content workflow without the overhead of legacy platforms or the cost of SaaS alternatives.

::

::text-box{title="Tech Stacks" :display-border="false" :rounded="true" border-color="light-1"}

<div class="grid grid-cols-2 gap-1">
<p>Hono</p>
<p>Vue 3</p>
<p>Drizzle ORM</p>
<p>PostgreSQL</p>
<p>Zod</p>
<p>TailwindCSS</p>
<p>shadcn-vue</p>
<p>Turborepo</p>
<p>pnpm workspace</p>
<p>AWS Lambda</p>
</div>

::

- Designed a Field Type Registry as the core architectural keystone, where each field type registers its database column definition, API validation shape, and admin UI component hint in one place, keeping all three layers always in sync.
- Implemented a build-time codegen model that compiles schemas to static TypeScript artifacts at build time, eliminating runtime parse overhead and keeping Lambda cold starts fast.
- Architected a five-package Turborepo monorepo covering the schema parser, Drizzle DB adapter, Hono API layer, Vue 3 admin panel, and a CLI binary, all versioned independently via Changesets.
- Built storage adapter support for local filesystem, S3, and Cloudinary out of the box, with a GraphQL API option and MongoDB adapter planned for v2.

::flex-container

::git-button{:url="githubUrl" color="warning"}

::

::
