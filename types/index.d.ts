declare interface BasicField {
  title?: string
  showSearch?: boolean
  searchType?: 'input' | 'select'
  searchKey?: string
}

declare interface layoutChildItem {
  name: string
  i: string
  x: number
  y: number
  w: number
  h: number
  minW: number
  minH: number
  config?: BasicField
}

declare interface ComponentItem {
  name: string
  children: layoutChildItem[]
}

declare interface DataSourceItem {
  id: string
  type: 'static' | 'api'
  data?: any[]
  url?: string
  method?: 'GET' | 'POST'
  dataPath?: string
}
