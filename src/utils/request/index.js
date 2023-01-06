import qs from 'qs'
import isString from 'lodash/isString'
import axios from './core/index.js'
import store from '@/store/index.js'
import router from '@/router/index.js'
// import { binaryParser } from '@/utils/index.js'
import { useToast, useLoading } from '@/utils/modals/index.js'
import {
  baseURL,
  timeout,
  responseSuccessCode,
  useEncrypt,
} from '@/configs/request.js'
import { aes } from '@/utils/encrypt.js'
import { requestConsoles, responseConsoles } from './helper.js'

// import adapter from './adapter.js'

// console.log('axios', axios)

// 检查是否需要加密
const checkEncrypt = (contentType) => contentType !== 'application/x-www-form-urlencoded' && useEncrypt

axios.defaults.headers = {
  ...(axios.defaults?.headers || {}),
  'Content-Type': 'application/json;charset=utf-8',
}

const service = axios.create({
  baseURL,
  timeout,
  // adapter,
})

// 请求拦截
service.interceptors.request.use(
  (request) => {
    requestConsoles(request)

    if (request.loading) {
      useLoading('努力加载中, 请稍后...')
    }

    // 数据加密
    const _useEncrypt = checkEncrypt(request.headers['Content-Type'])
    // console.log('_useEncrypt', _useEncrypt)
    if (_useEncrypt) {
      request.data = aes.encrypt(request.data)
      request.headers.sign = aes.encrypt({
        signTime: Date.parse(new Date()),
      })
    }

    // withCredentials
    const userStore = store.useUserStore()
    const token = userStore.token
    if (token) request.headers.token = token

    if (!request.data) request.data = {}

    // 解决query无法传递数组的问题
    request.paramsSerializer = (params) => qs.stringify(params, {
      arrayFormat: 'repeat',
    })

    return request
  },
  (error) => Promise.reject(error),
)

// 响应拦截
service.interceptors.response.use(
  async (response) => {
    responseConsoles(response)

    if (response.config.loading) {
      useLoading(false)
    }

    let res = response.data

    // 数据解密
    if (useEncrypt && isString(res)) res = aes.decrypt(res)

    // 文件二进制流响应全部数据（PS:文件名在请求头中）
    // if (response.request.responseType === 'blob') {
    //   res = await binaryParser(response)
    // }

    if (
      res.code === '1005'
      || res.code === '1006'
      || res.code === '1000'
      || (res.code === '1010' && response.config.url.indexOf('/login') === -1)
    ) {
      const userStore = store.useUserStore()
      userStore.logout().then(() => {
        useToast(res.message || '验证失败，请重新登录!', {
          type: 'error',
        })
        router.replace('/login')
      })
    } else if (res.code !== responseSuccessCode && res.message) {
      useToast(res.message, {
        type: 'warning',
        duration: 5 * 1000,
      })
    }
    return res
  },
  (error) => {
    console.log(`err: ${error}`) // for debug
    const status = error.response.status

    if (status === 401 || status === 403) {
      const userStore = store.useUserStore()
      userStore.logout().then(() => {
        useToast('验证失败，请重新登录!', {
          type: 'error',
        })
        router.replace('/login')
      })
    } else {
      useToast(error.message, {
        type: 'error',
        duration: 5 * 1000,
      })
      return Promise.reject(error)
    }
  },
)

/**
 * 以表单形式提交数据
 * @param {*} url
 * @param {*} data 要提交的参数(数据)
 * @param {*} param2 uploadFile 为真时支持携带文件进行表单提交 否则不支持
 * @returns {Promise}
 */
service.form = (url, data, { uploadFile = false, ...options } = {}) => {
  if (!uploadFile) {
    return service.post(url, data, {
      ...options,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
  }

  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value)
  })
  return service.post(url, formData, {
    ...options,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export default service
