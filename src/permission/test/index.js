export default function test(router) {
  router.beforeEach((to, from, next) => {
    uni.showModal({
      title: '提示',
      content: '触发了路由中间件，是否允许通过?',
      success: (res) => {
        if (res.cancel) {
          next(false)
        }
        else {
          next()
        }
      },
    })
  })

  router.afterEach(() => {})
}
