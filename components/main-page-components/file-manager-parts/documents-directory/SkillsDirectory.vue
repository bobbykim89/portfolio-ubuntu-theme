<script setup lang="ts">
import { useAppStore, useTextReaderStore } from '@/stores'
import { type FileType } from '@/types'
import File from '../File.vue'

defineProps<{
  maximized: boolean
}>()

type RootDirectoryFildersMap = {
  text: string
  type: FileType
  path: string
}

const appStore = useAppStore()
const textReaderStore = useTextReaderStore()

const openDocumentReader = (arg: string) => {
  appStore.setDocumentReaderOpen()
  textReaderStore.openMdReader(arg)
}

const folders: RootDirectoryFildersMap[] = [
  {
    text: 'Frontend.md',
    type: 'text',
    path: '/documents/skills/frontend',
  },
  {
    text: 'Backend.md',
    type: 'text',
    path: '/documents/skills/backend',
  },
  {
    text: 'DevOps.md',
    type: 'text',
    path: '/documents/skills/devops',
  },
  {
    text: 'Language.md',
    type: 'text',
    path: '/documents/skills/language',
  },
]
</script>

<template>
  <div
    :class="[
      maximized
        ? 'md:grid-cols-4 lg:grid-cols-8'
        : 'md:grid-cols-3 lg:grid-cols-5',
      'p-xs gap-3 grid grid-cols-2 justify-items-center',
    ]"
  >
    <File
      v-for="(item, idx) in folders"
      :key="idx"
      :text="item.text"
      :type="item.type"
      :path="item.path"
      @file-click="openDocumentReader"
    />
  </div>
</template>

<style scoped></style>
