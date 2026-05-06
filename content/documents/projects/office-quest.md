---
title: 'Office Quest (In Progress)'
fileName: 'office quest.ts'
type: 'ts'
imageUrl: '/content_img/projects/office_quest.webp'
githubUrl: 'https://github.com/bobbykim89/POC-agentic-office'
---

::hero{:image-src="imageUrl" :rounded="false" :gradient="true" alt="office quest banner image"}

## Office Quest (In Progress)

::

::abstract

A game-style 2D office environment where NPCs are powered by real AI agents. Instead of scripted dialog, every character you interact with has an actual AI backend behind them. Built as a playful exploration of agentic AI in a setting everyone can relate to.

::

::text-box{title="Tech Stacks" :display-border="false" :rounded="true" border-color="light-1"}

<div class="grid grid-cols-2 gap-1">
<p>PhasorJS</p>
<p>Vue 3</p>
<p>NestJS</p>
<p>FastAPI</p>
<p>PostgreSQL</p>
<p>Drizzle</p>
<p>OpenAI</p>
<p>Passport JWT</p>
<p>Turborepo</p>
<p>Docker</p>
</div>

::

- Architected a Turborepo monorepo with three separate apps: a PhaserJS + Vue 3 game client, a NestJS backend handling auth and persistence, and a FastAPI service managing all agent logic.
- Designed shared TypeScript interfaces across the monorepo via a dedicated packages layer, keeping the client and backend in sync without duplication.
- Implemented JWT-based authentication and a documented API convention layer to support clean communication between services.
- Actively developing NPC agent characters with distinct personalities, with RAG integration and multi-user real-time support planned as next steps.

::flex-container

::git-button{:url="githubUrl" color="warning"}

::

::
