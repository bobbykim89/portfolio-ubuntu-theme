import { defineStore } from 'pinia'

export const useCalculatorStore = defineStore('calculator', () => {
  // states
  const isActive = ref<boolean>(false)
  const isVisible = ref<boolean>(false)

  // actions: calculator
  const openCalculator = () => {
    isVisible.value = true
    isActive.value = true
  }
  const closeCalculator = () => {
    isVisible.value = false
    isActive.value = false
  }
  const minimizeCalculator = () => {
    isVisible.value = false
    isActive.value = false
  }
  const setCalculatorVisible = () => {
    isVisible.value = true
    isActive.value = true
  }
  const setCalculatorActive = (val: boolean) => {
    isActive.value = val
  }
  return {
    isActive,
    isVisible,
    openCalculator,
    closeCalculator,
    minimizeCalculator,
    setCalculatorVisible,
    setCalculatorActive,
  }
})
