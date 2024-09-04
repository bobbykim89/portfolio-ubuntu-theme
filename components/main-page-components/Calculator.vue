<script setup lang="ts">
import { useCalculatorStore } from '@/stores'
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

const calculatorStore = useCalculatorStore()
const { isActive, isVisible } = storeToRefs(calculatorStore)
const calcResult = ref<string>('')
const isCalculated = ref<boolean>(false)

const closeCalculator = () => {
  calculatorStore.closeCalculator()
  emit('close-click')
}
const minimizeCalculator = () => {
  calculatorStore.minimizeCalculator()
  emit('set-active', false)
}
const setCalculatorActive = (val: boolean) => {
  calculatorStore.setCalculatorActive(val)
  emit('set-active', val)
}
const onNumClick = (val: string) => {
  if (isCalculated.value) {
    calcResult.value = val
    isCalculated.value = false
  } else {
    calcResult.value += val
  }
}
const onClearClick = () => {
  calcResult.value = ''
  isCalculated.value = false
}
const onClearEntry = () => {
  if (calcResult.value && calcResult.value.length > 0) {
    calcResult.value = calcResult.value.slice(0, -1)
    if (calcResult.value.length === 0) {
      onClearClick()
    }
  } else {
    onClearClick()
  }
}
const onOperatorClick = (operator: string) => {
  // replace the last character with the new operator if it is an operator
  if (/[+*/-]$/.test(calcResult.value)) {
    calcResult.value = calcResult.value.slice(0, -1) + operator
  } else {
    // add new operator
    calcResult.value += operator
  }
  // reset flag
  isCalculated.value = false
}
const calculate = () => {
  try {
    let evaluatedResult = eval(
      calcResult.value.replace(/(^|[^0-9])0+(\d+)/g, '$1$2')
    )
    if (evaluatedResult === Infinity || evaluatedResult === -Infinity) {
      throw new Error('Divide by zero error')
    }
    calcResult.value = Number.isFinite(evaluatedResult)
      ? evaluatedResult
      : 'Error'
    // set flag to true after calculator
    isCalculated.value = true
  } catch (error) {
    if (error instanceof Error) {
      calcResult.value =
        error.message === 'Divide by zero error'
          ? 'Error: Divide by zero'
          : 'Error'
    }
  }
}
</script>

<template>
  <AppContainerGeneric
    app-name="Calculator"
    :initial-x="initialX"
    :initial-y="initialY"
    :visible="isVisible"
    :active="isActive"
    :disable-maximize="true"
    container-size="30"
    @close-click="closeCalculator"
    @minimize-click="minimizeCalculator"
    @set-active="setCalculatorActive"
  >
    <div class="bg-dark-3 h-full text-light-1 pt-3xs pb-3xs px-3xs relative">
      <div>
        <div class="grid grid-cols-4 gap-1 justify-items-center text-xl">
          <!-- <input
            type="text"
            :value="calcResult"
            readonly
            class="bg-transparent col-span-4"
          /> -->
          <div class="col-span-4 py-xs text-[2rem]">
            &nbsp;{{ calcResult }}&nbsp;
          </div>
          <!-- 1st row -->
          <button
            class="w-full bg-dark-1 py-xs col-span-2"
            @click="onClearClick"
          >
            AC
          </button>
          <button class="w-full bg-dark-1 py-xs" @click="onClearEntry">
            CE
          </button>
          <button class="w-full bg-warning py-xs" @click="onOperatorClick('/')">
            /
          </button>

          <!-- 2nd row -->
          <button class="w-full bg-dark-2 py-xs" @click="onNumClick('7')">
            7
          </button>
          <button class="w-full bg-dark-2 py-xs" @click="onNumClick('8')">
            8
          </button>
          <button class="w-full bg-dark-2 py-xs" @click="onNumClick('9')">
            9
          </button>

          <button class="w-full bg-warning py-xs" @click="onOperatorClick('*')">
            *
          </button>

          <!-- 3rd row -->
          <button class="w-full bg-dark-2 py-xs" @click="onNumClick('4')">
            4
          </button>
          <button class="w-full bg-dark-2 py-xs" @click="onNumClick('5')">
            5
          </button>
          <button class="w-full bg-dark-2 py-xs" @click="onNumClick('6')">
            6
          </button>
          <button class="w-full bg-warning py-xs" @click="onOperatorClick('-')">
            -
          </button>

          <!-- 4th row -->
          <button class="w-full bg-dark-2 py-xs" @click="onNumClick('1')">
            1
          </button>
          <button class="w-full bg-dark-2 py-xs" @click="onNumClick('2')">
            2
          </button>
          <button class="w-full bg-dark-2 py-xs" @click="onNumClick('3')">
            3
          </button>
          <button class="w-full bg-warning py-xs" @click="onOperatorClick('+')">
            +
          </button>

          <!-- 5th row -->
          <button
            class="col-span-2 w-full bg-dark-2 py-xs lg:rounded-bl-md"
            @click="onNumClick('0')"
          >
            0
          </button>
          <button class="w-full bg-dark-2 py-xs" @click="onNumClick('.')">
            .
          </button>
          <button
            class="w-full bg-warning py-xs lg:rounded-br-md"
            @click="calculate"
          >
            =
          </button>
        </div>
      </div>
    </div>
  </AppContainerGeneric>
</template>

<style scoped></style>
