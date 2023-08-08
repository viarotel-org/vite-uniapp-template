import share from './share/index.js'

export default {
  install(app) {
    app.mixin(share)
  },
}
