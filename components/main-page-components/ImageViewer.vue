<script setup lang="ts">
import ChevronRight from '@/assets/img/svg-files/pan-end-symbolic.svg'
import ChevronLeft from '@/assets/img/svg-files/pan-start-symbolic.svg'
import { usePictureStore } from '@/stores'
import { storeToRefs } from 'pinia'
import AppContainerGeneric from './AppContainerGeneric.vue'

const props = withDefaults(
  defineProps<{
    initialX: number
    initialY: number
  }>(),
  {
    initialX: 80,
    initialY: 40,
  }
)

const emit = defineEmits<{
  (e: 'close-click'): void
  (e: 'set-active', active: boolean): void
}>()
const pictureStore = usePictureStore()
const {
  currentImage,
  isActive,
  isVisible,
  isMaximized,
  imageIdx,
  isFirstImage,
  isLastImage,
} = storeToRefs(pictureStore)

const closeImageViewer = () => {
  pictureStore.closePhotoViewer()
  emit('close-click')
}
const minimizeImageViewer = () => {
  pictureStore.minimizePhotoViewer()
  emit('set-active', false)
}
const setImageViewerActive = (val: boolean) => {
  pictureStore.setPhotoViewerActive(val)
  emit('set-active', val)
}
</script>

<template>
  <AppContainerGeneric
    app-name="Image Viewer"
    :initial-x="initialX"
    :initial-y="initialY"
    :visible="isVisible"
    :active="isActive"
    :maximized="isMaximized"
    container-size="30"
    @close-click="closeImageViewer"
    @minimize-click="minimizeImageViewer"
    @maximize-click="pictureStore.setPhotoViewerMaximize"
    @set-active="setImageViewerActive"
  >
    <div
      :class="[
        isMaximized ? 'md:h-[92vh]' : 'md:h-[80vh]',
        'bg-dark-3 h-[90vh] md:h-96 text-light-1 py-3xs px-lg relative',
      ]"
    >
      <button
        :class="[
          isFirstImage ? 'bg-dark-4' : 'bg-dark-2',
          'absolute left-0 top-1/2 -translate-y-1/2 px-3xs py-md rounded-r-md hover:bg-opacity-80 transition-colors duration-150 ease-linear',
        ]"
        :disabled="isFirstImage"
        @click="pictureStore.setPrevImage"
      >
        <ChevronLeft class="text-md" />
      </button>
      <button
        :class="[
          isLastImage ? 'bg-dark-4' : 'bg-dark-2',
          'absolute right-0 top-1/2 -translate-y-1/2 px-3xs py-md rounded-l-md hover:bg-opacity-80 transition-colors duration-150 ease-linear',
        ]"
        :disabled="isLastImage"
        @click="pictureStore.setNextImage"
      >
        <ChevronRight class="text-md" />
      </button>
      <NuxtImg
        provider="cloudinary"
        :src="currentImage?.imageUrl"
        alt="a picture of bird"
        class="object-contain h-full object-center mx-auto"
      />
    </div>
  </AppContainerGeneric>
</template>

<style scoped></style>
