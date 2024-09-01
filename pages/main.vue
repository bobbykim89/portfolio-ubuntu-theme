<script setup lang="ts">
import BgImage from '@/assets/img/manguito_tree.jpeg'
import AppIcon from '@/components/main-page-components/AppIcon.vue'
import BlogPage from '@/components/main-page-components/BlogPage.vue'
import DesktopAppsIcon from '@/components/main-page-components/DesktopAppsIcon.vue'
import DocumentReader from '@/components/main-page-components/DocumentReader.vue'
import FileManager from '@/components/main-page-components/FileManager.vue'
import ImageViewer from '@/components/main-page-components/ImageViewer.vue'
import MusicPlayer from '@/components/main-page-components/MusicPlayer.vue'
import PdfReader from '@/components/main-page-components/PdfReader.vue'
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
        icon-type="file-manager"
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
      <div
        v-if="
          appStatus['image-viewer'].open || appStatus['document-reader'].open
        "
        class="px-2xs py-3xs"
      >
        <div class="w-full h-[2px] bg-light-3 rounded-sm opacity-50"></div>
      </div>
      <AppIcon
        v-if="appStatus['image-viewer'].open"
        icon-type="image-viewer"
        :is-open="appStatus['image-viewer'].open"
        :is-active="appStatus['image-viewer'].active"
        @icon-click="appStore.setImageViewerOpen"
      />
      <AppIcon
        v-if="appStatus['document-reader'].open"
        icon-type="document-reader"
        :is-open="appStatus['document-reader'].open"
        :is-active="appStatus['document-reader'].active"
        @icon-click="appStore.setDocumentReaderOpen"
      />
      <DesktopAppsIcon class="mt-auto mb-md" />
    </div>
    <!-- main screen -->
    <div class="h-full w-full relative">
      <Terminal
        :initial-x="80"
        :initial-y="40"
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
        @set-active="appStore.setMusicOpen"
        @close-click="appStore.setMusicPlayerClose"
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
