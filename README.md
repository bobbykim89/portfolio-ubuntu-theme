<div align="center">
  <img width="180" src="public/ubuntu_logo-192x192.png" alt="ubuntu-logo" />
</div>

# Portfolio Template (Ubuntu Theme)

> A portfolio template inspired from Ubuntu (based on Ubuntu 22.04)

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

## Config

> nuxt.config.ts

```ts
// in nuxt.config.ts
runtimeConfig: {
  public: {
    siteName: 'ManguitoOS', // site name displayed on header
    userName: 'Manguito Lovebird', // username
    gitHubUrl: 'https://github.com/bobbykim89', // github url on contact buttons
    linkedinUrl: 'https://www.linkedin.com/in/sihun-kim-9baa17165/', // likedin url on contact buttons
    emailAddress: 'bobby.sihun.kim@gmail.com', // email address on contact buttons
    audioExternalSrc: true, // whether to have audio mp3 files from external source
    audioSrcBaseUrl: process.env.AUDIO_SOURCE_BASE_URL, // source url for external api source (leave as '' if using local mp3 files)
    pdfPublicUrl:
      'https://drive.google.com/file/d/1BFqAufQaxf9PGZCLVq8swfsNU4x4A6n2/view?usp=sharing', // pdf file url to be used on mobile screen
  },
  photoApiUrl: process.env.PHOTO_API_URL, // photo api url
},
```

### Config: wallpapers

```ts
// /assets/data/wallpapers.data.ts
export const wallpaperData: WallpaperDataType[] = [
  {
    fileName: 'wallpaper-custom.jpg',
  },
  {
    fileName: 'clouds.jpg',
  },
  {
    fileName: 'crown-dark-2.png',
  },
  {
    fileName: 'crown-dark.png',
  },
  ...
]
```

> 1. Add a new object to the array with the fileName property.
> 2. Ensure that the image and its corresponding thumbnail are added to the `/assets/img/wallpapers` directory. The full-sized image should go into the `image` folder, while the thumbnail should be placed in the `thumb` folder. Both files should have the same name.

### Config: Music

```ts
// /assets/data/music-player.data.ts
export const musicPlayerData: MusicPlayerDataType[] = [
  {
    title: 'Mortals x Royalty Mashup',
    filename: 'mortals_x_royalty_mashup',
    copyText:
      'Track: Mortals x Royalty Mashup\nMusic provided by NoCopyrightSounds.\nWatch more NCS on YouTube: https://NCS.lnk.to/YouTubeAT',
  },
  ...
]
```

> 1. Add a new music file object to the array.
> 2. If using local sources, place the cover image in `/assets/mp3/cover/` and the MP3 file in `/assets/mp3/music/`.
> 3. The cover image and music file names must match the `filename` value in the music info object.

### Config: PDF

> 1. Place the resume PDF file in the /assets/pdf/ directory.
> 2. The file name must be `resume.pdf`.

### Config: Portfolio info

> 1. Place the `.md` files in one of the following directories: `/content/documents/about`, `/content/documents/projects`, or `/content/documents/skills`.
> 2. If using local images, store the image files in the `/public/content_img/about`, `/public/content_img/projects` or `/public/content_img/skills` directory.
> 3. Ensure the frontmatter of each `.md` file follows the format below:

```
---
title: 'Contact'
order: 4
fileName: 'Contact.md'
type: 'md'
imageUrl: '/content_img/about/manguito_small.jpg'
githubUrl: 'your github url'
linkedinUrl: 'your linkedin url'
emailAddress: 'your email address'
---
```

### Config: Blog

> 1. Place `.md` files in the `/content/blog` directory.
> 2. If using local images, store the image files in the `/public/content_img/blog` directory.
> 3. Ensure the frontmatter of each `.md` file adheres to the following format:

```
---
title: 'blog post title'
description: 'short description'
category: 'Backend'
image: '/content_img/about/manguito_small.jpg'
githubUrl: 'your github url'
linkedinUrl: 'your linkedin url'
emailAddress: 'your email address'
date: 2024-08-25
---
```
