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
  'django',
  'docker',
  'express',
  'fastapi',
  'fastify',
  'flask',
  'git',
  'html',
  'javascript',
  'jira',
  'matlab',
  'mongodb',
  'mongoose',
  'nestjs',
  'nodejs',
  'numpy',
  'nuxt',
  'pandas',
  'pinia',
  'postgres',
  'prisma',
  'python',
  'pytorch',
  'react',
  'redux',
  'rust',
  'sass',
  'scikit-learn',
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
