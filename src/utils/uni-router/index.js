import { isH5 } from '@uni-helper/uni-env'
import { createRouter as _createRouter } from 'uniapp-router-next'
import { aliasTransformer, resolvePages } from './helper.js'
import { homePage } from '@/configs/index.js'

export { useRouter, useRoute } from 'uniapp-router-next'

export * from './helper.js'

export function createRouter({ pages, addRoutes = [], ...options } = {}) {
  const routes = [...resolvePages(pages, { addRoot: true }), ...addRoutes]
  if (isH5) {
    routes.unshift({
      ...routes.find(item => item.path.includes(homePage)),
      path: '/',
    })
  }

  // console.log('createRouter.routes', routes)

  const router = _createRouter({
    ...options,
    platform: process.env.UNI_PLATFORM,
    routes,
    debug: true,
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
