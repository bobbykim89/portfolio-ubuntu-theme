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
    text: 'Frontend.md',
    type: 'text',
    path: '/documents/skills/frontend',
    handler: () => console.log('Info'),
  },
  {
    text: 'Backend.md',
    type: 'text',
    path: '/documents/skills/backend',
    handler: () => console.log('education'),
  },
  {
    text: 'DevOps.md',
    type: 'text',
    path: '/documents/skills/devops',
    handler: () => console.log(),
  },
  {
    text: 'Language.md',
    type: 'text',
    path: '/documents/skills/language',
    handler: () => console.log('experience'),
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
