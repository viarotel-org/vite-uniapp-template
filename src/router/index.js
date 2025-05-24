import { createRouter } from '$uni-router'

import routes from 'uni-router-routes'

import permission from '@/permission/index.js'

const router = createRouter({
  routes: [...routes],
})

permission(router)

export default router
