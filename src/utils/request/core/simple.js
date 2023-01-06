import { joinPath, requestModel } from './utils'

const defaults = {
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
}

const interceptors = {
  request: {
    use: (success, fail) => {
      interceptors.request.success = success
      interceptors.request.fail = fail
    },
    middleware: async (options = {}) => {
      const success = interceptors.request.success
      const fail = interceptors.request.fail

      const ret = success ? success(options) : null

      if (!ret) {
        return Promise.reject(fail(options))
      }

      return ret
    },
  },
  response: {
    use: (success, fail) => {
      interceptors.response.success = success
      interceptors.response.fail = fail
    },
    middleware: async (options = {}) => {
      const success = interceptors.response.success
      const fail = interceptors.response.fail
      const { type } = options

      if (type === 'success') {
        const ret = success ? success(options) : null
        if (!ret) {
          return Promise.reject(fail(options))
        }

        return ret
      }

      return Promise.reject(fail(options))
    },
  },
  resolve: async (request, { path, data, options = {} } = {}) => {
    const headers = {
      ...defaults.headers,
      ...(options.headers || {}),
    }

    const timeout = options.timeout || defaults.timeout

    let resolveOptions = {}

    try {
      resolveOptions = await interceptors.request.middleware({
        ...options,
        url: joinPath(options.baseURL, path),
        data,
        headers,
        timeout,
      })
    } catch (error) {
      return error
    }

    try {
      const res = await request(resolveOptions)

      const resolveRes = await interceptors.response.middleware({
        type: 'success',
        config: resolveOptions,
        request: resolveOptions,
        data: res,
      })

      return resolveRes.data
    } catch (fail) {
      // console.log('fail', fail)

      const resolveRet = await interceptors.response.middleware({
        type: 'fail',
        config: resolveOptions,
        request: resolveOptions,
        data: fail,
      })

      return resolveRet.fail
    }
  },
}

const create = (initOptions = {}) => {
  console.log('create.initOptions', initOptions)
  return {
    post: (...params) => interceptors.resolve(requestModel, {
      path: params[0],
      data: params[1],
      options: {
        ...initOptions,
        ...(params[2] || {}),
        method: 'POST',
      },
    }),
    get: (...params) => interceptors.resolve(requestModel, {
      path: params[0],
      data: params[1]?.params || params[1]?.data || params[1] || {},
      options: {
        ...initOptions,
        ...(params[1] || params[2] || {}),
        method: 'GET',
      },
    }),
    interceptors,
  }
}

export default {
  create,
  defaults,
}
