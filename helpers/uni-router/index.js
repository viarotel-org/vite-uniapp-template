import { createRouter as createRouterRaw, useRoute, useRouter as useRouterRaw } from 'uniapp-router-next'

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

export function useRouter() {
  const router = useRouterRaw()

  addRouterMethodAlias(router)

  return router
}

export {
  useRoute,
}
