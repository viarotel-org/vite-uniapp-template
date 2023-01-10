<template>
  <view class="">
    <view class="h-[35vh] flex flex-col justify-center">
      <image
        src="@/assets/images/logo.png"
        alt=""
        class="w-20 h-20 block mx-auto"
      />
      <view class="text-black text-xl text-center font-bold mt-4">
        {{ title }}
      </view>
    </view>
    <view class="px-4 bg-white">
      <u-form
        label-width="200"
        border
      >
        <u-form-item label="邮箱">
          <view
            class=""
            @click="handleCopy(company.mail)"
          >
            {{ company.mail }}
            <via-icon
              name="fuzhi"
              class="text-gray-400"
            ></via-icon>
          </view>
        </u-form-item>
        <u-form-item label="微信号">
          <view
            class=""
            @click="handleCopy(company.wechat)"
          >
            {{ company.wechat }}
            <via-icon
              name="fuzhi"
              class="text-gray-400"
            ></via-icon>
          </view>
        </u-form-item>
        <u-form-item label="微信二维码">
          <image
            :src="wechatImage"
            alt=""
            class="w-20 h-20"
          />
        </u-form-item>
      </u-form>
    </view>
  </view>
</template>

<script>
import { company } from '@/configs/index'
import wechatImage from '@/assets/images/image-wechat.png'

export default {
  data() {
    return {
      company,
      title: company.name,
      wechatImage,
    }
  },
  methods: {
    handleCopy(data) {
      uni.setClipboardData({
        data,
        showToast: false,
        success: () => {
          this.$toast('内容已复制')
        },
      })
    },
  },
}
</script>

<style></style>
