import _isString from 'lodash/isString.js'
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
  push: (params) => routerModel('navigateTo', {
    ...(_isString(params) ? { path: params } : params),
    router,
    pages,
  }),
  replace: (params) => routerModel('redirectTo', {
    ...(_isString(params) ? { path: params } : params),
    router,
    pages,
  }),
  replaceAll: (params) => routerModel('reLaunch', {
    ...(_isString(params) ? { path: params } : params),
    router,
    pages,
  }),
  back: (delta = 1, params) => router.navigateBack({
    ...(_isString(params) ? { path: params } : params),
    delta,
  }),
})
