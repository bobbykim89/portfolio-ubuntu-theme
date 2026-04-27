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
  'astro',
  'aws',
  'bitbucket',
  'bootstrap',
  'conda',
  'csharp',
  'css',
  'django',
  'docker',
  'evidently',
  'express',
  'fastapi',
  'fastify',
  'flask',
  'git',
  'grafana',
  'html',
  'javascript',
  'jira',
  'kubernetes',
  'langchain',
  'matlab',
  'mlflow',
  'mongodb',
  'mongoose',
  'nestjs',
  'nodejs',
  'numpy',
  'nuxt',
  'pandas',
  'pinia',
  'postgres',
  'prefect',
  'prisma',
  'pylint',
  'pypi',
  'pytest',
  'python',
  'pytorch',
  'react',
  'redux',
  'rust',
  'sass',
  'scikit-learn',
  'scipy',
  'seaborn',
  'serverless',
  'svelte',
  'tailwindcss',
  'terraform',
  'typescript',
  'venv',
  'vercel',
  'vue',
  'xgboost',
] as const
export type SkillType = (typeof skillsTypeList)[number]
export type SkillTypeMap = {
  [K in SkillType]: string
}
