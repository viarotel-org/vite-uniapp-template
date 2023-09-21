// import { useToast } from '@/utils/modals'
import store from '@/store/index.js'

const homePath = '/pages/index/home/index'
const loginPath = '/pages/login/phone/index'

const whiteList = [loginPath, '/pages/statement/index', '/pages/webview/index']

const permission = (router) => {
  const userStore = store.useUserStore()

  const loginRoute = to => ({
    path: loginPath,
    navType: 'reLaunch',
    force: true,
    query: {
      redirect: JSON.stringify({
        path: to.path,
        query: to.query,
      }),
    },
  })

  router.beforeEach((to, from, next) => {
    // console.log('permission.beforeEach.to', to)
    // console.log('permission.beforeEach.from', from)

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
          .getUserInfo()
          .then(() => {
            next()
          })
          .catch((error) => {
            console.warn(error)
            userStore.logout({ silenced: true })
            next(loginRoute(to))
          })
      }
    }
    else if (whiteList.includes(to.path)) {
      next()
    }
    else {
      next(loginRoute(to))
    }
  })

  // router.afterEach(() => {})
}

export default permission
