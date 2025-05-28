<script setup>
import { updateShades } from '$unocss-preset-shades'

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})

const appStore = useAppStore()

// #ifndef MP
watchEffect(() => {
  updateShades(appStore.primaryColor)
})
// #endif
</script>

<style lang="scss">
@import '@unocss-applet/reset/uni-app/button-after.css';
@import '@unocss-applet/reset/uni-app/tailwind-compat.css';
@import './styles/css/index.css';
</style>
