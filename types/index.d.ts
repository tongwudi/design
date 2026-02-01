declare interface ComponentItem {
  name: string
  category: string
  key: string
  w: number
  h: number
  minW: number
  minH: number
}

declare interface DragWidget extends ComponentItem {
  i: string
  x: number
  y: number
}

declare interface DefaultOption {
  title?: string
  showSearch?: boolean
  searchType?: 'date' | 'input' | 'select'
  searchKey?: string
}

declare interface DefaultDataSource {
  type: 'static' | 'api'
  data?: any[]
  url?: string
  method?: 'GET' | 'POST'
  dataPath?: string
}

declare interface DefaultConfig extends DefaultDataSource {
  option: DefaultOption
}

declare interface layoutItem extends DragWidget {
  config: DefaultConfig
}
