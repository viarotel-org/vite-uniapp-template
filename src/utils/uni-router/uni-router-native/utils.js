import _omit from 'lodash/omit'
import _isString from 'lodash/isString.js'

import { resolvePagePath, hasTabBar } from '../utils'

/**
 * 路由模型
 * @param {string} methodName 路由跳转方法名
 * @param {object} options 路由配置
 * @returns
 */
export const routerModel = (
  methodName,
  {
    pages, router, pushTabKey = 'switchTab', ...options
  } = {},
) => {
  console.log('options', options)
  const pathMap = resolvePagePath(pages)
  const url = pathMap[options.path || '/']

  methodName = hasTabBar(pages, url) ? pushTabKey : methodName

  return router[methodName]({
    ..._omit(options, 'path'),
    url,
    query: options.query || {},
  })
}

/**
 * 将uniapp路由跳转方式 转换为VueRouer方式
 * @param {object} router
 * @returns {object}
 */
export const aliasTransformer = (router, pages) => ({
  ...(router || {}),
  push: (params) => routerModel('navigateTo', {
    ...(_isString(params) ? { path: params } : params),
    router,
    pages,
  }),
  pushTab: (params) => routerModel('switchTab', {
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
