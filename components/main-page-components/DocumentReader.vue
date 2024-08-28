<script setup lang="ts">
import { useTextReaderStore } from '@/stores'
import { storeToRefs } from 'pinia'
import AppContainerGeneric from './AppContainerGeneric.vue'

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

const textReaderStore = useTextReaderStore()
const { isMdActive, isMdMaximized, isMdVisible, currentMdContent } =
  storeToRefs(textReaderStore)

const closeMdReader = () => {
  textReaderStore.closeMdReader()
  emit('close-click')
}
const minimizeMdReader = () => {
  textReaderStore.minimizeMdReader()
  emit('set-active', false)
}
const setMdReaderActive = (val: boolean) => {
  textReaderStore.setMdReaderActive(val)
  emit('set-active', val)
}
</script>

<template>
  <AppContainerGeneric
    app-name="Document Reader"
    :initial-x="initialX"
    :initial-y="initialY"
    :visible="isMdVisible"
    :active="isMdActive"
    :maximized="isMdMaximized"
    container-size="70"
    @close-click="closeMdReader"
    @minimize-click="minimizeMdReader"
    @maximize-click="textReaderStore.setMdReaderMaximize"
    @set-active="setMdReaderActive"
  >
    <div
      :class="[
        isMdMaximized ? 'md:h-[92vh]' : 'md:h-[80vh]',
        'bg-dark-3 h-[90vh] md:h-96 text-light-1 py-3xs px-lg relative',
      ]"
    >
      <ContentRenderer v-if="currentMdContent" :value="currentMdContent">
        <ContentRendererMarkdown
          :value="currentMdContent"
        ></ContentRendererMarkdown>
      </ContentRenderer>
    </div>
  </AppContainerGeneric>
</template>

<style lang="scss" scoped></style>
