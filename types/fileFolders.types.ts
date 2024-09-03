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
  'md',
  'cs',
] as const
export type FileType = (typeof fileTypeList)[number]
export type FileMap = {
  [K in FileType]: string
}

const skillsTypeList = [
  'aws',
  'bitbucket',
  'bootstrap',
  'csharp',
  'css',
  'docker',
  'express',
  'fastapi',
  'fastify',
  'git',
  'html',
  'javascript',
  'jira',
  'matlab',
  'mongodb',
  'mongoose',
  'nestjs',
  'nodejs',
  'nuxt',
  'pinia',
  'postgres',
  'prisma',
  'python',
  'react',
  'redux',
  'rust',
  'sass',
  'svelte',
  'tailwindcss',
  'typescript',
  'vercel',
  'vue',
] as const
export type SkillType = (typeof skillsTypeList)[number]
export type SkillTypeMap = {
  [K in SkillType]: string
}
