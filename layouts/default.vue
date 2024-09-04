<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import SpeakerSvgIcon from '@/assets/img/svg-files/audio-speakers-symbolic.svg'
import NetworkSvgIcon from '@/assets/img/svg-files/network-wireless-connected-symbolic.svg'
import ShutdownSvgIcon from '@/assets/img/svg-files/system-shutdown-symbolic.svg'
import SystemMenu from '@/components/layout-components/SystemMenu.vue'
import { onClickOutside, useIntervalFn } from '@vueuse/core'
import { computed, ref } from 'vue'

const config = useRuntimeConfig()
const currentTime = ref<string>('')
const dateNumeric = ref<string>('')
const menuButton = ref<HTMLButtonElement>()
const systemMenu = ref<InstanceType<typeof SystemMenu>>()
const route = useRoute()
const updateCurrentTime = () => {
  const time = new Date()

  const formattedDate = time.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })

  const formattedDateNumeric = time.toLocaleDateString('fr-CA', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  currentTime.value = `${formattedDate} ${formattedTime}`
  dateNumeric.value = formattedDateNumeric
}

const handleButtonClick = () => {
  if (route.path !== '/') {
    systemMenu.value?.toggle()
  }
}

const getUserName = computed(() => {
  if (route.path === '/') {
    return ''
  }
  return config.public.userName
})

updateCurrentTime()

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
  <main class="bg-dark-4 relative">
    <!-- top-bar -->
    <div
      class="grid grid-cols-3 py-3xs text-light-1 w-full tracking-wide z-[50]"
    >
      <div class="hidden md:block text-sm pl-2xs cursor-default">
        {{ getUserName }}
      </div>
      <div class="col-start-2 text-center text-sm cursor-default relative">
        <label for="date-time">
          {{ currentTime }}
        </label>
        <input
          class="absolute h-0 w-0 bottom-0 left-1/2"
          type="date"
          name="date-time"
          id="date-time"
          :value="dateNumeric"
          onfocus="this.showPicker()"
        />
      </div>
      <div class="ml-auto pr-3xs flex items-center">
        <button
          class="px-2xs rounded-2xl hover:bg-dark-2 transition-colors duration-200 flex items-center gap-4"
          @click="handleButtonClick"
          ref="menuButton"
        >
          <NetworkSvgIcon class="text-md !mb-0" />
          <SpeakerSvgIcon class="text-md !mb-0" />
          <ShutdownSvgIcon class="text-md !mb-0" />
        </button>
      </div>
    </div>

    <SystemMenu ref="systemMenu" />
    <div class="h-[calc(100vh-29px)]">
      <slot />
    </div>
  </main>
</template>

<style scoped></style>
