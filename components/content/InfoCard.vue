<script setup lang="ts">
import ManguitoPicture from '@/assets/img/profile/manguito_small.jpg'
</script>

<template>
  <div class="flex flex-col items-center justify-center py-md">
    <img
      :src="ManguitoPicture"
      alt="a cute bird perching on tree"
      class="aspect-square object-cover object-center w-40 rounded-full mb-md"
    />
    <slot />
  </div>
</template>

<style scoped></style>
