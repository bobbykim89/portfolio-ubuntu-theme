<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import type { ResizeDirection } from '#shared/types'
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
import { useTerminalStore } from '~/stores'

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
const initialHeight = 480
const MAX_W_RATIO = 0.95
const MIN_W = 512
const MIN_H = 480

const emit = defineEmits<{
  (e: 'close-click'): void
  (e: 'set-active', active: boolean): void
}>()

const initialText =
  '##########################\n#&nbsp;Welcome to Terminal!&nbsp;&nbsp;&nbsp;#\n#&nbsp;Available commands are:&nbsp;&nbsp;#\n#&nbsp;cd, ls, clear, open .&nbsp;&nbsp;#\n#&nbsp;Thank you!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#\n##########################'

const config = useRuntimeConfig()
const draggableRef = ref<HTMLDivElement>()
const dragHandle = ref<HTMLDivElement>()
const textInput = ref<HTMLInputElement>()
const textInputHistory = ref<string[]>([initialText])
const breakpoints = useBreakpoints({ mobile: 768 })
const isMobile = breakpoints.smaller('mobile')
const { width: windowWidth } = useWindowSize()

const terminalStore = useTerminalStore()
const {
  isActive,
  isVisible,
  isMaximized,
  inputText,
  currentPath,
  terminalMessage,
} = storeToRefs(terminalStore)

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

const closeTerminal = () => {
  terminalStore.closeTerminal()
  emit('close-click')
}
const minimizeTerminal = () => {
  terminalStore.minimizeTerminal()
  textInputHistory.value = []
  emit('set-active', false)
}
const onTerminalClick = () => {
  terminalStore.setTerminalActive(true)
  textInput.value?.focus()
  emit('set-active', true)
}
const terminalFocus = () => {
  textInput.value?.focus()
}

const getUserName = computed(() => {
  const splitUsername = config.public.userName.toLowerCase().split(' ')
  const formattedUsername = splitUsername.join('-')
  return `${formattedUsername}@${splitUsername[0]}-pc: ${
    currentPath.value === 'home' ? '' : '~/' + currentPath.value
  } $`
})

const getTextInputHistory = computed(() => {
  return textInputHistory.value
})

const onEnterKeyDown = async () => {
  const firstTextLine = `${getUserName.value} ${inputText.value}`
  textInputHistory.value?.push(firstTextLine)
  await terminalStore.onTerminalEnter()
  const secondTextLine = `${terminalMessage.value}`
  textInputHistory.value?.push(secondTextLine)
  if (inputText.value === 'clear') {
    textInputHistory.value = []
  }
  inputText.value = ''
  terminalStore.clearTerminalMsg()
}

onClickOutside(draggableRef, () => {
  terminalStore.setTerminalActive(false)
  emit('set-active', false)
})

const containerClass = computed(() => {
  return [
    isActive.value ? 'z-10 border-dark-3' : 'z-0 border-dark-2',
    isMaximized.value ? 'block' : 'md:fixed',
    'md:rounded-lg overflow-hidden border-2 drop-shadow-md',
  ]
})

useEventListener(textInput, 'input', () => {
  const inputLen = textInput.value!.value.length
  textInput.value?.setSelectionRange(inputLen, inputLen)
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

defineExpose<{
  focus: () => void
}>({
  focus: terminalFocus,
})
</script>

<template>
  <div
    v-if="isVisible"
    ref="draggableRef"
    :style="windowStyle"
    :class="[
      containerClass,
      'flex flex-col bg-primary',
      // 'bg-primary md:rounded-lg overflow-hidden w-full border-2 drop-shadow-md',
    ]"
    @click="onTerminalClick"
  >
    <!-- title bar -->
    <div
      ref="dragHandle"
      :class="[
        isActive ? 'bg-dark-3' : 'bg-dark-2',
        'flex-none grid grid-cols-2 xl:grid-cols-3 content-center text-light-1 px-2xs py-3xs transition-colors duration-150 ease-linear',
      ]"
    >
      <p class="xl:col-start-2 xl:place-self-center cursor-default select-none">
        Terminal
      </p>
      <!-- minimize/maximize/close buttons -->
      <div class="flex gap-2 items-center justify-self-end" @click.stop>
        <button
          class="rounded-full p-0.5 bg-dark-2"
          @click="minimizeTerminal"
          aria-label="minimize"
        >
          <MinimizeSvgIcon
            class="aspect-square w-3.5"
            :fontControlled="false"
          />
        </button>
        <button
          class="rounded-full p-0.5 bg-dark-2"
          @click="terminalStore.setTerminalMaximize"
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
          @click="closeTerminal"
          aria-label="close"
        >
          <CloseSvgIcon class="aspect-square w-xs" :fontControlled="false" />
        </button>
      </div>
    </div>
    <!-- content section -->
    <div
      :class="[
        isMaximized ? 'md:h-[calc(100vh-65px)]' : 'flex-1',
        'min-h-0 relative text-light-1 p-3xs overflow-y-auto font-vt323 text-lg',
      ]"
      @keydown.enter="onEnterKeyDown"
    >
      <div>
        <p
          class="whitespace-pre-line"
          v-for="(text, idx) in getTextInputHistory"
          :key="idx"
          v-html="text"
        ></p>
      </div>
      <p>
        {{ getUserName }} {{ inputText }}
        <span class="bg-light-1 blink">&nbsp;&nbsp;</span>
      </p>
      <input
        ref="textInput"
        type="text"
        v-model="inputText"
        class="absolute h-0 w-0"
      />
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

<style scoped lang="scss">
@keyframes blink-animation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes blink-animation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.blink {
  animation: blink-animation 1s infinite;
}
</style>
