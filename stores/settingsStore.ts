import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  // states
  const isActive = ref<boolean>(true)
  const isVisible = ref<boolean>(false)
  const isMaximized = ref<boolean>(false)
  const currentWp = ref<string>('')

  // actions
  const openSettings = () => {
    isVisible.value = true
    isActive.value = true
  }
  const setSettingsVisible = () => {
    isVisible.value = true
    isActive.value = true
  }
  const closeSettings = () => {
    isVisible.value = false
    isActive.value = false
  }
  const minimizeSettings = () => {
    isVisible.value = false
    isActive.value = false
  }
  const setSettingsActive = (val: boolean) => {
    isActive.value = val
  }
  const setSettingsMaximize = () => {
    isActive.value = true
    isMaximized.value = !isMaximized.value
  }
  const setWallpaper = (arg: string) => {
    currentWp.value = arg
  }

  return {
    isActive,
    isVisible,
    isMaximized,
    currentWp,
    openSettings,
    setSettingsVisible,
    closeSettings,
    minimizeSettings,
    setSettingsActive,
    setSettingsMaximize,
    setWallpaper,
  }
})
