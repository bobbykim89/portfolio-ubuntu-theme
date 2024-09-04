<script setup lang="ts">
import FireFoxIcon from '@/assets/img/program-icons/firefox.png'
import ImageViewerIcon from '@/assets/img/program-icons/image-viewer-app.png'
import OfficeIcon from '@/assets/img/program-icons/libreoffice-writer.png'
import MusicIcon from '@/assets/img/program-icons/preferences-system-sound.png'
import SettingsIcon from '@/assets/img/program-icons/system-settings.png'
import TerminalIcon from '@/assets/img/program-icons/terminal-app.png'
import MdIcon from '@/assets/img/program-icons/text-markdown.png'
import FileManagerIcon from '@/assets/img/system-icons/filemanager-app.png'
import TrashIcon from '@/assets/img/system-icons/user-trash.png'
import type { MainAppIconMap, MainAppIconType } from '@/types'

const props = withDefaults(
  defineProps<{
    iconType: MainAppIconType
    isOpen: boolean
    isActive: boolean
  }>(),
  {
    iconType: 'terminal',
    isOpen: false,
  }
)

const emit = defineEmits<{
  (e: 'icon-click', event: Event): void
}>()

const imageIcons: MainAppIconMap = {
  firefox: { src: FireFoxIcon, alt: 'firefox icon' },
  music: { src: MusicIcon, alt: 'music player icon' },
  terminal: { src: TerminalIcon, alt: 'terminal icon' },
  office: { src: OfficeIcon, alt: 'libre office icon' },
  'file-manager': { src: FileManagerIcon, alt: 'file manager icon' },
  trash: { src: TrashIcon, alt: 'trash icon' },
  'image-viewer': { src: ImageViewerIcon, alt: 'image viewer icon' },
  'document-reader': { src: MdIcon, alt: 'markdown file icon' },
  settings: { src: SettingsIcon, alt: 'gearbox icon' },
}

const handleIconClick = (e: Event) => {
  emit('icon-click', e)
}
</script>

<template>
  <button
    class="py-3xs px-2xs focus:bg-dark-2 rounded-md transition-colors duration-150 ease-linear relative"
    @click="handleIconClick"
  >
    <img
      class="w-lg aspect-square"
      :src="imageIcons[iconType].src"
      :alt="imageIcons[iconType].alt"
    />
    <div
      v-if="isOpen"
      :class="[
        isActive ? 'bg-warning' : 'bg-light-1',
        'absolute w-3xs h-3xs rounded-full top-1/2 left-[2px]',
      ]"
    ></div>
  </button>
</template>

<style scoped></style>
