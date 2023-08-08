<template>
  <view class="">
    <view
      v-for="(item, index) of exampleModel"
      :key="index"
      class="py-4 px-4 border-b border-gray-200 bg-white"
      @click="handleInfo(item)"
    >
      <view class="flex items-center">
        <view class="w-10 flex-none truncate text-primary-500 text-2xl">
          <via-icon :name="item.icon" :deep-class="item.iconClass"></via-icon>
        </view>
        <view class="flex-1 w-0 leading-none">
          {{ item.text }}
        </view>
        <view class="flex-none w-10 text-right text-gray-500">
          <via-icon name="arrow-right-bold"></via-icon>
        </view>
      </view>
      <view class="text-sm text-gray-500 pl-10">
        {{ item.desc }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      exampleModel: [
        {
          icon: 'm-luyou',
          iconClass: '',
          text: '路由中间件',
          desc: '进入此页面将触发实名认证路由中间件演示',
          route: {
            path: '/pages/middleware/index',
          },
        },
      ],
    }
  },
  created() {},
  methods: {
    handleInfo(row) {
      this.$Router.push(row.route)
    },
  },
}
</script>

<style></style>
