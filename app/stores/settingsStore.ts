import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  // states
  const isActive = ref<boolean>(false)
  const isVisible = ref<boolean>(false)
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
  const setWallpaper = (arg: string) => {
    currentWp.value = arg
  }
  const resetStates = () => {
    isActive.value = false
    isVisible.value = false
  }

  return {
    isActive,
    isVisible,
    currentWp,
    openSettings,
    setSettingsVisible,
    closeSettings,
    minimizeSettings,
    setSettingsActive,
    setWallpaper,
    resetStates,
  }
})
