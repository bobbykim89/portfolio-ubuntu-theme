<script setup lang="ts">
import DesktopAppsSvgIcon from '@/assets/img/svg-files/preferences-desktop-apps-symbolic.svg'

const emit = defineEmits<{
  (e: 'icon-click', event: Event): void
}>()

const handleButtonClick = (e: Event): void => {
  emit('icon-click', e)
}
</script>

<template>
  <button
    class="p-3xs focus:bg-dark-2 rounded-md transition-colors duration-150 ease-linear"
    @click="handleButtonClick"
    title="All desktop applications"
  >
    <DesktopAppsSvgIcon
      class="w-[42px] lg:w-lg aspect-square text-light-1"
      :fontControlled="false"
    />
  </button>
</template>
