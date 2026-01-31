
const module: Record<string, { default: string }> = import.meta.glob('../components/**/index.vue', {
  eager: true
})

/**
 * * 动态注册组件
 */
export const componentInstall = <T>(key: string, node: T) => {
  if (!(window as any)['$vue'].component(key) && node) {
    (window as any)['$vue'].component(key, node)
  }
}

export const fetchChartComponent = (dropData: ConfigType) => {
  const { key } = dropData
  return fetchComponent(key)?.default
}

const fetchComponent = (chartName: string) => {
  for (const key in module) {
    const urlSplit = key.split('/')
    if (urlSplit[urlSplit.length - 2] === chartName) {
      return module[key]
    }
  }
}

const componentCacheMap = new Map<string, any>()
const loadConfig = (categoryName: string, keyName: string) => {
  const key = categoryName + keyName
  if (!componentCacheMap.has(key)) {
    componentCacheMap.set(
      key,
      import(`../components/${categoryName}/${keyName}/config.ts`),
    )
  }
  return componentCacheMap.get(key)
}

export const createComponent = async (targetData: any) => {
  const { category, key } = targetData
  const chart = await loadConfig(category, key)
  return new chart.default()
}
