<template>
  <web-view class="h-full" v-bind="viewProps" :src="viewProps.src"></web-view>
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
    this.viewProps = params
    if (params.title) {
      uni.setNavigationBarTitle({
        title: params.title,
      })
    }
  },
}
</script>

<style></style>
