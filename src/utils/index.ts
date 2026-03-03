const module: Record<string, { default: string }> = import.meta.glob('@/components/**/index.vue', {
  eager: true,
})

/**
 * 动态注册组件
 */
export function componentInstall<T>(key: string, node: T) {
  if (!window.$vue.component(key) && node) {
    window.$vue.component(key, node)
  }
}

export function fetchChartComponent(dropData: ComponentItem) {
  const { key } = dropData
  return fetchComponent(key)?.default
}

function fetchComponent(chartName: string) {
  for (const key in module) {
    const urlSplit = key.split('/')
    if (urlSplit[urlSplit.length - 2] === chartName) {
      return module[key]
    }
  }
}
