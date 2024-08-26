<script setup lang="ts">
import { ref } from 'vue'
import { useIntervalFn, onClickOutside } from '@vueuse/core'
import NetworkSvgIcon from '@/assets/img/svg-files/network-wireless-symbolic.svg'
import SpeakerSvgIcon from '@/assets/img/svg-files/audio-speakers-symbolic.svg'
import ShutdownSvgIcon from '@/assets/img/svg-files/system-shutdown-symbolic.svg'
import SystemMenu from '@/components/layout-components/SystemMenu.vue'

const currentTime = ref<string>('')
const menuButton = ref<HTMLButtonElement>()
const systemMenu = ref<InstanceType<typeof SystemMenu>>()
const route = useRoute()
const updateCurrentTime = () => {
  const time = new Date()

  const formattedDate = time.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  currentTime.value = `${formattedDate} ${formattedTime}`
}

const handleButtonClick = () => {
  if (route.path !== '/') {
    systemMenu.value?.toggle()
  }
}

useIntervalFn(() => {
  updateCurrentTime()
}, 5000)

onClickOutside(
  systemMenu,
  () => {
    systemMenu.value?.close()
  },
  { ignore: [menuButton] }
)
</script>

<template>
  <main class="bg-dark-4 h-screen overflow-hidden relative">
    <!-- top-bar -->
    <div
      class="grid grid-cols-3 py-3xs text-light-1 w-full tracking-wide z-[50]"
    >
      <div class="col-start-2 text-center text-sm">{{ currentTime }}</div>
      <div class="ml-auto pr-3xs">
        <button
          class="px-2xs rounded-2xl hover:bg-dark-2 transition-colors duration-200 flex items-center gap-4"
          @click="handleButtonClick"
          ref="menuButton"
        >
          <NetworkSvgIcon class="text-md" />
          <SpeakerSvgIcon class="text-md" />
          <ShutdownSvgIcon class="text-md" />
        </button>
      </div>
    </div>

    <SystemMenu ref="systemMenu" />
    <slot />
  </main>
</template>

<style scoped></style>
