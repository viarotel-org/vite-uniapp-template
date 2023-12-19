<template>
  <view class="h-full flex flex-col overflow-hidden">
    <view
      class="px-4 rounded-lg bg-white shadow-lg shadow-primary-100 mx-4 mt-4 py-4 flex-none"
    >
      <view class="h-6 flex items-center">
        <uv-line-progress
          v-bind="{
            activeColor: 'rgba(var(--color-primary-500), 1)',
            inactiveColor: 'rgba(var(--color-primary-50), 1)',
            percentage: currentProgress.value,
          }"
        >
          <view
            class="w-6 h-6 bg-primary-200 rounded-full flex items-center justify-center flex-none"
          >
            <view class="w-3 h-3 bg-primary-500 rounded-full flex-none"></view>
          </view>
        </uv-line-progress>
      </view>
      <view class="flex items-center justify-between text-sm">
        <view class="">
          个人信息
        </view>
        <view class="">
          身份证上传
        </view>
        <view class="">
          提交认证
        </view>
      </view>
    </view>
    <view class="flex-1 h-0 overflow-auto">
      <IdentityInfo
        v-if="currentProgress.component === 'IdentityInfo'"
        v-bind="{
          ...currentProgress,
          handler,
          params: formData,
        }"
      />
      <BaseInfo
        v-if="currentProgress.component === 'BaseInfo'"
        v-bind="{
          ...currentProgress,
          handler,
          params: formData,
        }"
      />
      <Certificate
        v-if="currentProgress.component === 'Certificate'"
        v-bind="{
          ...currentProgress,
          handler,
          params: formData,
        }"
      />
      <SuccessInfo
        v-if="currentProgress.component === 'SuccessInfo'"
        v-bind="{
          ...currentProgress,
          handler,
          params: formData,
        }"
      />
    </view>
  </view>
</template>

<script>
import IdentityInfo from './components/Identity/index.vue'
import BaseInfo from './components/Base/index.vue'
import Certificate from './components/Certificate/index.vue'
import SuccessInfo from './components/Success/index.vue'

export default {
  components: {
    IdentityInfo,
    BaseInfo,
    Certificate,
    SuccessInfo,
  },
  data() {
    return {
      progressActive: 0,
      progressModel: [
        {
          label: '个人身份信息',
          value: 7,
          component: 'IdentityInfo',
        },
        {
          label: '个人基本信息',
          value: 33,
          component: 'BaseInfo',
        },
        {
          label: '身份证上传',
          value: 54,
          component: 'Certificate',
        },
        {
          label: '认证完成',
          value: 100,
          component: 'SuccessInfo',
        },
      ],
      formData: {},
    }
  },
  computed: {
    currentProgress() {
      return this.progressModel[this.progressActive] || {}
    },
  },
  methods: {
    handler({ active = 0, params = {} } = {}) {
      this.handleActive(active)
      this.formData = {
        ...this.formData,
        ...params,
      }
    },
    handleActive(value) {
      this.progressActive = value
    },
  },
}
</script>

<style lang="postcss" scoped>
:deep(.uv-line-progress) {
  @apply !overflow-visible;
}
</style>
