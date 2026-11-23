import type { ApiResponse, ResType } from '#shared/types'

export default defineEventHandler(async (): Promise<ResType[]> => {
  const config = useRuntimeConfig()
  const res = await $fetch<ApiResponse<ResType[]>>(
    `${config.photoApiUrl}/api/post/trimmed?sort=asc`,
    { ignoreResponseError: true },
  )
  if (!res?.ok) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch pictures',
      message: res?.error?.message ?? 'Unexpected response from photo API',
      data: res?.error,
    })
  }
  return res.data
})
