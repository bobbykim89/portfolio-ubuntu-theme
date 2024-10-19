<script setup lang="ts">
import { queryContent, useAsyncData } from '#imports'
import ChevronRight from '@/assets/img/svg-files/pan-end-symbolic.svg'
import ChevronLeft from '@/assets/img/svg-files/pan-start-symbolic.svg'
import CloseSvgIcon from '@/assets/img/svg-files/window-close-symbolic.svg'
import MaximizeSvgIcon from '@/assets/img/svg-files/window-maximize-symbolic.svg'
import MinimizeSvgIcon from '@/assets/img/svg-files/window-minimize-symbolic.svg'
import RestoreSvgIcon from '@/assets/img/svg-files/window-restore-symbolic.svg'
import { useBlogStore } from '@/stores'
import { onClickOutside, useDraggable } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import BlogHome from './blog-parts/BlogHome.vue'
import BlogPost from './blog-parts/BlogPost.vue'

const props = withDefaults(
  defineProps<{
    initialX: number
    initialY: number
  }>(),
  {
    initialX: 80,
    initialY: 40,
  }
)

const emit = defineEmits<{
  (e: 'close-click'): void
  (e: 'set-active', active: boolean): void
}>()

const draggableRef = ref<HTMLDivElement>()
const dragHandle = ref<HTMLDivElement>()
const blogStore = useBlogStore()
const {
  isActive,
  isMaximized,
  isRootDir,
  isVisible,
  currentPath,
  currentPathIdx,
  searchQuery,
} = storeToRefs(blogStore)

const { data: posts } = await useAsyncData('posts', () =>
  queryContent('/blog').sort({ date: -1 }).find()
)

const filteredSearchQuery = computed(() => {
  if (searchQuery.value === '') {
    return posts.value
  }
  const searchTerm = new RegExp(searchQuery.value, 'gi')
  return posts.value?.filter((item) => {
    return item.title?.match(searchTerm) || item.description.match(searchTerm)
  })
})

const { style } = useDraggable(draggableRef, {
  handle: dragHandle,
  initialValue: { x: props.initialX, y: props.initialY },
})

const closeBlog = () => {
  blogStore.closeBlog()
  emit('close-click')
}
const minimizeBlog = () => {
  blogStore.minimizeBlog()
  emit('set-active', false)
}
const onBlogClick = () => {
  blogStore.setBlogActive(true)
  emit('set-active', true)
}

onClickOutside(draggableRef, () => {
  blogStore.setBlogActive(false)
  emit('set-active', false)
})
</script>

<template>
  <div
    v-if="isVisible"
    ref="draggableRef"
    :style="style"
    :class="[
      isActive ? 'z-10 border-dark-3' : 'z-0 border-dark-2',
      isMaximized ? '' : 'md:fixed md:w-2/3 lg:w-2/3 xl:w-1/2 2xl:w-2/5',
      'md:rounded-lg overflow-hidden w-full border-2 drop-shadow-md',
    ]"
    @click="onBlogClick"
  >
    <div
      ref="dragHandle"
      :class="[
        isActive ? 'bg-dark-3' : 'bg-dark-2',
        'grid grid-cols-2 xl:grid-cols-3 text-light-1 px-2xs py-3xs transition-colors duration-150 ease-linear',
      ]"
    >
      <p class="xl:col-start-2 xl:place-self-center cursor-default select-none">
        FireFox
      </p>
      <!-- minimize/maximize/close buttons -->
      <div class="flex gap-2 items-center justify-self-end" @click.stop>
        <button
          class="rounded-full p-[2px] bg-dark-2"
          @click="minimizeBlog"
          aria-label="minimize"
        >
          <MinimizeSvgIcon
            class="aspect-square w-[14px]"
            :fontControlled="false"
          />
        </button>
        <button
          class="rounded-full p-[2px] bg-dark-2"
          aria-label="maximize/restore-default"
          @click="blogStore.setBlogMaximize"
        >
          <RestoreSvgIcon
            v-if="isMaximized"
            class="aspect-square w-[14px]"
            :fontControlled="false"
          />
          <MaximizeSvgIcon
            v-else
            class="aspect-square w-[14px]"
            :fontControlled="false"
          />
        </button>
        <button
          class="rounded-full p-[2px] bg-dark-2"
          @click="closeBlog"
          aria-label="close"
        >
          <CloseSvgIcon class="aspect-square w-xs" :fontControlled="false" />
        </button>
      </div>
      <!-- second row -->
      <div class="col-span-2 xl:col-span-3 flex items-center gap-2">
        <div>
          <!-- prev button -->
          <button
            :class="[
              isRootDir ? 'bg-dark-3' : 'bg-dark-2',
              'px-3xs py-[5px] rounded-l-md border-2 border-dark-4 h-full',
            ]"
            :disabled="isRootDir"
            @click="blogStore.onPrevClick"
            aria-label="Previous"
          >
            <ChevronLeft class="h-[18px]" :fontControlled="false" />
          </button>
          <!-- next button -->
          <button
            :class="[
              currentPathIdx > 1 ? 'bg-dark-2' : 'bg-dark-3',
              'px-3xs py-[5px] rounded-r-md h-full border-y-2 border-r-2 border-dark-4',
            ]"
            :disabled="currentPathIdx <= 1"
            @click="blogStore.onNextClick"
            aria-label="Next"
          >
            <ChevronRight class="h-[18px]" :fontControlled="false" />
          </button>
        </div>
        <div
          class="grow flex gap-2 justify-start items-center border-2 border-dark-4 h-md px-2xs py-[2px] bg-dark-2 rounded-md"
        >
          <p class="text-sm">{{ currentPath }}</p>
        </div>
      </div>
    </div>
    <!-- content section -->
    <div
      :class="[
        isMaximized ? 'md:h-[calc(100vh-97px)]' : 'md:h-[80vh]',
        'bg-dark-3 h-full w-full text-light-1 pt-3xs pb-lg md:pb-3xs relative overflow-y-auto',
      ]"
    >
      <!-- folders section -->
      <BlogHome
        v-if="currentPath === '/blog'"
        :posts="filteredSearchQuery!"
        :maximized="isMaximized"
      />
      <BlogPost v-else />
    </div>
  </div>
</template>

<style scoped></style>
