import { packagesList, componentsList } from '@/components/index'

export type MenuOptionsType = {
  key: string
  name: string
  list: ComponentItem[]
}

export function useAsideHook() {
  const menuOptions: MenuOptionsType[] = []

  ;(function () {
    for (const key in componentsList) {
      menuOptions.push({
        key,
        // @ts-ignore
        name: packagesList[key],
        // @ts-ignore
        list: componentsList[key],
      })
    }
  })()

  return {
    menuOptions,
  }
}
