<script setup lang="ts">
import BlogCard from '@/components/main-page-components/blog-parts/BlogCard.vue'
import { MclFormGroup, MclInputText } from '@bobbykim/mcl-forms'
import { computed, ref } from 'vue'

definePageMeta({
  layout: 'blog',
  layoutTransition: { name: 'blog', mode: 'out-in' },
  pageTransition: { name: 'blog', mode: 'out-in' },
})

useHead({
  title: 'Mango Planner | Blog',
  meta: [
    { name: 'description', content: 'Blog page' },
    { property: 'og:title', content: 'Manguito OS | Blog' },
  ],
})

const router = useRouter()
const searchQuery = ref<string>('')

const { data: posts } = await useAsyncData('blog-post-all', () =>
  queryContent('/blog').sort({ date: -1 }).find()
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

const filteredPosts = computed(() => {
  if (searchQuery.value === '') {
    return posts.value
  }
  const searchTerm = new RegExp(searchQuery.value, 'gi')
  return posts.value?.filter((item) => {
    return item.title?.match(searchTerm) || item.description.match(searchTerm)
  })
})

const filterCategory = computed(() => {
  const categoryList = posts.value?.map((item) => item.category as string)
  return [...new Set(categoryList)]
})

const handleCardClick = (path: string) => {
  const slug = path.split('/').pop()
  router.push({ path: `/blog/post/${slug}` })
}
</script>

<template>
  <div class="relative mx-2xs md:mx-sm mb-md">
    <h3 class="h3-lg mb-sm">Blog Posts</h3>

    <div
      :class="[
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6 pb-md',
      ]"
    >
      <div class="md:col-span-2 lg:col-span-1 bg-dark-2 rounded-lg p-xs h-full">
        <MclFormGroup
          label-for="search-input"
          text-color="light-3"
          class="mb-xs"
        >
          <template #label>
            <h3 class="h3-md mb-2xs">Search:</h3>
          </template>
          <MclInputText
            id="search-input"
            :rounded="true"
            highlight-color="warning"
            v-model="searchQuery"
          ></MclInputText>
        </MclFormGroup>
        <div class="flex flex-col items-start">
          <h3 class="h3-md mb-2xs">Categories:</h3>
          <ul
            class="mcl-list mcl-list-warning flex lg:flex-col gap-8 lg:gap-2 items-start pl-2xs"
          >
            <li v-for="(item, idx) in filterCategory" :key="idx" class="!mb-0">
              <NuxtLink :to="`/blog/category/${item}`">
                <span class="text-md font-bold tracking-wider">{{ item }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="md:col-span-2 xl:col-span-3 grid md:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <BlogCard
          v-for="(item, idx) in filteredPosts"
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
  </div>
</template>

<style scoped></style>
