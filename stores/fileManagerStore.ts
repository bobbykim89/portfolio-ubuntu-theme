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
  // actions
  const openFileManager = (dir: DirectoryType = 'home') => {
    currentSection.value = dir
    isVisible.value = true
    isActive.value = true
  }
  const closeFileManager = () => {
    isVisible.value = false
    isActive.value = false
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
    currentSection.value = val
  }
  return {
    isActive,
    isVisible,
    isMaximized,
    isRootDir,
    currentSection,
    openFileManager,
    closeFileManager,
    minimizeFileManager,
    setFileManagerActive,
    setFileManagerMaximize,
    setCurrentDirectory,
  }
})
