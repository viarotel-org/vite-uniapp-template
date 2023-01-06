import ViaIcon from './components/ViaIcon/index.vue'

export default {
  install(app) {
    console.log('app', app)
    app.component('ViaIcon', ViaIcon)
  },
}
