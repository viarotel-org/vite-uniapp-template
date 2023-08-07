import { omit } from 'lodash-es'

const defaultOptions = {
  key: 'id', // 主键
  parentKey: 'parentId', // 父节点主键
  children: 'children', // 子节点
  isTree: false, // 源数据是否是树结构
}

/**
 * 将树型结构数据转换成一维数组
 * @param treeData
 */
export function tree2List(treeData, options = {}) {
  const props = {
    ...defaultOptions,
    ...options,
  }
  let listData = []
  treeData.forEach((item) => {
    listData.push(item)
    const children = item[props.children]
    if (children && children.length > 0) {
      listData = [...listData, ...tree2List(children, props)]
    }
  })
  return listData
}

/**
 * 将一维数组数据转换成树型结构
 * @param listData
 */
export function list2Tree(listData, options = {}) {
  const props = {
    ...defaultOptions,
    ...options,
  }

  const obj = {}
  // obj对象的key为listData中每一个对象的id，value为每一个对象
  listData.forEach((item) => {
    obj[item[props.key]] = item
  })

  // 最终要返回的树型数组
  const treeData = []

  // 对原一维数组进行遍历
  for (let i = 0; i < listData.length; i++) {
    const item = listData[i] // 原一维数组中的每一项
    const parent = obj[item[props.parentKey]] // 从之前保存的对象中取出当前项的父项
    if (parent) {
      if (parent[props.children]) {
        parent[props.children].push(item) // 父项的children加入子项
      }
      else {
        parent[props.children] = []
        parent[props.children].push(item)
      }
    }
    else {
      treeData.push(item) // 否则直接将当前项加入最后的树状数组作为根（因为此项没有父项）
    }
  }
  return treeData
}

/**
 * 寻找指定子节点
 * @param {number|string} key
 * @param treeData
 * @param props
 */
export function getNodeByKey(key, treeData, options = {}) {
  const props = {
    ...defaultOptions,
    ...options,
  }

  if (!treeData || treeData.length === 0) {
    return null
  }

  for (let i = 0; i < treeData.length; i++) {
    const node = treeData[i]
    if (node[props.key] === key) {
      return node
    }
    const children = node[props.children]
    if (children && children.length > 0) {
      const targetNode = getNodeByKey(key, children, props)
      if (targetNode) {
        return targetNode
      }
    }
  }
  return null
}

/**
 * 获取节点下的所有子节点
 * @param {number|string} key
 * @param treeData
 * @param props
 */
export function getChildrenByKey(key, treeData, options = {}) {
  const props = {
    ...defaultOptions,
    ...options,
  }
  const targetNode = getNodeByKey(key, treeData, props)
  if (!targetNode) {
    return []
  }
  const children = targetNode[props.children]
  if (children && children.length > 0) {
    return tree2List(children, props)
  }
  return []
}

/**
 * 遍历每个树节点
 * @param treeData
 * @param callback
 * @param props
 */
export function forEachNode(treeData, callback, options = {}) {
  if (!treeData)
    return []

  const props = {
    ...defaultOptions,
    ...options,
  }

  treeData.forEach((item) => {
    callback(item, treeData)
    const children = item[props.children]
    forEachNode(children, callback, props)
  })
}

/**
 * map 每个树节点
 * @param treeData
 * @param callback
 * @param props
 */
export function mapNode(treeData, callback, options = {}) {
  if (!treeData)
    return []

  const props = {
    ...defaultOptions,
    ...options,
  }

  return treeData.map(item => ({
    ...callback(item, treeData),
    children: mapNode(item[props.children], callback, props),
  }))
}

/**
 * filter 每个树节点
 * @param treeData
 * @param callback
 * @param props
 */
export function filterTree(treeData, callback, options = {}) {
  if (!treeData)
    return []

  const props = {
    ...defaultOptions,
    ...options,
  }

  const selectedNodes = []
  forEachNode(
    treeData,
    (item) => {
      if (callback(item, treeData)) {
        selectedNodes.push(omit(item, props.children))
      }
    },
    props,
  )

  const value = list2Tree(selectedNodes, props)

  return value
}

/**
 * 获取所有父节点
 * @param {number|string} key
 * @param data 可以是 listData 也可以是 treeData
 * @param props
 */
export function getParentNodes(key, data, options = {}) {
  if (!key && key !== 0) {
    return []
  }

  const props = {
    ...defaultOptions,
    immediate: false, // 仅获取直接父级
    ...options,
  }

  const listData = props.isTree ? tree2List(data, props) : data

  const targetNode = listData.find(item => item[props.key] === key)

  if (!targetNode) {
    return []
  }

  const parentNodeIndex = listData.findIndex(
    item => item[props.key] === targetNode[props.parentKey],
  )

  if (parentNodeIndex === -1) {
    return []
  }

  const parentNode = listData[parentNodeIndex]

  if (props.immediate) {
    return [parentNode]
  }

  return [
    ...getParentNodes(parentNode[props.key], listData, {
      ...props,
      isTree: false,
    }),
    parentNode,
  ]
}
