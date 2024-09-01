import { musicPlayerData } from '@/assets/data'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMusicPlayerStore = defineStore('music', () => {
  // states
  const isActive = ref<boolean>(true)
  const isVisible = ref<boolean>(false)
  const isMusicPlaying = ref<boolean>(false)
  const currentTrackNumber = ref<number>(0)
  const musicVolume = ref<number>(50)

  // actions: Music Player
  const openMusicPlayer = () => {
    isVisible.value = true
    isActive.value = true
  }
  const closeMusicPlayer = () => {
    isVisible.value = false
    isActive.value = false
    isMusicPlaying.value = false
    currentTrackNumber.value = 0
  }
  const minimizeMusicPlayer = () => {
    isVisible.value = false
    isActive.value = false
  }
  const setMusicPlayerVisible = () => {
    isVisible.value = true
    isActive.value = true
  }
  const setMusicPlayerActive = (val: boolean) => {
    isActive.value = val
  }
  const setPlay = (val: boolean) => {
    isMusicPlaying.value = val
  }
  const setCurrentTrackNumber = (val: number) => {
    currentTrackNumber.value = val
  }
  const setVolume = (val: number) => {
    musicVolume.value = val
  }
  const setNextMusic = () => {
    currentTrackNumber.value =
      currentTrackNumber.value === musicPlayerData.length - 1
        ? 0
        : currentTrackNumber.value + 1
  }
  const setPrevMusic = () => {
    currentTrackNumber.value =
      currentTrackNumber.value === 0
        ? musicPlayerData.length - 1
        : currentTrackNumber.value - 1
  }
  return {
    isActive,
    isVisible,
    isMusicPlaying,
    currentTrackNumber,
    musicVolume,
    openMusicPlayer,
    closeMusicPlayer,
    minimizeMusicPlayer,
    setMusicPlayerVisible,
    setMusicPlayerActive,
    setPlay,
    setCurrentTrackNumber,
    setVolume,
    setNextMusic,
    setPrevMusic,
  }
})
