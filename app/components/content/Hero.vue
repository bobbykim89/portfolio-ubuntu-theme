<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    imageSrc: string
    rounded?: boolean
    gradient?: boolean
  }>(),
  {
    rounded: false,
    gradient: false,
  }
)

const setBgVar = computed(() => {
  const { imageSrc } = props
  return { '--bg-image': `url(${imageSrc})` }
})
</script>

<template>
  <div
    class="relative bg-image bg-cover bg-no-repeat bg-center h-[30vh] md:h-64 flex flex-col justify-end items-start mb-md overflow-hidden"
    :class="{ 'rounded-b-xl': rounded }"
    :style="setBgVar"
  >
    <div
      v-if="gradient"
      class="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-dark-3"
    ></div>
    <div class="relative px-xs md:px-sm py-sm md:py-md">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.bg-image {
  background-image: var(--bg-image);
}
</style>
