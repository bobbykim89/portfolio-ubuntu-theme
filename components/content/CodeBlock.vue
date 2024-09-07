<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: string
    path?: string
  }>(),
  {
    type: '',
    path: '',
  }
)
</script>

<template>
  <div class="bg-dark-2 px-xs pt-2xs pb-sm rounded-lg my-md">
    <div class="flex flex-wrap justify-between items-center text-light-4 mb-xs">
      <span>{{ path }}</span>
      <span>{{ type }}</span>
    </div>
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
