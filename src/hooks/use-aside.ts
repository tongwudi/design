import { componentsList } from '@/components/index'

export function useAsideHook() {
  const packagesListObj: Record<string, string> = {
    Basic: '基础',
    Charts: '图表',
  }

  const menuOptions = []

  ;(function () {
    for (const key in componentsList) {
      menuOptions.push({
        name: packagesListObj[key],
        key,
        children: componentsList[key],
      })
    }
  })()

  return {
    menuOptions,
  }
}
