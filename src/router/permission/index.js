// TODO
import store from '@/store/index.js'
import { resolvePagePath } from '@/utils/uni-router/utils'
import { useToast } from '@/utils/modals'

export default (router, { pages } = {}) => {
  // console.log('permission.router', router)
  const shortcutMap = resolvePagePath(pages)
  console.log('shortcutMap', shortcutMap)

  // 路由白名单
  const whiteList = ['/pages/login/phone/index']

  router.beforeEach((to, from) => {
    const next = (route) => {
      console.log('next.route', route)
      const path = shortcutMap[route?.path || route]

      if (!path || path === to.path) {
        next.route = true
        return true
      }

      next.route = {
        ...(route || {}),
        path,
      }
      useToast('请先进行登录')
      return false
    }

    console.log('to', to)
    console.log('from', from)

    // TODO
    let userStore = {}
    try {
      userStore = store.useUserStore()
    } catch (error) {
      console.log('error', error)
    }

    const token = userStore.token
    const userId = userStore.userId

    console.log('token', token)
    console.log('userId', userId)

    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else if (token) {
      if (to.path === '/pages/login/phone/index') {
        next({ path: '/tab-home' })
      } else if (!userId) {
        Promise.all([userStore.getUserInfo()])
          .then(() => {
            next({
              ...to,
              replace: true,
            })
          })
          .catch(() => {
            userStore.logout()
            next({
              path: '/login',
              query: {
                redirectView: JSON.stringify({
                  path: to.path,
                  query: to.query,
                }),
              },
            })
          })
      } else {
        next()
      }
    } else {
      next({
        path: '/pages/login/phone/index',
        query: {
          redirectView: JSON.stringify({
            path: to.path,
            query: to.query,
          }),
        },
      })
    }

    console.log('next.route.after', next.route)
    return next.route
  })

  router.afterEach(() => {})
}
