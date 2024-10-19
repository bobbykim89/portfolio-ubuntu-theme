<script setup lang="ts">
import { queryContent, useAsyncData } from '#imports'
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
const { isMdActive, isMdMaximized, isMdVisible, currentMdPath } =
  storeToRefs(textReaderStore)

const { data } = await useAsyncData(
  `content-${currentMdPath}`,
  async () => {
    const res = await queryContent()
      .where({ _path: currentMdPath.value as string })
      .findOne()
    if (res === null) {
      return null
    }
    return res
  },
  {
    watch: [currentMdPath],
  }
)

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
    container-size="30"
    @close-click="closeMdReader"
    @minimize-click="minimizeMdReader"
    @maximize-click="textReaderStore.setMdReaderMaximize"
    @set-active="setMdReaderActive"
  >
    <div
      :class="[
        isMdMaximized ? 'md:h-[calc(100vh-65px)]' : 'md:h-[80vh]',
        'bg-dark-3 h-full text-light-1 pt-3xs pb-xs md:pb-3xs px-sm relative overflow-y-auto',
      ]"
    >
      <ContentRenderer v-if="data?._path === currentMdPath" :value="data">
        <ContentRendererMarkdown :value="data"></ContentRendererMarkdown>
      </ContentRenderer>
    </div>
  </AppContainerGeneric>
</template>

<style lang="scss" scoped></style>
