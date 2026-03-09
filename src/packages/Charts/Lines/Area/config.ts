import { AreaConfig } from './index'

export const AreaChartConfig = {
  w: 12,
  h: 8,
}

export const AreaCardConfig = {
  showSelect: true,
  showlordMetrics: false,
}

export default class Config {
  public key = AreaConfig.key
  public chart = { ...AreaChartConfig }
  public config = { ...AreaCardConfig }
}
