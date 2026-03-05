import { RoseConfig } from './index'

export const RoseCommonChartConfig = {
  w: 12,
  h: 8,
}

export const RoseCommonCardConfig = {
  showlordMetrics: true,
}

export default class Config {
  public key = RoseConfig.key
  public chart = { ...RoseCommonChartConfig }
  public config = { ...RoseCommonCardConfig }
}
