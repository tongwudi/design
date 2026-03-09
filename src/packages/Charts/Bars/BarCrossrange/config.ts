import { BarCrossrangeConfig } from './index'

export const BarCrossrangeChartConfig = {
  w: 12,
  h: 8,
}

export const BarCrossrangeCardConfig = {
  showSelect: true,
  showlordMetrics: false,
}

export default class Config {
  public key = BarCrossrangeConfig.key
  public chart = { ...BarCrossrangeChartConfig }
  public config = { ...BarCrossrangeCardConfig }
}
