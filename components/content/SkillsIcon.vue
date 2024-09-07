<script setup lang="ts">
import { SkillType } from '@/types'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    type: SkillType
  }>(),
  {
    type: 'nodejs',
  }
)

const iconSrc = computed<string>(() => {
  return new URL(
    `../../assets/img/skills-icons/${props.type}.png`,
    import.meta.url
  ).href
})
</script>

<template>
  <button
    class="flex flex-col items-center w-24 justify-center gap-1 py-3xs rounded-lg focus:bg-dark-1 transition-colors duration-150 ease-linear"
  >
    <img :src="iconSrc" :alt="type" class="h-lg" />
    <p class="text-dark-3 text-sm text-wrap capitalize">{{ type }}</p>
  </button>
</template>

<style scoped></style>
