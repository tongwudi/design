import { useDesignerStore } from '@/store'

export function useAsideHook() {
  const designerStore = useDesignerStore()

  const packagesListObj: Record<string, string> = {
    Basic: '基础',
    Charts: '图表',
  }

  const menuOptions = []

  ;(function () {
    for (const key in designerStore.getComponentList) {
      menuOptions.push({
        name: packagesListObj[key],
        children: designerStore.getComponentList[key],
      })
    }
  })()

  return {
    menuOptions,
  }
}
