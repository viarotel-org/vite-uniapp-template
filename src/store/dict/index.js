import { defineStore } from 'pinia'
import { getDictList } from '@/api/base/index'
import * as staticDict from '@/configs/dict/index'

export const useDictStore = defineStore({
  id: 'app-dict',
  state() {
    return {
      dictModel: {},
      dictData: {
        ...staticDict,
      },
    }
  },
  actions: {
    async getDictData(key) {
      let tempData = []
      if (this.dictData[key]) {
        tempData = this.dictData[key]
      }
      else {
        const { code, data } = await getDictList(this.dictModel[key] || key)
        if (success) {
          tempData = data.map(item => ({
            ...item,
            label: item.dictLabel,
            value: item.dictValue,
          }))
          this.dictData[key] = tempData
        }
      }
      return tempData
    },
  },
})
