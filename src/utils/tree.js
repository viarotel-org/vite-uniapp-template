/**
 * 与树处理相关的函数
 */
import { cloneDeep, find } from 'lodash-es'

// 数组根据函数进行排序
function sortData(data, sortFun) {
  data.sort(sortFun)
}

/**
 * 生成排序函数
 * @param {String}  sortField  排序字段
 * @param { Boolean} asc       是否正序
 * @returns {Function}  排序函数
 */
function generateSortFn(sortField, asc) {
  return (a, b) => {
    const valueA = a[sortField]
    const valueB = b[sortField]
    if (valueA > valueB) {
      if (asc) {
        return 1
      }
      return -1
    }
    if (asc) {
      return -1
    }
    return 1
  }
}

/**
 * 数组结构转化成树结构
 * @returns {Array}
 */
export const arrayToTree = function (
  data = [],
  invalId = [],
  id = 'id',
  parentId = 'parentId',
) {
  // 结果
  const result = []
  // 复制数据
  const dataTemp = cloneDeep(data)

  dataTemp.forEach((item) => {
    // 添加children
    if (!item.children) {
      item.children = []
    }

    // 去掉无效节点
    if (invalId.includes(item[id]))
      return

    // parentUuid值
    const parentIdValue = item[parentId]

    // 不存在parent值
    if (!parentIdValue) {
      item._level = 1
      result.push(item)
    }
    else {
      // 父对象
      const parent = find(dataTemp, node => node[id] === parentIdValue)
      // 不存在父对象
      if (!parent) {
        item._level = 1
        result.push(item)
        return
      }
      if (!parent.children) {
        parent._level = parent._level ? parent._level : 1
        parent.children = []
      }
      // 添加到父对象children
      item._level = parent._level + 1
      parent.children.push(item)
    }
  })
  return result
}

/**
 * 查询问题分类路径数据
 * @param {*} id
 * @param {*} data
 */
export function arrayTreePathData(id, data) {
  const item = {
    problemCategoryLevelId: [],
    problemCategoryLevelIds: [],
  }
  data.forEach((itema) => {
    itema.children.forEach((itemb) => {
      itemb.children.forEach((itemc) => {
        itemc.children.forEach((itemd) => {
          if (itemd.id === id) {
            item.problemCategoryLevelIds = [itema.id, itemb.id, itemc.id]
            item.problemCategoryLevelId = [itema.name, itemb.name, itemc.name]
          }
        })
      })
    })
  })
  return item
}

/**
 * 对树进行排序(通过自定义函数)
 * @param {Array}  treeData  树
 * @param {Function}  sortFun  排序函数
 * @returns {Array}
 */
export const sortTreeByFunction = function (treeData, sortFun) {
  sortData(treeData, sortFun)
  treeData.forEach((item) => {
    const children = item.children
    if (children && children.length > 0) {
      sortData(children, sortFun)
      sortTreeByFunction(children, sortFun)
    }
  })
  return treeData
}

/**
 * 对树进行排序(通过字段)
 * @param {Array}  treeData  树
 * @param {String}  sortField  排序字段
 * @param { Boolean} asc       是否正序
 * @returns {Array} 排序树
 */
export const sortTreeByField = function (treeData, sortField, asc = true) {
  return sortTreeByFunction(treeData, generateSortFn(sortField, asc))
}

/**
 * 树的最后一级转化为数组
 * @param {Array}  treeData  树
 * @returns {Array} 数组
 */
export const treeFinalToArray = function (treeData) {
  let result = []
  Array.from(treeData).forEach((record) => {
    if (record.childNodes && record.childNodes.length > 0) {
      const children = treeFinalToArray(record.childNodes)
      result = result.concat(children)
    }
    else {
      result.push(record.data)
    }
  })
  return result
}

/**
 * 树转化数组
 * @param {Array}  treeData  树
 * @param {String}  childsKey  树
 * @returns {Array} 数组
 */
export const treeToArray = function (treeData = [], childsKey = 'children') {
  let result = []
  Array.from(treeData).forEach((record) => {
    result.push(record)
    if (record[childsKey] && record[childsKey].length > 0) {
      const children = treeToArray(record[childsKey], childsKey)
      result = result.concat(children)
    }
  })
  return result
}

/**
 * 树对象转化数组
 * @param {Object}  treeObject  树
 * @param {String}  childKey  树
 * @returns {Array} 数组
 */
export const treeObjToArray = function (
  treeObject = {},
  childKey = 'children',
) {
  let result = []
  result.push(treeObject)
  if (treeObject[childKey]) {
    const children = treeObjToArray(treeObject[childKey], childKey)
    result = result.concat(children)
  }
  return result
}
