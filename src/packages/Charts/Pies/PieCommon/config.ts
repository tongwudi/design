import { PieCommonConfig } from './index'

export const PieCommonChartConfig = {
  w: 12,
  h: 8,
}

export const PieCommonCardConfig = {
  showlordMetrics: true,
}

export default class Config {
  public key = PieCommonConfig.key
  public chart = { ...PieCommonChartConfig }
  public config = { ...PieCommonCardConfig }
}
