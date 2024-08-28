<script setup lang="ts">
import { useTextReaderStore } from '@/stores'
import { type FileType } from '@/types'
import File from '../File.vue'

type RootDirectoryFildersMap = {
  text: string
  type: FileType
  path: string
  handler: (arg: string) => void
}

const textReaderStore = useTextReaderStore()

const folders: RootDirectoryFildersMap[] = [
  {
    text: 'Info.md',
    type: 'text',
    path: '/documents/about/info',
    handler: (arg: string) => textReaderStore.openMdReader(arg),
  },
  {
    text: 'Education.md',
    type: 'text',
    path: '/documents/about/education',
    handler: (arg: string) => textReaderStore.openMdReader(arg),
  },
  {
    text: 'Experience.md',
    type: 'text',
    path: '/documents/about/experience',
    handler: (arg: string) => textReaderStore.openMdReader(arg),
  },
  {
    text: 'Contact.md',
    type: 'text',
    path: '/documents/about/contact',
    handler: (arg: string) => textReaderStore.openMdReader(arg),
  },
]
</script>

<template>
  <div class="p-xs flex flex-wrap gap-[10px] items-start">
    <File
      v-for="(item, idx) in folders"
      :key="idx"
      :text="item.text"
      :type="item.type"
      :path="item.path"
      @file-click="item.handler"
    />
  </div>
</template>

<style scoped></style>
