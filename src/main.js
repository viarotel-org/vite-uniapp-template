import {
  createSSRApp,
} from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import 'uno.css'
import '@unocss-applet/reset/uni-app/tailwind-compat.css'
import '@unocss-applet/reset/uni-app/button-after.css'
import './styles/index.js'

export function createApp() {
  const app = createSSRApp(App)

  app.use(router)
  app.use(store)

  return {
    app,
  }
}
