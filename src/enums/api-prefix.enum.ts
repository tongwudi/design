function getURLProxy() {
  const { pathname } = window.location
  const index = pathname.indexOf('/view/file')
  return pathname.slice(0, index)
}
export const API_BASE = import.meta.env.DEV ? '/api' : getURLProxy()

export enum ApiPrefixEnum {
  SECURITY = '/security',
}
