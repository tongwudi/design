import { LineAreaConfig } from './index'

export const LineAreaChartConfig = {
  w: 12,
  h: 8,
}

export const LineAreaCardConfig = {
  showSelect: true,
  showlordMetrics: false,
}

export default class Config {
  public key = LineAreaConfig.key
  public chart = { ...LineAreaChartConfig }
  public config = { ...LineAreaCardConfig }
}
