import { LineSmoothConfig } from './index'

export const LineSmoothChartConfig = {
  w: 12,
  h: 8,
}

export const LineSmoothCardConfig = {
  showSelect: true,
  showlordMetrics: false,
}

export default class Config {
  public key = LineSmoothConfig.key
  public chart = { ...LineSmoothChartConfig }
  public config = { ...LineSmoothCardConfig }
}
