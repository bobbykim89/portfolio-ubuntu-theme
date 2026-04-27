<script setup lang="ts">
import type { FolderType } from '#shared/types'
import { useFileManagerStore } from '~/stores'
import Folder from './Folder.vue'

const fileManagerStore = useFileManagerStore()

type HomeFoldersType = {
  type: FolderType
  text: string
  handler: () => void
}

const folders: HomeFoldersType[] = [
  {
    type: 'documents',
    text: 'Documents',
    handler: () => fileManagerStore.setCurrentDirectory('documents'),
  },
  {
    type: 'music',
    text: 'Music',
    handler: () => fileManagerStore.setCurrentDirectory('music'),
  },
  {
    type: 'pictures',
    text: 'Pictures',
    handler: () => fileManagerStore.setCurrentDirectory('pictures'),
  },
]
</script>

<template>
  <div class="p-xs gap-3 flex flex-wrap content-start">
    <Folder
      v-for="(item, idx) in folders"
      :key="idx"
      :type="item.type"
      :text="item.text"
      @folder-click="item.handler"
    />
  </div>
</template>

<style scoped></style>
