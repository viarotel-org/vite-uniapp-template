import * as base from './base/index.js'
import * as user from './user/index.js'
import * as home from './home/index.js'
import * as realname from './realname/index.js'

const api = {
  ...base,
  ...user,
  ...home,
  ...realname,
}

export default {
  install(app) {
    app.config.globalProperties.$api = api
  },
}
