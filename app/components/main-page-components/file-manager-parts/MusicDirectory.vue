<script setup lang="ts">
import { musicPlayerData } from '~/assets/data'
import { useAppStore, useMusicPlayerStore } from '~/stores'
import File from './File.vue'

const appStore = useAppStore()
const musicPlayerStore = useMusicPlayerStore()

const openMusicPlayer = (idx: number) => {
  musicPlayerStore.setCurrentTrackNumber(idx)
  appStore.setMusicOpen()
}
</script>

<template>
  <div class="p-xs gap-3 flex flex-wrap content-start">
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
