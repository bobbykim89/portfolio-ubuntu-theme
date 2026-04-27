// import { queryContent } from '#imports'
import { queryCollection } from '#imports'
import { DirectoryType } from '#shared/types'
import { musicPlayerData } from '@/assets/data'
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
  const isActive = ref<boolean>(false)
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
    if (!path) {
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
      const parentMap: Partial<Record<PossiblePathsType, PossiblePathsType>> = {
        'documents/about': 'documents',
        'documents/projects': 'documents',
        'documents/skills': 'documents',
        documents: 'home',
        music: 'home',
        pictures: 'home',
        trash: 'home',
      }
      currentPath.value = parentMap[currentPath.value] ?? currentPath.value
      return
    }
    // valid transitions: which paths are reachable from which parent
    const validTransitions: Partial<
      Record<PossiblePathsType, PossibleInputOptionsType[]>
    > = {
      home: [
        'documents',
        'music',
        'pictures',
        'trash',
        'documents/about',
        'documents/projects',
        'documents/skills',
      ],
      documents: ['about', 'projects', 'skills'],
    }

    const allowed = validTransitions[currentPath.value] ?? []
    if (!allowed.includes(path)) {
      cdErrorMessage(path)
      return
    }
    currentPath.value =
      documentSubDirectoryFullPath[path as DocumentsSubdirectoryTypes] ??
      (path as PossiblePathsType)
    // if (path === '..') {
    //   if (
    //     currentPath.value === 'documents/about' ||
    //     currentPath.value === 'documents/projects' ||
    //     currentPath.value === 'documents/skills'
    //   ) {
    //     currentPath.value = 'documents'
    //     return
    //   }
    //   if (
    //     currentPath.value === 'documents' ||
    //     currentPath.value === 'music' ||
    //     currentPath.value === 'pictures'
    //   ) {
    //     currentPath.value = 'home'
    //     return
    //   }
    // }
    // if (
    //   path === 'documents' ||
    //   path === 'music' ||
    //   path === 'pictures' ||
    //   path === 'trash'
    // ) {
    //   if (currentPath.value !== 'home') {
    //     cdErrorMessage(path)
    //     return
    //   }
    //   if (currentPath.value === 'home') {
    //     currentPath.value = path
    //     return
    //   }
    // }
    // if (
    //   path === 'documents/about' ||
    //   path === 'documents/projects' ||
    //   path === 'documents/skills'
    // ) {
    //   if (currentPath.value !== 'home') {
    //     cdErrorMessage(path)
    //     return
    //   }
    //   if (currentPath.value === 'home') {
    //     currentPath.value = path
    //     return
    //   }
    // }
    // if (path === 'projects' || path === 'about' || path === 'skills') {
    //   if (currentPath.value !== 'documents') {
    //     cdErrorMessage(path)
    //     return
    //   }
    //   if (currentPath.value === 'documents') {
    //     currentPath.value = documentSubDirectoryFullPath[path]
    //     return
    //   }
    // }
  }
  const formatImgData = () => {
    const { imageData } = storeToRefs(picturestore)
    return imageData.value.map((item) => item.fileName).join('\n')
  }
  const formatFilesData = async () => {
    const res = await queryCollection('pages')
      .where('path', 'LIKE', `/${currentPath.value}%`)
      .order('order', 'ASC')
      .all()
    return res.length > 0 ? res.map((item) => item.fileName).join('\n') : ''
  }
  const formatMusicPlayerFilesData = () => {
    return musicPlayerData.map((item) => item.filename + '.mp3').join('\n')
  }
  const listDirectoryContents = async () => {
    const staticPaths: Partial<Record<PossiblePathsType, string>> = {
      home: 'Documents\nMusic\nPictures',
      documents: 'About\nProjects\nSkills',
      pictures: formatImgData(),
      music: formatMusicPlayerFilesData(),
      trash: '',
    }
    const dynamicPaths: PossiblePathsType[] = [
      'documents/about',
      'documents/projects',
      'documents/skills',
    ]

    if (currentPath.value in staticPaths) {
      terminalMessage.value = staticPaths[currentPath.value] ?? ''
      return
    }

    if (dynamicPaths.includes(currentPath.value)) {
      terminalMessage.value = await formatFilesData()
      return
    }
    terminalMessage.value = ''
  }

  const onOpen = (arg: string) => {
    if (arg === '.') {
      appStore.setFileManagerOpenFromTerminal(currentPath.value)
      return
    }
    if (possibleInputOptions.includes(arg as PossibleInputOptionsType)) {
      appStore.setFileManagerOpenFromTerminal(arg as PossiblePathsType)
      return
    }
    terminalMessage.value = `open: no such file or directory: ${arg}`
  }
  const onTerminalEnter = async () => {
    const [command, arg = ''] = inputText.value.toLowerCase().split(' ')

    if (!command) return

    const normalizedArg = normalizePath(arg)

    const commands: Record<string, Function> = {
      cd: () => onCd(normalizedArg as PossibleInputOptionsType),
      ls: listDirectoryContents,
      clear: () => (terminalMessage.value = ''),
      open: () => onOpen(normalizedArg ?? ''),
    }

    await commands[command]?.()
  }
  const normalizePath = (path: string): string => {
    return path.replace(/^\.\//, '')
  }
  const clearTerminalMsg = () => {
    terminalMessage.value = ''
  }
  const resetStates = () => {
    isActive.value = false
    isVisible.value = false
    isMaximized.value = false
    inputText.value = ''
    currentPath.value = 'home'
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
    resetStates,
  }
})
