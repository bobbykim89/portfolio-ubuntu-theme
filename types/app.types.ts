const appArray = [
  'terminal',
  'file-manager',
  'office',
  'firefox',
  'music',
  'trash',
] as const
export type AppType = (typeof appArray)[number]

export type AppStatus = {
  open: boolean
  active: boolean
}

export type AppTypeMap = {
  [K in AppType]: AppStatus
}
