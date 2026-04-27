<script setup lang="ts">
import generateClass, { type ColorPalette } from '@bobbykim/manguito-theme'

const props = withDefaults(
  defineProps<{
    color?: ColorPalette
  }>(),
  {
    color: 'warning',
  }
)

const setBgColor = computed(() => generateClass('BGCOLOR', props.color))
</script>

<template>
  <div class="pl-md md:pl-lg my-md">
    <div class="py-3xs w-lg mb-xs" :class="setBgColor"></div>
    <slot />
    <div class="py-3xs w-lg mt-xs" :class="setBgColor"></div>
  </div>
</template>
