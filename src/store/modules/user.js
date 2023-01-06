import { defineStore } from 'pinia'
import { setToken, getToken, removeToken } from '@/utils/token.js'
import { mockRequest as getUserData } from '@/api/modules/base.js'

export const useUserStore = defineStore({
  id: 'app-user',
  state() {
    return {
      userData: {},
      token: getToken(),
    }
  },
  getters: {
    userId: (state) => state.userData.id,
  },
  actions: {
    removeToken() {
      this.token = ''
      removeToken()
    },
    setToken(token) {
      this.token = token
      setToken(token)
    },
    // 获取用户详情
    async getUserInfo({ params = {}, options = {} } = {}) {
      const res = await getUserData(
        {
          ...params,
          mockData: {
            id: 'mock-id',
            userName: 'viarotel',
          },
        },
        options,
      )
      // console.log('getUserInfo.res', res)

      const data = res.data || {}

      const resolveData = {
        ...data,
        id: data.id,
      }

      this.userData = resolveData

      console.log('getUserInfo.userData', this.userData)

      return resolveData
    },
    async logout() {
      this.removeToken()
      this.userData = {}
    },
  },
})
