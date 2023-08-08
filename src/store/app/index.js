import { defineStore } from 'pinia'
import { setThemeVariables } from './helpers'
import storage from '@/utils/storages'
import { getSiteConfig } from '@/api/base/index'

// import { baseURL } from '@/configs/request'

export const useAppStore = defineStore({
  id: 'app',
  state() {
    return {
      themeConfig: storage.get('app/themeConfig') || {
        primaryColor: 'rgba(2, 141, 113, 1)',
      },
      siteInfo: {},
      systemInfo: {},
    }
  },
  getters: {
    primaryColor: state => state.themeConfig?.primaryColor,
  },
  actions: {
    getSystemInfo() {
      return new Promise((resolve) => {
        uni.getSystemInfo({
          success: (res) => {
            this.systemInfo = res
            resolve(res)
          },
        })
      })
    },
    setThemeConfig(data) {
      if (data) {
        this.themeConfig = data
        storage.set('app/themeConfig', data)
      }
      setThemeVariables(this.primaryColor)
    },
    async getSiteConfig() {
      const res = await getSiteConfig()
      if (res.successed) {
        const { title } = res.data
        this.siteInfo = {
          appName: title,
        }
      }
    },
  },
})
