// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-svgo',
    '@pinia/nuxt',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxt/fonts',
    '@vite-pwa/nuxt',
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Manguito OS',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          name: 'description',
          content:
            'A portfolio template designed with inspiration from Ubuntu, particularly based on the style and features of Ubuntu 22.04.',
        },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: 'Manguito OS',
        },
        {
          property: 'og:image',
          content:
            'https://res.cloudinary.com/dwgni1x3t/image/upload/v1729412486/assets/ubuntu_logo-512x512_xsw9jy.png',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:title',
          content: 'Manguito OS',
        },
        {
          name: 'twitter:description',
          content:
            'A portfolio template designed with inspiration from Ubuntu, particularly based on the style and features of Ubuntu 22.04.',
        },
        {
          name: 'twitter:image',
          content:
            'https://res.cloudinary.com/dwgni1x3t/image/upload/v1729412486/assets/ubuntu_logo-512x512_xsw9jy.png',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  runtimeConfig: {
    public: {
      siteName: 'ManguitoOS',
      userName: 'Manguito Lovebird',
      userTitle: 'Software Engineer in Phoenix, AZ',
      gitHubUrl: 'https://github.com/bobbykim89',
      linkedinUrl: 'https://www.linkedin.com/in/sihun-kim-9baa17165/',
      emailAddress: 'bobby.sihun.kim@gmail.com',
      audioExternalSrc: true,
      audioSrcBaseUrl: process.env.AUDIO_SOURCE_BASE_URL,
      imageSourceApiUrl: process.env.CLOUDINARY_API_URL,
    },
    photoApiUrl: process.env.PHOTO_API_URL,
  },
  typescript: {
    typeCheck: true,
    strict: true,
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'bundler',
        verbatimModuleSyntax: false,
        strict: true,
        types: ['vite/client'],
      },
    },
  },
  tailwindcss: {
    configPath: 'tailwind.config.ts',
    cssPath: '~/assets/css/tailwind.css',
    exposeConfig: false,
    viewer: true,
  },
  css: ['~/assets/css/page_transition.css'],
  image: {
    cloudinary: {
      baseURL: process.env.CLOUDINARY_API_URL,
    },
  },
  pwa: {
    strategies: 'generateSW',
    manifest: {
      short_name: 'Manguito OS',
      name: 'Manguito OS',
      description:
        'A portfolio template inspired from Ubuntu (based on Ubuntu 22.04)',
      icons: [
        {
          src: 'favicon.svg',
          type: 'image/svg+xml',
          sizes: '150x150',
        },
        {
          src: 'favicon.ico',
          sizes: '48x48',
          type: 'image/x-icon',
        },
        {
          src: 'ubuntu_logo-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'ubuntu_logo-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'ubuntu_logo_maskable_512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      display: 'standalone',
      background_color: '#1d1d1d',
      theme_color: '#e95420',
      lang: 'en-US',
      start_url: '/',
      screenshots: [
        {
          src: 'screenshot_desktop_1.png',
          sizes: '1460x870',
          type: 'image/png',
          form_factor: 'wide',
        },
        {
          src: 'screenshot_desktop_1.png',
          sizes: '1460x870',
          type: 'image/png',
          form_factor: 'wide',
        },
        {
          src: 'screenshot_mobile_1.png',
          sizes: '420x680',
          type: 'image/png',
          form_factor: 'narrow',
        },
        {
          src: 'screenshot_mobile_2.png',
          sizes: '420x680',
          type: 'image/png',
          form_factor: 'narrow',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    registerType: 'autoUpdate',
    devOptions: {
      enabled: false,
    },
  },
})
