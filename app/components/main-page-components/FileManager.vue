<script setup lang="ts">
import type { DirectoryMap, ResizeDirection } from '#shared/types'
import TrashSvgIcon from '@/assets/img/svg-files/edit-delete-symbolic.svg'
import DocumentSvgIcon from '@/assets/img/svg-files/folder-documents-symbolic.svg'
import MusicSvgIcon from '@/assets/img/svg-files/folder-music-symbolic.svg'
import PicturesSvgIcon from '@/assets/img/svg-files/folder-pictures-symbolic.svg'
import HomeSvgIcon from '@/assets/img/svg-files/go-home-symbolic.svg'
import ChevronRight from '@/assets/img/svg-files/pan-end-symbolic.svg'
import ChevronLeft from '@/assets/img/svg-files/pan-start-symbolic.svg'
import CloseSvgIcon from '@/assets/img/svg-files/window-close-symbolic.svg'
import MaximizeSvgIcon from '@/assets/img/svg-files/window-maximize-symbolic.svg'
import MinimizeSvgIcon from '@/assets/img/svg-files/window-minimize-symbolic.svg'
import RestoreSvgIcon from '@/assets/img/svg-files/window-restore-symbolic.svg'
import { PagesCollectionItem } from '@nuxt/content'
import {
  onClickOutside,
  useBreakpoints,
  useDraggable,
  useEventListener,
  useWindowSize,
} from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useFileManagerStore } from '~/stores'
import DocumentsRootDirectory from './file-manager-parts/documents-directory/DocumentsRootDirectory.vue'
import DocumentsSubDirectory from './file-manager-parts/documents-directory/DocumentsSubDirectory.vue'
import FileManagerLeftSection from './file-manager-parts/FileManagerLeftSection.vue'
import HomeDirectory from './file-manager-parts/HomeDirectory.vue'
import MusicDirectory from './file-manager-parts/MusicDirectory.vue'
import PicturesDirectory from './file-manager-parts/PicturesDirectory.vue'
import TrashDirectory from './file-manager-parts/TrashDirectory.vue'

const fileManagerDirectory: DirectoryMap = {
  home: {
    name: 'Home',
    icon: HomeSvgIcon,
  },
  documents: {
    name: 'Documents',
    icon: DocumentSvgIcon,
  },
  'documents/about': {
    name: 'Documents / About',
    icon: DocumentSvgIcon,
  },
  'documents/projects': {
    name: 'Documents / Projects',
    icon: DocumentSvgIcon,
  },
  'documents/skills': {
    name: 'Documents / Skills',
    icon: DocumentSvgIcon,
  },
  music: {
    name: 'Music',
    icon: MusicSvgIcon,
  },
  pictures: {
    name: 'Pictures',
    icon: PicturesSvgIcon,
  },
  trash: {
    name: 'Trash',
    icon: TrashSvgIcon,
  },
}

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

const emit = defineEmits<{
  (e: 'close-click'): void
  (e: 'set-active', active: boolean): void
}>()

const initialWidth = 720
const initialHeight = 360
const MAX_W_RATIO = 0.95
const MIN_W = 512
const MIN_H = 360

const draggableRef = ref<HTMLDivElement>()
const dragHandle = ref<HTMLDivElement>()
const subDirectoryPath = ref<string[]>([
  'documents/about',
  'documents/projects',
  'documents/skills',
])
const breakpoints = useBreakpoints({ mobile: 768 })
const isMobile = breakpoints.smaller('mobile')
const { width: windowWidth } = useWindowSize()

const fileManagerStore = useFileManagerStore()
const {
  currentSection,
  isActive,
  isMaximized,
  isRootDir,
  isVisible,
  currentLocationIdx,
} = storeToRefs(fileManagerStore)

const { style, x, y } = useDraggable(draggableRef, {
  handle: dragHandle,
  initialValue: { x: props.initialX, y: props.initialY },
  disabled: isMobile,
})

const { data: files } = await useAsyncData(
  currentSection.value,
  async () => {
    let res: PagesCollectionItem[] = []
    if (subDirectoryPath.value.includes(currentSection.value)) {
      res = await queryCollection('pages')
        .where('path', 'LIKE', `/${currentSection.value}%`)
        .order('order', 'ASC')
        .all()
      // res = await queryContent(currentSection.value).sort({ order: 1 }).find()
      console.log(res)
    }
    return res
  },
  {
    watch: [currentSection],
  },
)

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

const closeFileManager = () => {
  fileManagerStore.closeFileManager()
  emit('close-click')
}
const minimizeFileManager = () => {
  fileManagerStore.minimizeFileManager()
  emit('set-active', false)
}
const onFileManagerClick = () => {
  fileManagerStore.setFileManagerActive(true)
  emit('set-active', true)
}

onClickOutside(draggableRef, () => {
  fileManagerStore.setFileManagerActive(false)
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

const containerClass = computed(() => {
  return [
    isActive.value ? 'z-10 border-dark-3' : 'z-0 border-dark-2',
    isMaximized.value ? 'absolute inset-0' : 'md:fixed',
    'md:rounded-lg overflow-hidden border-2 drop-shadow-md flex flex-col',
  ]
})
</script>

<template>
  <div
    v-if="isVisible"
    ref="draggableRef"
    :style="windowStyle"
    :class="[containerClass]"
    @click="onFileManagerClick"
  >
    <!-- title bar -->
    <div
      ref="dragHandle"
      :class="[
        isActive ? 'bg-dark-3' : 'bg-dark-2',
        isMobile ? 'cursor-default' : 'cursor-grab active:cursor-grabbing',
        'flex flex-wrap items-center gap-2 text-light-1 px-2xs py-3xs transition-colors duration-150 ease-linear ',
      ]"
    >
      <div class="order-4 md:order-1">
        <!-- prev button -->
        <button
          :class="[
            isRootDir ? 'bg-dark-3' : 'bg-dark-2',
            'px-3xs py-1.25 rounded-l-md border-2 border-dark-4 h-full',
          ]"
          :disabled="isRootDir"
          @click="fileManagerStore.onPrevClick"
          aria-label="previous"
        >
          <ChevronLeft class="h-4.5" :fontControlled="false" />
        </button>
        <!-- next button -->
        <button
          :class="[
            currentLocationIdx > 1 ? 'bg-dark-2' : 'bg-dark-3',
            'px-3xs py-1.25 rounded-r-md h-full border-y-2 border-r-2 border-dark-4',
          ]"
          :disabled="currentLocationIdx <= 1"
          @click="fileManagerStore.onNextClick"
          aria-label="next"
        >
          <ChevronRight class="h-4.5" :fontControlled="false" />
        </button>
      </div>
      <div
        class="order-5 md:order-2 grow flex gap-2 justify-start items-center border-2 border-dark-4 h-md md:mr-3xl px-3xs py-0.5 bg-dark-2 rounded-md"
      >
        <component
          :is="fileManagerDirectory[currentSection].icon"
          class="text-sm"
        />
        <p class="text-sm">{{ fileManagerDirectory[currentSection].name }}</p>
      </div>
      <!-- minimize/maximize/close buttons -->
      <div
        class="w-full md:w-fit order-3 flex gap-2 justify-end items-center justify-self-end ml-auto"
        @click.stop
      >
        <button
          class="rounded-full p-0.5 bg-dark-2"
          @click="minimizeFileManager"
          aria-label="minimize"
        >
          <MinimizeSvgIcon
            class="aspect-square w-3.5"
            :fontControlled="false"
          />
        </button>
        <button
          class="rounded-full p-0.5 bg-dark-2"
          @click="fileManagerStore.setFileManagerMaximize"
          aria-label="maximize/restore-default"
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
          @click="closeFileManager"
          aria-label="close"
        >
          <CloseSvgIcon class="aspect-square w-xs" :fontControlled="false" />
        </button>
      </div>
    </div>
    <!-- content section -->
    <div
      :class="[
        isMaximized ? 'md:h-[calc(100vh-73px)]' : 'flex-1',
        'min-h-0 text-light-1 flex flex-col md:flex-row',
      ]"
    >
      <FileManagerLeftSection
        :current-directory="currentSection"
        @set-current-directory="fileManagerStore.setCurrentDirectory"
      />
      <!-- folders section -->
      <div
        class="w-full h-full pb-xl md:pb-0 bg-dark-2 relative overflow-y-auto"
      >
        <HomeDirectory v-if="currentSection === 'home'" />
        <DocumentsRootDirectory v-else-if="currentSection === 'documents'" />
        <DocumentsSubDirectory
          v-else-if="subDirectoryPath.includes(currentSection)"
          :files="files!"
        />
        <PicturesDirectory v-else-if="currentSection === 'pictures'" />
        <MusicDirectory v-else-if="currentSection === 'music'" />
        <TrashDirectory v-else />
      </div>
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
