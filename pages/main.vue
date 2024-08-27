<script setup lang="ts">
import BgImage from '@/assets/img/manguito_tree.jpeg'
import AppIcon from '@/components/main-page-components/AppIcon.vue'
import DesktopAppsIcon from '@/components/main-page-components/DesktopAppsIcon.vue'
import FileManager from '@/components/main-page-components/FileManager.vue'
import Terminal from '@/components/main-page-components/Terminal.vue'
import { useAppStore } from '@/stores'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { appStatus } = storeToRefs(appStore)

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
        :is-open="appStatus.terminal.open"
        :is-active="appStatus.terminal.active"
        @icon-click="appStore.setTerminalOpen"
      />
      <AppIcon
        icon-type="filemanager"
        :is-open="appStatus['file-manager'].open"
        :is-active="appStatus['file-manager'].active"
        @icon-click="appStore.setFileManagerOpen"
      />
      <AppIcon
        icon-type="office"
        :is-open="appStatus.office.open"
        :is-active="appStatus.office.active"
        @icon-click="appStore.setOfficeOpen"
      />
      <AppIcon
        icon-type="firefox"
        :is-open="appStatus.firefox.open"
        :is-active="appStatus.firefox.active"
        @icon-click="appStore.setFirefoxOpen"
      />
      <AppIcon
        icon-type="music"
        :is-open="appStatus.music.open"
        :is-active="appStatus.music.active"
        @icon-click="appStore.setMusicOpen"
      />
      <AppIcon
        icon-type="trash"
        :is-open="appStatus.trash.open"
        :is-active="appStatus.trash.active"
        @icon-click="appStore.setTrashOpen"
      />
      <DesktopAppsIcon class="mt-auto mb-md" />
    </div>
    <!-- main screen -->
    <div class="h-full w-full relative">
      <Terminal
        @set-active="appStore.setTerminalActive"
        @close-click="appStore.setTerminalClose"
      />
      <FileManager
        @set-active="appStore.setFileManagerActive"
        @close-click="appStore.setFileManagerClose"
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
