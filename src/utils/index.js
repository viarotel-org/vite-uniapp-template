import _get from 'lodash/get'

/**
 * @desc 使用async await 进项进行延时操作
 * @param {*} time
 */
export function sleep(time = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time)
  })
}

/**
 * 使用indexof方法实现模糊查询
 * @param  {Array}  list     进行查询的数组
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
export function fuzzyQuery(list, keyWord, { keyName = '' } = {}) {
  const arr = []
  for (let i = 0; i < list.length; i++) {
    const str = keyName ? list[i][keyName] : list[i]
    if (str.includes(keyWord)) {
      arr.push(list[i])
    }
  }
  return arr
}

/**
 * 解构对象属性为可响应的计算属性
 * @param  values 为对象时 对象的值作为计算属性的替换键名
 * @param {String} sourcePath 默认值为 '$Route.query'
 * @returns {Object} Computeds
 */
export function mapComputed(keys = [], sourcePath = '$Route.query') {
  const arr = Array.isArray(keys)
    ? keys.map(name => [name, name])
    : Object.entries(keys)
  const computeds = arr.reduce((obj, [name, replaceName]) => {
    if (!replaceName)
      replaceName = name
    const formatPath = [...sourcePath.split('.'), name].join('.')
    obj[replaceName] = function () {
      return _get(this, formatPath)
    }
    return obj
  }, {})
  return computeds
}

/**
 * @description 继承组件方法
 * @param {*} refName ref名称
 * @param {*} methodNames 需要继承的方法名列表
 * @returns
 */
export function inheritComponentMethods(refName, methodNames) {
  const methods = {}
  methodNames.forEach((name) => {
    methods[name] = function (...params) {
      return this.$refs[refName][name](...params)
    }
  })
  return methods
}

// 字典映射
export const mapDict = function (
  data,
  {
    childrenName = 'children',
    keyName = 'value',
    valueName = 'label',
    mapValue,
  } = {},
) {
  return data.reduce((obj, item) => {
    const key = item[keyName]
    const value = mapValue ? mapValue(item) : item[valueName]
    obj[key] = value
    if (Array.isArray(item[childrenName])) {
      obj = {
        ...obj,
        ...mapDict(item[childrenName], {
          childrenName,
          keyName,
          valueName,
          mapValue,
        }),
      }
    }
    return obj
  }, {})
}

/**
 * 去除富文本标签
 * @param {*} value 富文本
 * @returns
 */
export function removeTag(value) {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, '')
    .replace(/&ldquo;/g, '')
    .replace(/&rdquo;/g, '')
}

/**
 * 根据身份证号判断男女
 */
export function getSexText(idCardNo) {
  const gender = idCardNo.substr(-2, 1)
  if (gender % 2 === 1) {
    return '男'
  }
  return '女'
}
