<script setup lang="ts">
import { ParsedContent } from '@nuxt/content'

const props = defineProps<{
  posts: ParsedContent[]
}>()
</script>

<template>
  <div>
    <h2>Blog Home</h2>
    <div v-for="(item, idx) in posts" :key="idx">
      <h2>{{ item.title }}</h2>
      <p>{{ item.description }}</p>
      <p>{{ item.path }}</p>
    </div>
  </div>
</template>

<style scoped></style>
