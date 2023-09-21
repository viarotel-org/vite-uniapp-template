import { createSSRApp } from 'vue'

import 'virtual:uno.css'

import App from './App.vue'

import store from './store/index.js'

import router from './router/index.js'
import routerGuards from './router/guards/index.js'

import api from './api/index.js'
import plugins from './plugins/index.js'
import mixins from './mixins/index.js'

import ViaIcon from './icons/components/ViaIcon/index.vue'
import { useDialog, useLoading, useToast } from './utils/modals/index.js'
import _showDictLabel from './utils/showDictLabel.js'

// 为 remote 时使用远程静态资源 常用于小程序
// 为 local 时使用本地静态资源
// import { useAssets } from './utils/assets/remote.js'
import { useAssets } from './utils/assets/local.js'

export function createApp() {
  const app = createSSRApp(App)

  app.use(store)

  app.use(router)
  app.use(routerGuards, router)

  app.use(api)
  app.use(plugins)
  app.use(mixins)
  app.component('ViaIcon', ViaIcon)

  app.config.globalProperties.$dialog = useDialog
  app.config.globalProperties.$toast = useToast
  app.config.globalProperties.$loading = useLoading

  app.config.globalProperties.$showDictLabel = _showDictLabel

  // 静态资源加载工具
  app.config.globalProperties.$assets = useAssets

  return {
    app,
    Pinia: store.Pinia,
  }
}
