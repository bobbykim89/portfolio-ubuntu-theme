import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { usePictureStore } from './picturesStore'

const possibleInputOptions = [
  '~',
  '..',
  'documents',
  'documents/about',
  'documents/projects',
  'documents/skills',
  'about',
  'projects',
  'skills',
  'music',
  'pictures',
  'trash',
] as const
type PossibleInputOptionsType = (typeof possibleInputOptions)[number]
const possiblePaths = [
  'home',
  'documents',
  'documents/about',
  'documents/projects',
  'documents/skills',
  'music',
  'pictures',
  'trash',
] as const
type PossiblePathsType = (typeof possiblePaths)[number]
const documentsSubDirectoryOptions = ['about', 'projects', 'skills'] as const
type DocumentsSubdirectoryTypes = (typeof documentsSubDirectoryOptions)[number]
type DocumentsSubDirectoryPathsType = {
  [K in DocumentsSubdirectoryTypes]: Partial<PossiblePathsType>
}

export const useTerminalStore = defineStore('terminal', () => {
  const picturestore = usePictureStore()
  // states
  const isActive = ref<boolean>(true)
  const isVisible = ref<boolean>(false)
  const isMaximized = ref<boolean>(false)
  const inputText = ref<string>('')
  const currentPath = ref<PossiblePathsType>('home')
  const terminalMessage = ref<string>('')
  // actions
  const openTerminal = () => {
    isVisible.value = true
    isActive.value = true
  }
  const closeTerminal = () => {
    isVisible.value = false
    isActive.value = false
    inputText.value = ''
    currentPath.value = 'home'
    terminalMessage.value = ''
  }
  const minimizeTerminal = () => {
    isVisible.value = false
    isActive.value = false
  }
  const setTerminalActive = (val: boolean) => {
    isActive.value = val
  }
  const setTerminalMaximize = () => {
    isActive.value = true
    isMaximized.value = !isMaximized.value
  }
  const onCd = (path: PossibleInputOptionsType) => {
    const documentSubDirectoryFullPath: DocumentsSubDirectoryPathsType = {
      about: 'documents/about',
      projects: 'documents/projects',
      skills: 'documents/skills',
    }
    if (path === undefined) {
      return
    } else if (!possibleInputOptions.includes(path)) {
      terminalMessage.value = `cd: no such file or directory: ${path}`
      return
    } else if (path === '~') {
      currentPath.value = 'home'
      return
    } else if (
      (currentPath.value === 'documents/about' ||
        currentPath.value === 'documents/projects' ||
        currentPath.value === 'documents/skills') &&
      path === '..'
    ) {
      currentPath.value = 'documents'
      return
    } else if (
      (currentPath.value === 'documents' ||
        currentPath.value === 'music' ||
        currentPath.value === 'pictures') &&
      path === '..'
    ) {
      currentPath.value = 'home'
      return
    } else if (
      currentPath.value === 'documents' &&
      (path === 'projects' || path === 'about' || path === 'skills')
    ) {
      currentPath.value = documentSubDirectoryFullPath[path]
      return
    } else if (currentPath.value === 'home') {
      currentPath.value =
        path === 'documents'
          ? 'documents'
          : path === 'music'
          ? 'music'
          : path === 'pictures'
          ? 'pictures'
          : path === 'trash'
          ? 'trash'
          : 'home'
    }
  }
  const formatImgData = () => {
    const { imageData } = storeToRefs(picturestore)
    const textArray = imageData.value.map((item) => {
      return item.fileName
    })
    return textArray.join('\n')
  }
  const onLs = () => {
    if (currentPath.value === 'home') {
      terminalMessage.value = 'Documents\nMusic\nPictures'
      return
    }
    if (currentPath.value === 'trash') {
      return
    }
    if (currentPath.value === 'pictures') {
      terminalMessage.value = formatImgData()
    }
  }
  const onTerminalEnter = () => {
    const splitInput = inputText.value.split(' ')
    switch (splitInput[0]) {
      case 'cd':
        return onCd(splitInput[1] as PossibleInputOptionsType)
      case 'ls':
        return onLs()
      default:
        return ' '
    }
  }
  const clearTerminalMsg = () => {
    terminalMessage.value = ''
  }
  return {
    isActive,
    isVisible,
    isMaximized,
    inputText,
    currentPath,
    terminalMessage,
    openTerminal,
    closeTerminal,
    minimizeTerminal,
    setTerminalActive,
    setTerminalMaximize,
    onTerminalEnter,
    clearTerminalMsg,
  }
})
