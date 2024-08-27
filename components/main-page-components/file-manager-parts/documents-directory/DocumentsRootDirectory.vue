<script setup lang="ts">
import Folder from '../Folder.vue'

type RootDirectoryFildersMap = {
  text: string
}

const folders: RootDirectoryFildersMap[] = [
  {
    text: 'About',
  },
  {
    text: 'Projects',
  },
  {
    text: 'Skills',
  },
]
</script>

<template>
  <div class="p-xs flex flex-wrap gap-[10px] items-start">
    <Folder v-for="(item, idx) in folders" :key="idx" :text="item.text" />
  </div>
</template>

<style scoped></style>
