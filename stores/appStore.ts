import { AppType, AppTypeMap } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFileManagerStore } from './fileManagerStore'
import { usePictureStore } from './picturesStore'
import { useTerminalStore } from './terminalStore'
import { useTextReaderStore } from './textReaderStore'

export const useAppStore = defineStore('app', () => {
  // other stores
  const terminalStore = useTerminalStore()
  const fileManagerStore = useFileManagerStore()
  const pictureStore = usePictureStore()
  const textReaderStore = useTextReaderStore()
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
  })
  // actions
  const setAppStatus = (arg: AppType, val: boolean) => {
    appStatus.value[arg].active = val
    appStatus.value[arg].open = val
  }
  const setTerminalOpen = () => {
    setAppStatus('terminal', true)
    terminalStore.openTerminal()
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
  }
  const setOfficeActive = (val: boolean) => {
    appStatus.value.office.active = val
  }

  const setOfficeClose = () => {
    setAppStatus('office', false)
  }

  const setFirefoxOpen = () => {
    setAppStatus('firefox', true)
  }

  const setMusicOpen = () => {
    setAppStatus('music', true)
  }

  const setTrashOpen = () => {
    setAppStatus('trash', true)
    fileManagerStore.openFileManager('trash')
  }
  const setImageViewerOpen = () => {
    setAppStatus('image-viewer', true)
    pictureStore.setPhotiViewerVisible()
  }
  const setImageViewerActive = (val: boolean) => {
    appStatus.value['image-viewer'].active = val
  }
  const setImageViewerClose = () => {
    setAppStatus('image-viewer', false)
  }
  const setDocumentReaderOpen = () => {
    setAppStatus('document-reader', true)
    // appStatus.value['document-reader'].open = true
    // appStatus.value['document-reader'].active = true
    textReaderStore.setMdReaderVisible()
  }
  const setDocumentReaderActive = (val: boolean) => {
    appStatus.value['document-reader'].active = val
  }
  const setDocumentReaderClose = () => {
    setAppStatus('document-reader', false)
  }

  return {
    appStatus,
    setTerminalOpen,
    setTerminalActive,
    setTerminalClose,
    setFileManagerOpen,
    setFileManagerActive,
    setFileManagerClose,
    setOfficeOpen,
    setOfficeActive,
    setOfficeClose,
    setFirefoxOpen,
    setMusicOpen,
    setTrashOpen,
    setImageViewerOpen,
    setImageViewerActive,
    setImageViewerClose,
    setDocumentReaderOpen,
    setDocumentReaderActive,
    setDocumentReaderClose,
  }
})
