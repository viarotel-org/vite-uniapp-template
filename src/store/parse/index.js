import { defineStore } from 'pinia'

export const useParseStore = defineStore(
  'parse',
  () => {
    const content = ref('')

    return {
      content,
    }
  },
  {
    persist: true,
  },
)
