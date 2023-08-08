/**
 * 将路由守卫包装为中间件
 */
export function defineMiddleware(callback, { router, app, name }) {
  const middlewareName = name || callback.name
  console.log('middlewareName', middlewareName)

  router.beforeEach((to, from, next) => {
    const middleware = to.meta.middleware || []
    if (!middleware.includes(middlewareName)) {
      next()
    }
    else {
      callback(
        {
          ...router,
          beforeEach: func => func(to, from, next),
        },
        { app },
      )
    }
  })
}
