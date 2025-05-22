import { defineStore } from 'pinia'

const initState = { nickname: '11432312211', avatar: '' }

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({ ...initState })

    return {
      userInfo,
    }
  },
  {
    persist: true,
  },
)
