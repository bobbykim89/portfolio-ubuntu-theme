<script setup lang="ts"></script>

<template>
  <div class="bg-dark-2 px-xs py-sm rounded-lg my-md">
    <slot />
  </div>
</template>

<style scoped lang="scss">
:deep(code) {
  @media screen and (max-width: 768px) {
    white-space: pre-line;
    overflow-wrap: break-word;
  }
}
</style>
