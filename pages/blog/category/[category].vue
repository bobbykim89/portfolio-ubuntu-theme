<script setup lang="ts">
import ChevronLeft from '@/assets/img/svg-files/pan-start-symbolic.svg'
import BlogCard from '@/components/main-page-components/blog-parts/BlogCard.vue'

definePageMeta({
  layout: 'blog',
  layoutTransition: { name: 'blog', mode: 'out-in' },
  pageTransition: { name: 'blog', mode: 'out-in' },
})

const route = useRoute()
const config = useRuntimeConfig()
const url = useRequestURL()

useHead({
  title: `${config.public.siteName} | Blog - ${route.params.category}`,
  meta: [
    {
      property: 'og:title',
      content: `${config.public.siteName} | Blog - ${route.params.category}`,
    },
    { property: 'og:url', content: url.href },
    { property: 'twitter:domain', content: url.host },
    { property: 'twitter:url', content: url.href },
    {
      name: 'twitter:title',
      content: `${config.public.siteName} | Blog - ${route.params.category}`,
    },
  ],
})

const router = useRouter()

const { data: posts } = await useAsyncData('blog-post-all', () =>
  queryContent('/blog')
    .where({ category: route.params.category })
    .sort({ date: -1 })
    .find()
)

const formatDate = (date: string): string => {
  const postDate = new Date(date)
  const year = postDate.getFullYear().toString()
  let month = (postDate.getMonth() + 1).toString()
  let day = postDate.getDate().toString()
  if (parseInt(month, 10) < 10) {
    month = '0' + month
  }
  if (parseInt(day, 10) < 10) {
    day = '0' + day
  }
  return `${month}-${day}-${year}`
}

const handleCardClick = (path: string) => {
  const slug = path.split('/').pop()
  router.push({ path: `/blog/post/${slug}` })
}
</script>

<template>
  <div class="mx-2xs md:mx-sm mb-md">
    <div class="w-full flex justify-between items-center mb-sm">
      <h3 class="h3-lg">Blog Posts</h3>
      <NuxtLink
        to="/blog"
        class="btn btn-dark-2 rounded-lg ring-offset-dark-3 flex items-center gap-2"
      >
        <ChevronLeft class="text-xl font-bold !mb-0" />
        <span>Back to blog home</span>
      </NuxtLink>
    </div>

    <div
      :class="[
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 pb-md',
      ]"
    >
      <BlogCard
        v-for="(item, idx) in posts"
        :key="idx"
        :title="item.title!"
        :path="item._path!"
        :category="item.category"
        :date="formatDate(item.date)"
        @card-click="handleCardClick"
      >
        <div class="text-sm">{{ item.description }}</div>
      </BlogCard>
    </div>
  </div>
</template>

<style scoped></style>
