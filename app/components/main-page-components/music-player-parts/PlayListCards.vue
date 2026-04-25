<script setup lang="ts">
const props = defineProps<{
  imgSrc: string
  title: string
  trackNumber: number
  activeTrackNumber: number
}>()

const emit = defineEmits<{
  (e: 'card-click', trackNumber: number): void
}>()

const handleCardClick = () => {
  emit('card-click', props.trackNumber)
}
</script>

<template>
  <div
    :class="[
      activeTrackNumber === trackNumber ? 'bg-dark-3' : 'bg-dark-2',
      'cursor-pointer first:rounded-t-lg last:rounded-b-lg mb-3xs last:mb-0 flex items-center gap-2 focus:bg-opacity-75 transition-colors duration-150 ease-linear px-2xs py-[6px]',
    ]"
    @click="handleCardClick"
  >
    <img
      :src="imgSrc"
      :alt="`${title}'s cover image'`"
      class="w-lg aspect-square rounded-md"
    />
    <p>{{ title }}</p>
  </div>
</template>

<style scoped></style>
