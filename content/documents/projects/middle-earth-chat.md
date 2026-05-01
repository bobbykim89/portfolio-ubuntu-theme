---
title: 'Middle Earth Chat'
fileName: 'middle earth chat.py'
type: 'py'
imageUrl: '/content_img/projects/middle_earth_map.webp'
githubUrl: 'https://github.com/bobbykim89/lotr-characters'
---

::hero{:image-src="imageUrl" :rounded="false" :gradient="true" alt="vector search stock image"}

## Middle Earth Chat

::

::abstract

A full-stack RAG chatbot that answers lore-based questions about characters across Tolkien's universe, from The Lord of the Rings to The Silmarillion.

::

::text-box{title="Tech Stacks" :display-border="false" :rounded="true" border-color="light-1"}

<div class="grid grid-cols-2 gap-1">
<p>Python</p>
<p>GPT-4o-mini</p>
<p>Jina AI Embeddings</p>
<p>Django Rest Framework</p>
<p>Qdrant</p>
<p>Nuxt</p>
<p>PostgreSQL</p>
<p>Docker</p>
</div>

::

- Built a vector retrieval pipeline using Qdrant and Jina embeddings to surface relevant character lore from scraped canonical texts.
- Implemented RAG architecture combining semantic search with GPT-4o-mini for context-aware response generation.
- Designed a retrieval and RAG evaluation pipeline using LLM-as-Judge scoring with multiple judge models including Claude.

::flex-container

::git-button{:url="githubUrl" color="warning"}
Base Repo
::

::git-button{url="https://github.com/bobbykim89/lotr-characters-api" }
Backend
::

::git-button{url="https://github.com/bobbykim89/middleearth-chat" color="warning"}
Frontend
::

::
