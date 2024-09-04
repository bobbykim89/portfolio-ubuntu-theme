<script setup lang="ts">
import TrashSvgIcon from '@/assets/img/svg-files/edit-delete-symbolic.svg'
import DocumentSvgIcon from '@/assets/img/svg-files/folder-documents-symbolic.svg'
import MusicSvgIcon from '@/assets/img/svg-files/folder-music-symbolic.svg'
import PicturesSvgIcon from '@/assets/img/svg-files/folder-pictures-symbolic.svg'
import HomeSvgIcon from '@/assets/img/svg-files/go-home-symbolic.svg'
import ChevronRight from '@/assets/img/svg-files/pan-end-symbolic.svg'
import { type DirectoryType } from '@/types'
import { Collapse, vCollapse } from '@bobbykim/manguito-theme'

const props = withDefaults(
  defineProps<{
    currentDirectory: DirectoryType
  }>(),
  {
    currentDirectory: 'home',
  }
)

const collapseVisibilityRef = ref<boolean>(false)
const collapseRef = ref<InstanceType<typeof Collapse>>()

const emit = defineEmits<{
  (e: 'set-current-directory', directory: DirectoryType): void
}>()

const setCurrent = (arg: DirectoryType) => {
  emit('set-current-directory', arg)
  collapseRef.value?.close()
}
const setDirBgColor = (arg: DirectoryType): string => {
  const { currentDirectory } = props
  if (currentDirectory === arg) {
    return 'bg-dark-2'
  }
  return 'bg-dark-3'
}
const onCollapseClick = (visible: boolean) => {
  collapseVisibilityRef.value = visible
}
</script>

<template>
  <div>
    <!-- dexktop menu -->
    <div
      class="hidden md:flex flex-col h-full bg-dark-3 justify-start items-stretch border-r-2 border-r-dark-4"
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
          setDirBgColor('pictures'),
          'flex items-center pl-sm pr-lg py-2xs gap-2 text-start transition-colors duration-150 ease-linear',
        ]"
        @click="setCurrent('pictures')"
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
    <!-- mobile-menu -->
    <div
      class="flex md:hidden flex-col bg-dark-3 justify-start items-stretch border-r-2 border-r-dark-4"
    >
      <button
        class="flex justify-between items-center px-sm py-2xs text-start transition-colors duration-150 ease-linear"
        v-collapse:directory-collapse
      >
        <p class="text-md">Directories</p>
        <ChevronRight
          :class="[
            collapseVisibilityRef ? 'rotate-90' : 'rotate-0',
            'transition-transform duration-150 ease-linear',
          ]"
        />
      </button>
      <Collapse
        id="directory-collapse"
        ref="collapseRef"
        @open="onCollapseClick"
        @close="onCollapseClick"
      >
        <div>
          <button
            :class="[
              setDirBgColor('home'),
              'flex items-center pl-sm pr-lg py-2xs gap-2 text-start transition-colors duration-150 ease-linear w-full',
            ]"
            @click="setCurrent('home')"
          >
            <HomeSvgIcon class="text-sm" />
            <p class="text-sm">Home</p>
          </button>
          <button
            :class="[
              setDirBgColor('documents'),
              'flex items-center pl-sm pr-lg py-2xs gap-2 text-start transition-colors duration-150 ease-linear w-full',
            ]"
            @click="setCurrent('documents')"
          >
            <DocumentSvgIcon class="text-sm" />
            <p class="text-sm">Documents</p>
          </button>
          <button
            :class="[
              setDirBgColor('music'),
              'flex items-center pl-sm pr-lg py-2xs gap-2 text-start transition-colors duration-150 ease-linear w-full',
            ]"
            @click="setCurrent('music')"
          >
            <MusicSvgIcon class="text-sm" />
            <p class="text-sm">Music</p>
          </button>
          <button
            :class="[
              setDirBgColor('pictures'),
              'flex items-center pl-sm pr-lg py-2xs gap-2 text-start transition-colors duration-150 ease-linear w-full',
            ]"
            @click="setCurrent('pictures')"
          >
            <PicturesSvgIcon class="text-sm" />
            <p class="text-sm">Pictures</p>
          </button>
          <button
            :class="[
              setDirBgColor('trash'),
              'flex items-center pl-sm pr-lg py-2xs gap-2 text-start transition-colors duration-150 ease-linear w-full',
            ]"
            @click="setCurrent('trash')"
          >
            <TrashSvgIcon class="text-sm" />
            <p class="text-sm">Trash</p>
          </button>
        </div>
      </Collapse>
    </div>
  </div>
</template>

<style scoped></style>
