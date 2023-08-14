/**
 * 将路由守卫包装为中间件
 */
export function defineMiddleware(callback, { router, app, name } = {}) {
  // callback.name 在使用匿名函数下可能取值不符合预期 这时请使用 name 参数手动命名
  const middlewareName = name || callback.name
  // console.log('middlewareName', middlewareName)

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
