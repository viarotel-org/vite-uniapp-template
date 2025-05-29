<script setup>
import wechatImage from '~@assets/images/contact/image-wechat.png?url'
import { appExtra } from '@/settings/index.js'

// 复制文本到剪贴板
function handleCopy(text) {
  uni.setClipboardData({
    data: text,
    success: () => {
      showToast('复制成功')
    },
  })
}

// 拨打电话
function handleCall(phone) {
  uni.makePhoneCall({
    phoneNumber: phone,
    fail: () => {
      showToast('拨打电话失败')
    },
  })
}

// 预览图片
function previewImage(url) {
  uni.previewImage({
    urls: [url],
    current: url,
  })
}

// 保存二维码到相册
function handleSaveQrCode() {
  uni.saveImageToPhotosAlbum({
    filePath: wechatImage,
    success: () => {
      showToast('保存成功')
    },
    fail: () => {
      showToast('保存失败，请检查权限设置', 'none')
    },
  })
}

// 显示提示信息
function showToast(title, icon = 'success') {
  uni.showToast({
    title,
    icon,
    duration: 2000000,
  })
}
</script>

<template>
  <view class="contact-page h-full flex flex-col bg-gray-50">
    <view class="header-section relative">
      <image
        src="~@assets/images/contact/image-banner.jpg"
        mode="aspectFill"
        class="h-50 w-full rounded-b-3xl object-cover shadow-md"
      />

      <view class="absolute inset-0 rounded-b-3xl from-black/0 to-black/60 bg-gradient-to-b"></view>

      <view class="absolute bottom-4 left-0 w-full p-6 text-white">
        <view class="mb-1 text-2xl font-bold">
          联系我们
        </view>
        <view class="text-sm text-white/80">
          为您提供有限的帮助与支持
        </view>
      </view>
    </view>

    <view class="contact-cards relative z-10 px-4 -mt-4">
      <view class="overflow-hidden rounded-xl bg-white shadow-lg">
        <view class="border-b border-gray-100 px-5 py-4">
          <view class="text-lg text-gray-800 font-bold">
            联系方式
          </view>
        </view>

        <view class="divide-y divide-gray-100">
          <view class="contact-item" @click="handleCopy(appExtra.email)">
            <view class="icon-container">
              <view class="i-carbon-email size-6 text-primary-500"></view>
            </view>
            <view class="info-container">
              <view class="label">
                电子邮箱
              </view>
              <view class="value">
                {{ appExtra.email }}
              </view>
            </view>
            <view class="action-container">
              <view class="copy-button">
                复制
              </view>
            </view>
          </view>

          <view class="contact-item" @click="handleCopy(appExtra.wechat)">
            <view class="icon-container">
              <view class="i-carbon-logo-wechat size-6 text-primary-500"></view>
            </view>
            <view class="info-container">
              <view class="label">
                微信号
              </view>
              <view class="value">
                {{ appExtra.wechat }}
              </view>
            </view>
            <view class="action-container">
              <view class="copy-button">
                复制
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="mt-4 overflow-hidden rounded-xl bg-white shadow-lg">
        <view class="border-b border-gray-100 px-5 py-4">
          <view class="text-lg text-gray-800 font-bold">
            微信二维码
          </view>
        </view>
        <view class="flex flex-col items-center p-5">
          <image
            :src="wechatImage"
            mode="aspectFit"
            class="h-50 w-50 border border-gray-100 rounded-lg"
            @click="previewImage(wechatImage)"
          />
          <view class="mt-3 text-sm text-gray-500">
            点击二维码可放大查看
          </view>
          <button
            class="mt-4 w-full rounded-lg bg-primary-500 py-1 text-white font-medium transition-colors duration-200 active:bg-primary-600"
            hover-class="bg-primary-600"
            @click="handleSaveQrCode"
          >
            保存二维码到相册
          </button>
        </view>
      </view>
    </view>

    <view class="footer-section mt-auto p-4 text-center text-xs text-gray-400">
      <view class="mt-1">
        © {{ new Date().getFullYear() }} {{ appExtra.name }} 版权所有
      </view>
    </view>
  </view>
</template>

<style scoped>
/* 联系方式项样式 */
.contact-item {
  @apply flex items-center px-5 py-4 active:bg-gray-50 transition-colors duration-200;
}

.icon-container {
  @apply flex-none w-10 flex items-center justify-center;
}

.info-container {
  @apply flex-1 min-w-0;
}

.label {
  @apply text-sm text-gray-500;
}

.value {
  @apply text-gray-800 font-medium mt-0.5;
}

.action-container {
  @apply flex-none ml-2;
}

.copy-button {
  @apply flex items-center text-sm px-3 py-1.5 rounded-full bg-gray-100 text-gray-600 active:bg-gray-200 transition-colors duration-200;
}

.call-button {
  @apply flex items-center text-sm px-3 py-1.5 rounded-full bg-primary-50 text-primary-600 active:bg-primary-100 transition-colors duration-200;
}
</style>
