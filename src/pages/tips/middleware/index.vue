<script setup>
const resultInfo = ref({
  title: '操作成功',
  description: '你已通过路由中间件校验',
  details: [],
  showProgress: false,
  shareable: false,
  footerTip: '',
})
</script>

<template>
  <view class="h-full flex flex-col bg-gray-50">
    <view class="flex flex-1 flex-col items-center justify-center px-6 py-8">
      <view class="success-icon-container mb-8">
        <view class="relative">
          <view class="h-32 w-32 flex items-center justify-center rounded-full bg-green-500 shadow-lg">
            <view class="i-carbon-checkmark size-16 animate-bounce text-white"></view>
          </view>

          <view class="absolute inset-0 h-32 w-32 animate-ping border-4 border-green-200 rounded-full"></view>
          <view class="absolute h-36 w-36 border-2 border-green-100 rounded-full opacity-50 -inset-2"></view>
        </view>
      </view>

      <view class="success-info mb-8 text-center">
        <view class="mb-3 text-2xl text-gray-800 font-bold">
          {{ resultInfo.title }}
        </view>
        <view class="max-w-sm text-base text-gray-600 leading-relaxed">
          {{ resultInfo.description }}
        </view>
      </view>

      <view v-if="resultInfo.details && resultInfo.details.length > 0" class="details-card mb-8 max-w-sm w-full">
        <view class="rounded-xl bg-white p-5 shadow-sm">
          <view class="mb-4 flex items-center text-lg text-gray-800 font-semibold">
            <view class="i-carbon-information mr-2 text-lg text-primary-500"></view>
            详细信息
          </view>

          <view class="space-y-3">
            <view
              v-for="(detail, index) in resultInfo.details"
              :key="index"
              class="flex items-center justify-between py-2"
              :class="index !== resultInfo.details.length - 1 ? 'border-b border-gray-100' : ''"
            >
              <view class="text-sm text-gray-600">
                {{ detail.label }}
              </view>
              <view class="text-sm text-gray-800 font-medium">
                {{ detail.value }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    transform: translate3d(0, -8px, 0);
  }
  70% {
    transform: translate3d(0, -4px, 0);
  }
  90% {
    transform: translate3d(0, -2px, 0);
  }
}

@keyframes ping {
  75%,
  100% {
    transform: scale(1.1);
    opacity: 0;
  }
}

.animate-bounce {
  animation: bounce 2s infinite;
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@media (max-width: 375px) {
  .success-icon-container {
    margin-bottom: 6px;
  }

  .success-info {
    margin-bottom: 6px;
  }

  .details-card,
  .recommended-actions {
    margin-bottom: 6px;
  }
}
</style>
