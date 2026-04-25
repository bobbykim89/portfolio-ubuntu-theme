import { ResType } from './api.types'

export interface FormattedPictureType extends ResType {
  thumbnail: string
  imageUrl: string
  fileName: string
}
