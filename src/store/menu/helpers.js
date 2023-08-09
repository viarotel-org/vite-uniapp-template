import { groupBy } from 'lodash-es'
import { list2Tree, tree2List } from '@/utils/treeSimple'
import { sortTreeByField } from '@/utils/tree'
import { getUserMenus } from '@/api/user/index'

export async function getRemoteMenu(params) {
  let data = []
  try {
    const res = await getUserMenus(params)

    data = res?.data || []
  }
  catch (error) {
    console.log('error', error)
  }
  // console.log('getRemoteMenu.data', data)
  return data
}

export function transformerMenu(data,
  {
    pathKey = 'menuHref',
    titleKey = 'menuName',
    iconKey = 'menuIcon',
    menuType = 'menuType',
    menuSort = 'menuSort',
    idKey = 'id',
    parentKey = 'parentId',
    childrenKey = 'children',
    permissionKey = 'permission',
    isTree = false,
  } = {}) {
  if (isTree) {
    data = tree2List(data, {
      key: idKey,
      parentKey,
      children: childrenKey,
    })
  }

  data = data.filter(item => item.showFlag === '1')

  const {
    0: categoryList = [],
    1: menuList = [],
    2: permissionList = [],
  } = groupBy(data, menuType)

  const rawRoutes = []
  const mapRoutes = rawRoutes.reduce((obj, item) => {
    obj[item.path] = item
    return obj
  }, {})

  let menu = [];
  [...categoryList, ...menuList].forEach((item) => {
    const routeItem = mapRoutes[item[pathKey]]

    const meta = {
      ...(item[titleKey] ? { title: item[titleKey] } : {}),
      ...(item[iconKey] ? { icon: `${item[iconKey]} fa-fw` } : {}),
    }
    menu.push({
      id: item[idKey],
      parentId: item[parentKey],
      path: item[pathKey],
      sort: item[menuSort],
      meta,
    })

    if (routeItem) {
      routeItem.meta.title = meta.title || routeItem.meta.title
      routeItem.meta.icon = meta.icon || routeItem.meta.icon
    }
  })

  menu = list2Tree(menu, {
    key: 'id',
    parentKey: 'parentId',
    children: 'children',
  })

  menu = sortTreeByField(menu, menuSort)

  const permission = permissionList.reduce((obj, item) => {
    if (item[permissionKey]) {
      obj[item[permissionKey]] = true
    }
    return obj
  }, {})

  return { menu, permission }
}
