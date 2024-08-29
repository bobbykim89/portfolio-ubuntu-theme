<script setup lang="ts">
import { SkillType } from '@/types'
import SkillIcon from './SkillsIcon.vue'

const props = defineProps<{
  icons: SkillType[]
}>()
</script>

<template>
  <div
    class="bg-light-3 p-xs mb-md rounded-lg grid grid-cols-2 md:grid-cols-3 justify-items-center gap-3"
  >
    <SkillIcon v-for="(item, idx) in icons" :key="idx" :type="item" />
  </div>
</template>
