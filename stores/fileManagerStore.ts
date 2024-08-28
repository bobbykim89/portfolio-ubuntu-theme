import { DirectoryType } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFileManagerStore = defineStore('file-manager', () => {
  // states
  const isActive = ref<boolean>(true)
  const isVisible = ref<boolean>(false)
  const isMaximized = ref<boolean>(false)
  const isRootDir = ref<boolean>(true)
  const currentSection = ref<DirectoryType>('home')
  const historyRef = ref<DirectoryType[]>([])
  const currentLocationIdx = ref<number>(1)
  // actions
  const openFileManager = (dir: DirectoryType = 'home') => {
    currentSection.value = dir
    historyRef.value.push(dir)
    isVisible.value = true
    isActive.value = true
  }
  const closeFileManager = () => {
    isActive.value = true
    isVisible.value = false
    isMaximized.value = false
    isRootDir.value = true
    historyRef.value = []
    currentLocationIdx.value = 1
    currentSection.value = 'home'
  }
  const minimizeFileManager = () => {
    isVisible.value = false
    isActive.value = false
  }
  const setFileManagerActive = (val: boolean) => {
    isActive.value = val
  }
  const setFileManagerMaximize = () => {
    isActive.value = true
    isMaximized.value = !isMaximized.value
  }
  const setCurrentDirectory = (val: DirectoryType) => {
    if (currentLocationIdx.value > 1) {
      historyRef.value.splice(
        historyRef.value.length - currentLocationIdx.value + 1
      )
      currentLocationIdx.value = 1
    }
    historyRef.value.push(val)
    currentSection.value = val
    if (historyRef.value.length > currentLocationIdx.value) {
      isRootDir.value = false
    }
  }
  const onPrevClick = () => {
    if (
      historyRef.value.length > 1 &&
      currentLocationIdx.value < historyRef.value.length
    ) {
      currentLocationIdx.value += 1
      const newTargetDirectory =
        historyRef.value[historyRef.value.length - currentLocationIdx.value]
      currentSection.value = newTargetDirectory
    }
    if (historyRef.value.length === currentLocationIdx.value) {
      isRootDir.value = true
    }
  }
  const onNextClick = () => {
    if (currentLocationIdx.value > 1) {
      currentLocationIdx.value -= 1
      const newTargetDirectory =
        historyRef.value[historyRef.value.length - currentLocationIdx.value]
      currentSection.value = newTargetDirectory
    }
    if (historyRef.value.length > currentLocationIdx.value) {
      isRootDir.value = false
    }
  }
  const setFileOpen = () => {}
  return {
    isActive,
    isVisible,
    isMaximized,
    isRootDir,
    currentSection,
    historyRef,
    currentLocationIdx,
    openFileManager,
    closeFileManager,
    minimizeFileManager,
    setFileManagerActive,
    setFileManagerMaximize,
    setCurrentDirectory,
    onPrevClick,
    onNextClick,
  }
})
