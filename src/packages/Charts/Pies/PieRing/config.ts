import { PieRingConfig } from './index'

export const PieRingChartConfig = {
  w: 12,
  h: 8,
}

export const PieRingCardConfig = {
  showlordMetrics: true,
}

export default class Config {
  public key = PieRingConfig.key
  public chart = { ...PieRingChartConfig }
  public config = { ...PieRingCardConfig }
}
