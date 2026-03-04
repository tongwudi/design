// import { BarConfig, BarCardConfig } from './Bar/index'
// import { LineConfig, LineCardConfig } from './Line/index'
// import { PieConfig, PieCardConfig } from './Pie/index'
// import { RoseConfig, RoseCardConfig } from './Rose/index'

// export const ChartsList: ComponentItem[] = [BarConfig, LineConfig, PieConfig, RoseConfig]

// export const ChartsConfig = {
//   Bar: BarCardConfig,
//   Line: LineCardConfig,
//   Pie: PieCardConfig,
//   Rose: RoseCardConfig,
// }
import Bars from './Bars'
import Lines from './Lines'
import Pies from './Pies'

export const ChartsList = [...Bars, ...Lines, ...Pies]
