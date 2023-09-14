<template>
  <web-view class="h-full" :src="viewProps.src"></web-view>
</template>

<script>
export default {
  data() {
    return {
      viewProps: {
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
    this.viewProps = params
  },
}
</script>

<style></style>
