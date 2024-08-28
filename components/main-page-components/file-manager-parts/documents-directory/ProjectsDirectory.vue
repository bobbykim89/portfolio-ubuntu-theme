<script setup lang="ts">
import { type FileType } from '@/types'
import File from '../File.vue'

type RootDirectoryFildersMap = {
  text: string
  type: FileType
  path: string
  handler: () => void
}

const folders: RootDirectoryFildersMap[] = [
  {
    text: 'MCL.md',
    type: 'js',
    path: '/documents/projects/mcl',
    handler: () => console.log('Info'),
  },
  {
    text: 'Manguito Page.md',
    type: 'js',
    path: '/documents/projects/manguito-page',
    handler: () => console.log('education'),
  },
  {
    text: 'Mango Planner.md',
    type: 'js',
    path: '/documents/projects/mango-planner',
    handler: () => console.log('experience'),
  },
  {
    text: 'Cookbook.md',
    type: 'js',
    path: '/documents/projects/cookbook',
    handler: () => console.log(),
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
