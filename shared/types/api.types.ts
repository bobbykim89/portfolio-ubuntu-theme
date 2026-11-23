export type ResType = {
  _id: string
  imageId: string
}

export type ApiErrorType = {
  code: string
  message: string
}

export type ApiSuccessResponse<T> = {
  ok: true
  data: T
}

export type ApiErrorResponse = {
  ok: false
  error: ApiErrorType
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse
