const appArray = [
  'terminal',
  'file-manager',
  'office',
  'firefox',
  'music',
  'trash',
  'image-viewer',
  'document-reader',
  'settings',
  'calculator',
] as const
export type AppType = (typeof appArray)[number]

export type AppStatus = {
  open: boolean
  active: boolean
}

export type AppTypeMap = {
  [K in AppType]: AppStatus
}

export type MainAppIconType = (typeof appArray)[number]
export type IconInfo = {
  src: string
  alt: string
}
export type MainAppIconMap = {
  [K in MainAppIconType]: IconInfo
}

export type AppContainerPropTypes = {
  initialX: number
  initialY: number
  visible: boolean
  maximized?: boolean
  active: boolean
  appName: string
  containerSize?: '30' | '50' | '70'
  disableMaximize?: boolean
}

export type CoordinatesType = {
  x: number
  y: number
}
