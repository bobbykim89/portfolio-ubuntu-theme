---
title: 'Manguito Page'
fileName: 'manguito page.ts'
type: 'ts'
imageUrl: '/content_img/projects/manguito_page.webp'
gitUrl: 'https://github.com/bobbykim89/manguito-page-v2'
pageUrl: 'https://manguito-page.vercel.app/'
---

::hero{:image-src="imageUrl" :rounded="false" :gradient="true"}

## Manguito Page

::

::abstract

A full-stack photo blog built to document Manguito's adventures, with full CRUD support, user authentication, and offline capability.

::

::text-box{title="Tech Stacks" :display-border="false" :rounded="true" border-color="light-1"}

<div class="grid grid-cols-2 gap-1">
<p>Vue 3</p>
<p>Nuxt</p>
<p>Typescript</p>
<p>MongoDB</p>
<p>Mongoose</p>
<p>TailwindCSS</p>
<p>JWT</p>
<p>Bcrypt</p>
<p>Cloudinary</p>
<p>Workbox</p>
</div>

::

- Built a full-stack CRUD backend handling post and comment management with JWT-based user authentication.
- Integrated Cloudinary for image upload and delivery.
- Implemented PWA support using Workbox for offline access and local persistence.

::flex-container

::git-button{:url="gitUrl" color="warning"}

New Repo

::

::git-button{url="https://github.com/bobbykim89/manguito-page"}

Old Repo

::

::button-link{:url="pageUrl"}
Go to page
::

::
