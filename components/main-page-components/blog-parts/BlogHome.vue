<script setup lang="ts">
import { useBlogStore } from '@/stores'
import { MclFormGroup, MclInputText } from '@bobbykim/mcl-forms'
import { ParsedContent } from '@nuxt/content'
import { storeToRefs } from 'pinia'
import BlogCard from './BlogCard.vue'
import BlogHomeHeader from './BlogHomeHeader.vue'

defineProps<{
  posts: ParsedContent[]
  maximized: boolean
}>()

const blogStore = useBlogStore()
const { searchQuery } = storeToRefs(blogStore)

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
</script>

<template>
  <div class="relative">
    <div
      class="absolute top-0 -translate-y-1/2 inset-x-0 h-64 bg-warning"
    ></div>
    <BlogHomeHeader
      image-url="/content_img/about/manguito_small.jpg"
      :github-url="$config.public.gitHubUrl"
      :linkedin-url="$config.public.linkedinUrl"
      :email-address="$config.public.emailAddress"
    >
      <div class="text-center">
        <h2 class="mb-xs">{{ $config.public.userName }}</h2>
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
          maximized
            ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'lg:grid-cols-2',
          'grid grid-cols-1  gap-6',
        ]"
      >
        <BlogCard
          v-for="(item, idx) in posts"
          :key="idx"
          :title="item.title!"
          :path="item._path!"
          :category="item.category"
          :date="formatDate(item.date)"
          @card-click="blogStore.setCurrentPath"
        >
          <div class="text-sm">{{ item.description }}</div>
        </BlogCard>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
