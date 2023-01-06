import {
  createRouter,
  useRoute,
  useRouter,
  aliasTransformer,
} from './core/index'
import pages from '@/pages.json'
import permission from './permission'

const nativeRouter = createRouter({
  pages,
})

const router = aliasTransformer(nativeRouter)
// console.log('router', router)

permission(router)

export default {
  install(app) {
    // 首字母改为大写以兼容H5端 避免命名冲突
    app.config.globalProperties.$Router = router
    app.config.globalProperties.$Route = () => useRoute()
  },
  useRoute,
  useRouter,
  ...router,
}
