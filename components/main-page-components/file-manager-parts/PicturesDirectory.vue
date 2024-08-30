<script setup lang="ts">
import { useAppStore, usePictureStore } from '@/stores'
import { storeToRefs } from 'pinia'
import Picture from './Picture.vue'

const pictureStore = usePictureStore()
const appStore = useAppStore()
const { imageData } = storeToRefs(pictureStore)

const openPhotoViewer = (id: string) => {
  appStore.setImageViewerOpen()
  pictureStore.openPhotoViewer(id)
}
</script>

<template>
  <div
    class="p-xs gap-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center"
  >
    <Picture
      v-for="(item, idx) in imageData"
      :key="idx"
      :thumb="item.thumbnail"
      :text="`img-${idx}`"
      :uid="item._id"
      @picture-click="openPhotoViewer"
    />
  </div>
</template>

<style scoped></style>
