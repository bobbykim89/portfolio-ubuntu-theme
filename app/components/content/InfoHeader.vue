<script setup lang="ts">
import ManguitoPicture from '@/assets/img/profile/manguito_small.jpg'

const props = withDefaults(
  defineProps<{
    imageUrl: string
    imageAlt: string
  }>(),
  {
    imageUrl: ManguitoPicture,
  }
)
</script>

<template>
  <div class="flex flex-col items-center justify-center py-md">
    <img
      :src="imageUrl"
      :alt="imageAlt"
      class="aspect-square object-cover object-center w-40 rounded-full mb-md hover:motion-safe:animate-pulse"
    />
    <slot />
  </div>
</template>
