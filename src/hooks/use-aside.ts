import { packagesList, componentsList } from '@/packages/index'

// type MenuOptionsType = {
//   key: string
//   name: string
//   list: ComponentItem[]
// }

export function useAsideHook() {
  // const menuOptions: MenuOptionsType[] = []
  const menuOptions = []

  ;(function () {
    for (const key in componentsList) {
      menuOptions.push({
        key,
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
