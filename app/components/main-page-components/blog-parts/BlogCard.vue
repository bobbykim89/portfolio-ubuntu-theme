<script setup lang="ts">
const props = defineProps<{
  title: string
  path: string
  category: string
  date: string
}>()

const emit = defineEmits<{
  (e: 'card-click', path: string): void
}>()

const handleCardClick = () => {
  const { path } = props
  emit('card-click', path)
}
</script>

<template>
  <div
    class="rounded-lg p-xs bg-dark-2 hover:bg-opacity-70 focus:bg-opacity-70 flex flex-col items-start w-full h-full cursor-pointer transition-colors duration-150 ease-linear"
    @click="handleCardClick"
  >
    <div
      class="bg-warning rounded-sm text-dark-2 text-xs font-bold py-3xs px-2xs mb-2xs"
    >
      {{ category }}
    </div>
    <div class="w-full">
      <h3 class="h3-md mb-2xs">{{ title }}</h3>
      <div class="text-light-4 text-sm mb-xs text-end mr-2xs">{{ date }}</div>
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
