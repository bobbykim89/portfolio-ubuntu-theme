<script setup lang="ts">
import PdfFile from '@/assets/pdf/resume.pdf'
import { useTextReaderStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
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

const pdfUrl = ref<string>(PdfFile)
const textReaderStore = useTextReaderStore()
const { isPdfActive, isPdfMaximized, isPdfVisible } =
  storeToRefs(textReaderStore)

const closePdfReader = () => {
  textReaderStore.closePdfReader()
  emit('close-click')
}
const minimizePdfReader = () => {
  textReaderStore.minimizePdfReader()
  emit('set-active', false)
}
const setPdfReaderActive = (val: boolean) => {
  textReaderStore.setPdfReaderActive(val)
  emit('set-active', val)
}
</script>

<template>
  <AppContainerGeneric
    app-name="PDF Reader"
    :initial-x="initialX"
    :initial-y="initialY"
    :visible="isPdfVisible"
    :active="isPdfActive"
    :maximized="isPdfMaximized"
    container-size="70"
    @close-click="closePdfReader"
    @minimize-click="minimizePdfReader"
    @maximize-click="textReaderStore.setPdfReaderMaximize"
    @set-active="setPdfReaderActive"
  >
    <div
      :class="[
        isPdfMaximized ? 'md:h-[calc(100vh-65px)]' : 'md:h-[80vh]',
        'bg-dark-3 h-full md:h-96 text-light-1 pt-3xs pb-md md:pb-3xs px-xs md:px-lg relative',
      ]"
    >
      <object :data="pdfUrl" type="application/pdf" width="100%" height="100%">
        <div
          class="flex flex-col justify-center items-center gap-6 pb-md h-full"
        >
          <p class="text-md font-bold text-light-1 text-center tracking-wider">
            Embedded PDF reader is not available in mobile devices.
          </p>
          <a
            class="btn btn-warning ring-offset-dark-3"
            :href="PdfFile"
            target="_blank"
            >Open PDF in new tab</a
          >
        </div>
      </object>
    </div>
  </AppContainerGeneric>
</template>

<style lang="scss" scoped></style>
