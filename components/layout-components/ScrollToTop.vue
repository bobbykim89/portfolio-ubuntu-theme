<script setup lang="ts">
const emit = defineEmits<{
  (e: 'scroll-click', event: Event): void
}>()

const handleScrollToTopClick = (e: Event) => {
  emit('scroll-click', e)
}
</script>

<template>
  <div
    class="fixed bottom-0 right-0 mr-xs mb-xs bg-dark-4 rounded-md drop-shadow-md border border-dark-1"
  >
    <button
      class="p-2xs text-light-1 hover:opacity-65 transition-opacity duration-200 ease-linear"
      @click="handleScrollToTopClick"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        class="h-xs"
      >
        <!-- !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
        <path
          d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped></style>
