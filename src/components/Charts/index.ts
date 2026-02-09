import { BarCardConfig, BarConfig } from './Bars/index'
import { LineCardConfig, LineConfig } from './Lines/index'
import { PieCardConfig, PieConfig } from './Pies/index'

export const ChartsList: ComponentItem[] = [BarConfig, LineConfig, PieConfig]

export const ChartsConfig = {
  Bars: BarCardConfig,
  Lines: LineCardConfig,
  Pies: PieCardConfig,
}
