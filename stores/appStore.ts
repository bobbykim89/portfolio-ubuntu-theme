import { AppType, AppTypeMap } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useFileManagerStore } from './fileManagerStore'
import { useTerminalStore } from './terminalStore'

export const useAppStore = defineStore('app', () => {
  // other stores
  const terminalStore = useTerminalStore()
  const fileManagerStore = useFileManagerStore()
  // states
  const appStatus = ref<AppTypeMap>({
    terminal: { open: false, active: false },
    'file-manager': { open: false, active: false },
    office: { open: false, active: false },
    firefox: { open: false, active: false },
    music: { open: false, active: false },
    trash: { open: false, active: false },
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
  return {
    appStatus,
    setTerminalOpen,
    setTerminalActive,
    setTerminalClose,
    setFileManagerOpen,
    setFileManagerActive,
    setFileManagerClose,
    setOfficeOpen,
    setFirefoxOpen,
    setMusicOpen,
    setTrashOpen,
  }
})
