import { StatisticConfig } from './index'

export const StatisticChartConfig = {
  w: 4,
  h: 4,
}

export const StatisticCardConfig = {
  showlordMetrics: false,
  multiple: false,
}

export default class Config {
  public key = StatisticConfig.key
  public chart = { ...StatisticChartConfig }
  public config = { ...StatisticCardConfig }
}
