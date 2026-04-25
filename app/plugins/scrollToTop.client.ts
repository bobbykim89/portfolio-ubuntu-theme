import { defineNuxtPlugin } from '#imports'
import { useWindowScroll } from '@vueuse/core'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('page:finish', () => {
    const { x, y } = useWindowScroll({ behavior: 'smooth' })
    setTimeout(() => {
      x.value = 0
      y.value = 0
    }, 300)
  })
})
