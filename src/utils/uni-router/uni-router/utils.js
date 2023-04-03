import _isString from 'lodash/isString.js'
// import _omit from 'lodash/omit'

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
    pages, router, pushTabKey = 'pushTab', ...options
  } = {},
) => {
  // console.log('options', options)
  const pathMap = resolvePagePath(pages)
  const path = pathMap[options.path || '/']
  const query = options.query || {}

  methodName = hasTabBar(pages, path) ? pushTabKey : methodName

  return router[methodName]({
    ...options,
    path,
    query,
  })
}

/**
 * 将uniapp路由跳转方式 转换为VueRouer方式
 * @param {object} router
 * @returns {object}
 */
export const aliasTransformer = (router, pages) => {
  router.push = (params) => routerModel('push', {
    ...(_isString(params) ? { path: params } : params),
    router: router.__proto__,
    pages,
  })
  router.pushTab = (params) => routerModel('pushTab', {
    ...(_isString(params) ? { path: params } : params),
    router: router.__proto__,
    pages,
  })
  router.replace = (params) => routerModel('replace', {
    ...(_isString(params) ? { path: params } : params),
    router: router.__proto__,
    pages,
  })
  router.replaceAll = (params) => routerModel('replaceAll', {
    ...(_isString(params) ? { path: params } : params),
    router: router.__proto__,
    pages,
  })
  router.back = (delta = 1, params) => router.back({
    ...(_isString(params) ? { path: params } : params),
    delta,
  })
}
