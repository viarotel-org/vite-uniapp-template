import { defineStore } from 'pinia'

export const useRichViewStore = defineStore(
  'rich-view',
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
