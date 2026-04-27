import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTextReaderStore = defineStore('text-reader', () => {
  // states: PDF reader
  const isPdfActive = ref<boolean>(false)
  const isPdfVisible = ref<boolean>(false)
  const isPdfMaximized = ref<boolean>(false)
  // states: MD reader
  const isMdActive = ref<boolean>(false)
  const isMdVisible = ref<boolean>(false)
  const isMdMaximized = ref<boolean>(false)
  const currentMdPath = ref<string | null>(null)

  // actions: PDF reader
  const openPdfReader = () => {
    isPdfVisible.value = true
    isPdfActive.value = true
  }
  const closePdfReader = () => {
    isPdfVisible.value = false
    isPdfActive.value = false
  }
  const minimizePdfReader = () => {
    isPdfVisible.value = false
    isPdfActive.value = false
  }
  const setPdfReaderActive = (val: boolean) => {
    isPdfActive.value = val
  }
  const setPdfReaderMaximize = () => {
    isPdfActive.value = true
    isPdfMaximized.value = !isPdfMaximized.value
  }
  const setMdPath = (path: string) => {
    currentMdPath.value = path
  }
  // actions: MD reader
  const openMdReader = async (path: string) => {
    setMdPath(path)
    isMdVisible.value = true
    isMdActive.value = true
  }
  const closeMdReader = () => {
    isMdVisible.value = false
    isMdActive.value = false
    currentMdPath.value = null
  }
  const minimizeMdReader = () => {
    isMdVisible.value = false
    isMdActive.value = false
  }
  const setMdReaderVisible = () => {
    if (currentMdPath.value !== null) {
      isMdVisible.value = true
      isMdActive.value = true
    }
  }
  const setMdReaderActive = (val: boolean) => {
    isMdActive.value = val
  }
  const setMdReaderMaximize = () => {
    isMdActive.value = true
    isMdMaximized.value = !isMdMaximized.value
  }
  const resetStates = () => {
    isPdfActive.value = false
    isPdfVisible.value = false
    isPdfMaximized.value = false
    isMdActive.value = false
    isMdVisible.value = false
    isMdMaximized.value = false
    currentMdPath.value = null
  }

  return {
    // pdf
    isPdfActive,
    isPdfVisible,
    isPdfMaximized,
    openPdfReader,
    closePdfReader,
    minimizePdfReader,
    setPdfReaderActive,
    setPdfReaderMaximize,
    // md
    isMdActive,
    isMdVisible,
    isMdMaximized,
    currentMdPath,
    openMdReader,
    closeMdReader,
    minimizeMdReader,
    setMdReaderVisible,
    setMdReaderActive,
    setMdReaderMaximize,
    resetStates,
  }
})
