const folderTypeList = ['default', 'documents', 'music', 'pictures'] as const
export type FolderType = (typeof folderTypeList)[number]
export type FolderMap = {
  [K in FolderType]: string
}

const fileTypeList = [
  'image',
  'music',
  'text',
  'rust',
  'cpp',
  'js',
  'py',
  'docker',
  'ruby',
] as const
export type FileType = (typeof fileTypeList)[number]
export type FileMap = {
  [K in FileType]: string
}
