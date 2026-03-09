import { BarCommonConfig } from './index'

export const BarCommonChartConfig = {
  w: 12,
  h: 8,
}

export const BarCommonCardConfig = {
  showSelect: true,
  showlordMetrics: false,
}

export default class Config {
  public key = BarCommonConfig.key
  public chart = { ...BarCommonChartConfig }
  public config = { ...BarCommonCardConfig }
}
