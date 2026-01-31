import { useDesignerStore } from '@/store'

export const useAsideHook = () => {
  const designerStore = useDesignerStore()

  const packagesListObj: Record<string, string> = {
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
