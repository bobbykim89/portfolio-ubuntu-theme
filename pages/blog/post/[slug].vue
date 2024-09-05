<script setup lang="ts">
definePageMeta({
  layout: 'normal',
  layoutTransition: { name: 'blog', mode: 'out-in' },
  pageTransition: { name: 'blog', mode: 'out-in' },
})

const route = useRoute()

const { data: post } = await useAsyncData('post-data', () =>
  queryContent()
    .where({ _path: `/blog/${route.params.slug}` })
    .findOne()
)
</script>

<template>
  <div class="container -mb-md pb-md px-xs md:px-md lg:px-lg">
    <ContentRenderer v-if="post" :value="post">
      <ContentRendererMarkdown :value="post"></ContentRendererMarkdown>
    </ContentRenderer>
  </div>
</template>

<style scoped></style>
