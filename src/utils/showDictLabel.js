import { isString } from 'lodash-es'
import * as dictData from '@/configs/dict/index.js'

/**
 * @description 回显数据字典
 */
export function showDictLabel(data,
  value,
  {
    labelKey = 'dictLabel',
    valueKey = 'dictValue',
    childrenKey = 'children',
  } = {}) {
  const actions = []
  for (let index = 0; index < data.length; index++) {
    const item = data[index]
    if (item[valueKey] == `${value}`) {
      actions.push(item[labelKey])
      break
    }
    const children = item[childrenKey]
    if (children && children.length) {
      const action = showDictLabel(children, value, {
        labelKey,
        valueKey,
        childrenKey,
      })
      if (action) {
        actions.push(action)
        break
      }
    }
  }
  return actions.join('')
}

export default (param, value, options) => {
  const data = isString(param) ? dictData[param] : param
  return showDictLabel(data || {}, value, options)
}
