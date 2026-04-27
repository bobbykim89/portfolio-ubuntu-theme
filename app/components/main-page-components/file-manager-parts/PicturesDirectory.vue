<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAppStore, usePictureStore } from '~/stores'
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
  <div class="p-xs gap-3 flex flex-wrap content-start">
    <Picture
      v-for="(item, idx) in imageData"
      :key="idx"
      :thumb="item.thumbnail"
      :text="item.fileName"
      :uid="item._id"
      @picture-click="openPhotoViewer"
    />
  </div>
</template>

<style scoped></style>
