export type WallpaperDataType = {
  fileName: string
}

export interface WallpaperThumbType extends WallpaperDataType {
  thumbUrl: string
}

export interface WallpaperImageType extends WallpaperDataType {
  fileUrl: string
}
