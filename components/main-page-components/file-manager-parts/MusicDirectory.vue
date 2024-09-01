<script setup lang="ts">
import { musicPlayerData } from '@/assets/data'
import { useAppStore, useMusicPlayerStore } from '@/stores'
import File from './File.vue'

defineProps<{
  maximized: boolean
}>()

const appStore = useAppStore()
const musicPlayerStore = useMusicPlayerStore()

const openMusicPlayer = (idx: number) => {
  musicPlayerStore.setCurrentTrackNumber(idx)
  appStore.setMusicOpen()
}
</script>

<template>
  <div
    :class="[
      maximized
        ? 'md:grid-cols-4 lg:grid-cols-8'
        : 'md:grid-cols-3 lg:grid-cols-5',
      'p-xs gap-3 grid grid-cols-2 justify-items-center content-start',
    ]"
  >
    <File
      v-for="(item, idx) in musicPlayerData"
      :key="idx"
      type="music"
      :text="item.title"
      :path="item.filename"
      @file-click="() => openMusicPlayer(idx)"
    />
  </div>
</template>

<style scoped></style>
