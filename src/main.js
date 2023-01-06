import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store/index.js'
import router from './router/index.js'
import api from './api/index.js'
import plugins from './plugins/index.js'
// import icons from './icons/index.js'
import ViaIcon from './icons/components/ViaIcon/index.vue'

import { useDialog, useToast, useLoading } from './utils/modals/index.js'

import './styles/css/index.js'

export function createApp() {
  const app = createSSRApp(App)

  app.use(store)
  app.use(router)
  app.use(api)
  app.use(plugins)
  // app.use(icons)
  // TODO 解决use方式无法正常挂载组件的问题
  app.component('ViaIcon', ViaIcon)

  app.config.globalProperties.$dialog = useDialog
  app.config.globalProperties.$toast = useToast
  app.config.globalProperties.$loading = useLoading

  return {
    app,
  }
}
