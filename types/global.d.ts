import type { AxiosInstance } from 'axios'
import type { App } from 'vue'

export {}

declare global {
  interface Window {
    $http: AxiosInstance
    $vue: App<Element>
  }
}
