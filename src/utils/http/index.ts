import { message } from 'ant-design-vue'
import axios from 'axios'
import { API_BASE } from '@/enums'

const defaultHeaders = {
  'Content-Type': 'application/json;charset=UTF-8',
}

const http = axios.create({
  baseURL: API_BASE,
  timeout: 1000 * 10,
  validateStatus(status) {
    const valid = status === 200
    if (!valid) {
      message.error(`请求失败. status:${status}`)
    }

    return valid
  },
  headers: defaultHeaders,
})

http.interceptors.request.use(
  (conf) => {
    const headers: Record<string, string> = { ...(conf.headers as any) }
    // const token = getToken()
    const token = ''

    if (token && !headers.token) {
      headers.token = token
    }

    conf.headers = headers as any

    return conf
  },
  err => Promise.reject(err),
)

export const successfulCodes = [0]

// 登录过期跳转到登录页
function jumpToLogin(data: { status?: number }) {
  if (data?.status === 40320) {
    // router.push('/login')
  }
}

http.interceptors.response.use(
  (res) => {
    const { data, config } = res
    const { headers } = config
    const { hideGlobalMessage } = headers!

    if (!successfulCodes.includes(data.status)) {
      if (!hideGlobalMessage) {
        message.error(`${data.message || data.msg || ' 处理失败 '}`)
      }

      jumpToLogin(data)

      return Promise.reject(data.message || data.msg)
    }

    return Promise.resolve(data)
  },
  (err) => {
    const { data } = err?.response || {}
    jumpToLogin(data)

    return Promise.reject(err)
  },
)
window.$http = http
export default http
