<script setup lang="ts">
import { useBlogStore } from '@/stores'
import { storeToRefs } from 'pinia'

const blogStore = useBlogStore()
const { currentContent } = storeToRefs(blogStore)
</script>

<template>
  <div class="mx-2xs md:mx-sm lg:mx-md">
    <ContentRenderer v-if="currentContent" :value="currentContent">
      <ContentRendererMarkdown
        :value="currentContent"
      ></ContentRendererMarkdown>
    </ContentRenderer>
  </div>
</template>

<style scoped></style>
