<script setup lang="ts">
import MusicFile from '@/assets/img/program-icons/audio-x-mpeg.png'
import ImageFile from '@/assets/img/program-icons/image-x-generic.png'
import TextFile from '@/assets/img/program-icons/libreoffice-writer.png'
import DockerFile from '@/assets/img/program-icons/text-dockerfile.png'
import MdFile from '@/assets/img/program-icons/text-markdown.png'
import RustFile from '@/assets/img/program-icons/text-rust.png'
import CppFile from '@/assets/img/program-icons/text-x-cpp.png'
import CsFile from '@/assets/img/program-icons/text-x-csharp.png'
import JsFile from '@/assets/img/program-icons/text-x-javascript.png'
import PyFile from '@/assets/img/program-icons/text-x-python.png'
import RubyFile from '@/assets/img/program-icons/text-x-ruby.png'
import { FileMap, FileType } from '@/types'

const folderData: FileMap = {
  image: ImageFile,
  music: MusicFile,
  text: TextFile,
  rust: RustFile,
  cpp: CppFile,
  js: JsFile,
  py: PyFile,
  docker: DockerFile,
  ruby: RubyFile,
  md: MdFile,
  cs: CsFile,
}

const props = withDefaults(
  defineProps<{
    type: FileType
    text: string
    path: string
  }>(),
  {
    type: 'text',
  }
)
const emit = defineEmits<{
  (e: 'file-click', text: string): void
}>()

const onFileClick = () => {
  emit('file-click', props.path)
}
</script>

<template>
  <button
    class="flex flex-col items-center w-24 justify-center gap-1 py-3xs mb-auto rounded-lg focus:bg-dark-4 transition-colors duration-150 ease-linear"
    @click="onFileClick"
  >
    <img :src="folderData[type]" :alt="type" class="h-lg select-none" />
    <p class="text-light-1 text-sm text-wrap select-none">{{ text }}</p>
  </button>
</template>

<style scoped></style>
