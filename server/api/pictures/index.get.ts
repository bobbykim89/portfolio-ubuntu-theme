import { ResType } from '@/types'

export default defineEventHandler(async () => {
  const res = await $fetch<ResType[]>(
    'https://manguito-page.vercel.app/api/post/trimmed?sort=asc'
  )
  return res
})
