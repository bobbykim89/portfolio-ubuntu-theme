<script setup lang="ts">
import BgImage from '@/assets/img/manguito_tree.jpeg'
import AppIcon from '@/components/main-page-components/AppIcon.vue'
import DesktopAppsIcon from '@/components/main-page-components/DesktopAppsIcon.vue'
import Terminal from '@/components/main-page-components/Terminal.vue'

type AppStatus = {
  open: boolean
  active: boolean
}
const terminalOpen = ref<boolean>(false)
const fileManagerOpen = ref<boolean>(false)
const officeOpen = ref<boolean>(false)
const firefoxOpen = ref<boolean>(false)
const musicOpen = ref<boolean>(false)
const trashOpen = ref<boolean>(false)
const terminalStatus = reactive<AppStatus>({ open: false, active: false })
const fileManagerStatus = reactive<AppStatus>({ open: false, active: false })
const officeStatus = reactive<AppStatus>({ open: false, active: false })
const firefoxStatus = reactive<AppStatus>({ open: false, active: false })
const musicStatus = reactive<AppStatus>({ open: false, active: false })
const trashStatus = reactive<AppStatus>({ open: false, active: false })
const terminalComponent = ref<InstanceType<typeof Terminal>>()

const setAppOpenActiveVal = (obj: AppStatus, val: boolean) => {
  obj.active = val
  obj.open = val
}

const handleTerminalOpen = () => {
  setAppOpenActiveVal(terminalStatus, true)
  terminalComponent.value?.openTerminal()
}
const handleTerminalInactive = (val: boolean) => {
  terminalStatus.active = val
}
const handleTerminalClose = () => {
  setAppOpenActiveVal(terminalStatus, false)
}

const handleFileManagerOpen = () => {
  setAppOpenActiveVal(fileManagerStatus, true)
}

const handleOfficeOpen = () => {
  setAppOpenActiveVal(officeStatus, true)
}

const handleFirefoxOpen = () => {
  setAppOpenActiveVal(firefoxStatus, true)
}

const handleMusicOpen = () => {
  setAppOpenActiveVal(musicStatus, true)
}

const handleTrashOpen = () => {
  setAppOpenActiveVal(trashStatus, true)
}

const bgImageVar = computed(() => {
  return { '--bg-img': `url(${BgImage})` }
})
</script>

<template>
  <div class="h-full w-full flex bg-img" :style="bgImageVar">
    <!-- menu bar -->
    <div class="flex flex-col gap-1 bg-dark-4/90 z-[50]">
      <AppIcon
        icon-type="terminal"
        :is-open="terminalStatus.open"
        :is-active="terminalStatus.active"
        @icon-click="handleTerminalOpen"
      />
      <AppIcon
        icon-type="filemanager"
        :is-open="fileManagerStatus.open"
        :is-active="fileManagerStatus.active"
        @icon-click="handleFileManagerOpen"
      />
      <AppIcon
        icon-type="office"
        :is-open="officeStatus.open"
        :is-active="officeStatus.active"
        @icon-click="handleOfficeOpen"
      />
      <AppIcon
        icon-type="firefox"
        :is-open="firefoxStatus.open"
        :is-active="firefoxStatus.active"
        @icon-click="handleFirefoxOpen"
      />
      <AppIcon
        icon-type="music"
        :is-open="musicStatus.open"
        :is-active="musicStatus.active"
        @icon-click="handleMusicOpen"
      />
      <AppIcon
        icon-type="trash"
        :is-open="trashStatus.open"
        :is-active="trashStatus.active"
        @icon-click="handleTrashOpen"
      />
      <DesktopAppsIcon class="mt-auto mb-md" />
    </div>
    <!-- main screen -->
    <div class="h-full w-full relative">
      <Terminal
        ref="terminalComponent"
        @set-active="handleTerminalInactive"
        @close-click="handleTerminalClose"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.bg-img {
  background-image: var(--bg-img);
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
}
</style>
