<script setup lang="ts">
import { wallpaperData } from '@/assets/data'
import { useSettingsStore } from '@/stores'
import { WallpaperThumbType } from '@/types'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import AppContainerGeneric from './AppContainerGeneric.vue'

const props = withDefaults(
  defineProps<{
    initialX: number
    initialY: number
  }>(),
  {
    initialX: 80,
    initialY: 40,
  }
)

const emit = defineEmits<{
  (e: 'close-click'): void
  (e: 'set-active', active: boolean): void
}>()

const settingsStore = useSettingsStore()
const { isActive, isMaximized, isVisible, currentWp } =
  storeToRefs(settingsStore)

const closeSettings = () => {
  settingsStore.closeSettings()
  emit('close-click')
}
const minimizeSettings = () => {
  settingsStore.minimizeSettings()
  emit('set-active', false)
}
const setSettingsActive = (val: boolean) => {
  settingsStore.setSettingsActive(val)
  emit('set-active', val)
}
const handleWpClick = (name: string) => {
  settingsStore.setWallpaper(name)
}
const formattedWpThumb = computed<WallpaperThumbType[]>(() => {
  return wallpaperData.map((item) => {
    return {
      ...item,
      thumbUrl: new URL(
        `../../assets/img/wallpapers/thumb/${item.fileName}`,
        import.meta.url
      ).href,
    }
  })
})
</script>

<template>
  <AppContainerGeneric
    app-name="Settings"
    :initial-x="initialX"
    :initial-y="initialY"
    :visible="isVisible"
    :active="isActive"
    :maximized="isMaximized"
    container-size="30"
    :disable-maximize="true"
    @close-click="closeSettings"
    @minimize-click="minimizeSettings"
    @maximize-click="settingsStore.setSettingsMaximize"
    @set-active="setSettingsActive"
  >
    <div
      :class="[
        isMaximized ? 'md:h-[92vh]' : 'md:h-[80vh]',
        'bg-dark-3 h-full text-light-1 pt-3xs pb-lg md:pb-3xs px-sm relative overflow-y-scroll',
      ]"
    >
      <div class="pt-sm">
        <h3 class="h3-md mb-sm">Change Wallpaper</h3>
        <div class="grid grid-cols-2 gap-4 place-items-center">
          <button
            v-for="(item, idx) in formattedWpThumb"
            :key="idx"
            class="focus:ring-4 ring-warning ring-offset-4 ring-offset-dark-2 rounded-lg"
            @click="handleWpClick(item.fileName)"
          >
            <img
              class="aspect-video object-cover object-center w-3xl lg:w-48 rounded-lg"
              :src="item.thumbUrl"
              :alt="`thumbnail image for ${item.fileName}`"
            />
          </button>
        </div>
      </div>
    </div>
  </AppContainerGeneric>
</template>

<style scoped></style>
