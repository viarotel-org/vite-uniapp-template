import * as base from './modules/base'
import * as user from './modules/user'
import * as weChat from './modules/weChat'

export const requests = {
  ...base,
  ...user,
  ...weChat,
}

export default function install(app) {
  app.config.globalProperties.$req = requests
}
