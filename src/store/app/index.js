import { defineStore } from 'pinia'
import { primaryColor as defaultPrimaryColor } from '@/settings'

export const useAppStore = defineStore(
  'app',
  () => {
    const themeModel = {
      primary: { color: defaultPrimaryColor, name: '默认' },
      // #ifdef WEB
      blue: { color: '#3b82f6', name: '经典蓝' },
      purple: { color: '#8b5cf6', name: '紫罗兰' },
      red: { color: '#ef4444', name: '活力红' },
      orange: { color: '#f59e0b', name: '橙黄色' },
      // #endif
    }

    const currentTheme = ref('primary')

    const currentThemeInfo = computed(() => themeModel[currentTheme.value] || themeModel.primary)

    const primaryColor = computed(() => currentThemeInfo.value?.color || defaultPrimaryColor)

    return {
      themeModel,
      currentTheme,
      currentThemeInfo,
      primaryColor,
    }
  },
  {
    persist: true,
  },
)
