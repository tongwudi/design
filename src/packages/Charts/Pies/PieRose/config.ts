import { PieRoseConfig } from './index'

export const PieRoseChartConfig = {
  w: 12,
  h: 8,
}

export const PieRoseCardConfig = {
  showlordMetrics: true,
}

export default class Config {
  public key = PieRoseConfig.key
  public chart = { ...PieRoseChartConfig }
  public config = { ...PieRoseCardConfig }
}
