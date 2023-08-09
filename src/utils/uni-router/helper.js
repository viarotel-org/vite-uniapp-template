import { cloneDeep, isArray, isString, omit } from 'lodash-es'
import qs from 'qs'
import pages from '@/pages.json'

/**
 * 路由模型
 * @param {string} methodName 路由跳转方法名
 * @param {object} options 路由配置
 * @returns
 */
export function routerModel(
  methodName,
  { pathKey = 'path', params, router, pathMap = {} } = {},
) {
  // console.log('params', params)

  let options
  if (isString(params)) {
    const [path, rawQuery] = params.split('?')
    const query = qs.parse(rawQuery) || {}
    options = { path, query }
  }
  else {
    options = { ...params }
  }
  // console.log('options', options)

  const path = pathMap[options.path || '/']

  if (!path) {
    console.error(`没有找到该路由,请检查是否正确配置 "${options.path}"`)
    return
  }

  methodName = hasTabBar(pages, path) ? 'switchTab' : methodName

  // console.log('pathMap', pathMap)
  // console.log('path', path)
  // console.log('methodName', methodName)

  return router[methodName]({
    ...omit(options, 'path'),
    [pathKey]: path,
    query: options.query || {},
  })
}

/**
 * 检查指定的页面路径是否为 tabbar类型
 * @param {*} pages 页面配置
 * @param {*} path 页面路径
 * @returns
 */
export function hasTabBar(pages, path) {
  const list = pages?.tabBar?.list || []
  const listMap = list.reduce((obj, item) => {
    obj[`/${item.pagePath}`] = true
    return obj
  }, {})

  return !!listMap[path]
}

/**
 * 将uniapp路由跳转方式 转换为VueRouer方式
 * @param {object} router
 * @returns {object}
 */
export function aliasTransformer(router, { addRoot = false } = {}) {
  const routes = router.options.routes || []
  const pathMap = resolvePagePath(routes, { addRoot })
  return {
    push: params =>
      routerModel('navigateTo', {
        params,
        router,
        pathMap,
        addRoot,
      }),
    replace: params =>
      routerModel('redirectTo', {
        params,
        router,
        pathMap,
        addRoot,
      }),
    replaceAll: params =>
      routerModel('reLaunch', {
        params,
        router,
        pathMap,
        addRoot,
      }),
    back: (delta = 1, params) =>
      router.navigateBack({
        params,
        delta,
      }),
  }
}

/**
 * 对页面配置进行数据整理 以适配分包策略
 * @param {*} pages 页面配置
 * @returns
 */
export function resolvePages(pages, { addRoot = false } = {}) {
  pages = cloneDeep(pages)
  const value = pages?.pages || []

  const subPackages = (pages.subPackages || []).reduce((arr, item) => {
    const root = item.root
    arr.push(
      ...item.pages.map(item_1 => ({
        ...item_1,
        path: `${root}/${item_1.path}`,
      })),
    )
    return arr
  }, [])
  // console.log('subPackages', subPackages)
  value.push(...subPackages)

  if (addRoot) {
    value.forEach((item) => {
      item.path = `/${item.path}`
    })
  }

  // console.log('resolvePages.value', value)

  return value
}

/**
 * 获取根路由页面路径值
 * @param {*} pages 页面配置
 * @returns
 */
export const getRootPagePath = (pages) => {
  pages = isArray(pages) ? pages : pages?.pages || []
  const value = pages.find(item => item.type === 'home')?.path || ''
  return value
}

/**
 * 对页面路径进行转换映射
 * @param {*} pages 页面配置
 * @returns
 */
export function resolvePagePath(
  pages,
  { shortcutName = 'aliasPath', addRoot = false } = {},
) {
  const pathList = isArray(pages) ? pages : resolvePages(pages, { addRoot })
  const pathMap = pathList.reduce((obj, item) => {
    const path = item.path

    if (item[shortcutName]) {
      obj[item[shortcutName]] = path
    }
    obj[path] = path

    return obj
  }, {})

  const value = {
    ...pathMap,
    '/': getRootPagePath(pages),
  }

  // console.log('resolvePagePath.value', value)

  return value
}
