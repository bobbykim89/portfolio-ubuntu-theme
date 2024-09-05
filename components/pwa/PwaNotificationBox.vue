<script setup lang="ts">
const { $pwa } = useNuxtApp()
</script>

<template>
  <div
    v-if="$pwa?.needRefresh"
    class="fixed bottom-0 left-0 ml-3xs mb-3xs md:ml-md md:mb-md bg-dark-4 p-md rounded-md drop-shadow-md text-light-3 max-w-[90vw]"
  >
    <div class="flex justify-center items-center gap-xs">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        fill="currentColor"
        class="w-md md:w-xs"
      >
        <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
        <path
          d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"
        />
      </svg>
      <span>New version of SW available, please reload</span>
      <button
        @click="$pwa?.updateServiceWorker()"
        class="p-[6px] bg-warning rounded-md hover:bg-warning/75 transition-all duration-300 ease-linear"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="currentColor"
          class="w-xs"
        >
          <!-- !Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
          <path
            d="M463.5 224H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped></style>
