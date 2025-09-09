<script setup>
import { showToast } from '@uni-helper/uni-promises'

const feedbackForm = ref({
  type: '功能建议',
  content: '',
  contact: '',
})

const feedbackTypes = [
  { label: '功能建议', value: '功能建议' },
  { label: '问题反馈', value: '问题反馈' },
  { label: '其他', value: '其他' },
]

const isSubmitting = ref(false)

// 选择反馈类型
function selectFeedbackType(type) {
  feedbackForm.value.type = type
}

// 提交反馈
async function submitFeedback() {
  // 表单验证
  if (!feedbackForm.value.content.trim()) {
    await showToast({
      title: '请填写反馈内容',
      icon: 'none',
    })
    return
  }

  if (feedbackForm.value.content.trim().length < 10) {
    await showToast({
      title: '反馈内容至少需要10个字符',
      icon: 'none',
    })
    return
  }

  try {
    isSubmitting.value = true

    // 模拟提交请求
    await new Promise(resolve => setTimeout(resolve, 1500))

    await showToast({
      title: '反馈提交成功',
      icon: 'success',
    })

    // 重置表单
    feedbackForm.value = {
      type: '功能建议',
      content: '',
      contact: '',
    }

    // 延迟返回上一页
    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
  catch (error) {
    await showToast({
      title: '提交失败，请重试',
      icon: 'error',
    })
  }
  finally {
    isSubmitting.value = false
  }
}

// 字符计数
const contentLength = computed(() => feedbackForm.value.content.length)
const maxLength = 500
</script>

<template>
  <view class="feedback-page h-full flex flex-col bg-gray-50">
    <!-- 页面头部 -->
    <view class="header-section relative">
      <view class="h-32 from-primary-400 to-primary-500 bg-gradient-to-br"></view>

      <view class="absolute inset-0 flex items-center justify-center">
        <view class="text-center text-white">
          <view class="mb-2 text-2xl font-bold">
            意见反馈
          </view>
          <view class="text-sm text-white/80">
            您的建议是我们前进的动力
          </view>
        </view>
      </view>
    </view>

    <!-- 表单内容 -->
    <view class="form-section relative z-10 flex-1 px-4 -mt-4">
      <view class="overflow-hidden rounded-xl bg-white shadow-lg">
        <!-- 反馈类型选择 -->
        <view class="border-b border-gray-100 px-5 py-4">
          <view class="mb-3 text-base text-gray-800 font-medium">
            反馈类型
          </view>
          <view class="flex space-x-3">
            <view
              v-for="type in feedbackTypes"
              :key="type.value"
              class="flex-1 rounded-lg border-2 px-3 py-2 text-center text-sm font-medium transition-all duration-200"
              :class="[
                feedbackForm.type === type.value
                  ? 'border-primary-500 bg-primary-50 text-primary-600'
                  : 'border-gray-200 bg-gray-50 text-gray-600 active:bg-gray-100',
              ]"
              @click="selectFeedbackType(type.value)"
            >
              {{ type.label }}
            </view>
          </view>
        </view>

        <!-- 反馈内容 -->
        <view class="border-b border-gray-100 px-5 py-4">
          <view class="mb-3 flex items-center justify-between">
            <view class="text-base text-gray-800 font-medium">
              反馈内容 <text class="text-red-500">
                *
              </text>
            </view>
            <view class="text-xs text-gray-400">
              {{ contentLength }}/{{ maxLength }}
            </view>
          </view>
          <textarea
            v-model="feedbackForm.content"
            class="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:border-primary-500 focus:bg-white focus:outline-none"
            placeholder="请详细描述您的问题或建议，我们会认真对待每一条反馈..."
            :maxlength="maxLength"
            rows="6"
          />
        </view>

        <!-- 联系方式 -->
        <view class="px-5 py-4">
          <view class="mb-3 text-base text-gray-800 font-medium">
            联系方式 <text class="text-xs text-gray-400 font-normal">
              （选填）
            </text>
          </view>
          <input
            v-model="feedbackForm.contact"
            class="w-full h-9 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:border-primary-500 focus:bg-white focus:outline-none"
            placeholder="请输入联系方式"
            type="text"
          />
        </view>
      </view>

      <!-- 提交按钮 -->
      <view class="mt-6 px-2">
        <button
          class="w-full rounded-xl from-primary-500 to-primary-400 bg-gradient-to-r px-6 py-4 font-semibold shadow-lg transition-all duration-200 active:scale-98 disabled:cursor-not-allowed !text-white disabled:opacity-70"
          :class="{ 'shadow-xl': !isSubmitting }"
          :disabled="isSubmitting || !feedbackForm.content.trim()"
          @click="submitFeedback"
        >
          <view class="flex items-center justify-center space-x-2">
            <view v-if="isSubmitting" class="i-carbon-fade h-5 w-5 animate-spin"></view>
            <view v-else class="i-carbon-send h-5 w-5"></view>
            <text>{{ isSubmitting ? '提交中...' : '提交反馈' }}</text>
          </view>
        </button>
      </view>

      <!-- 温馨提示 -->
      <view class="mt-4 rounded-lg bg-blue-50 p-4">
        <view class="flex items-start space-x-2">
          <view class="i-carbon-information mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500"></view>
          <view class="text-xs text-primary-600 leading-relaxed">
            <view class="mb-1 font-medium">
              温馨提示：
            </view>
            <view>• 我们会在1-3个工作日内回复您的反馈</view>
            <view>• 如需紧急处理，请通过"联系我们"页面联系客服</view>
            <view>• 您的隐私信息将得到严格保护</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
/* 自定义样式 */
.feedback-page {
  min-height: 100vh;
}

/* 输入框聚焦动画 */
textarea:focus,
input:focus {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 按钮点击动画 */
button:active {
  transform: scale(0.98);
}

/* 旋转动画 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
