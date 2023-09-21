import * as Pinia from 'pinia'
import { useAppStore } from './app/index.js'
import { useMenuStore } from './menu/index.js'
import { useUserStore } from './user/index.js'
import { useDictStore } from './dict/index.js'

export default {
  install(app) {
    app.use(Pinia.createPinia())
    app.config.globalProperties.$store = {
      app: useAppStore(),
      menu: useMenuStore(),
      user: useUserStore(),
      dict: useDictStore(),
    }

    app.config.globalProperties.$permission = key =>
      useMenuStore().permission[key]
  },
  useAppStore,
  useMenuStore,
  useUserStore,
  useDictStore,
  Pinia,
}
