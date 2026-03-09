import Bars from './Bars'
import Lines from './Lines'
import Pies from './Pies'

// export const ChartsList = [...Bars, ...Lines, ...Pies]
export const ChartsList = [
  { name: '柱状图', list: Bars },
  { name: '折线图', list: Lines },
  { name: '饼图', list: Pies },
]
