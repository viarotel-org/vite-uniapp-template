import { createRouter as _createRouter } from 'uniapp-router-next'
import { aliasTransformer, resolvePages } from './helper.js'

export { useRouter, useRoute } from 'uniapp-router-next'

export * from './helper.js'

export function createRouter({ pages, redirect, ...options } = {}) {
  const routes = resolvePages(pages, { addRoot: true })
  const homeRoute = {
    ...routes.find(item => item.type === 'home'),
    path: '/',
  }

  const router = _createRouter({
    platform: process.env.UNI_PLATFORM,
    ...options,
    pages,
    routes: [...routes, homeRoute, ...redirect],
  })

  const alias = aliasTransformer(router, { addRoot: true })
  Object.assign(router, { ...alias })

  // Extend install methods
  const defaultInstall = router.install
  router.install = (app) => {
    defaultInstall(app)
    app.config.globalProperties.$Router = {
      ...router,
      ...alias,
    }

    Object.defineProperty(app.config.globalProperties, '$Route', {
      enumerable: true,
      get() {
        return router.currentRoute.value
      },
    })
  }

  return router
}
