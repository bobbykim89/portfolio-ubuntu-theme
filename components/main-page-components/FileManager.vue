<script setup lang="ts">
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
import { useFileManagerStore } from '@/stores'
import { DirectoryMap } from '@/types'
import { ParsedContent } from '@nuxt/content'
import { onClickOutside, useDraggable } from '@vueuse/core'
import { storeToRefs } from 'pinia'
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
  }
)

const emit = defineEmits<{
  (e: 'close-click'): void
  (e: 'set-active', active: boolean): void
}>()

const draggableRef = ref<HTMLDivElement>()
const dragHandle = ref<HTMLDivElement>()
const subDirectoryPath = ref<string[]>([
  'documents/about',
  'documents/projects',
  'documents/skills',
])

const fileManagerStore = useFileManagerStore()
const {
  currentSection,
  isActive,
  isMaximized,
  isRootDir,
  isVisible,
  currentLocationIdx,
} = storeToRefs(fileManagerStore)

const { style } = useDraggable(draggableRef, {
  handle: dragHandle,
  initialValue: { x: props.initialX, y: props.initialY },
})

const { data: files } = await useAsyncData(
  currentSection.value,
  async () => {
    let res: ParsedContent[] = []
    if (subDirectoryPath.value.includes(currentSection.value)) {
      res = await queryContent(currentSection.value).sort({ order: 1 }).find()
    }
    return res
  },
  {
    watch: [currentSection],
  }
)

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
    @click="onFileManagerClick"
  >
    <div
      ref="dragHandle"
      :class="[
        isActive ? 'bg-dark-3' : 'bg-dark-2',
        'flex flex-wrap items-center gap-2 text-light-1 px-2xs py-3xs transition-colors duration-150 ease-linear ',
      ]"
    >
      <div class="order-4 md:order-1">
        <!-- prev button -->
        <button
          :class="[
            isRootDir ? 'bg-dark-3' : 'bg-dark-2',
            'px-3xs py-[5px] rounded-l-md border-2 border-dark-4 h-full',
          ]"
          :disabled="isRootDir"
          @click="fileManagerStore.onPrevClick"
          aria-label="previous"
        >
          <ChevronLeft class="h-[18px]" :fontControlled="false" />
        </button>
        <!-- next button -->
        <button
          :class="[
            currentLocationIdx > 1 ? 'bg-dark-2' : 'bg-dark-3',
            'px-3xs py-[5px] rounded-r-md h-full border-y-2 border-r-2 border-dark-4',
          ]"
          :disabled="currentLocationIdx <= 1"
          @click="fileManagerStore.onNextClick"
          aria-label="next"
        >
          <ChevronRight class="h-[18px]" :fontControlled="false" />
        </button>
      </div>
      <div
        class="order-5 md:order-2 grow flex gap-2 justify-start items-center border-2 border-dark-4 h-md md:mr-3xl px-3xs py-[2px] bg-dark-2 rounded-md"
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
          class="rounded-full p-[2px] bg-dark-2"
          @click="minimizeFileManager"
          aria-label="minimize"
        >
          <MinimizeSvgIcon
            class="aspect-square w-[14px]"
            :fontControlled="false"
          />
        </button>
        <button
          class="rounded-full p-[2px] bg-dark-2"
          @click="fileManagerStore.setFileManagerMaximize"
          aria-label="maximize/restore-default"
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
        isMaximized ? 'md:h-[calc(100vh-73px)]' : 'md:h-96',
        'h-full text-light-1 flex flex-col md:flex-row',
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
        <HomeDirectory
          v-if="currentSection === 'home'"
          :maximized="isMaximized"
        />
        <DocumentsRootDirectory
          v-else-if="currentSection === 'documents'"
          :maximized="isMaximized"
        />
        <DocumentsSubDirectory
          v-else-if="subDirectoryPath.includes(currentSection)"
          :maximized="isMaximized"
          :files="files!"
        />
        <PicturesDirectory
          v-else-if="currentSection === 'pictures'"
          :maximized="isMaximized"
        />
        <MusicDirectory
          v-else-if="currentSection === 'music'"
          :maximized="isMaximized"
        />
        <TrashDirectory v-else />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
