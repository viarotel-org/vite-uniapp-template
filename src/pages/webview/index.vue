<script setup>
const route = useRoute()

const webviewProps = computed(() => route.query)

uni.showLoading({
  title: '加载中',
})
setTimeout(() => {
  hideLoading()
}, 1 * 1000)

function hideLoading() {
  uni.hideLoading()
}
</script>

<template>
  <web-view v-bind="webviewProps" @load="hideLoading" @error="hideLoading"></web-view>
</template>
