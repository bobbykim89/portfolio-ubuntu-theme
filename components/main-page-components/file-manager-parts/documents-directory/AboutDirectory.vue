<script setup lang="ts">
import { useAppStore, useTextReaderStore } from '@/stores'
import { type FileType } from '@/types'
import File from '../File.vue'

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
    text: 'Info.md',
    type: 'text',
    path: '/documents/about/info',
  },
  {
    text: 'Education.md',
    type: 'text',
    path: '/documents/about/education',
  },
  {
    text: 'Experience.md',
    type: 'text',
    path: '/documents/about/experience',
  },
  {
    text: 'Contact.md',
    type: 'text',
    path: '/documents/about/contact',
  },
]
</script>

<template>
  <div
    class="p-xs gap-[10px] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center"
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
