<script setup lang="ts">
import AppIcon from '@/components/main-page-components/AppIcon.vue'
import DesktopAppsIcon from '@/components/main-page-components/DesktopAppsIcon.vue'
import BgImage from '@/assets/img/manguito_tree.jpeg'

const bgImageVar = computed(() => {
  return { '--bg-img': `url(${BgImage})` }
})
</script>

<template>
  <div class="h-full w-full flex bg-img" :style="bgImageVar">
    <!-- menu bar -->
    <div class="flex flex-col gap-1 bg-dark-4/90 z-[50]">
      <AppIcon icon-type="terminal" />
      <AppIcon icon-type="filemanager" />
      <AppIcon icon-type="office" />
      <AppIcon icon-type="firefox" />
      <AppIcon icon-type="spotify" />
      <AppIcon icon-type="trash" />
      <DesktopAppsIcon class="mt-auto mb-md" />
    </div>
    <!-- main screen -->
    <div class="h-full w-full">main content</div>
  </div>
</template>

<style scoped lang="scss">
.bg-img {
  background-image: var(--bg-img);
  background-position: center;
  background-repeat: repeat;
  background-size: cover;
}
</style>
