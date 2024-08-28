import { usePictureStore } from '@/stores'

export default defineNuxtRouteMiddleware(async () => {
  const pictureStore = usePictureStore()
  await pictureStore.setImageData()
})
