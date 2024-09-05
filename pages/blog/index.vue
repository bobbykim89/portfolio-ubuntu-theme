<script setup lang="ts">
import BlogCard from '@/components/main-page-components/blog-parts/BlogCard.vue'
import BlogHomeHeader from '@/components/main-page-components/blog-parts/BlogHomeHeader.vue'
import { MclFormGroup, MclInputText } from '@bobbykim/mcl-forms'
import { computed, ref } from 'vue'

definePageMeta({
  layout: false,
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

const { data: posts } = await useAsyncData('blog-post-all', () =>
  queryContent('/blog').sort({ date: -1 }).find()
)

const handleCardClick = (path: string) => {
  const [ph, root, slug] = path.split('/')
  const newUrl = `/${root}/post/${slug}`
  router.push({ path: newUrl })
}

const filteredSearchQuery = computed(() => {
  if (searchQuery.value === '') {
    return posts.value
  }
  const searchTerm = new RegExp(searchQuery.value, 'gi')
  return posts.value?.filter((item) => {
    return item.title?.match(searchTerm) || item.description.match(searchTerm)
  })
})
</script>

<template>
  <NuxtLayout name="blog">
    <div class="relative">
      <div
        class="absolute top-0 -translate-y-1/2 inset-x-0 h-64 bg-warning"
      ></div>
      <div class="relative container">
        <BlogHomeHeader
          image-url="/content_img/about/manguito_small.jpg"
          :github-url="$config.public.gitHubUrl"
          :linkedin-url="$config.public.linkedinUrl"
          :email-address="$config.public.emailAddress"
        >
          <div class="text-center">
            <h2 class="mb-xs">Manguito Lovebird</h2>
            <p>Full-stack developer in Phoenix, AZ</p>
          </div>
        </BlogHomeHeader>
        <div class="relative mx-2xs md:mx-sm mb-md">
          <h3 class="h3-lg mb-sm">Blog Posts</h3>
          <div class="mb-sm bg-dark-2 rounded-lg p-xs">
            <MclFormGroup
              label-for="search-input"
              label="Search:"
              text-color="light-3"
            >
              <MclInputText
                id="search-input"
                :rounded="true"
                highlight-color="warning"
                v-model="searchQuery"
              ></MclInputText>
            </MclFormGroup>
          </div>
          <div
            :class="[
              'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6',
            ]"
          >
            <BlogCard
              v-for="(item, idx) in filteredSearchQuery"
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
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
