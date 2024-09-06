import { AppType, AppTypeMap, DirectoryType } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useBlogStore } from './blogStore'
import { useCalculatorStore } from './calculatorStore'
import { useFileManagerStore } from './fileManagerStore'
import { useMusicPlayerStore } from './musicPlayerStore'
import { usePictureStore } from './picturesStore'
import { useSettingsStore } from './settingsStore'
import { useTerminalStore } from './terminalStore'
import { useTextReaderStore } from './textReaderStore'

export const useAppStore = defineStore('app', () => {
  // other stores
  const terminalStore = useTerminalStore()
  const fileManagerStore = useFileManagerStore()
  const pictureStore = usePictureStore()
  const textReaderStore = useTextReaderStore()
  const blogStore = useBlogStore()
  const musicPlayerStore = useMusicPlayerStore()
  const settingsStore = useSettingsStore()
  const calculatorStore = useCalculatorStore()
  // states
  const appStatus = ref<AppTypeMap>({
    terminal: { open: false, active: false },
    'file-manager': { open: false, active: false },
    office: { open: false, active: false },
    firefox: { open: false, active: false },
    music: { open: false, active: false },
    trash: { open: false, active: false },
    'image-viewer': { open: false, active: false },
    'document-reader': { open: false, active: false },
    settings: { open: false, active: false },
    calculator: { open: false, active: false },
  })
  const windowWidth = ref<number>(0)
  const isMobile = ref<boolean>(false)
  // actions
  const setAppStatus = (arg: AppType, val: boolean) => {
    appStatus.value[arg].active = val
    appStatus.value[arg].open = val
  }
  const setOtherAppsInactive = (arg: AppType) => {
    appStatus.value
    Object.keys(appStatus.value).forEach((key) => {
      if (key !== arg) {
        appStatus.value[key as AppType].active = false
      }
    })
  }

  const setWindowWidth = (val: number) => {
    windowWidth.value = val
    isMobile.value = val < 768 ? true : false
  }
  const setTerminalOpen = () => {
    setAppStatus('terminal', true)
    terminalStore.openTerminal()
    if (isMobile.value === true) {
      fileManagerStore.minimizeFileManager()
      pictureStore.minimizePhotoViewer()
      textReaderStore.minimizeMdReader()
      textReaderStore.minimizePdfReader()
      blogStore.minimizeBlog()
      musicPlayerStore.minimizeMusicPlayer()
      settingsStore.minimizeSettings()
      calculatorStore.minimizeCalculator()
      setOtherAppsInactive('terminal')
    }
  }
  const setTerminalActive = (val: boolean) => {
    appStatus.value.terminal.active = val
  }
  const setTerminalClose = () => {
    setAppStatus('terminal', false)
  }

  const setFileManagerOpen = () => {
    setAppStatus('file-manager', true)
    fileManagerStore.openFileManager()
    if (isMobile.value === true) {
      terminalStore.minimizeTerminal()
      pictureStore.minimizePhotoViewer()
      textReaderStore.minimizeMdReader()
      textReaderStore.minimizePdfReader()
      blogStore.minimizeBlog()
      musicPlayerStore.minimizeMusicPlayer()
      settingsStore.minimizeSettings()
      calculatorStore.minimizeCalculator()
      setOtherAppsInactive('file-manager')
    }
  }

  const setFileManagerOpenFromTerminal = (dir: DirectoryType) => {
    setAppStatus('file-manager', true)
    fileManagerStore.openFileManager(dir)
    if (isMobile.value === true) {
      terminalStore.minimizeTerminal()
      pictureStore.minimizePhotoViewer()
      textReaderStore.minimizeMdReader()
      textReaderStore.minimizePdfReader()
      blogStore.minimizeBlog()
      musicPlayerStore.minimizeMusicPlayer()
      settingsStore.minimizeSettings()
      calculatorStore.minimizeCalculator()
      setOtherAppsInactive('file-manager')
    }
  }

  const setFileManagerActive = (val: boolean) => {
    appStatus.value['file-manager'].active = val
  }

  const setFileManagerClose = () => {
    setAppStatus('file-manager', false)
    setAppStatus('trash', false)
  }

  const setOfficeOpen = () => {
    setAppStatus('office', true)
    textReaderStore.openPdfReader()
    if (isMobile.value === true) {
      terminalStore.minimizeTerminal()
      fileManagerStore.minimizeFileManager()
      pictureStore.minimizePhotoViewer()
      textReaderStore.minimizeMdReader()
      blogStore.minimizeBlog()
      musicPlayerStore.minimizeMusicPlayer()
      settingsStore.minimizeSettings()
      calculatorStore.minimizeCalculator()
      setOtherAppsInactive('office')
    }
  }
  const setOfficeActive = (val: boolean) => {
    appStatus.value.office.active = val
  }

  const setOfficeClose = () => {
    setAppStatus('office', false)
  }

  const setFirefoxOpen = () => {
    setAppStatus('firefox', true)
    blogStore.openBlog()
    if (isMobile.value === true) {
      terminalStore.minimizeTerminal()
      fileManagerStore.minimizeFileManager()
      pictureStore.minimizePhotoViewer()
      textReaderStore.minimizePdfReader()
      textReaderStore.minimizeMdReader()
      musicPlayerStore.minimizeMusicPlayer()
      settingsStore.minimizeSettings()
      calculatorStore.minimizeCalculator()
      setOtherAppsInactive('firefox')
    }
  }
  const setFirefoxActive = (val: boolean) => {
    appStatus.value.firefox.active = val
  }

  const setFirefoxClose = () => {
    setAppStatus('firefox', false)
  }

  const setMusicOpen = () => {
    setAppStatus('music', true)
    musicPlayerStore.openMusicPlayer()
    if (isMobile.value === true) {
      terminalStore.minimizeTerminal()
      fileManagerStore.minimizeFileManager()
      pictureStore.minimizePhotoViewer()
      textReaderStore.minimizePdfReader()
      textReaderStore.minimizeMdReader()
      blogStore.minimizeBlog()
      settingsStore.minimizeSettings()
      calculatorStore.minimizeCalculator()
      setOtherAppsInactive('music')
    }
  }
  const setMusicPlayerActive = (val: boolean) => {
    appStatus.value.music.active = val
  }
  const setMusicPlayerClose = () => {
    setAppStatus('music', false)
  }

  const setTrashOpen = () => {
    setAppStatus('trash', true)
    fileManagerStore.openFileManager('trash')
    if (isMobile.value === true) {
      terminalStore.minimizeTerminal()
      pictureStore.minimizePhotoViewer()
      textReaderStore.minimizePdfReader()
      textReaderStore.minimizeMdReader()
      blogStore.minimizeBlog()
      musicPlayerStore.minimizeMusicPlayer()
      settingsStore.minimizeSettings()
      calculatorStore.minimizeCalculator()
      setOtherAppsInactive('trash')
    }
  }
  const setImageViewerOpen = () => {
    setAppStatus('image-viewer', true)
    pictureStore.setPhotiViewerVisible()
    if (isMobile.value === true) {
      terminalStore.minimizeTerminal()
      fileManagerStore.minimizeFileManager()
      textReaderStore.minimizePdfReader()
      textReaderStore.minimizeMdReader()
      blogStore.minimizeBlog()
      musicPlayerStore.minimizeMusicPlayer()
      settingsStore.minimizeSettings()
      calculatorStore.minimizeCalculator()
      setOtherAppsInactive('image-viewer')
    }
  }
  const setImageViewerActive = (val: boolean) => {
    appStatus.value['image-viewer'].active = val
  }
  const setImageViewerClose = () => {
    setAppStatus('image-viewer', false)
  }
  const setDocumentReaderOpen = () => {
    setAppStatus('document-reader', true)
    textReaderStore.setMdReaderVisible()
    if (isMobile.value === true) {
      terminalStore.minimizeTerminal()
      pictureStore.minimizePhotoViewer()
      fileManagerStore.minimizeFileManager()
      textReaderStore.minimizePdfReader()
      blogStore.minimizeBlog()
      musicPlayerStore.minimizeMusicPlayer()
      settingsStore.minimizeSettings()
      calculatorStore.minimizeCalculator()
      setOtherAppsInactive('document-reader')
    }
  }
  const setDocumentReaderActive = (val: boolean) => {
    appStatus.value['document-reader'].active = val
  }
  const setDocumentReaderClose = () => {
    setAppStatus('document-reader', false)
  }
  const setSettingsOpen = () => {
    setAppStatus('settings', true)
    settingsStore.openSettings()
    if (isMobile.value === true) {
      terminalStore.minimizeTerminal()
      pictureStore.minimizePhotoViewer()
      fileManagerStore.minimizeFileManager()
      textReaderStore.minimizePdfReader()
      blogStore.minimizeBlog()
      musicPlayerStore.minimizeMusicPlayer()
      textReaderStore.minimizeMdReader()
      calculatorStore.minimizeCalculator()
      setOtherAppsInactive('settings')
    }
  }
  const setSettingsActive = (val: boolean) => {
    appStatus.value.settings.active = val
  }
  const setSettingsClose = () => {
    setAppStatus('settings', false)
  }
  const setCalculatorOpen = () => {
    setAppStatus('calculator', true)
    calculatorStore.openCalculator()
    if (isMobile.value === true) {
      terminalStore.minimizeTerminal()
      pictureStore.minimizePhotoViewer()
      fileManagerStore.minimizeFileManager()
      textReaderStore.minimizePdfReader()
      blogStore.minimizeBlog()
      musicPlayerStore.minimizeMusicPlayer()
      textReaderStore.minimizeMdReader()
      settingsStore.minimizeSettings()
      setOtherAppsInactive('settings')
    }
  }
  const setCalculatorActive = (val: boolean) => {
    appStatus.value.calculator.active = val
  }
  const setCalculatorClose = () => {
    setAppStatus('calculator', false)
  }
  const closeAllApps = () => {
    setAppStatus('calculator', false)
    setAppStatus('document-reader', false)
    setAppStatus('file-manager', false)
    setAppStatus('firefox', false)
    setAppStatus('image-viewer', false)
    setAppStatus('music', false)
    setAppStatus('office', false)
    setAppStatus('settings', false)
    setAppStatus('terminal', false)
    setAppStatus('trash', false)
    calculatorStore.resetStates()
    textReaderStore.resetStates()
    fileManagerStore.resetStates()
    blogStore.resetStates()
    pictureStore.resetStates()
    settingsStore.resetStates()
    terminalStore.resetStates()
  }
  return {
    appStatus,
    windowWidth,
    isMobile,
    setWindowWidth,
    setTerminalOpen,
    setTerminalActive,
    setTerminalClose,
    setFileManagerOpen,
    setFileManagerOpenFromTerminal,
    setFileManagerActive,
    setFileManagerClose,
    setOfficeOpen,
    setOfficeActive,
    setOfficeClose,
    setFirefoxOpen,
    setFirefoxActive,
    setFirefoxClose,
    setMusicOpen,
    setMusicPlayerActive,
    setMusicPlayerClose,
    setTrashOpen,
    setImageViewerOpen,
    setImageViewerActive,
    setImageViewerClose,
    setDocumentReaderOpen,
    setDocumentReaderActive,
    setDocumentReaderClose,
    setSettingsOpen,
    setSettingsActive,
    setSettingsClose,
    setCalculatorOpen,
    setCalculatorActive,
    setCalculatorClose,
    closeAllApps,
  }
})
