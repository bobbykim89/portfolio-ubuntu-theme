<script setup lang="ts">
import { queryContent, useAsyncData } from '#imports'
import { useAppStore, useTextReaderStore } from '@/stores'
import File from '../File.vue'

defineProps<{
  maximized: boolean
}>()

const { data: files } = await useAsyncData('projects', () =>
  queryContent('/documents/projects').find()
)

const appStore = useAppStore()
const textReaderStore = useTextReaderStore()

const openDocumentReader = (arg: string) => {
  appStore.setDocumentReaderOpen()
  textReaderStore.openMdReader(arg)
}
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
      v-for="(item, idx) in files"
      :key="idx"
      :text="item.fileName"
      :type="item.type"
      :path="item._path!"
      @file-click="openDocumentReader"
    />
  </div>
</template>

<style scoped></style>
