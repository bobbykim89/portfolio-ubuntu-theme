<script setup lang="ts">
import DocumentSvgIcon from '@/assets/img/svg-files/folder-documents-symbolic.svg'
import NetworkSvgIcon from '@/assets/img/svg-files/network-wired-symbolic.svg'
import PowerSvgIcon from '@/assets/img/svg-files/system-shutdown-symbolic.svg'
import UbuntuLogo from '@/assets/img/ubuntu/ubuntu-logo-dark.png'

definePageMeta({
  layout: false,
})

const displayLoader = ref<boolean>(true)
const router = useRouter()

const handleRestart = () => {
  router.push({ path: '/' })
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
      <button
        class="flex flex-col items-center justify-center gap-1 bg-dark-3 focus:bg-dark-2 rounded-lg py-2xs px-sm transition-colors duration-300 ease-linear drop-shadow-md"
        @click="handleRestart"
      >
        <PowerSvgIcon class="w-md h-md" :fontControlled="false" />
        <p>Restart</p>
      </button>
      <button
        class="flex flex-col items-center justify-center gap-1 bg-dark-3 focus:bg-dark-2 rounded-lg py-2xs px-sm transition-colors duration-300 delay-100 ease-linear drop-shadow-md"
        @click="handleAboutClick"
      >
        <DocumentSvgIcon class="w-md h-md" :fontControlled="false" />
        <p>About</p>
      </button>
      <button
        class="flex flex-col items-center justify-center gap-1 bg-dark-3 focus:bg-dark-2 rounded-lg py-2xs px-sm transition-colors duration-300 ease-linear drop-shadow-md"
      >
        <NetworkSvgIcon class="w-md h-md" :fontControlled="false" />
        <p>Contact</p>
      </button>
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
