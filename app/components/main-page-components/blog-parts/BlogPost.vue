<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBlogStore } from '~/stores'

const blogStore = useBlogStore()
const { currentContent } = storeToRefs(blogStore)
</script>

<template>
  <div class="mx-2xs md:mx-sm lg:mx-md markdown-body">
    <ContentRenderer v-if="currentContent" :value="currentContent">
    </ContentRenderer>
  </div>
</template>
