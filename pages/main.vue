<script setup lang="ts">
import BgImage from '@/assets/img/wallpapers/image/wallpaper-custom.jpg'
import AppIcon from '@/components/main-page-components/AppIcon.vue'
import BlogPage from '@/components/main-page-components/BlogPage.vue'
import Calculator from '@/components/main-page-components/Calculator.vue'
import DesktopAppsIcon from '@/components/main-page-components/DesktopAppsIcon.vue'
import DocumentReader from '@/components/main-page-components/DocumentReader.vue'
import FileManager from '@/components/main-page-components/FileManager.vue'
import ImageViewer from '@/components/main-page-components/ImageViewer.vue'
import MusicPlayer from '@/components/main-page-components/MusicPlayer.vue'
import PdfReader from '@/components/main-page-components/PdfReader.vue'
import Settings from '@/components/main-page-components/Settings.vue'
import Terminal from '@/components/main-page-components/Terminal.vue'
import { useAppStore, useSettingsStore } from '@/stores'
import { Modal, vToggle } from '@bobbykim/manguito-theme'
import { useWindowSize } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'

useHead({
  title: 'Manguito OS | Main',
  meta: [
    { name: 'description', content: 'Main page' },
    { property: 'og:title', content: 'Manguito OS | Main' },
  ],
})

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const { currentWp } = storeToRefs(settingsStore)
const { appStatus } = storeToRefs(appStore)
const terminalRef = ref<InstanceType<typeof Terminal>>()

const { width } = useWindowSize()

const onTerminalOpen = () => {
  appStore.setTerminalOpen()
  nextTick(() => {
    terminalRef.value?.focus()
  })
}

const bgImageVar = computed(() => {
  if (currentWp.value === '') {
    return { '--bg-img': `url(${BgImage})` }
  }
  const formattedImgUrl = new URL(
    `../assets/img/wallpapers/image/${currentWp.value}`,
    import.meta.url
  ).href
  return { '--bg-img': `url(${formattedImgUrl})` }
})
watch(width, (newVal) => {
  appStore.setWindowWidth(newVal)
})
onMounted(() => {
  appStore.setWindowWidth(width.value)
})
</script>

<template>
  <div class="h-full w-full flex bg-img" :style="bgImageVar">
    <!-- menu bar -->
    <div
      class="flex flex-col gap-1 bg-dark-4/90 items-center overflow-y-scroll z-[25]"
    >
      <AppIcon
        icon-type="terminal"
        ref="terminalRef"
        text="Terminal"
        :is-open="appStatus.terminal.open"
        :is-active="appStatus.terminal.active"
        @icon-click="onTerminalOpen"
      />
      <AppIcon
        icon-type="file-manager"
        text="File Manager"
        :is-open="appStatus['file-manager'].open"
        :is-active="appStatus['file-manager'].active"
        @icon-click="appStore.setFileManagerOpen"
      />
      <AppIcon
        icon-type="office"
        text="PDF Reader"
        :is-open="appStatus.office.open"
        :is-active="appStatus.office.active"
        @icon-click="appStore.setOfficeOpen"
      />
      <AppIcon
        icon-type="firefox"
        text="FireFox"
        :is-open="appStatus.firefox.open"
        :is-active="appStatus.firefox.active"
        @icon-click="appStore.setFirefoxOpen"
      />
      <AppIcon
        icon-type="music"
        text="Music Player"
        :is-open="appStatus.music.open"
        :is-active="appStatus.music.active"
        @icon-click="appStore.setMusicOpen"
      />
      <div class="px-2xs py-3xs w-full">
        <div class="w-full h-[2px] bg-light-3 rounded-sm opacity-50"></div>
      </div>
      <AppIcon
        v-if="appStatus['image-viewer'].open"
        icon-type="image-viewer"
        text="Image Viewer"
        :is-open="appStatus['image-viewer'].open"
        :is-active="appStatus['image-viewer'].active"
        @icon-click="appStore.setImageViewerOpen"
      />
      <AppIcon
        v-if="appStatus['document-reader'].open"
        icon-type="document-reader"
        text="Document Reader"
        :is-open="appStatus['document-reader'].open"
        :is-active="appStatus['document-reader'].active"
        @icon-click="appStore.setDocumentReaderOpen"
      />
      <AppIcon
        v-if="appStatus.calculator.open"
        icon-type="calculator"
        text="Calculator"
        :is-open="appStatus.calculator.open"
        :is-active="appStatus.calculator.active"
        @icon-click="appStore.setCalculatorOpen()"
      />
      <AppIcon
        v-if="appStatus.settings.open"
        icon-type="settings"
        text="Settings"
        :is-open="appStatus.settings.open"
        :is-active="appStatus.settings.active"
        @icon-click="appStore.setSettingsOpen"
      />
      <AppIcon
        icon-type="trash"
        text="Trash"
        :is-open="appStatus.trash.open"
        :is-active="appStatus.trash.active"
        @icon-click="appStore.setTrashOpen"
      />
      <DesktopAppsIcon class="mt-auto mb-2xs" v-toggle:all-application />
    </div>
    <!-- main screen -->
    <div class="grid md:block h-full w-full relative">
      <Terminal
        :initial-x="80"
        :initial-y="40"
        ref="terminalRef"
        @set-active="appStore.setTerminalActive"
        @close-click="appStore.setTerminalClose"
      />
      <FileManager
        :initial-x="120"
        :initial-y="120"
        @set-active="appStore.setFileManagerActive"
        @close-click="appStore.setFileManagerClose"
      />
      <ImageViewer
        :initial-x="240"
        :initial-y="40"
        @set-active="appStore.setImageViewerActive"
        @close-click="appStore.setImageViewerClose"
      />
      <PdfReader
        :initial-x="300"
        :initial-y="40"
        @set-active="appStore.setOfficeActive"
        @close-click="appStore.setOfficeClose"
      />
      <DocumentReader
        :initial-x="300"
        :initial-y="40"
        @set-active="appStore.setDocumentReaderActive"
        @close-click="appStore.setDocumentReaderClose"
      />
      <BlogPage
        :initial-x="200"
        :initial-y="80"
        @set-active="appStore.setFirefoxActive"
        @close-click="appStore.setFirefoxClose"
      />
      <MusicPlayer
        :initial-x="160"
        :initial-y="80"
        @set-active="appStore.setMusicPlayerActive"
        @close-click="appStore.setMusicPlayerClose"
      />
      <Settings
        :initial-x="200"
        :initial-y="80"
        @set-active="appStore.setSettingsActive"
        @close-click="appStore.setSettingsClose"
      />
      <Calculator
        :initial-x="120"
        :initial-y="120"
        @set-active="appStore.setCalculatorActive"
        @close-click="appStore.setCalculatorClose"
      />
    </div>
    <Modal
      id="all-application"
      color="dark-3"
      no-header
      class-name="rounded-xl p-sm lg:p-md"
    >
      <template #body="{ close }">
        <div class="grid grid-cols-3 lg:grid-cols-4 justify-items-center gap-4">
          <AppIcon
            icon-type="calculator"
            :display-text="true"
            text="Calculator"
            :is-open="appStatus.calculator.open"
            :is-active="appStatus.calculator.active"
            @icon-click="appStore.setCalculatorOpen(), close()"
            class="mb-auto"
          />
          <AppIcon
            icon-type="file-manager"
            :display-text="true"
            text="File Manager"
            :is-open="appStatus['file-manager'].open"
            :is-active="appStatus['file-manager'].active"
            @icon-click="appStore.setFileManagerOpen(), close()"
            class="mb-auto"
          />
          <AppIcon
            icon-type="firefox"
            :display-text="true"
            text="FireFox"
            :is-open="appStatus.firefox.open"
            :is-active="appStatus.firefox.active"
            @icon-click="appStore.setFirefoxOpen(), close()"
            class="mb-auto"
          />
          <AppIcon
            icon-type="music"
            :display-text="true"
            text="Music Player"
            :is-open="appStatus.music.open"
            :is-active="appStatus.music.active"
            @icon-click="appStore.setMusicOpen(), close()"
            class="mb-auto"
          />
          <AppIcon
            icon-type="office"
            :display-text="true"
            text="PDF Reader"
            :is-open="appStatus.office.open"
            :is-active="appStatus.office.active"
            @icon-click="appStore.setOfficeOpen(), close()"
            class="mb-auto"
          />
          <AppIcon
            icon-type="settings"
            :display-text="true"
            text="Settings"
            :is-open="appStatus.settings.open"
            :is-active="appStatus.settings.active"
            @icon-click="appStore.setSettingsOpen(), close()"
            class="mb-auto"
          />
          <AppIcon
            icon-type="terminal"
            :display-text="true"
            text="Terminal"
            ref="terminalRef"
            :is-open="appStatus.terminal.open"
            :is-active="appStatus.terminal.active"
            @icon-click="onTerminalOpen(), close()"
            class="mb-auto"
          />
        </div>
      </template>
    </Modal>
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
