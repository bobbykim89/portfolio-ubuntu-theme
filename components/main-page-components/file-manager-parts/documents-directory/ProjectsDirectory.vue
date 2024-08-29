<script setup lang="ts">
import { type FileType } from '@/types'
import File from '../File.vue'
import { useAppStore, useTextReaderStore } from '@/stores'

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
    text: 'MCL.md',
    type: 'js',
    path: '/documents/projects/mcl',
  },
  {
    text: 'Manguito Page.md',
    type: 'js',
    path: '/documents/projects/manguito-page',
  },
  {
    text: 'Mango Planner.md',
    type: 'js',
    path: '/documents/projects/mango-planner',
  },
  {
    text: 'Cookbook.md',
    type: 'js',
    path: '/documents/projects/cookbook',
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
      @file-click="openDocumentReader"
    />
  </div>
</template>

<style scoped></style>
