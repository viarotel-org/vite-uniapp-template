/**
 * 将路由守卫包装为中间件
 */
export function defineMiddleware(name, handler, { router, app } = {}) {
  router.beforeEach((to, from, next) => {
    const middleware = to.meta.middleware || []
    if (!middleware.includes(name)) {
      next()
    }
    else {
      handler(
        {
          ...router,
          beforeEach: func => func(to, from, next),
        },
        { app },
      )
    }
  })
}
