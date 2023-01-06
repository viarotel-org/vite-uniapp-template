import { createRouter as _createRouter } from 'uni-native-router'
import { resolvePages, routerModel } from './utils.js'

export { useRoute, useRouter } from 'uni-native-router' // 导入路由配置文件

let pages = null

export const createRouter = (options = {}) => {
  pages = options.pages

  return _createRouter({
    ...options,
    routes: resolvePages(pages),
  })
}

/**
 * 将uniapp路由跳转方式 转换为VueRouer方式
 * @param {object} router
 * @returns {object}
 */
export const aliasTransformer = (router) => ({
  ...(router || {}),
  push: (options) => routerModel('navigateTo', { ...options, router, pages }),
  replace: (options) => routerModel('redirectTo', { ...options, router, pages }),
  replaceAll: (options) => routerModel('reLaunch', { ...options, router, pages }),
  back: (delta = 1, options) => router.navigateBack({
    ...options,
    delta,
  }),
})
