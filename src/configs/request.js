import {
  proxyPath,
  requestFilePath,
  requestPath,
  requestURL,
  useProxy,
} from './index'

const isDevelopment = process.env.NODE_ENV === 'development'

// 请求基础域名
export function getBaseURL() {
  let tempURL = ''
  if (useProxy) {
    tempURL = isDevelopment ? proxyPath : window.location.origin + requestPath
  }
  else {
    tempURL = requestURL + requestPath
  }
  return tempURL
}

// 文件基础域名
export function getFileBaseURL() {
  let tempURL = ''
  if (useProxy) {
    tempURL = isDevelopment
      ? requestFilePath
      : window.location.origin + requestFilePath
  }
  else {
    tempURL = requestURL + requestFilePath
  }
  return tempURL
}

// 请求域名
export const baseURL = getBaseURL()
// 响应成功code值
export const responseSuccessCode = '20000'
// 超时时间
export const timeout = 60 * 1000
// 是否开启加密
export { useEncrypt } from './index'
