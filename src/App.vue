<script setup>
// #ifdef WEB
import { updateShades } from '$unocss-preset-shades'
// #endif

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

// #ifdef WEB
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
