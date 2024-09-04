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
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Manguito OS',
      htmlAttrs: {
        lang: 'en',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  runtimeConfig: {
    public: {
      userName: 'Manguito Lovebird',
      audioExternalSrc: true,
      audioSrcBaseUrl: process.env.AUDIO_SOURCE_BASE_URL,
      pdfPublicUrl:
        'https://drive.google.com/file/d/1BFqAufQaxf9PGZCLVq8swfsNU4x4A6n2/view?usp=sharing',
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
    exposeConfig: false,
    viewer: true,
  },
  css: ['~/assets/css/page_transition.css'],
})
