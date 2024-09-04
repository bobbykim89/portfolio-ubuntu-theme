import { queryContent } from '#imports'
import { musicPlayerData } from '@/assets/data'
import { DirectoryType } from '@/types'
import { defineStore, storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useAppStore } from './appStore'
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

type PossiblePathsType = DirectoryType
const documentsSubDirectoryOptions = ['about', 'projects', 'skills'] as const
type DocumentsSubdirectoryTypes = (typeof documentsSubDirectoryOptions)[number]
type DocumentsSubDirectoryPathsType = {
  [K in DocumentsSubdirectoryTypes]: Partial<PossiblePathsType>
}
const documentSubDirectoryFullPath: Record<
  DocumentsSubdirectoryTypes,
  PossiblePathsType
> = {
  about: 'documents/about',
  projects: 'documents/projects',
  skills: 'documents/skills',
}

export const useTerminalStore = defineStore('terminal', () => {
  const picturestore = usePictureStore()
  const appStore = useAppStore()
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
    resetTerminalState()
  }
  const minimizeTerminal = () => {
    isVisible.value = false
    isActive.value = false
  }
  const resetTerminalState = () => {
    inputText.value = ''
    currentPath.value = 'home'
    terminalMessage.value = ''
  }
  const setTerminalActive = (val: boolean) => {
    isActive.value = val
  }
  const setTerminalMaximize = () => {
    isActive.value = true
    isMaximized.value = !isMaximized.value
  }
  const cdErrorMessage = (path: string) => {
    terminalMessage.value = `cd: no such file or directory: ${path}`
  }
  const onCd = (path: PossibleInputOptionsType) => {
    if (path === undefined) {
      return
    }
    if (!possibleInputOptions.includes(path)) {
      cdErrorMessage(path)
      return
    }
    if (path === '~') {
      currentPath.value = 'home'
      return
    }
    if (path === '..') {
      if (
        currentPath.value === 'documents/about' ||
        currentPath.value === 'documents/projects' ||
        currentPath.value === 'documents/skills'
      ) {
        currentPath.value = 'documents'
        return
      }
      if (
        currentPath.value === 'documents' ||
        currentPath.value === 'music' ||
        currentPath.value === 'pictures'
      ) {
        currentPath.value = 'home'
        return
      }
    }
    if (
      path === 'documents' ||
      path === 'music' ||
      path === 'pictures' ||
      path === 'trash'
    ) {
      if (currentPath.value !== 'home') {
        cdErrorMessage(path)
        return
      }
      if (currentPath.value === 'home') {
        currentPath.value = path
        return
      }
    }
    if (
      path === 'documents/about' ||
      path === 'documents/projects' ||
      path === 'documents/skills'
    ) {
      if (currentPath.value !== 'home') {
        cdErrorMessage(path)
        return
      }
      if (currentPath.value === 'home') {
        currentPath.value = path
        return
      }
    }
    if (path === 'projects' || path === 'about' || path === 'skills') {
      if (currentPath.value !== 'documents') {
        cdErrorMessage(path)
        return
      }
      if (currentPath.value === 'documents') {
        currentPath.value = documentSubDirectoryFullPath[path]
        return
      }
    }
  }
  const formatImgData = () => {
    const { imageData } = storeToRefs(picturestore)
    return imageData.value.map((item) => item.fileName).join('\n')
  }
  const formatFilesData = async () => {
    const res = await queryContent(currentPath.value).sort({ order: 1 }).find()
    return res.length > 0 ? res.map((item) => item.fileName).join('\n') : ''
  }
  const formatMusicPlayerFilesData = () => {
    return musicPlayerData.map((item) => item.filename + '.mp3').join('\n')
  }
  const listDirectoryContents = async () => {
    const pathContent: Record<PossiblePathsType, string> = {
      home: 'Documents\nMusic\nPictures',
      documents: 'About\nProjects\nSkills',
      pictures: formatImgData(),
      music: formatMusicPlayerFilesData(),
      'documents/about': await formatFilesData(),
      'documents/projects': await formatFilesData(),
      'documents/skills': await formatFilesData(),
      trash: '',
    }

    terminalMessage.value = pathContent[currentPath.value] || ''
  }

  const onOpen = (arg: string) => {
    if (arg === '.') {
      appStore.setFileManagerOpenFromTerminal(currentPath.value)
    }
  }
  const onTerminalEnter = async () => {
    const [command, arg] = inputText.value.split(' ')

    const commands: Record<string, Function> = {
      cd: () => onCd(arg as PossibleInputOptionsType),
      ls: listDirectoryContents,
      clear: () => (terminalMessage.value = ''),
      open: () => onOpen(arg),
    }

    await commands[command]?.()
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
