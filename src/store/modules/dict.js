import { defineStore } from 'pinia'
import { dictDataList } from '@/api/modules/base'
import staticDict from '@/configs/dict.js'

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
      } else {
        const { code, data } = await dictDataList(this.dictModel[key] || key)
        if (code === '0000') {
          tempData = data.map((item) => ({
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
