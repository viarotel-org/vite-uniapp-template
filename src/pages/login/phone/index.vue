<template>
  <view class="bg-white h-full overflow-hidden">
    <view class="mt-8">
      <image src="/static/logo.png" alt="" class="w-20 h-20 block mx-auto" />
      <view class="text-2xl text-center mt-4 font-bold">
        {{ appName }}
      </view>
    </view>
    <view class="px-4 mt-18">
      <u-button type="primary" shape="circle" ripple @click="handleLogin">
        <!-- open-type="getPhoneNumber" -->
        <!-- @getphonenumber="handleLogin" -->
        手机号快捷登录
      </u-button>
      <view class="text-center mt-4 flex items-center justify-center">
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
    <view class="absolute inset-x-0 bottom-0 text-center mb-4 text-gray-400">
      {{ appName }}
    </view>
  </view>
</template>

<script>
import { appName } from '@/configs/index'

export default {
  data() {
    return {
      appName,
      agreed: false,
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
      this.$Router.push({ path: '/pages/statement/index' })
    },
    async handleLogin({ detail = {} } = {}) {
      console.log('login.detail', detail)

      if (!this.agreed) {
        try {
          await this.$dialog('是否已阅读并同意《产品服务协议》?', {
            showCancelButton: true,
            confirmButtonText: '同意',
            cancelButtonText: '取消',
          })

          this.agreed = true
        }
        catch (error) {
          console.log('error', error)
          return
        }
      }

      const params = {
        ...detail,
        code: this.loginCode,
        encryptedData: detail.encryptedData,
        iv: detail.iv,
      }

      await this.$store.user.login(params)
      await this.$toast('登录成功', { type: 'success' })
      this.handleSuccess()
    },
    async handleSuccess() {
      const user = this.$store.user

      try {
        await user.getUserInfo()
        const redirect = this.$Route.query.redirect
        console.log('redirect', redirect)
        if (redirect) {
          this.$Router.replaceAll(JSON.parse(redirect))
        }
        else {
          this.$Router.replaceAll('/')
        }
      }
      catch (error) {
        console.warn('error', error)
      }
    },
  },
}
</script>

<style></style>
