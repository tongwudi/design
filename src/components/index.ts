// import { BasicConfig, BasicList } from './Basic'
// import { ChartsConfig, ChartsList } from './Charts'

// export const componentsList: Record<string, ComponentItem[]> = {
//   Basic: BasicList,
//   Charts: ChartsList,
// }

// export const cardConfig: Record<string, Record<string, any>> = {
//   Basic: BasicConfig,
//   Charts: ChartsConfig,
// }

import { BasicList } from './Basic'
import { ChartsList } from './Charts'

const module: Record<string, { default: string }> = import.meta.glob('@/components/**/index.vue', {
  eager: true,
})

export const packagesList: Record<string, string> = {
  Basic: '基础',
  Charts: '图表',
}

export const componentsList: Record<string, ComponentItem[]> = {
  Basic: BasicList,
  Charts: ChartsList,
}

const componentCacheMap = new Map<string, any>()
const loadConfig = (packageName: string, categoryName: string, keyName: string) => {
  const key = packageName + categoryName + keyName
  if (!componentCacheMap.has(key)) {
    const configModule = `./${packageName}/${categoryName ? categoryName + '/' : ''}${keyName}/config.ts`
    componentCacheMap.set(key, import(/* @vite-ignore */ configModule))
  }
  return componentCacheMap.get(key)
}

export const createComponent = async (targetData: ComponentItem) => {
  const { category, key } = targetData
  const chart = await loadConfig(targetData.package, category, key)
  return new chart.default()
}

function fetchComponent(chartName: string) {
  for (const key in module) {
    const urlSplit = key.split('/')
    if (urlSplit[urlSplit.length - 2] === chartName) {
      return module[key]
    }
  }
}

export function fetchChartComponent(dropData: ComponentItem) {
  const { key } = dropData
  return fetchComponent(key)?.default
}

