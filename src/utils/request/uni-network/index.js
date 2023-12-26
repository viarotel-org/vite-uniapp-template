import qs from 'qs'
import uniNetwork from './core/index'
import { baseURL, timeout } from '@/configs/request'

export default ({
  onRequest,
  onRequestError,
  onResponse,
  onResponseError,
} = {}) => {
  // 创建请求服务
  const service = uniNetwork.create({
    baseURL,
    headers: {
      'content-type': 'application/json;charset=utf-8',
    },
    timeout,
    xsrfHeaderName: 'token',
    paramsSerializer: (params) => {
      return Object.prototype.toString.call(params).includes('URLSearchParams')
        ? params.toString()
        : qs.stringify(params)
    },
  })

  // 请求拦截
  service.onRequest = (config) => {
    // 解决 content-type 大小写覆盖问题
    if (config.headers['content-type']) {
      config.headers['Content-Type'] = config.headers['content-type']
      delete config.headers['content-type']
    }
    // 解决query无法传递数组的问题
    config.paramsSerializer = params =>
      qs.stringify(params, {
        arrayFormat: 'repeat',
      })

    return onRequest({
      url: config.url,
      configs: config,
      headers: config.headers,
      bodyKey: 'data',
      queryKey: 'params',
    })
  }

  // 请求失败拦截
  service.onRequestError = (error) => {
    const { config } = error
    return onRequestError({
      url: config.url,
      configs: config,
      headers: Object.fromEntries(config.headers.entries()),
      bodyKey: 'body',
      queryKey: 'query',
      error,
    })
  }

  // 响应拦截
  service.onResponse = async (response) => {
    // console.log('response', response)
    const { config } = response
    response = await onResponse({
      url: config.url,
      configs: config,
      response,
      dataKey: 'data',
    })

    return response.data
  }

  // 响应失败拦截
  service.onResponseError = error =>
    onResponseError({
      dataKey: 'data',
      response: {
        status: 500,
        statusText: error.message,
      },
      error,
    })

  service.interceptors.request.use(service.onRequest, service.onRequestError)
  service.interceptors.response.use(service.onResponse, service.onResponseError)

  /**
   * 以表单形式提交数据
   * @param  url
   * @param  params 要提交的参数(数据)
   * @param  useFormData 是否自动将 data 转为 FormData 格式
   * @returns {Promise}
   */
  service.form = (
    url,
    params,
    { useFormData = true, paramsKey = 'data', ...options } = {},
  ) => {
    if (useFormData) {
      const formParams = new FormData()
      Object.entries(params).forEach(([key, value]) => {
        formParams.append(key, value)
      })
      params = formParams
    }

    return service({
      url,
      [paramsKey]: params,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      ...options,
    })
  }

  /**
   * 以表单地址栏查询形式提交数据
   * @param  url
   * @param  params 要提交的参数(数据)
   * @param  useQuery 是否自动将 data 转为 FormData 格式
   * @returns {Promise}
   */
  service.query = (
    url,
    params,
    { useQuery = true, paramsKey = 'data', ...options } = {},
  ) => {
    if (useQuery) {
      const queryParams = qs.stringify(params)
      params = queryParams
    }

    return service({
      url,
      [paramsKey]: params,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      ...options,
    })
  }

  /**
   * 重写 get 别名以实现第二个参数可以直接传参
   * @param  url
   * @param  params 要提交的参数(数据)
   * @param  useQuery 是否自动将 data 转为 FormData 格式
   * @returns {Promise}
   */
  service.get = (url, params, { paramsKey = 'params', ...options } = {}) =>
    service({
      url,
      method: 'GET',
      [paramsKey]: params,
      ...options,
    })
  return service
}
