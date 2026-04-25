<script setup lang="ts">
import InfoSvgIcon from '@/assets/img/svg-files/emblem-important-symbolic.svg'
import DocumentSvgIcon from '@/assets/img/svg-files/folder-documents-symbolic.svg'
import PowerSvgIcon from '@/assets/img/svg-files/system-shutdown-symbolic.svg'
import UbuntuLogo from '@/assets/img/ubuntu/ubuntu-logo-dark.png'

const config = useRuntimeConfig()
const url = useRequestURL()

definePageMeta({
  layout: false,
})

useHead({
  title: `${config.public.siteName} | Shutdown`,
  meta: [
    { property: 'og:title', content: `${config.public.siteName} | Shutdown` },
    { property: 'og:url', content: url.href },
    { property: 'twitter:domain', content: url.host },
    { property: 'twitter:url', content: url.href },
    {
      name: 'twitter:title',
      content: `${config.public.siteName} | Shutdown`,
    },
  ],
})

const displayLoader = ref<boolean>(true)
const router = useRouter()

const handleRestart = () => {
  router.push({ path: '/' })
}
const handleBlogClick = () => {
  router.push({ path: '/blog' })
}
const handleAboutClick = () => {
  router.push({ path: '/about' })
}

setTimeout(() => {
  displayLoader.value = false
}, 2000)
</script>

<template>
  <div
    class="h-screen w-full flex flex-col items-center justify-center bg-dark-4 relative"
  >
    <!-- shut down loader -->
    <div
      :class="[
        displayLoader ? 'visible opacity-100' : 'invisible opacity-0',
        'flex flex-col items-center transition-[opacity,visibility] duration-300 delay-300 ease-linear',
      ]"
    >
      <h2 class="h2-md text-light-1 mb-lg">Shutting down system...</h2>
      <div
        class="animate-spin rounded-full h-2xl w-2xl border-8 border-light-1 border-r-warning"
      ></div>
    </div>
    <!-- buttons -->
    <div
      :class="[
        displayLoader ? 'invisible opacity-0' : 'visible opacity-100',
        'flex gap-4 text-light-1 items-center transition-[opacity,visibility] duration-300 delay-300 ease-linear',
      ]"
    >
      <NuxtLink
        class="flex flex-col items-center justify-center gap-1 bg-dark-3 focus:bg-dark-2 rounded-lg py-2xs px-sm transition-colors duration-300 ease-linear drop-shadow-md"
        to="/"
      >
        <PowerSvgIcon class="w-md h-md" :fontControlled="false" />
        <p>Restart</p>
      </NuxtLink>
      <NuxtLink
        class="flex flex-col items-center justify-center gap-1 bg-dark-3 focus:bg-dark-2 rounded-lg py-2xs px-sm transition-colors duration-300 delay-100 ease-linear drop-shadow-md"
        to="/blog"
      >
        <DocumentSvgIcon class="w-md h-md" :fontControlled="false" />
        <p>Blog</p>
      </NuxtLink>
      <NuxtLink
        class="flex flex-col items-center justify-center gap-1 bg-dark-3 focus:bg-dark-2 rounded-lg py-2xs px-sm transition-colors duration-300 ease-linear drop-shadow-md"
        to="/about"
      >
        <InfoSvgIcon class="w-md h-md" :fontControlled="false" />
        <p>About</p>
      </NuxtLink>
    </div>
    <!-- logo -->
    <img
      class="w-1/2 md:w-1/5 absolute bottom-sm left-1/2 -translate-x-1/2"
      :src="UbuntuLogo"
      alt="ubuntu logo"
    />
  </div>
</template>

<style scoped></style>
