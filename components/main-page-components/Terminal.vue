<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import CloseSvgIcon from '@/assets/img/svg-files/window-close-symbolic.svg'
import MaximizeSvgIcon from '@/assets/img/svg-files/window-maximize-symbolic.svg'
import MinimizeSvgIcon from '@/assets/img/svg-files/window-minimize-symbolic.svg'
import RestoreSvgIcon from '@/assets/img/svg-files/window-restore-symbolic.svg'
import { useTerminalStore } from '@/stores'
import { onClickOutside, useDraggable, useEventListener } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

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

const initialText =
  '##########################\n#&nbsp;Welcome to Terminal!&nbsp;&nbsp;&nbsp;#\n#&nbsp;Available commands are:#\n#&nbsp;cd, ls, clear, open .&nbsp;&nbsp;#\n#&nbsp;Thank you!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#\n##########################'

const config = useRuntimeConfig()
const draggableRef = ref<HTMLDivElement>()
const dragHandle = ref<HTMLDivElement>()
const textInput = ref<HTMLInputElement>()
const textInputHistory = ref<string[]>([initialText])

const terminalStore = useTerminalStore()
const {
  isActive,
  isVisible,
  isMaximized,
  inputText,
  currentPath,
  terminalMessage,
} = storeToRefs(terminalStore)

const { style, x, y } = useDraggable(draggableRef, {
  handle: dragHandle,
  initialValue: { x: props.initialX, y: props.initialY },
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
  return `${formattedUsername}@${splitUsername[0]}-pc ~${
    currentPath.value === 'home' ? '' : currentPath.value
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
useEventListener(textInput, 'input', () => {
  const inputLen = textInput.value!.value.length
  textInput.value?.setSelectionRange(inputLen, inputLen)
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
    :style="style"
    :class="[
      isActive ? 'z-10 border-dark-3' : 'z-0 border-dark-2',
      isMaximized ? '' : 'md:fixed md:w-2/3 lg:w-1/2 xl:w-2/5 2xl:w-1/3',
      'bg-primary md:rounded-lg overflow-hidden w-full border-2 drop-shadow-md',
    ]"
    @click="onTerminalClick"
  >
    <div
      ref="dragHandle"
      :class="[
        isActive ? 'bg-dark-3' : 'bg-dark-2',
        'grid grid-cols-2 xl:grid-cols-3 content-center text-light-1 px-2xs py-3xs transition-colors duration-150 ease-linear',
      ]"
    >
      <p class="xl:col-start-2 xl:place-self-center cursor-default select-none">
        Terminal
      </p>
      <!-- minimize/maximize/close buttons -->
      <div class="flex gap-2 items-center justify-self-end" @click.stop>
        <button
          class="rounded-full p-[2px] bg-dark-2"
          @click="minimizeTerminal"
          aria-label="minimize"
        >
          <MinimizeSvgIcon
            class="aspect-square w-[14px]"
            :fontControlled="false"
          />
        </button>
        <button
          class="rounded-full p-[2px] bg-dark-2"
          @click="terminalStore.setTerminalMaximize"
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
          @click="closeTerminal"
          aria-label="close"
        >
          <CloseSvgIcon class="aspect-square w-xs" :fontControlled="false" />
        </button>
      </div>
    </div>
    <div
      :class="[
        isMaximized ? 'md:h-[calc(100vh-65px)]' : 'md:h-96',
        'relative h-[90vh] md:h-96 text-light-1 p-3xs overflow-y-auto font-vt323 text-lg',
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
        <span class="bg-light-1 blink">&nbsp;</span>
      </p>
      <input
        ref="textInput"
        type="text"
        v-model="inputText"
        class="absolute h-0 w-0"
      />
    </div>
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
