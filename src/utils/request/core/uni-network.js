import axios from '@uni-helper/uni-network'

axios.defaults.headers = {
  ...(axios.defaults?.headers || {}),
}

export default {
  ...axios,
  create: (options = {}) => axios.create({ ...options, baseUrl: options.baseURL }),
}
