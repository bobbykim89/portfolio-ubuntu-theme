import type { FolderType } from './fileFolders.types'

const directoryArray = [
  'home',
  'documents',
  'documents/about',
  'documents/projects',
  'documents/skills',
  'music',
  'picture',
  'trash',
] as const
export type DirectoryType = (typeof directoryArray)[number]
type DirectoryDataType = {
  name: string
  icon: string
  component: Component
}
export type DirectoryMap = {
  [k in DirectoryType]: DirectoryDataType
}

export type HomeFoldersType = {
  type: FolderType
  text: string
}
