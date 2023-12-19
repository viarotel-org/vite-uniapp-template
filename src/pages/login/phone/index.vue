<template>
  <view class="bg-white h-full overflow-hidden pt-24">
    <view class="mt-8">
      <image src="/static/logo.png" alt="" class="w-20 h-20 block mx-auto" />
      <view class="text-2xl text-center mt-4 font-bold">
        {{ appName }}
      </view>
    </view>
    <view class="px-4 mt-18">
      <uv-button type="primary" shape="circle" ripple @click="handleLogin">
        手机号快捷登录
      </uv-button>
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
    <view
      class="absolute inset-x-0 bottom-0 text-center mb-4 text-gray-400 text-sm"
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

<script>
import { version } from '/package.json'
import { appName, enterpriseInfo } from '@/configs/index'

export default {
  data() {
    return {
      appName,
      enterpriseInfo,
      version,
      agreed: false,
    }
  },
  onShow() {},
  methods: {
    handleInfo() {
      this.$Router.push({
        path: '/webview',
        query: {
          title: 'viarotel',
          src: 'https://viarotel.eu.org/',
        },
      })
    },
    handleAgree() {
      this.$Router.push({ path: '/pages/statement/index' })
    },
    async handleLogin() {
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

      const params = {}

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
