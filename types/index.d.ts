declare interface ComponentItem {
  category: string
  categoryName: string
  key: string
  package: string
  title: string
}

declare interface GridItem {
  i: string
  w: number
  h: number
  x: number
  y: number
}

declare interface DefaultConfig {
  [key: string]: any
}

declare interface WidgetItem extends ComponentItem, GridItem {
  config: DefaultConfig
}
