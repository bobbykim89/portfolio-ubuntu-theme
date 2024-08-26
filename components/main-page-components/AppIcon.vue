<script setup lang="ts">
import FireFoxIcon from '@/assets/img/program-icons/firefox.png'
import SpotifyIcon from '@/assets/img/program-icons/spotify-client.png'
import TerminalIcon from '@/assets/img/program-icons/terminal-app.png'
import OfficeIcon from '@/assets/img/program-icons/libreoffice-writer.png'
import FileManagerIcon from '@/assets/img/system-icons/filemanager-app.png'
import TrashIcon from '@/assets/img/system-icons/user-trash.png'

const iconArray = [
  'firefox',
  'spotify',
  'terminal',
  'office',
  'filemanager',
  'trash',
] as const
export type MainAppIconType = (typeof iconArray)[number]
type IconInfo = {
  src: string
  alt: string
}
type MainAppIconMap = {
  [K in MainAppIconType]: IconInfo
}

const props = withDefaults(
  defineProps<{
    iconType: MainAppIconType
  }>(),
  {
    iconType: 'terminal',
  }
)

const emit = defineEmits<{
  (e: 'icon-click', event: Event): void
}>()

const imageIcons: MainAppIconMap = {
  firefox: { src: FireFoxIcon, alt: 'firefox icon' },
  spotify: { src: SpotifyIcon, alt: 'spotify icon' },
  terminal: { src: TerminalIcon, alt: 'terminal icon' },
  office: { src: OfficeIcon, alt: 'libre office icon' },
  filemanager: { src: FileManagerIcon, alt: 'file manager icon' },
  trash: { src: TrashIcon, alt: 'trash icon' },
}

const handleIconClick = (e: Event) => {
  emit('icon-click', e)
}
</script>

<template>
  <button
    class="p-3xs focus:bg-dark-2 rounded-md transition-colors duration-150 ease-linear"
    @click="handleIconClick"
  >
    <img
      class="w-lg h-lg"
      :src="imageIcons[iconType].src"
      :alt="imageIcons[iconType].alt"
    />
  </button>
</template>

<style scoped></style>
