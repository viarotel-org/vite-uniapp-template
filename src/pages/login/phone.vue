<script setup>
import { appName, enterpriseInfo } from '@/settings/index.js'
import { version } from '/package.json'

const agreed = ref(false)

function handleLogin() {

}

function handleAgree() {

}

function handleInfo() {

}
</script>

<template>
  <view class="h-full overflow-hidden bg-white pt-24">
    <view class="mt-8">
      <image src="/static/logo.png" alt="" class="mx-auto block h-20 w-20" />
      <view class="mt-4 text-center text-2xl font-bold">
        {{ appName }}
      </view>
    </view>
    <view class="mt-18 px-4">
      <wd-button type="primary" size="large" block @click="handleLogin">
        手机号快捷登录
      </wd-button>

      <view class="mt-4 flex items-center justify-center text-center">
        <checkbox :checked="agreed" class="">
        </checkbox>
        <text>
          我已阅读并同意
          <text
            class="text-primary active:text-primary-700"
            @click.stop="handleAgree"
          >
            《产品服务协议》
          </text>
        </text>
      </view>
    </view>
    <view
      class="absolute inset-x-0 bottom-0 mb-4 text-center text-sm text-gray-400"
    >
      <view>
        Supported by
        <text
          class="text-primary-500 underline active:text-primary-700"
          @click="handleInfo"
        >
          {{ enterpriseInfo.name }}
        </text>
        v{{ version }}
      </view>
    </view>
  </view>
</template>

<style></style>
