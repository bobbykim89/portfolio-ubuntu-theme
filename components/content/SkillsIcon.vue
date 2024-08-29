<script setup lang="ts">
// import MusicFile from '@/assets/img/program-icons/audio-x-mpeg.png'
// import ImageFile from '@/assets/img/program-icons/image-x-generic.png'
// import TextFile from '@/assets/img/program-icons/libreoffice-writer.png'
// import DockerFile from '@/assets/img/program-icons/text-dockerfile.png'
// import RustFile from '@/assets/img/program-icons/text-rust.png'
// import CppFile from '@/assets/img/program-icons/text-x-cpp.png'
// import JsFile from '@/assets/img/program-icons/text-x-javascript.png'
// import PyFile from '@/assets/img/program-icons/text-x-python.png'
// import RubyFile from '@/assets/img/program-icons/text-x-ruby.png'
import { SkillType } from '@/types'
import { computed } from 'vue'

// const folderData: FileMap = {
//   image: ImageFile,
//   music: MusicFile,
//   text: TextFile,
//   rust: RustFile,
//   cpp: CppFile,
//   js: JsFile,
//   py: PyFile,
//   docker: DockerFile,
//   ruby: RubyFile,
// }

const props = withDefaults(
  defineProps<{
    type: SkillType
  }>(),
  {
    type: 'nodejs',
  }
)

// const getUrl = (path: string) => {
//   const assets = import.meta.glob(
//     "@/assets/img/first-time-freshman-registration-rules/**/*",
//     {
//       eager: true,
//       import: "default",
//     }
//   );
//   const imgPath =
//     assets["/assets/img/first-time-freshman-registration-rules/" + path];
//   if (typeof imgPath !== "string") {
//     return "";
//   }
//   return imgPath;
// };

const iconSrc = computed<string>(() => {
  return new URL(
    `../../assets/img/skills-icons/${props.type}.png`,
    import.meta.url
  ).href
})
</script>

<template>
  <button
    class="flex flex-col items-center w-24 justify-center gap-1 py-3xs rounded-lg focus:bg-dark-1 transition-colors duration-150 ease-linear"
  >
    <img :src="iconSrc" :alt="type" class="h-lg" />
    <p class="text-dark-3 text-sm text-wrap capitalize">{{ type }}</p>
  </button>
</template>

<style scoped></style>
