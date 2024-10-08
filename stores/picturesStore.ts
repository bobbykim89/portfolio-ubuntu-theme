import { useFetch, useRuntimeConfig } from '#imports'
import { FormattedPictureType } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePictureStore = defineStore('pictures', () => {
  const config = useRuntimeConfig()
  // states
  const imageData = ref<FormattedPictureType[]>([])
  const isActive = ref<boolean>(false)
  const isVisible = ref<boolean>(false)
  const isMaximized = ref<boolean>(false)
  const currentImage = ref<FormattedPictureType | null>(null)
  const imageIdx = ref<number>(0)
  const isFirstImage = ref<boolean>(true)
  const isLastImage = ref<boolean>(false)

  const setImageData = async () => {
    const { data } = await useFetch('/api/pictures')
    if (!data.value) {
      return
    }
    const formattedRes = data.value.map((item, idx) => {
      return {
        _id: item._id,
        imageId: item.imageId,
        thumbnail: `/c_scale,w_48/f_auto/v1700694621/${item.imageId}`,
        imageUrl: `/c_scale,w_1200/f_auto/v1700694621/${item.imageId}`,
        fileName: `img-${idx}.jpg`,
      }
    })
    imageData.value = formattedRes
  }
  const checkForFirstOrLast = () => {
    isLastImage.value =
      imageIdx.value === imageData.value.length - 1 ? true : false
    isFirstImage.value = imageIdx.value === 0 ? true : false
  }
  // actions
  const setCurrentImage = (id: string) => {
    for (let i = 0; i < imageData.value.length; i++) {
      if (imageData.value[i]._id === id) {
        currentImage.value = imageData.value[i]
        imageIdx.value = i
      }
    }
    checkForFirstOrLast()
  }
  const setNextImage = () => {
    if (imageIdx.value < imageData.value.length - 1) {
      imageIdx.value += 1
      currentImage.value = imageData.value[imageIdx.value]
    }
    checkForFirstOrLast()
  }
  const setPrevImage = () => {
    if (imageIdx.value > 0) {
      imageIdx.value -= 1
      currentImage.value = imageData.value[imageIdx.value]
    }
    checkForFirstOrLast()
  }
  const openPhotoViewer = (id: string) => {
    setCurrentImage(id)
    isVisible.value = true
    isActive.value = true
  }
  const setPhotiViewerVisible = () => {
    if (currentImage.value !== null) {
      isVisible.value = true
      isActive.value = true
    }
  }
  const closePhotoViewer = () => {
    isVisible.value = false
    isActive.value = false
  }
  const minimizePhotoViewer = () => {
    isVisible.value = false
    isActive.value = false
  }
  const setPhotoViewerActive = (val: boolean) => {
    isActive.value = val
  }
  const setPhotoViewerMaximize = () => {
    isActive.value = true
    isMaximized.value = !isMaximized.value
  }
  const resetStates = () => {
    isActive.value = false
    isVisible.value = false
    isMaximized.value = false
    currentImage.value = null
    imageIdx.value = 0
    isFirstImage.value = true
    isLastImage.value = false
  }
  return {
    imageData,
    isActive,
    isVisible,
    isMaximized,
    currentImage,
    imageIdx,
    isFirstImage,
    isLastImage,
    setImageData,
    setCurrentImage,
    setNextImage,
    setPrevImage,
    openPhotoViewer,
    setPhotiViewerVisible,
    closePhotoViewer,
    minimizePhotoViewer,
    setPhotoViewerActive,
    setPhotoViewerMaximize,
    resetStates,
  }
})
