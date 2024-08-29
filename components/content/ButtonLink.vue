<script setup lang="ts">
import generateClass, { type ColorPalette } from '@bobbykim/manguito-theme'

const props = withDefaults(
  defineProps<{
    color?: ColorPalette
    url: string
  }>(),
  {
    color: 'secondary',
  }
)
</script>

<template>
  <a
    :href="url"
    target="_blank"
    class="btn btn-progress btn-round"
    :class="generateClass('BTNCOLOR', color)"
  >
    <slot />
  </a>
</template>

<style scoped></style>
