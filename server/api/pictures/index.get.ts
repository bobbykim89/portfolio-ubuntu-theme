import { ResType } from '@/types'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()
  const res = await $fetch<ResType[]>(
    `${config.photoApiUrl}/api/post/trimmed?sort=asc`
  )
  return res
})
