<script setup lang="ts">
import CloseSvgIcon from '@/assets/img/svg-files/window-close-symbolic.svg'
import MaximizeSvgIcon from '@/assets/img/svg-files/window-maximize-symbolic.svg'
import MinimizeSvgIcon from '@/assets/img/svg-files/window-minimize-symbolic.svg'
import RestoreSvgIcon from '@/assets/img/svg-files/window-restore-symbolic.svg'
import { type AppContainerPropTypes } from '@/types'
import { onClickOutside, useDraggable } from '@vueuse/core'

const props = withDefaults(defineProps<AppContainerPropTypes>(), {
  initialX: 80,
  initialY: 40,
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

const draggableRef = ref<HTMLDivElement>()
const dragHandle = ref<HTMLDivElement>()

const { style } = useDraggable(draggableRef, {
  handle: dragHandle,
  initialValue: { x: props.initialX, y: props.initialY },
})

const setContainerSize = computed<string>(() => {
  const { containerSize, maximized } = props
  const widthClass =
    containerSize === '30'
      ? 'md:w-1/2 lg:w-1/3'
      : containerSize === '50'
      ? 'md:w-2/3 lg:w-1/2'
      : 'md:w-4/5 lg:w-2/3'
  return maximized ? '' : `md:fixed ${widthClass}`
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
</script>

<template>
  <div
    v-if="visible"
    ref="draggableRef"
    :style="style"
    :class="[
      active ? 'z-10 border-dark-3' : 'z-0 border-dark-2',
      setContainerSize,
      'md:rounded-lg overflow-hidden border-2 drop-shadow-md',
    ]"
    @click="onAppClick"
  >
    <div
      ref="dragHandle"
      :class="[
        active ? 'bg-dark-3' : 'bg-dark-2',
        'grid grid-cols-2 xl:grid-cols-3 content-center text-light-1 px-2xs py-3xs transition-colors duration-150 ease-linear',
      ]"
    >
      <p class="xl:col-start-2 xl:place-self-center cursor-default select-none">
        {{ appName }}
      </p>
      <!-- minimize/maximize/close buttons -->
      <div class="flex gap-2 items-center justify-self-end" @click.stop>
        <button class="rounded-full p-[2px] bg-dark-2" @click="onMinimize">
          <MinimizeSvgIcon
            class="aspect-square w-[14px]"
            :fontControlled="false"
          />
        </button>
        <button
          v-if="disableMaximize === false"
          class="rounded-full p-[2px] bg-dark-2"
          @click="onMaximize"
        >
          <RestoreSvgIcon
            v-if="maximized"
            class="aspect-square w-[14px]"
            :fontControlled="false"
          />
          <MaximizeSvgIcon
            v-else
            class="aspect-square w-[14px]"
            :fontControlled="false"
          />
        </button>
        <button class="rounded-full p-[2px] bg-dark-2" @click="onClose">
          <CloseSvgIcon class="aspect-square w-xs" :fontControlled="false" />
        </button>
      </div>
    </div>
    <div class="h-full bg-dark-3">
      <slot />
    </div>
  </div>
</template>

<style scoped></style>
