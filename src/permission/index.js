import { defineMiddleware } from '$uni-router'
import login from './login/index.js'
import test from './test/index.js'

export default function permission(router) {
  login(router)
  defineMiddleware('test', test, { router })
}
