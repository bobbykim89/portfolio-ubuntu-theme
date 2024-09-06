<script setup lang="ts">
import SpeakerIcon from '@/assets/img/svg-files/audio-speakers-symbolic.svg'
import LockSvgIcon from '@/assets/img/svg-files/changes-prevent-symbolic.svg'
import SettingsSvgIcon from '@/assets/img/svg-files/document-properties-symbolic.svg'
import NetworkSvgIcon from '@/assets/img/svg-files/network-wireless-connected-symbolic.svg'
import ChevronRight from '@/assets/img/svg-files/pan-end-symbolic.svg'
import PerformanceSvgIcon from '@/assets/img/svg-files/power-profile-balanced-symbolic.svg'
import PowerSvgIcon from '@/assets/img/svg-files/system-shutdown-symbolic.svg'
import { useAppStore, useMusicPlayerStore } from '@/stores'
import { Collapse, vCollapse } from '@bobbykim/manguito-theme'
import { storeToRefs } from 'pinia'

const visible = ref<boolean>(false)
const networkCollapse = ref<InstanceType<typeof Collapse>>()
const networkCollapseVisible = ref<boolean>(false)
const performanceCollapse = ref<InstanceType<typeof Collapse>>()
const performanceTabText = ref<'Balanced' | 'Power Saver'>('Balanced')
const performanceCollapseVisible = ref<boolean>(false)
const powerCollapseVisible = ref<boolean>(false)
const musicPlayerStore = useMusicPlayerStore()
const appStore = useAppStore()
const router = useRouter()

const { musicVolume } = storeToRefs(musicPlayerStore)

const toggleVisibility = () => {
  visible.value = !visible.value
}
const closeMenu = () => {
  visible.value = false
}

const handleNetworkButtonClick = (visible: boolean) => {
  networkCollapseVisible.value = visible
}
const handleNetworkCollapseSubMenuClick = () => {
  networkCollapse.value?.close()
}
const handlePerformanceButtonClick = (visible: boolean) => {
  performanceCollapseVisible.value = visible
}
const handlePerformanceCollapseSubMenuClick = (
  text: 'Balanced' | 'Power Saver'
) => {
  performanceCollapse.value?.close()
  performanceTabText.value = text
}
const handleSettingsClick = () => {
  appStore.setSettingsOpen()
  closeMenu()
}
const handleLockScreenClick = () => {
  closeMenu()
  router.push({ path: '/', query: { restart: 'false' } })
}
const handleRestartClick = () => {
  closeMenu()
  appStore.closeAllApps()
  router.push({ path: '/' })
}
const handlePowerOffClick = () => {
  closeMenu()
  appStore.closeAllApps()
  router.push({ path: '/shutdown' })
}
const handlePowerButtonClick = (visible: boolean) => {
  powerCollapseVisible.value = visible
}

defineExpose<{
  toggle: () => void
  close: () => void
}>({
  toggle: toggleVisibility,
  close: closeMenu,
})
</script>

<template>
  <div
    v-if="visible"
    class="absolute z-[50] top-md right-2xs bg-dark-3 drop-shadow-md rounded-lg px-2xs py-2xs w-[300px]"
  >
    <div class="relative text-light-1">
      <div class="flex gap-4 border-b-dark-2 border-b py-2xs px-xs">
        <label for="volume-input">
          <SpeakerIcon class="text-lg my-auto" />
        </label>
        <input
          type="range"
          name="volume"
          id="volume-input"
          min="0"
          max="100"
          step="1"
          class="accent-warning w-full"
          v-model="musicVolume"
        />
      </div>
      <!-- network and performance buttons -->
      <div class="my-2xs border-b-dark-2 border-b">
        <!-- network button -->
        <button
          class="w-full flex justify-between items-center py-2xs px-xs rounded-t-lg transition-colors duration-300 ease-linear"
          :class="{ 'bg-dark-2': networkCollapseVisible }"
          v-collapse:network-collapse
        >
          <div class="flex gap-4 mr-md">
            <NetworkSvgIcon class="text-lg my-auto" />
            <p class="text-sm">Wireless Connected</p>
          </div>
          <ChevronRight
            :class="[
              networkCollapseVisible ? 'rotate-90' : 'rotate-0',
              'transition-transform duration-300 ease-linear text-lg',
            ]"
          />
        </button>
        <Collapse
          id="network-collapse"
          ref="networkCollapse"
          accordion="network-performance"
          :visible="networkCollapseVisible"
          @open="handleNetworkButtonClick"
          @close="handleNetworkButtonClick"
        >
          <div
            class="text-sm rounded-b-lg bg-dark-2 flex flex-col items-start px-lg"
          >
            <button
              class="py-2xs w-full text-start"
              @click="handleNetworkCollapseSubMenuClick"
            >
              Turn Off
            </button>
            <button
              class="py-2xs w-full text-start"
              @click="handleNetworkCollapseSubMenuClick"
            >
              Wireless Settings
            </button>
          </div>
        </Collapse>
        <!-- performance button -->
        <button
          class="w-full flex justify-between items-center py-2xs px-xs rounded-t-lg transition-colors duration-300 ease-linear"
          :class="{ 'bg-dark-2': performanceCollapseVisible }"
          v-collapse:performance-collapse
        >
          <div class="flex gap-4 mr-md">
            <PerformanceSvgIcon class="text-lg my-auto" />
            <p class="text-sm">{{ performanceTabText }}</p>
          </div>
          <ChevronRight
            :class="[
              performanceCollapseVisible ? 'rotate-90' : 'rotate-0',
              'transition-transform duration-300 ease-linear text-lg',
            ]"
          />
        </button>
        <Collapse
          id="performance-collapse"
          ref="performanceCollapse"
          accordion="network-performance"
          :visible="performanceCollapseVisible"
          @open="handlePerformanceButtonClick"
          @close="handlePerformanceButtonClick"
        >
          <div
            class="text-sm rounded-b-lg bg-dark-2 flex flex-col items-start px-lg"
          >
            <button
              class="py-2xs w-full text-start"
              @click="handlePerformanceCollapseSubMenuClick('Balanced')"
            >
              Balanced
            </button>
            <button
              class="py-2xs w-full text-start"
              @click="handlePerformanceCollapseSubMenuClick('Power Saver')"
            >
              Power Saver
            </button>
          </div>
        </Collapse>
      </div>
      <!-- settings power group -->
      <div class="mt-2xs">
        <!-- settings button -->
        <button
          class="w-full flex justify-between items-center py-2xs px-xs focus:bg-dark-2 rounded-lg transition-colors duration-300 ease-linear"
          @click="handleSettingsClick"
        >
          <div class="flex gap-4 mr-md">
            <SettingsSvgIcon class="text-lg my-auto" />
            <p class="text-sm">Settings</p>
          </div>
        </button>
        <!-- lock-screen button -->
        <button
          class="w-full flex justify-between items-center py-2xs px-xs focus:bg-dark-2 rounded-lg transition-colors duration-300 ease-linear"
          @click="handleLockScreenClick"
        >
          <div class="flex gap-4 mr-md">
            <LockSvgIcon class="text-lg my-auto" />
            <p class="text-sm">Lock Screen</p>
          </div>
        </button>
        <!-- power-off/log-out -->
        <button
          class="w-full flex justify-between items-center py-2xs px-xs rounded-t-lg transition-colors duration-300 ease-linear"
          :class="{ 'bg-dark-2': powerCollapseVisible }"
          v-collapse:power-collapse
        >
          <div class="flex gap-4 mr-md">
            <PowerSvgIcon class="text-lg my-auto" />
            <p class="text-sm">Power Off/Log Out</p>
          </div>
          <ChevronRight
            :class="[
              powerCollapseVisible ? 'rotate-90' : 'rotate-0',
              'transition-transform duration-300 ease-linear text-lg',
            ]"
          />
        </button>
        <Collapse
          id="power-collapse"
          :visible="powerCollapseVisible"
          @open="handlePowerButtonClick"
          @close="handlePowerButtonClick"
        >
          <div
            class="text-sm rounded-b-lg bg-dark-2 flex flex-col items-start px-lg"
          >
            <button
              class="py-2xs w-full text-start"
              @click="handleRestartClick"
            >
              Restart...
            </button>
            <button
              class="pt-2xs pb-xs w-full border-b border-b-light-4 text-start"
              @click="handlePowerOffClick"
            >
              Power Off
            </button>

            <button
              class="pb-2xs pt-xs w-full text-start"
              @click="handleLockScreenClick"
            >
              Log Out
            </button>
          </div>
        </Collapse>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
