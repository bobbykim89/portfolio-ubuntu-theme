<script setup lang="ts">
import NewTabSvgIcon from '@/assets/img/svg-files/tab-new-symbolic.svg'
import CloseSvgIcon from '@/assets/img/svg-files/window-close-symbolic.svg'
import MaximizeSvgIcon from '@/assets/img/svg-files/window-maximize-symbolic.svg'
import MinimizeSvgIcon from '@/assets/img/svg-files/window-minimize-symbolic.svg'
import RestoreSvgIcon from '@/assets/img/svg-files/window-restore-symbolic.svg'
import { useTerminalStore } from '@/stores'
import { onClickOutside, useDraggable } from '@vueuse/core'
import { storeToRefs } from 'pinia'

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

const terminalStore = useTerminalStore()
const { isActive, isVisible, isMaximized } = storeToRefs(terminalStore)

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
  emit('set-active', false)
}
const onTerminalClick = () => {
  terminalStore.setTerminalActive(true)
  emit('set-active', true)
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
        'bg-primary h-[90vh] md:h-96 text-light-1 p-3xs overflow-y-scroll',
      ]"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis quisquam
      officia natus, eligendi provident aperiam iste vel laborum in veritatis!
      x: {{ x }}, y: {{ y }}\n style: {{ style }}
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, nostrum
      labore aliquid minima beatae ducimus temporibus, ratione iusto accusamus
      iure nihil! Sequi molestias aliquid iure corrupti. Quidem neque sit quos
      atque ex accusantium eius dolore ad, inventore vitae molestias
      perspiciatis eligendi quibusdam, ab eveniet deserunt unde velit
      dignissimos quod debitis in. Quisquam, in minima? Voluptatum rem adipisci
      voluptas nisi maxime et doloremque dolorum, exercitationem obcaecati
      aspernatur cum corporis doloribus, praesentium magnam eos amet ea, omnis
      ab error iusto possimus aut culpa. Vitae in saepe perferendis eius
      laudantium veniam sed veritatis harum quo laboriosam unde ea, numquam
      accusantium natus quae rerum. Lorem ipsum, dolor sit amet consectetur
      adipisicing elit. Blanditiis nisi incidunt mollitia perferendis. Porro,
      soluta voluptatum voluptatibus possimus harum cumque impedit nemo nobis
      expedita magnam, quasi architecto eveniet fugiat aliquid cupiditate iure
      perferendis mollitia ratione deleniti laborum odio eos corrupti
      necessitatibus. Et exercitationem aliquam, quia vel eligendi repudiandae
      quaerat molestiae nesciunt dolor obcaecati eum error delectus eius
      adipisci laborum repellat ad, quam reiciendis amet libero, quidem quod
      corrupti eos? Debitis illo ipsa odit ab architecto omnis delectus ut
      nesciunt velit! Amet rerum iure aspernatur, laborum totam a sit
      exercitationem cum ad consectetur iste soluta praesentium nemo numquam rem
      maxime. Possimus in expedita non nisi eos assumenda sed cupiditate nulla
      odit quia officiis voluptas laboriosam voluptates illum tempora, ducimus
      quis reiciendis facere recusandae veritatis sint voluptatem quidem
      aperiam. Nam, corporis expedita consectetur tempora quasi voluptatem quam
      aspernatur possimus consequatur est animi rem ad aut enim incidunt
      nostrum. Voluptate nulla similique et, iste totam harum impedit sunt
      aliquam architecto rem repudiandae, quibusdam ut provident maiores
      corrupti labore. Mollitia esse enim eveniet odit ad dignissimos dolor,
      magnam veritatis eligendi sapiente? Veritatis, eveniet minima! Enim fugiat
      sed quo. Aliquid corrupti, nostrum magnam nihil autem eligendi velit
      quidem reprehenderit odit ducimus beatae veniam, est alias.
    </div>
  </div>
</template>

<style scoped></style>
