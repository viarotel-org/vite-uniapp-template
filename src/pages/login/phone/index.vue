<template>
  <div class="bg-white h-full overflow-hidden">
    <div class="mt-8">
      <img
        src="@/assets/images/logo.png"
        alt=""
        class="w-20 h-20 block mx-auto"
      />
      <div class="text-2xl text-center mt-4 font-bold">
        {{ title }}
      </div>
    </div>
    <div class="px-4 mt-18">
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
      <div class="text-center mt-3">
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
      </div>
    </div>
    <div class="absolute inset-x-0 bottom-0 text-center mb-4 text-gray-400">
      {{ title }}
    </div>
  </div>
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
