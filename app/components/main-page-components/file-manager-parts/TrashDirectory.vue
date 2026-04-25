<script setup lang="ts">
import TrashSvgIcon from '@/assets/img/svg-files/edit-delete-symbolic.svg'
</script>

<template>
  <div class="absolute inset-0">
    <div class="relative h-full w-full">
      <div
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-dark-1 flex flex-col items-center justify-center"
      >
        <TrashSvgIcon
          class="aspect-square w-24 mb-xs"
          :fontControlled="false"
        />
        <p class="text-center">Trash is empty..</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
