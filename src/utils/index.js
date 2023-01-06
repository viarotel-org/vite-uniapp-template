import _camelCase from 'lodash/camelCase'
import _kebabCase from 'lodash/kebabCase'
import _get from 'lodash/get'

export const packTreeData = (source, id, parentId, children) => {
  const cloneData = JSON.parse(JSON.stringify(source))
  return cloneData.filter((father) => {
    const branchArr = cloneData.filter(
      (child) => father[id] == child[parentId],
    )
    if (branchArr.length > 0) {
      father[children] = branchArr
    }
    return (
      !father[parentId] || father[parentId] == '0' || father[parentId] == null
    )
  })
}

/**
 * @desc 使用async await 进项进行延时操作
 * @param {*} time
 */
export const delay = (time = 1000) => new Promise((resolve) => {
  setTimeout(() => resolve(true), time)
})

/**
 * 使用indexof方法实现模糊查询
 * @param  {Array}  list     进行查询的数组
 * @param  {String} keyWord  查询的关键词
 * @return {Array}           查询的结果
 */
export const fuzzyQuery = (list, keyWord, { keyName = '' } = {}) => {
  const arr = []
  for (let i = 0; i < list.length; i++) {
    const str = keyName ? list[i][keyName] : list[i]
    if (str.indexOf(keyWord) >= 0) {
      arr.push(list[i])
    }
  }
  return arr
}

/**
 * 根据传入的props创建局部可写的参数
 * @param {*} propNames
 * @returns
 */
export const createVariableProps = (
  propNames,
  { prefix = 'scope', emitUpdate = true, setCallback = null } = {},
) => ({
  data: propNames.reduce((obj, name) => {
    obj[_camelCase(`temp-${name}`)] = null
    return obj
  }, {}),
  computed: propNames.reduce((obj, name) => {
    obj[_camelCase(`${prefix}-${name}`)] = {
      get() {
        return this[_camelCase(`temp-${name}`)] || this[name]
      },
      set(value) {
        if (setCallback) setCallback(value)
        if (emitUpdate) this.$emit(`update:${_kebabCase(name)}`, value)
        this[_camelCase(`temp-${name}`)] = value
      },
    }
    return obj
  }, {}),
})

/**
 * 解构对象属性为可响应的计算属性
 * @param  values 为对象时 对象的值作为计算属性的替换键名
 * @param {String} sourcePath 默认值为 '$Route.query'
 * @returns {Object} Computeds
 */
export const mapComputed = (keys = [], sourcePath = '$Route.query') => {
  const arr = Array.isArray(keys)
    ? keys.map((name) => [name, name])
    : Object.entries(keys)
  const computeds = arr.reduce((obj, [name, replaceName]) => {
    if (!replaceName) replaceName = name
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
export const inheritComponentMethods = (refName, methodNames) => {
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
export const removeTag = (value) => value
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, '')
  .replace(/&ldquo;/g, '')
  .replace(/&rdquo;/g, '')
