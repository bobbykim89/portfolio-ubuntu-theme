<script setup lang="ts">
definePageMeta({
  layout: 'normal',
  pageTransition: false,
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
