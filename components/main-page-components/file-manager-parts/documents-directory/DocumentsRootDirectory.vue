<script setup lang="ts">
import { useFileManagerStore } from '@/stores'
import Folder from '../Folder.vue'

type RootDirectoryFoldersMap = {
  text: string
  handler: () => void
}

const fileManagerStore = useFileManagerStore()

const folders: RootDirectoryFoldersMap[] = [
  {
    text: 'About',
    handler: () => fileManagerStore.setCurrentDirectory('documents/about'),
  },
  {
    text: 'Projects',
    handler: () => fileManagerStore.setCurrentDirectory('documents/projects'),
  },
  {
    text: 'Skills',
    handler: () => fileManagerStore.setCurrentDirectory('documents/skills'),
  },
]
</script>

<template>
  <div
    class="p-xs gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center"
  >
    <Folder
      v-for="(item, idx) in folders"
      :key="idx"
      :text="item.text"
      @folder-click="item.handler"
    />
  </div>
</template>

<style scoped></style>
