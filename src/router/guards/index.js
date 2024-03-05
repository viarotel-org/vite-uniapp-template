import login from './login/index.js'
import realname from './realname/index.js'

import { defineMiddleware } from '$uni-router/middleware'

export default (app, router) => {
  login(router, { app })
  defineMiddleware('realname', realname, { router, app })
}
