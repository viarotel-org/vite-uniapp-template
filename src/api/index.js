import * as base from './base/index.js'
import * as user from './user/index.js'
import * as home from './home/index.js'

const api = {
  ...base,
  ...user,
  ...home,
}

export default {
  install(app) {
    app.config.globalProperties.$api = api
  },
}
