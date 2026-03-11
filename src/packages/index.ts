import { BasicList } from './Basic'
import { ChartsList } from './Charts'

const indexModules: Record<string, { default: string }> = import.meta.glob('@/packages/**/index.vue', {
  eager: true,
})
// 懒加载
const configModules = import.meta.glob(['./**/**/config.ts', './**/config.ts'], { eager: false })

export const packagesList: Record<string, string> = {
  Basic: '基础',
  Charts: '图表',
}

export const componentsList = {
  Basic: BasicList,
  Charts: ChartsList,
}

const componentCacheMap = new Map()
const loadConfig = (packageName: string, categoryName: string, keyName: string) => {
  const key = packageName + categoryName + keyName
  if (!componentCacheMap.has(key)) {
    // 方式一：如果是动态路径，需要使用import.meta.glob缓存
    const configPath = `./${packageName}/${categoryName ? categoryName + '/' : ''}${keyName}/config.ts`
    const loadModuleFn = configModules[configPath];
    if (!loadModuleFn) {
      throw new Error(`配置文件路径不存在：${configPath}`); // 运行时兜底
    }
    componentCacheMap.set(key, loadModuleFn())
    // 方式二：如果是静态路径可使用下方写法
    // componentCacheMap.set(key, import(`./${packageName}/${categoryName}/${keyName}/config.ts`))
  }
  return componentCacheMap.get(key)
}

export const createComponent = async (targetData: ComponentItem) => {
  const { category, key } = targetData
  const chart = await loadConfig(targetData.package, category, key)
  return new chart.default()
}

function fetchComponent(chartName: string) {
  for (const key in indexModules) {
    const urlSplit = key.split('/')
    if (urlSplit[urlSplit.length - 2] === chartName) {
      return indexModules[key]
    }
  }
}

export function fetchChartComponent(dropData: ComponentItem) {
  const { key } = dropData
  return fetchComponent(key)?.default
}
