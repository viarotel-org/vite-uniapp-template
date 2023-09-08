import request from '@uni-helper/uni-network'

// import { responseSuccessCode } from '@/configs/request'

// console.log('request.defaults', request.defaults)

request.defaults.headers = {
  ...(request.defaults?.headers || {}),
}

export default {
  ...request,
  create: (options = {}) =>
    request.create({
      ...options,
      baseUrl: options.baseURL,
      validateStatus(...status) {
        return status !== 500
      },
    }),
}
