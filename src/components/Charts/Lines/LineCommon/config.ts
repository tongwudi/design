import { LineCommonConfig } from './index'

export const LineCommonChartConfig = {
  w: 12,
  h: 8,
}

export const LineCommonCardConfig = {
  showSelect: true,
  showlordMetrics: false,
}

export default class Config {
  public key = LineCommonConfig.key
  public chart = { ...LineCommonChartConfig }
  public config = { ...LineCommonCardConfig }
}
