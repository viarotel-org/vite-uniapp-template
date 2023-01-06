// TODO
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
import store from '@/store/index.js'
// const isDevelopment = process.env.NODE_ENV === 'development'

export default (router) => {
  // console.log('permission.router', router)
  // NProgress.configure({
  //   showSpinner: false,
  // })

  // 路由白名单
  const whiteList = ['pages/login/index']

  // if (isDevelopment) whiteList.push('/example')

  router.beforeEach((to, from, next) => {
    // NProgress.start()
    console.log('to', to)
    console.log('from', from)
    // console.log('next', next)

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
      if (to.path === 'pages/login/index') {
        next({ path: '/tab-0' })
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
        path: '/login',
        query: {
          redirectView: JSON.stringify({
            path: to.path,
            query: to.query,
          }),
        },
      })
    }
  })

  router.afterEach(() => {
    // NProgress.done() // finish progress bar
  })
}
