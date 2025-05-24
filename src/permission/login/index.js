export default function login(router) {
  const homePath = '/pages/index/index'
  const loginPath = '/pages/login/index'

  const whiteList = [loginPath, '/pages/parse/index', '/pages/webview/index']

  router.beforeEach((to, from, next) => {
    const userStore = useUserStore()
    const token = userStore.token
    const userId = userStore.userId

    // console.log('token', token)
    // console.log('userId', userId)

    if (token) {
      if (to.path === loginPath) {
        next(homePath)
      }
      else if (userId) {
        next()
      }
      else {
        userStore
          .getUserData()
          .then(() => {
            next()
          })
          .catch((error) => {
            console.warn(error)
            userStore.logout()
            next({
              path: loginPath,
            })
          })
      }
    }
    else if (whiteList.includes(to.path)) {
      next()
    }
    else {
      next({
        path: loginPath,
      })
    }
  })

  router.afterEach(() => {})
}
