<script setup lang="ts">
const props = defineProps<{
  uid: string
  thumb: string
  text: string
}>()
const emit = defineEmits<{
  (e: 'picture-click', id: string): void
}>()

const onFolderClick = () => {
  emit('picture-click', props.uid)
}
</script>

<template>
  <button
    class="flex flex-col items-center w-24 justify-center gap-1 py-3xs rounded-lg focus:bg-dark-4 transition-colors duration-150 ease-linear"
    @click="onFolderClick"
  >
    <img
      :src="thumb"
      alt="a thumbnail of an image file"
      class="h-lg aspect-square object-cover rounded-md select-none"
    />
    <p class="text-light-1 text-sm text-wrap select-none">{{ text }}</p>
  </button>
</template>

<style scoped></style>
