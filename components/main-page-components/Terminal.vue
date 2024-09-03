<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import NewTabSvgIcon from '@/assets/img/svg-files/tab-new-symbolic.svg'
import CloseSvgIcon from '@/assets/img/svg-files/window-close-symbolic.svg'
import MaximizeSvgIcon from '@/assets/img/svg-files/window-maximize-symbolic.svg'
import MinimizeSvgIcon from '@/assets/img/svg-files/window-minimize-symbolic.svg'
import RestoreSvgIcon from '@/assets/img/svg-files/window-restore-symbolic.svg'
import { useTerminalStore } from '@/stores'
import { onClickOutside, useDraggable } from '@vueuse/core'
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

const config = useRuntimeConfig()
const draggableRef = ref<HTMLDivElement>()
const dragHandle = ref<HTMLDivElement>()
const textInput = ref<HTMLInputElement>()
const textInputHistory = ref<string[]>([])

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

const getUserName = computed(() => {
  const splitUsername = config.public.userName.toLowerCase().split(' ')
  const formattedUsername = splitUsername.join('-')
  return `${formattedUsername}@${splitUsername[0]}-pc ~${
    currentPath.value === 'home' ? '' : currentPath.value
  } $`
})

const onEnterKeyDown = () => {
  terminalStore.onTerminalEnter()
  const prevTextLine = `${getUserName.value} ${inputText.value}\n${terminalMessage.value}`
  textInputHistory.value?.push(prevTextLine)
  inputText.value = ''
  terminalStore.clearTerminalMsg()
}

onClickOutside(draggableRef, () => {
  terminalStore.setTerminalActive(false)
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
      isMaximized ? '' : 'md:fixed md:w-1/2',
      'md:rounded-lg overflow-hidden w-full border-2 drop-shadow-md',
    ]"
    @click="onTerminalClick"
  >
    <div
      ref="dragHandle"
      :class="[
        isActive ? 'bg-dark-3' : 'bg-dark-2',
        'grid grid-cols-3 content-center text-light-1 px-2xs py-3xs transition-colors duration-150 ease-linear',
      ]"
    >
      <!-- new-tab button -->
      <button
        class="rounded-md p-[6px] bg-dark-2 focus:bg-dark-3 border-2 border-dark-4 justify-self-start"
        @click.stop
      >
        <NewTabSvgIcon class="aspect-square w-[14px]" :fontControlled="false" />
      </button>
      <p class="place-self-center cursor-default select-none">Terminal</p>
      <!-- minimize/maximize/close buttons -->
      <div class="flex gap-2 items-center justify-self-end" @click.stop>
        <button
          class="rounded-full p-[2px] bg-dark-2"
          @click="minimizeTerminal"
        >
          <MinimizeSvgIcon
            class="aspect-square w-[14px]"
            :fontControlled="false"
          />
        </button>
        <button
          class="rounded-full p-[2px] bg-dark-2"
          @click="terminalStore.setTerminalMaximize"
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
        <button class="rounded-full p-[2px] bg-dark-2" @click="closeTerminal">
          <CloseSvgIcon class="aspect-square w-xs" :fontControlled="false" />
        </button>
      </div>
    </div>
    <div
      :class="[
        isMaximized ? 'md:h-[92vh]' : 'md:h-96',
        'relative bg-primary h-[90vh] md:h-96 text-light-1 p-3xs overflow-y-scroll',
      ]"
      @keydown.enter="onEnterKeyDown"
    >
      <input
        ref="textInput"
        type="text"
        v-model="inputText"
        class="absolute h-0 w-0"
      />
      <div>
        <p
          class="whitespace-pre-line"
          v-for="(text, idx) in textInputHistory"
          :key="idx"
          v-html="text"
        ></p>
      </div>
      <p>
        {{ getUserName }} {{ inputText }}
        <span class="bg-light-1 blink">&nbsp;&nbsp;</span>
      </p>
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
