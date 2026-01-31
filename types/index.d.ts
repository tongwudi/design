declare interface ComponentItem {
  name: string
  category: string
  key: string
  w: number
  h: number
  minW: number
  minH: number
}

declare interface BasicConfig {
  title?: string
  showSearch?: boolean
  searchType?: 'date' | 'input' | 'select'
  searchKey?: string
}

declare interface DataSource {
  id: string
  type: 'static' | 'api'
  data?: any[]
  url?: string
  method?: 'GET' | 'POST'
  dataPath?: string
}

declare interface layoutItem extends ComponentItem {
  i: string
  x: number
  y: number
  config?: BasicConfig
  dataSource?: DataSource
}
