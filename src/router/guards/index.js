import permission from './permission/index.js'
import realname from './realname/index.js'

import { defineMiddleware } from '$uni-router/middleware'

export default (app, router) => {
  permission(router, { app })
  defineMiddleware('realname', realname, { router, app })
}
