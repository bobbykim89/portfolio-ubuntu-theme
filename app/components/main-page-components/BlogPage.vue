<script setup lang="ts">
import { useAsyncData } from '#imports'
import type { ResizeDirection } from '#shared/types'
import ChevronRight from '@/assets/img/svg-files/pan-end-symbolic.svg'
import ChevronLeft from '@/assets/img/svg-files/pan-start-symbolic.svg'
import CloseSvgIcon from '@/assets/img/svg-files/window-close-symbolic.svg'
import MaximizeSvgIcon from '@/assets/img/svg-files/window-maximize-symbolic.svg'
import MinimizeSvgIcon from '@/assets/img/svg-files/window-minimize-symbolic.svg'
import RestoreSvgIcon from '@/assets/img/svg-files/window-restore-symbolic.svg'
import {
  onClickOutside,
  useBreakpoints,
  useDraggable,
  useEventListener,
  useWindowSize,
} from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useBlogStore } from '~/stores'
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
  },
)

const initialWidth = 768
const initialHeight = 650
const MAX_W_RATIO = 0.95
const MIN_W = 600
const MIN_H = 600

const emit = defineEmits<{
  (e: 'close-click'): void
  (e: 'set-active', active: boolean): void
}>()

const draggableRef = ref<HTMLDivElement>()
const dragHandle = ref<HTMLDivElement>()
const breakpoints = useBreakpoints({ mobile: 768 })
const isMobile = breakpoints.smaller('mobile')
const { width: windowWidth } = useWindowSize()

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
  queryCollection('blog').order('date', 'DESC').all(),
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

const { x, y } = useDraggable(draggableRef, {
  handle: dragHandle,
  initialValue: { x: props.initialX, y: props.initialY },
  disabled: isMobile,
})

// resizable
const width = ref(
  Math.min(initialWidth, Math.floor(windowWidth.value * MAX_W_RATIO)),
)
const height = ref(initialHeight)

const isResizing = ref(false)
const resizeDir = ref<ResizeDirection>('se')
const startPointer = ref({ x: 0, y: 0 })
const startSize = ref({ w: 0, h: 0 })
const startPos = ref({ x: 0, y: 0 })
const resizeDirection: ResizeDirection[] = ['se', 'sw', 'ne', 'nw']

const onResizeStart = (e: PointerEvent, dir: ResizeDirection) => {
  if (isMobile.value) return
  isResizing.value = true
  resizeDir.value = dir
  startPointer.value = { x: e.clientX, y: e.clientY }
  startSize.value = { w: width.value, h: height.value }
  startPos.value = { x: x.value, y: y.value }
  e.preventDefault()
  e.stopPropagation()
}

const windowStyle = computed(() => {
  if (isMaximized.value) return {}
  if (isMobile.value) return {}
  return {
    left: `${x.value}px`,
    top: `${y.value}px`,
    width: `${width.value}px`,
    height: `${height.value}px`,
  }
})

const containerClass = computed(() => {
  return [
    isActive.value ? 'z-10 border-dark-3' : 'z-0 border-dark-2',
    isMaximized.value ? 'block' : 'md:fixed',
    'md:rounded-lg overflow-hidden border-2 drop-shadow-md',
  ]
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

useEventListener('pointermove', (e: PointerEvent) => {
  if (!isResizing.value || isMobile.value) return

  const maxW = Math.floor(windowWidth.value * MAX_W_RATIO)
  const dx = e.clientX - startPointer.value.x
  const dy = e.clientY - startPointer.value.y

  // width
  if (resizeDir.value.includes('e')) {
    width.value = Math.min(maxW, Math.max(MIN_W, startSize.value.w + dx))
  } else if (resizeDir.value.includes('w')) {
    const newW = Math.min(maxW, Math.max(MIN_W, startSize.value.w - dx))
    x.value = startPos.value.x + (startSize.value.w - newW)
    width.value = newW
  }

  // height
  if (resizeDir.value.includes('s')) {
    height.value = Math.max(MIN_H, startSize.value.h + dy)
  } else if (resizeDir.value.includes('n')) {
    const newH = Math.max(MIN_H, startSize.value.h - dy)
    y.value = startPos.value.y + (startSize.value.h - newH)
    height.value = newH
  }
})

useEventListener('pointerup', () => {
  isResizing.value = false
})

watch(
  () => [props.initialX, props.initialY],
  ([newX, newY]) => {
    x.value = newX!
    y.value = newY!
  },
)

watch(windowWidth, (newW) => {
  const maxW = Math.floor(newW * MAX_W_RATIO)
  if (width.value > maxW) {
    width.value = maxW
  }
})
</script>

<template>
  <div
    v-if="isVisible"
    ref="draggableRef"
    :style="windowStyle"
    :class="[containerClass, 'flex flex-col']"
    @click="onBlogClick"
  >
    <!-- title bar -->
    <div
      ref="dragHandle"
      :class="[
        isActive ? 'bg-dark-3' : 'bg-dark-2',
        'flex-none grid grid-cols-2 xl:grid-cols-3 text-light-1 px-2xs py-3xs transition-colors duration-150 ease-linear',
      ]"
    >
      <p class="xl:col-start-2 xl:place-self-center cursor-default select-none">
        FireFox
      </p>
      <!-- minimize/maximize/close buttons -->
      <div class="flex gap-2 items-center justify-self-end" @click.stop>
        <button
          class="rounded-full p-0.5 bg-dark-2"
          @click="minimizeBlog"
          aria-label="minimize"
        >
          <MinimizeSvgIcon
            class="aspect-square w-3.5"
            :fontControlled="false"
          />
        </button>
        <button
          class="rounded-full p-0.5 bg-dark-2"
          aria-label="maximize/restore-default"
          @click="blogStore.setBlogMaximize"
        >
          <RestoreSvgIcon
            v-if="isMaximized"
            class="aspect-square w-3.5"
            :fontControlled="false"
          />
          <MaximizeSvgIcon
            v-else
            class="aspect-square w-3.5"
            :fontControlled="false"
          />
        </button>
        <button
          class="rounded-full p-0.5 bg-dark-2"
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
              'px-3xs py-1.25 rounded-l-md border-2 border-dark-4 h-full',
            ]"
            :disabled="isRootDir"
            @click="blogStore.onPrevClick"
            aria-label="Previous"
          >
            <ChevronLeft class="h-4.5" :fontControlled="false" />
          </button>
          <!-- next button -->
          <button
            :class="[
              currentPathIdx > 1 ? 'bg-dark-2' : 'bg-dark-3',
              'px-3xs py-1.25 rounded-r-md h-full border-y-2 border-r-2 border-dark-4',
            ]"
            :disabled="currentPathIdx <= 1"
            @click="blogStore.onNextClick"
            aria-label="Next"
          >
            <ChevronRight class="h-4.5" :fontControlled="false" />
          </button>
        </div>
        <div
          class="grow flex gap-2 justify-start items-center border-2 border-dark-4 h-md px-2xs py-0.5 bg-dark-2 rounded-md"
        >
          <p class="text-sm">{{ currentPath }}</p>
        </div>
      </div>
    </div>
    <!-- content section -->
    <div
      :class="[
        isMaximized ? 'md:h-[calc(100vh-97px)]' : 'flex-1',
        'min-h-0 bg-dark-3 text-light-1 pt-3xs pb-lg md:pb-3xs relative overflow-y-auto',
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
    <!-- resize handles (desktop only) -->
    <template v-if="!isMobile && !isMaximized">
      <div
        v-for="dir in resizeDirection"
        :key="dir"
        :class="[
          'absolute w-3 h-3 z-20',
          dir === 'se' ? 'bottom-0 right-0 cursor-se-resize' : '',
          dir === 'sw' ? 'bottom-0 left-0 cursor-sw-resize' : '',
          dir === 'ne' ? 'top-0 right-0 cursor-ne-resize' : '',
          dir === 'nw' ? 'top-0 left-0 cursor-nw-resize' : '',
        ]"
        @pointerdown="(e) => onResizeStart(e, dir)"
      />
    </template>
  </div>
</template>

<style scoped></style>
