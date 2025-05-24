import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/user/index.js'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})

    const token = ref('')

    function login() {
      token.value = 'mock-token'
    }

    function logout() {
      token.value = ''
    }

    async function getUserData() {
      const res = await getUserInfo()
      userInfo.value = res.data
    }

    return {
      token,
      userInfo,
      login,
      logout,
      getUserData,
    }
  },
  {
    persist: true,
  },
)
