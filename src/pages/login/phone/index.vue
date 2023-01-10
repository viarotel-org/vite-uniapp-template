<template>
  <view class="bg-white h-full overflow-hidden">
    <view class="mt-8">
      <image
        src="@/assets/images/logo.png"
        alt=""
        class="w-20 h-20 block mx-auto"
      />
      <view class="text-2xl text-center mt-4 font-bold">
        {{ title }}
      </view>
    </view>
    <view class="px-4 mt-18">
      <u-button
        type="success"
        shape="circle"
        ripple
        @click="handleLogin"
      >
        <!-- open-type="getPhoneNumber" -->
        <!-- @getphonenumber="handleLogin" -->
        手机号快捷登录
      </u-button>
      <view class="text-center mt-3">
        <u-checkbox
          v-model="agree"
          class=""
        >
          我已阅读并同意
          <span
            class="text-primary active:text-primary-700"
            @click.stop="handleAgree"
          >《产品服务协议》</span>
        </u-checkbox>
      </view>
    </view>
    <view class="absolute inset-x-0 bottom-0 text-center mb-4 text-gray-400">
      {{ title }}
    </view>
  </view>
</template>

<script>
import { title } from '@/configs/index'

export default {
  data() {
    return {
      title,
      agree: false,
      loginCode: '',
    }
  },
  onShow() {
    this.getLoginCode()
  },
  methods: {
    getLoginCode() {
      uni.login({
        provider: 'weixin', // 使用微信登录
        success: (res) => {
          console.log('handleBeforeLogin.res', res)
          this.loginCode = res.code
        },
      })
    },
    handleAgree() {
      this.$Router.push({ path: '' })
    },
    async handleLogin({ detail = {} } = {}) {
      console.log('login.detail', detail)

      if (!this.agree) {
        try {
          await this.$dialog('是否已阅读并同意《产品服务协议》?', {
            showCancelButton: true,
            confirmButtonText: '同意',
            cancelButtonText: '取消',
          })

          this.agree = true
        } catch (error) {
          console.log('error', error)
          return
        }
      }

      const params = {
        ...detail,
        code: this.loginCode,
        encryptedData: detail.encryptedData,
        iv: detail.iv,
        mockData: {
          token: 'mock-token',
        },
      }

      const res = await this.$req.mockRequest(params)

      if (res.code === '0000') {
        this.$store.userStore.setToken(res.data.token)
        await this.$toast('登录成功', { type: 'success' })
        this.$Router.push({ path: '/tab-0' })
      }
    },
  },
}
</script>

<style></style>
