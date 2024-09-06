<script setup lang="ts">
import { useRuntimeConfig } from '#imports'
import { musicPlayerData } from '@/assets/data'
import { useMusicPlayerStore } from '@/stores'
import { useEventListener } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import AppContainerGeneric from './AppContainerGeneric.vue'
import PlayerListCards from './music-player-parts/PlayListCards.vue'

type FormattedMusicPlayerDataType = {
  title: string
  fileSrc: string
  coverSrc: string
  copyText: string
}

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
const playList = ref<FormattedMusicPlayerDataType[]>([])
const musicPlayer = ref<HTMLAudioElement>()
const musicTitle = ref<string>('')
const coverImageRef = ref<string>('')
const currentCopyText = ref<string>('')
const currentMusicTime = ref<number>()
const musicDuration = ref<number>()
const musicPlayerStore = useMusicPlayerStore()
const { currentTrackNumber, isActive, isMusicPlaying, isVisible, musicVolume } =
  storeToRefs(musicPlayerStore)

const formatPlayList = () => {
  playList.value = musicPlayerData.map((item) => {
    return {
      title: item.title,
      fileSrc: config.public.audioExternalSrc
        ? `${config.public.audioSrcBaseUrl}/${item.filename}.mp3`
        : new URL(
            `../../assets/mp3/music/${item.filename}.mp3`,
            import.meta.url
          ).href,
      coverSrc: new URL(
        `../../assets/mp3/cover/${item.filename}.jpg`,
        import.meta.url
      ).href,
      copyText: item.copyText,
    }
  })
}

const setCurrentMusic = () => {
  if (typeof musicPlayer.value === 'undefined') {
    return
  }
  if (!musicPlayer.value.paused) {
    musicPlayer.value.pause()
    musicPlayer.value.currentTime = 0
  }
  musicPlayer.value.src = playList.value[currentTrackNumber.value].fileSrc
  coverImageRef.value = playList.value[currentTrackNumber.value].coverSrc
  musicTitle.value = playList.value[currentTrackNumber.value].title
  currentCopyText.value = playList.value[currentTrackNumber.value].copyText
}
const playMusic = () => {
  musicPlayer.value?.play()
  musicPlayerStore.setPlay(true)
}
const pauseMusic = () => {
  musicPlayer.value?.pause()
  musicPlayerStore.setPlay(false)
}
const onNextClick = () => {
  musicPlayerStore.setNextMusic()
  musicPlayer.value?.pause()
  if (isMusicPlaying.value === true) {
    musicPlayer.value?.play()
  }
}
const onPrevClick = () => {
  musicPlayerStore.setPrevMusic()
  musicPlayer.value?.pause()
  if (isMusicPlaying.value === true) {
    musicPlayer.value?.play()
  }
}
const onPlayButtonClick = () => {
  isMusicPlaying.value === true ? pauseMusic() : playMusic()
}

const closeMusicPlayer = () => {
  musicPlayerStore.closeMusicPlayer()
  musicPlayer.value?.pause()
  emit('close-click')
}
const minimizeMusicPlayer = () => {
  musicPlayerStore.minimizeMusicPlayer()
  emit('set-active', false)
}
const setMusicPlayerActive = (val: boolean) => {
  musicPlayerStore.setMusicPlayerActive(val)
  emit('set-active', val)
}

const onPlayListClick = (track: number) => {
  musicPlayerStore.setCurrentTrackNumber(track)
  musicPlayerStore.setPlay(true)
  musicPlayer.value?.play()
}

const currentMusicStatus = computed(() => {
  let progressPercent: number
  if (
    currentMusicTime.value === undefined ||
    musicDuration.value === undefined
  ) {
    return { '--music-progress': '0%' }
  }
  progressPercent = (currentMusicTime.value / musicDuration.value) * 100
  return { '--music-progress': `${progressPercent}%` }
})

useEventListener(musicPlayer, 'ended', () => {
  onNextClick()
})
useEventListener(musicPlayer, 'timeupdate', () => {
  currentMusicTime.value = musicPlayer.value?.currentTime
})
useEventListener(musicPlayer, 'durationchange', () => {
  musicDuration.value = musicPlayer.value?.duration
})
onMounted(() => {
  formatPlayList()
  musicPlayer.value = new Audio()
  setCurrentMusic()
})
// watch(musicVolume, (newVal) => {
//   if (typeof musicPlayer.value !== 'undefined') {
//     musicPlayer.value.volume = newVal / 100
//   }
// })
// watch(currentTrackNumber, () => {
//   setCurrentMusic()
//   if (isMusicPlaying.value === true) {
//     musicPlayer.value?.play()
//   }
// })
// watch(isMusicPlaying, (newVal) => {
//   if (newVal === false) {
//     musicPlayer.value?.pause()
//   }
// })
watch(
  [musicVolume, currentTrackNumber, isMusicPlaying],
  (
    [newMusicVolume, newTrackNumber, newMusicPlaying],
    [_, oldTrackNumber, __]
  ) => {
    if (newMusicVolume && typeof musicPlayer.value !== 'undefined') {
      musicPlayer.value.volume = newMusicVolume / 100
    }
    if (newTrackNumber !== oldTrackNumber) {
      setCurrentMusic()
      if (isMusicPlaying.value === true) {
        musicPlayer.value?.play()
      }
    }
    if (newMusicPlaying === false) {
      musicPlayer.value?.pause()
    }
  }
)
</script>

<template>
  <AppContainerGeneric
    app-name="Music Player"
    :initial-x="initialX"
    :initial-y="initialY"
    :visible="isVisible"
    :active="isActive"
    :disable-maximize="true"
    container-size="30"
    @close-click="closeMusicPlayer"
    @minimize-click="minimizeMusicPlayer"
    @set-active="setMusicPlayerActive"
  >
    <div
      class="bg-dark-3 h-full md:h-[65vh] text-light-1 pt-3xs pb-sm md:pb-3xs px-xs lg:px-sm relative overflow-y-scroll"
      :style="currentMusicStatus"
    >
      <!-- music player -->
      <div
        class="bg-dark-2 rounded-lg py-sm px-xs mt-2xs mb-sm grid grid-cols-3 gap-x-1 gap-y-3 md:gap-4 place-items-center"
      >
        <img
          class="w-3xl aspect-square rounded-lg"
          :src="coverImageRef"
          :alt="`${musicTitle}'s cover image'`"
        />
        <div class="col-span-2 flex flex-col items-center justify-center gap-2">
          <h4 class="h4-md text-center">{{ musicTitle }}</h4>
          <div
            class="flex gap-2 items-center relative before:absolute before:w-full before:h-3/5 before:bg-dark-3 before:rounded-2xl"
          >
            <!-- prev -->
            <button @click="onPrevClick" class="relative ml-2xs md:ml-[12px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                class="w-xs md:w-sm"
              >
                <!-- !Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
                <path
                  d="M459.5 440.6c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-320c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4L288 214.3l0 41.7 0 41.7L459.5 440.6zM256 352l0-96 0-128 0-32c0-12.4-7.2-23.7-18.4-29s-24.5-3.6-34.1 4.4l-192 160C4.2 237.5 0 246.5 0 256s4.2 18.5 11.5 24.6l192 160c9.5 7.9 22.8 9.7 34.1 4.4s18.4-16.6 18.4-29l0-64z"
                />
              </svg>
            </button>
            <!-- play/pause -->
            <button
              @click="onPlayButtonClick"
              class="relative p-2xs md:p-xs rounded-full border-2 border-dark-2 bg-dark-3"
            >
              <svg
                v-if="isMusicPlaying"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                fill="currentColor"
                class="w-sm md:w-md aspect-square"
              >
                <!-- !Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
                <path
                  d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                fill="currentColor"
                class="w-sm md:w-md aspect-square"
              >
                <!-- !Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
                <path
                  d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                />
              </svg>
            </button>
            <!-- next -->
            <button @click="onNextClick" class="relative mr-2xs md:mr-[12px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                class="w-xs md:w-sm"
              >
                <!-- !Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
                <path
                  d="M52.5 440.6c-9.5 7.9-22.8 9.7-34.1 4.4S0 428.4 0 416L0 96C0 83.6 7.2 72.3 18.4 67s24.5-3.6 34.1 4.4L224 214.3l0 41.7 0 41.7L52.5 440.6zM256 352l0-96 0-128 0-32c0-12.4 7.2-23.7 18.4-29s24.5-3.6 34.1 4.4l192 160c7.3 6.1 11.5 15.1 11.5 24.6s-4.2 18.5-11.5 24.6l-192 160c-9.5 7.9-22.8 9.7-34.1 4.4s-18.4-16.6-18.4-29l0-64z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div
          class="w-full col-span-3 bg-dark-3 rounded-md overflow-hidden music-progress relative before:bg-warning before:absolute before:left-0 before:h-full h-2xs"
        ></div>
        <div
          class="w-full col-span-3 text-xs whitespace-pre-line break-words bg-dark-3 rounded-lg px-2xs py-3xs"
          v-html="currentCopyText"
        ></div>
      </div>
      <!-- play-list -->
      <div class="bg-dark-2 p-xs rounded-lg mb-sm">
        <PlayerListCards
          v-for="(card, idx) in playList"
          :key="idx"
          :img-src="card.coverSrc"
          :title="card.title"
          :track-number="idx"
          :active-track-number="currentTrackNumber"
          @card-click="onPlayListClick"
        />
      </div>
    </div>
  </AppContainerGeneric>
</template>

<style scoped lang="scss">
.music-progress::before {
  width: var(--music-progress);
}
</style>
