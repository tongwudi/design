import { RoseConfig } from './index'

export const RoseChartConfig = {
  w: 12,
  h: 8,
}

export const RoseCardConfig = {
  showlordMetrics: true,
}

export default class Config {
  public key = RoseConfig.key
  public chart = { ...RoseChartConfig }
  public config = { ...RoseCardConfig }
}
