<template>
  <web-view class="h-full" :src="webviewProps.src"></web-view>
</template>

<script>
export default {
  data() {
    return {
      webviewProps: {
        src: '',
      },
    }
  },
  onLoad(params) {
    if (params.title) {
      uni.setNavigationBarTitle({
        title: params.title,
      })
    }
    this.webviewProps = params
  },
}
</script>

<style></style>
