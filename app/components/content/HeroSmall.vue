<script setup lang="ts">
import { type ColorPalette } from '@bobbykim/manguito-theme'
import { computed } from 'vue'

type ColorPaletteMap = {
  [K in ColorPalette]: string
}

const props = withDefaults(
  defineProps<{
    color?: ColorPalette
  }>(),
  {
    color: 'warning',
  }
)

const gradientClass: ColorPaletteMap = {
  primary: 'from-primary',
  secondary: 'from-secondary',
  success: 'from-success',
  info: 'from-info',
  warning: 'from-warning',
  danger: 'from-danger',
  'light-1': 'from-light-1',
  'light-2': 'from-light-2',
  'light-3': 'from-light-3',
  'light-4': 'from-light-4',
  'dark-1': 'from-dark-1',
  'dark-2': 'from-dark-2',
  'dark-3': 'from-dark-3',
  'dark-4': 'from-dark-4',
  black: 'from-black',
  white: 'from-white',
  transparent: 'from-transparent',
}

const getGradientColor = computed<string>(() => gradientClass[props.color])
</script>

<template>
  <div
    class="bg-gradient-to-r from-30% to-transparent mb-md px-2xs py-2xs"
    :class="getGradientColor"
  >
    <slot />
  </div>
</template>

<style scoped></style>
