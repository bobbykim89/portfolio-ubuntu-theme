<script setup lang="ts">
import ChevronLeft from '@/assets/img/svg-files/pan-start-symbolic.svg'

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

useHead({
  title: `Manguito OS | ${post.value?.title}`,
  meta: [
    { name: 'description', content: 'Blog page' },
    { property: 'og:title', content: `Manguito OS | ${post.value?.title}` },
  ],
})
</script>

<template>
  <div class="container pb-md px-xs md:px-md lg:px-lg">
    <ContentRenderer v-if="post" :value="post">
      <ContentRendererMarkdown :value="post"></ContentRendererMarkdown>
    </ContentRenderer>
    <div class="flex justify-start items-center">
      <NuxtLink
        to="/blog"
        class="btn btn-dark-2 rounded-lg ring-offset-dark-3 flex items-center gap-2"
      >
        <ChevronLeft class="text-xl font-bold !mb-0" />
        <span>Back to blog home</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
