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
  ],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Manguito OS',
      htmlAttrs: {
        lang: 'en',
      },
    },
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
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config.ts',
    exposeConfig: false,
    viewer: true,
  },
  css: ['~/assets/css/page_transition.css'],
})
