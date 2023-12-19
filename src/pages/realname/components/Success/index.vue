<template>
  <view class="h-full flex flex-col overflow-hidden">
    <view
      class="flex-1 h-0 overflow-auto flex flex-col items-center justify-center"
    >
      <view class="">
        <uv-icon
          name="checkmark-circle-fill"
          color="#07c160"
          size="160rpx"
        ></uv-icon>
      </view>
      <view class="pt-4 pl-2">
        实名认证已上传，审核中
      </view>
    </view>
    <view class="flex-none pb-4 px-4">
      <uv-button
        type="primary"
        text="确定"
        shape="circle"
        size="large"
        @click="handleSubmit"
      ></uv-button>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    handler: {
      type: Function,
      default: () => () => {},
    },
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    async handleSubmit() {
      this.$store.user.userInfo.realStatus = 3
      this.$Router.replaceAll('/')
    },
  },
}
</script>

<style></style>
