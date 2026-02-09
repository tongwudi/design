import { BasicConfig, BasicList } from './Basic'
import { ChartsConfig, ChartsList } from './Charts'

export const componentsList: Record<string, ComponentItem[]> = {
  Basic: BasicList,
  Charts: ChartsList,
}

export const cardConfig: Record<string, Record<string, any>> = {
  Basic: BasicConfig,
  Charts: ChartsConfig,
}
