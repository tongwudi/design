function getURLProxy() {
  const { pathname } = window.location
  const index = pathname.indexOf('/view')
  return pathname.slice(0, index)
}
export const API_BASE = import.meta.env.DEV ? '/api' : getURLProxy()
