<script setup lang="ts">
import generateClass, { type ColorPalette } from '@bobbykim/manguito-theme'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    color?: ColorPalette
    url: string
  }>(),
  {
    color: 'warning',
  }
)

const getBtnColor = computed(() => generateClass('BTNCOLOR', props.color))
</script>

<template>
  <a
    :href="url"
    target="_blank"
    class="btn btn-progress btn-round"
    :class="getBtnColor"
    aria-label="button link"
  >
    <slot />
  </a>
</template>
