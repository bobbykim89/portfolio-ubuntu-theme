<script setup lang="ts">
import FolderDocuments from '@/assets/img/system-icons/folder-documents.png'
import FolderMusic from '@/assets/img/system-icons/folder-music.png'
import FolderPictures from '@/assets/img/system-icons/folder-pictures.png'
import FolderDefault from '@/assets/img/system-icons/folder.png'
import type { FolderMap, FolderType } from '@/types'

const folderData: FolderMap = {
  default: FolderDefault,
  documents: FolderDocuments,
  music: FolderMusic,
  pictures: FolderPictures,
}

const props = withDefaults(
  defineProps<{
    type?: FolderType
    text: string
  }>(),
  {
    type: 'default',
  }
)
const emit = defineEmits<{
  (e: 'folder-click', text: string): void
}>()

const onFolderClick = () => {
  emit('folder-click', props.text)
}
</script>

<template>
  <button
    class="flex flex-col items-center w-24 justify-center gap-1 py-3xs mb-auto rounded-lg focus:bg-dark-4 transition-colors duration-150 ease-linear"
    @click="onFolderClick"
  >
    <img :src="folderData[type]" :alt="type" class="h-lg" />
    <p class="text-light-1 text-sm text-wrap">{{ text }}</p>
  </button>
</template>

<style scoped></style>
