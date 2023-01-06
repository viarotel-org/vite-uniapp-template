// TODO 目前仅作测试使用 插件问题 暂不生效
import { defineMiddleware } from '@uni-helper/vite-plugin-uni-middleware/runtime'
import { useUserStore } from '@/store/index'

const whiteList = ['pages/login/index']

export default defineMiddleware((to, from) => {
  console.log('to', to)
  console.log('from', from)

  const next = (path) => {
    if (path) {
      next.path = path
    }
  }
  next.path = to.path

  const userStore = useUserStore()
  const token = userStore.token
  const userId = userStore.userId

  if (whiteList.indexOf(to.path) !== -1) {
    // 在免登录白名单，直接进入
    next()
  } else if (token) {
    if (to.path === 'pages/login/index') {
      next()
    } else if (!userId) {
      userStore.getUserInfo()
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }

  return next.path
})
