<script setup lang="ts">
import generateClass, { type ColorPalette } from '@bobbykim/manguito-theme'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    bgColor?: ColorPalette
    displayBorder?: boolean
    borderColor?: ColorPalette
    rounded?: boolean
    title: string
  }>(),
  {
    bgColor: 'dark-2',
    displayBorder: false,
    borderColor: 'warning',
    rounded: true,
  }
)

const styleClass = computed(() => {
  const { bgColor, displayBorder, borderColor, rounded } = props

  const classArray: string[] = [
    generateClass('BGCOLOR', bgColor),
    generateClass('BORDER', borderColor),
  ]

  displayBorder
    ? classArray.push('border-2')
    : rounded
    ? classArray.push('rounded-md')
    : ''

  return classArray.join(' ')
})
</script>

<template>
  <div :class="[styleClass, 'overflow-hidden py-2xs px-xs mb-md']">
    <div
      class="border-b-2 py-3xs mb-xs"
      :class="generateClass('BORDER', borderColor)"
    >
      <h3 class="h3-md">{{ title }}</h3>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
