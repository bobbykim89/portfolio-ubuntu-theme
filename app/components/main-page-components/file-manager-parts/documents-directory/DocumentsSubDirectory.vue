<script setup lang="ts">
import { FileType } from '#shared/types'
import { PagesCollectionItem } from '@nuxt/content'
import { useAppStore, useTextReaderStore } from '~/stores'
import File from '../File.vue'

defineProps<{
  files: PagesCollectionItem[]
}>()

const appStore = useAppStore()
const textReaderStore = useTextReaderStore()

const openDocumentReader = (arg: string) => {
  appStore.setDocumentReaderOpen()
  textReaderStore.openMdReader(arg)
}
</script>

<template>
  <div class="p-xs gap-3 flex flex-wrap content-start">
    <File
      v-for="(item, idx) in files"
      :key="idx"
      :text="item.fileName"
      :type="item.type as FileType"
      :path="item.path"
      @file-click="openDocumentReader"
    />
  </div>
</template>
