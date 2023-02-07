import { useRouter } from 'uni-native-router'
import _omit from 'lodash/omit'
/**
 * 检查指定的页面路径是否为 tabbar类型
 * @param {*} pages 页面配置
 * @param {*} path 页面路径
 * @returns
 */
export const hasTabBar = (pages, path) => {
  const list = pages?.tabBar?.list || []
  const listMap = list.reduce((obj, item) => {
    obj[`/${item.pagePath}`] = true
    return obj
  }, {})

  return !!listMap[path]
}

/**
 * 对页面配置进行数据整理 以适配分包策略
 * @param {*} pages 页面配置
 * @returns
 */
export const resolvePages = (pages) => {
  const value = pages?.pages || []

  const subPackages = (pages.subPackages || []).reduce((arr, item) => {
    const root = item.root
    arr.push(
      ...item.pages.map((item_1) => ({
        ...item_1,
        path: `${root}/${item_1.path}`,
      })),
    )
    return arr
  }, [])
  value.push(...subPackages)

  console.log('value', value)

  return value
}

/**
 * 获取根路由页面路径值
 * @param {*} pages 页面配置
 * @returns
 */
export const getRootPagePath = (pages) => `/${pages?.pages?.[0].path}`

/**
 * 对页面路径进行转换映射
 * @param {*} pages 页面配置
 * @returns
 */
export const resolvePagePath = (pages, { shortcutName = 'shortcut' } = {}) => {
  const pathList = resolvePages(pages)
  const pathMap = pathList.reduce((obj, item) => {
    const path = `/${item.path}`

    if (item[shortcutName]) {
      obj[item[shortcutName]] = path
    }

    obj[path] = path
    return obj
  }, {})

  const value = {
    '/': getRootPagePath(pages),
    ...pathMap,
  }

  console.log('resolvePagePath.value', value)

  return value
}

/**
 * 路由模型
 * @param {string} methodName 路由跳转方法名
 * @param {object} options 路由配置
 * @returns
 */
export const routerModel = (methodName, { pages, router, ...options } = {}) => {
  // console.log('options', options)
  const pathMap = resolvePagePath(pages)
  const url = pathMap[options.path || '/']

  methodName = hasTabBar(pages, url) ? 'switchTab' : methodName
  router = router || useRouter()

  return router[methodName]({
    ..._omit(options, 'path'),
    url,
    query: options.query || {},
  })
}
