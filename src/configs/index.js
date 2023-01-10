// const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'
const isH5 = process.env.UNI_PLATFORM === 'h5'

export const title = 'vite-uniapp-template'

export const company = {
  name: 'vite-uniapp-template',
  wechat: 'viarotel',
  mail: 'viarotel@qq.com',
  address: '河南省郑州市',
}

// 项目基础路径
export const appBasePath = isProduction ? './' : './'
// 请求地址
export const requestURL = 'http://192.168.0.186:9009/'
// export const requestURL = 'http://huishencloud.cn:9101/'

// 是否开启代理
export const useProxy = isH5
// 代理路径
export const proxyPath = '/api'
// 代理端口号
export const proxyPort = 7777
// 是否开启加密
export const useEncrypt = false

// CDN 资源基础域名
export const assetURL = 'https://cdn.com'

export default {
  title,
  appBasePath,
  requestURL,
  useProxy,
  proxyPath,
  proxyPort,
  useEncrypt,
}
