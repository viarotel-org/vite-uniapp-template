import { createRouter as createRouterRaw, useRoute, useRouter as useRouterRaw } from 'uniapp-router-next'

/**
 * 添加 router 路由方法别名
 */
export function addRouterMethodAlias(router) {
  Object.assign(router, {
    push: (...args) => router.navigate(...args),
    pushTab: (...args) => router.switchTab(...args),
    replace: (...args) => router.redirect(...args),
    replaceAll: (...args) => router.reLaunch(...args),
    back: (options) => {
      router.navigateBack({ ...(options || {}), delta: options?.delta || options })
    },
  })
}

/**
 * 扩展 $Router 路由方法
 */
export function createRouter(options) {
  const router = createRouterRaw({
    platform: process.env.UNI_PLATFORM,
    ...(options || {}),
  })

  addRouterMethodAlias(router)

  const rawInstall = router.install

  router.install = (app) => {
    rawInstall(app)

    app.config.globalProperties.$Router = router

    Object.defineProperty(app.config.globalProperties, '$Route', {
      enumerable: true,
      get() {
        return router.currentRoute.value
      },
    })
  }

  return router
}

/**
 * 扩展 uesRouter 路由方法
 */
export function useRouter() {
  const router = useRouterRaw()

  addRouterMethodAlias(router)

  return router
}

export {
  useRoute,
}

/**
 * 将路由守卫包装为中间件
 */
export function defineMiddleware(name, handler, options) {
  const { router } = options || {}

  router.beforeEach((to, from, next) => {
    const middleware = to.meta.middleware || []

    if (!middleware.includes(name)) {
      next()
    }
    else {
      handler({
        ...router,
        beforeEach: callback => callback(to, from, next),
      })
    }
  })

  router.afterEach((to, from) => {
    const middleware = to.meta.middleware || []

    if (middleware.includes(name)) {
      handler({
        ...router,
        afterEach: callback => callback(to, from),
      })
    }
  })
}
