import { usePictureStore } from '@/stores'

export default defineNuxtPlugin({
  name: 'set-img-data',
  async setup(nuxtApp) {
    const pictureStore = usePictureStore()
    nuxtApp.hook('app:created', async () => {
      await pictureStore.setImageData()
    })
  },
})
