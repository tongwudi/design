declare interface ComponentItem {
  name: string
  category: string
  key: string
  w: number
  h: number
  minW?: number
  minH?: number
}

declare interface DragWidget extends ComponentItem {
  i: string
  x: number
  y: number
}

// declare interface DefaultDataSource {
//   type: 'static' | 'api'
//   data?: any[]
//   url?: string
//   method?: 'GET' | 'POST'
//   dataPath?: string
// }

declare interface DefaultConfig {
  [key: string]: any
}

declare interface LayoutItem extends DragWidget {
  config: DefaultConfig
}
