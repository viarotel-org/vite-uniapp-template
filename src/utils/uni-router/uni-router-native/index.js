import {
  createRouter as _createRouter,
  useRoute,
  useRouter,
} from 'uni-native-router'
import { aliasTransformer } from './utils.js'
import { resolvePages } from '../utils'

export const createRouter = (options = {}) => {
  const pages = options.pages || []
  const nativeRouter = _createRouter({
    ...options,
    routes: resolvePages(pages),
  })
  const router = aliasTransformer(nativeRouter, pages)

  return {
    install(app) {
      // 首字母改为大写以兼容H5端 避免命名冲突
      app.config.globalProperties.$Router = router
      app.config.globalProperties.$Route = () => useRoute()
    },
    useRoute,
    useRouter,
    ...router,
  }
}
