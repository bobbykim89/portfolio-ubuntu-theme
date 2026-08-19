---
title: 'Manguito CMS'
fileName: 'manguito cms.ts'
type: 'ts'
imageUrl: '/content_img/projects/manguito_cms.webp'
githubUrl: 'https://github.com/bobbykim89/manguito-cms'
---

::hero{:image-src="imageUrl" :rounded="false" :gradient="true" alt="manguito CMS banner image"}

## Manguito CMS

::

::abstract

A self-hosted, developer-first headless CMS where a single JSON or YAML schema file is the source of truth for everything: the database table, the REST API endpoints, and the admin panel forms. Built for developer teams that want a code-first content workflow without the overhead of legacy platforms or the cost of SaaS alternatives. v1 is complete and published to npm as six packages; v2 is shipping incrementally, starting with an opt-in GraphQL API.

::

::text-box{title="Tech Stacks" :display-border="false" :rounded="true" border-color="light-1"}

<div class="grid grid-cols-2 gap-1">
<p>TypeScript</p>
<p>Hono</p>
<p>Vue 3</p>
<p>Drizzle ORM</p>
<p>PostgreSQL</p>
<p>GraphQL</p>
<p>Zod</p>
<p>TailwindCSS</p>
<p>Turborepo</p>
<p>pnpm workspace</p>
<p>AWS Lambda</p>
</div>

::

- Designed a Field Type Registry as the core architectural keystone, where each of the 13 field types registers its Drizzle column definition, API serialization shape, and Vue form component in one place, keeping all three layers in sync from a single definition.
- Implemented a build-time codegen model that compiles schemas to static Drizzle, Hono, and Vue artifacts, so the runtime imports pre-generated code instead of parsing schemas on every cold start.
- Architected a six-package Turborepo monorepo covering the schema parser, Drizzle DB adapter, Hono API layer, Vue 3 admin panel, CLI binary, and project scaffolder, all versioned independently via Changesets. A new project starts from one command: `npm create @bobbykim/manguito`.
- Shipped v1 with auto-generated REST CRUD per content type, JWT auth across five system roles, storage adapters for local filesystem, S3, and Cloudinary, deployment targets for Lambda, Vercel, Fargate, and plain Node, and a unit and integration test suite.
- Added an opt-in, query-only GraphQL surface generated from the same schemas as the first v2 feature. Relations resolve to any depth and are batched per request, only published content is returned at every nesting level, and depth and complexity limits ship on by default with introspection disabled in production.
- Built programmatic fields, a field type whose value is computed at read time by a TypeScript resolver rather than stored in a column, with per-item TTL caching, per-resolver timeouts, and fallbacks so one failing resolver never breaks a response. They stay off list endpoints by default to prevent a single request fanning out into 100 external calls.
- Working through the remaining v2 scope: MongoDB adapter, schema versioning with multi-version API routes, draft and publish workflow, webhooks, and i18n.

::flex-container

::git-button{url="https://github.com/bobbykim89/manguito-cms" color="warning"}

::

::
