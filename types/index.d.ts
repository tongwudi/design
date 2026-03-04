declare interface GridItem {
  i: string
  w: number
  h: number
  x: number
  y: number
  minW?: number
  minH?: number
}

declare interface ComponentItem {
  category: string
  categoryName: string
  key: string
  package: string
  title: string
}

declare interface DefaultConfig {
  [key: string]: any
}

declare interface LayoutItem extends ComponentItem, GridItem {
  config: DefaultConfig
}