import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTerminalStore = defineStore('terminal', () => {
  // states
  const isActive = ref<boolean>(true)
  const isVisible = ref<boolean>(false)
  const isMaximized = ref<boolean>(false)
  // actions
  const openTerminal = () => {
    isVisible.value = true
    isActive.value = true
  }
  const closeTerminal = () => {
    isVisible.value = false
    isActive.value = false
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
  return {
    isActive,
    isVisible,
    isMaximized,
    openTerminal,
    closeTerminal,
    minimizeTerminal,
    setTerminalActive,
    setTerminalMaximize,
  }
})
