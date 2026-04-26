<script setup lang="ts">
import { type AppContainerPropTypes, type ResizeDirection } from '#shared/types'
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

const props = withDefaults(defineProps<AppContainerPropTypes>(), {
  initialX: 80,
  initialY: 40,
  initialWidth: 480,
  initialHeight: 550,
  visible: false,
  active: true,
  maximized: false,
  containerSize: '30',
  disableMaximize: false,
})

const emit = defineEmits<{
  (e: 'close-click'): void
  (e: 'minimize-click'): void
  (e: 'maximize-click'): void
  (e: 'set-active', active: boolean): void
}>()

const MAX_W_RATIO = 0.95
const MIN_W = 300
const MIN_H = 440

const draggableRef = ref<HTMLDivElement>()
const dragHandle = ref<HTMLDivElement>()
const breakpoints = useBreakpoints({ mobile: 768 })
const isMobile = breakpoints.smaller('mobile')
const { width: windowWidth } = useWindowSize()

// draggable
const { x, y } = useDraggable(draggableRef, {
  handle: dragHandle,
  initialValue: { x: props.initialX, y: props.initialY },
  disabled: isMobile,
})

// resizable
const width = ref(
  Math.min(props.initialWidth, Math.floor(windowWidth.value * MAX_W_RATIO)),
)
const height = ref(props.initialHeight)

const isResizing = ref(false)
const resizeDir = ref<ResizeDirection>('se')
const startPointer = ref({ x: 0, y: 0 })
const startSize = ref({ w: 0, h: 0 })
const startPos = ref({ x: 0, y: 0 })
const resizeDirection: ResizeDirection[] = ['se', 'sw', 'ne', 'nw']

const onResizeStart = (e: PointerEvent, dir: ResizeDirection) => {
  if (isMobile.value || props.disableMaximize) return
  isResizing.value = true
  resizeDir.value = dir
  startPointer.value = { x: e.clientX, y: e.clientY }
  startSize.value = { w: width.value, h: height.value }
  startPos.value = { x: x.value, y: y.value }
  e.preventDefault()
  e.stopPropagation()
}

const windowStyle = computed(() => {
  if (props.maximized) return {}
  if (isMobile.value) return {}
  return {
    left: `${x.value}px`,
    top: `${y.value}px`,
    width: `${width.value}px`,
    height: `${height.value}px`,
  }
})

const onClose = () => {
  emit('close-click')
}
const onMinimize = () => {
  emit('minimize-click')
}
const onMaximize = () => {
  emit('maximize-click')
}
const onAppClick = () => {
  emit('set-active', true)
}

onClickOutside(draggableRef, () => {
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
    v-if="visible"
    ref="draggableRef"
    :style="windowStyle"
    :class="[
      active ? 'z-10 border-dark-3' : 'z-0 border-dark-2',
      maximized ? 'absolute inset-0' : 'md:fixed',
      'md:rounded-lg overflow-hidden border-2 drop-shadow-md flex flex-col',
    ]"
    @click="onAppClick"
  >
    <!-- title bar -->
    <div
      ref="dragHandle"
      :class="[
        active ? 'bg-dark-3' : 'bg-dark-2',
        isMobile ? 'cursor-default' : 'cursor-grab active:cursor-grabbing',
        'flex-none grid grid-cols-2 xl:grid-cols-3 content-center text-light-1 px-2xs py-3xs transition-colors duration-150 ease-linear',
      ]"
    >
      <p class="xl:col-start-2 xl:place-self-center cursor-default select-none">
        {{ appName }}
      </p>
      <!-- minimize/maximize/close buttons -->
      <div class="flex gap-2 items-center justify-self-end" @click.stop>
        <button
          class="rounded-full p-0.5 bg-dark-2"
          @click="onMinimize"
          aria-label="minimize"
        >
          <MinimizeSvgIcon
            class="aspect-square w-3.5"
            :fontControlled="false"
          />
        </button>
        <button
          v-if="disableMaximize === false"
          class="rounded-full p-0.5 bg-dark-2"
          @click="onMaximize"
          aria-label="maximize/restore-default"
        >
          <RestoreSvgIcon
            v-if="maximized"
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
          @click="onClose"
          aria-label="close"
        >
          <CloseSvgIcon class="aspect-square w-xs" :fontControlled="false" />
        </button>
      </div>
    </div>
    <!-- content -->
    <div class="flex-1 min-h-0 bg-dark-3 relative overflow-auto">
      <slot />
    </div>

    <!-- resize handles (desktop only) -->
    <template v-if="!isMobile && !maximized && !disableMaximize">
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
