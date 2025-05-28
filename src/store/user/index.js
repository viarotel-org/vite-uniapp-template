import { defineStore } from 'pinia'
import { getUserInfo, postUserLogin } from '@/api/user/index.js'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})

    const token = ref('')

    async function login() {
      const res = await postUserLogin()

      token.value = res.token
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
    persist: {
      pick: ['token'],
    },
  },
)
