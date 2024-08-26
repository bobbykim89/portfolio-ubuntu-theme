<script setup lang="ts">
import TrashSvgIcon from '@/assets/img/svg-files/edit-delete-symbolic.svg'
import DocumentSvgIcon from '@/assets/img/svg-files/folder-documents-symbolic.svg'
import MusicSvgIcon from '@/assets/img/svg-files/folder-music-symbolic.svg'
import PicturesSvgIcon from '@/assets/img/svg-files/folder-pictures-symbolic.svg'
import HomeSvgIcon from '@/assets/img/svg-files/go-home-symbolic.svg'
import { type DirectoryType } from '../FileManager.vue'

const props = withDefaults(
  defineProps<{
    currentDirectory: DirectoryType
  }>(),
  {
    currentDirectory: 'home',
  }
)

const emit = defineEmits<{
  (e: 'set-current-directory', directory: DirectoryType): void
}>()

const setCurrent = (arg: DirectoryType) => {
  emit('set-current-directory', arg)
}
const setDirBgColor = (arg: DirectoryType): string => {
  const { currentDirectory } = props
  if (currentDirectory === arg) {
    return 'bg-dark-2'
  }
  return 'bg-dark-3'
}
</script>

<template>
  <div
    class="flex flex-col f-full bg-dark-3 justify-start items-stretch border-r-2 border-r-dark-4"
  >
    <button
      :class="[
        setDirBgColor('home'),
        'flex items-center pl-sm pr-lg py-2xs gap-2 text-start transition-colors duration-150 ease-linear',
      ]"
      @click="setCurrent('home')"
    >
      <HomeSvgIcon class="text-sm" />
      <p class="text-sm">Home</p>
    </button>
    <button
      :class="[
        setDirBgColor('documents'),
        'flex items-center pl-sm pr-lg py-2xs gap-2 text-start transition-colors duration-150 ease-linear',
      ]"
      @click="setCurrent('documents')"
    >
      <DocumentSvgIcon class="text-sm" />
      <p class="text-sm">Documents</p>
    </button>
    <button
      :class="[
        setDirBgColor('music'),
        'flex items-center pl-sm pr-lg py-2xs gap-2 text-start transition-colors duration-150 ease-linear',
      ]"
      @click="setCurrent('music')"
    >
      <MusicSvgIcon class="text-sm" />
      <p class="text-sm">Music</p>
    </button>
    <button
      :class="[
        setDirBgColor('picture'),
        'flex items-center pl-sm pr-lg py-2xs gap-2 text-start transition-colors duration-150 ease-linear',
      ]"
      @click="setCurrent('picture')"
    >
      <PicturesSvgIcon class="text-sm" />
      <p class="text-sm">Pictures</p>
    </button>
    <button
      :class="[
        setDirBgColor('trash'),
        'flex items-center pl-sm pr-lg py-2xs gap-2 text-start transition-colors duration-150 ease-linear',
      ]"
      @click="setCurrent('trash')"
    >
      <TrashSvgIcon class="text-sm" />
      <p class="text-sm">Trash</p>
    </button>
  </div>
</template>

<style scoped></style>
