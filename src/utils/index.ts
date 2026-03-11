/**
 * 动态注册组件
 */
export function componentInstall<T>(key: string, node: T) {
  if (!window.$vue.component(key) && node) {
    window.$vue.component(key, node)
  }
}

interface DataItem {
  dates: string[]
  metricsName: string
  amounts: number[]
}
export function generateSourceData(data: DataItem[]) {
  if (!Array.isArray(data) || data.length === 0) {
    return []
  }

  // 生成表头（name + 所有指标名）
  const metricsNames = data.map(item => item.metricsName)
  const header = ['name', ...metricsNames]

  // 生成每行数据（日期 + 各指标对应数值）
  const dates = data[0]?.dates ?? []
  const rows = dates.map((date, dateIndex) => {
    const values = data.map(item => item.amounts[dateIndex] ?? 0)
    return [date, ...values]
  })

  return [header, ...rows]
}
