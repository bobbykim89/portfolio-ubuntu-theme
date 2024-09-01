<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import ProfileImage from '@/assets/img/profile/manguito_thumb.jpg'
import UbuntuLogo from '@/assets/img/ubuntu-logo-dark.png'
import { useIntervalFn } from '@vueuse/core'
import { computed, ref } from 'vue'

const config = useRuntimeConfig()
const router = useRouter()
const route = useRoute()
const profileName = ref<string>(config.public.userName)
const progressBarWidth = ref<number>(0)
const showProgressBar = ref<boolean>(true)

const { pause } = useIntervalFn(() => {
  progressBarWidth.value += 0.5
}, 15)

const progressWtsVar = computed(() => {
  const progressWidth =
    progressBarWidth.value >= 100 ? 100 : progressBarWidth.value
  if (progressWidth === 100 || route.query.restart === 'false') {
    pause()
    showProgressBar.value = false
  }
  return {
    '--progress-wts': `${progressWidth}%`,
  }
})
</script>

<template>
  <div
    class="relative h-full w-full flex flex-col justify-center items-center"
    :style="[progressWtsVar]"
  >
    <div
      :class="[
        showProgressBar ? 'invisible opacity-0' : 'visible opacity-100',
        'transition-[opacity,visibility] duration-300 delay-300 ease-linear',
      ]"
    >
      <button
        class="pl-2xs py-2xs pr-md rounded-lg flex items-center gap-xs hover:bg-dark-2 duration-200 ease-linear transition-colors"
        @click="router.push({ path: '/main' })"
      >
        <img
          :src="ProfileImage"
          alt="a profile image"
          class="w-xl h-xl rounded-full object-cover object-center"
        />
        <h4 class="h4-md text-light-1 font-normal">{{ profileName }}</h4>
      </button>
    </div>
    <!-- progress-bar -->
    <div
      class="p-3xs bg-dark-2 rounded-md"
      :class="[
        showProgressBar ? 'visible opacity-100' : 'invisible opacity-0',
        'transition-[opacity,visibility] duration-300 ease-linear',
      ]"
    >
      <div
        class="py-2xs bg-dark-2 rounded-sm before:bg-warning progress-bar overflow-hidden"
      ></div>
    </div>
    <!-- logo -->
    <img
      class="w-1/2 md:w-1/5 absolute bottom-lg left-1/2 -translate-x-1/2"
      :src="UbuntuLogo"
      alt="ubuntu logo"
    />
  </div>
</template>

<style scoped lang="scss">
.progress-bar {
  position: relative;
  min-width: 16rem;
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: var(--progress-wts);
  }
  @media screen and (min-width: 768px) {
    min-width: 24rem;
  }
}
</style>
