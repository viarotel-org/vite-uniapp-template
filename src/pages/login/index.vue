<script setup>
import { showToast } from '@uni-helper/uni-promises'
import { appDescription, appExtra, appName, appVersion } from '@/settings/index.js'
import { sleep } from '@/utils'

const userStore = useUserStore()
const router = useRouter()
const webView = useWebView()
const richView = useRichView()

const agreed = ref(false)
const isLoading = ref(false)

async function onLoginClick() {
  if (!agreed.value) {
    await showToast({
      title: '请先同意服务协议',
      icon: 'none',
    })
    return
  }

  try {
    isLoading.value = true

    await userStore.login()

    await showToast({
      title: '登录成功',
      icon: 'success',
    })

    await sleep(500)

    router.pushTab({
      path: '/pages/index/index',
    })
  }
  catch (error) {
    await showToast({
      title: '登录失败，请重试',
      icon: 'error',
    })
  }
  finally {
    isLoading.value = false
  }
}

function toggleAgreement() {
  agreed.value = !agreed.value
}

function onAgreementClick() {
  richView.open({
    title: '产品服务协议',
    content: `
      <div style="padding: 20px; line-height: 1.6; color: #333;">
        <h3 style="color: #1a1a1a; margin-bottom: 16px;">MIT 开源协议</h3>
        <p style="margin-bottom: 16px;">
          本项目已签署 MIT 协议，保障用户的使用权益。
        </p>
        
        <h4 style="color: #1a1a1a; margin: 20px 0 12px 0;">使用条款</h4>
        <p style="margin-bottom: 16px;">
          使用本项目的用户需要遵守如下条款：
        </p>
        
        <p style="margin-bottom: 16px;">
          特此授权，免费得以任何目的的使用、复制、修改、合并、出版、发行、散布、再授权及贩售软件及软件的副本，及授予前述权利的许可，无论是否为商业目的。
        </p>
        
        <h4 style="color: #1a1a1a; margin: 20px 0 12px 0;">免责声明</h4>
        <p style="margin-bottom: 16px;">
          上述软件是按「原样」提供，作者不作任何明示或暗示的保证，包括但不限于对适销性和特定目的的适用性的保证。在任何情况下，无论是在合同诉讼、侵权行为或其它方面，作者都不对因使用本软件或其中所包含的内容所产生的任何直接、间接、偶然、特殊及后果性损害承担责任。
        </p>
      </div>
    `,
  })
}

function onProjectClick() {
  webView.open({
    src: appExtra.url,
  })
}
</script>

<template>
  <view class="relative min-h-screen overflow-hidden from-primary-50 to-primary-100/70 bg-gradient-to-br">
    <view class="absolute left-0 top-0 h-full w-full opacity-5">
      <view class="absolute right-10 top-20 h-32 w-32 rounded-full bg-primary-400 blur-3xl"></view>
      <view class="absolute bottom-40 left-10 h-24 w-24 rounded-full bg-primary-400 blur-2xl"></view>
    </view>

    <view class="relative z-10 min-h-screen flex flex-col">
      <view class="flex flex-1 flex-col justify-center px-6 py-12">
        <view class="mb-12 text-center">
          <view class="relative mb-6 inline-block">
            <view class="mx-auto h-24 w-24 flex items-center justify-center rounded-3xl bg-white shadow-lg">
              <image
                src="/static/images/logo.png"
                alt="App Logo"
                class="h-16 w-16 rounded-2xl"
              />
            </view>
            <view class="absolute rounded-3xl from-primary-400 to-primary-400 bg-gradient-to-r opacity-20 blur-lg -inset-2"></view>
          </view>

          <view class="space-y-2">
            <text class="block text-3xl text-gray-900 font-bold">
              {{ appName }}
            </text>
            <text class="block text-base text-gray-600">
              {{ appDescription }}
            </text>
          </view>
        </view>

        <view class="space-y-6">
          <button
            class="relative w-full overflow-hidden rounded-2xl from-primary-500 to-primary-400 bg-gradient-to-r px-6 py-4 font-semibold shadow-lg transition-all duration-200 active:scale-98 disabled:cursor-not-allowed !text-white disabled:opacity-70"
            :class="{ 'shadow-xl': !isLoading }"
            :disabled="isLoading"
            @click="onLoginClick"
          >
            <view class="flex items-center justify-center space-x-3">
              <view v-if="isLoading" class="i-carbon-fade h-5 w-5 animate-spin bg-white"></view>
              <view v-else class="i-carbon-phone h-5 w-5"></view>
              <text>{{ isLoading ? '登录中...' : '手机号快捷登录' }}</text>
            </view>

            <view class="absolute inset-0 from-transparent via-white to-transparent bg-gradient-to-r opacity-0 transition-all duration-500 -translate-x-full group-active:translate-x-full group-active:opacity-20"></view>
          </button>

          <view class="flex items-center px-2 space-x-2">
            <view
              class="h-5 w-5 flex flex-shrink-0 items-center justify-center border-2 border-gray-300 rounded transition-all duration-200 active:scale-95"
              :class="agreed ? 'bg-primary-500 border-primary-500' : 'bg-white'"
              @click="toggleAgreement"
            >
              <view v-if="agreed" class="i-carbon-checkmark h-3 w-3 text-white"></view>
            </view>

            <view class="mt-[1px] flex-1 leading-relaxed">
              <text class="text-sm text-gray-600">
                我已阅读并同意
                <text
                  class="text-primary-600 font-medium transition-colors duration-200 active:text-primary-700"
                  @click.stop="onAgreementClick"
                >
                  《产品服务协议》
                </text>
              </text>
            </view>
          </view>
        </view>
      </view>

      <view class="px-6 pb-8">
        <view class="text-center space-y-3">
          <view class="mb-6 flex items-center space-x-4">
            <view class="h-px flex-1 bg-gray-200"></view>
            <text class="px-3 text-xs text-gray-400">
              技术支持
            </text>
            <view class="h-px flex-1 bg-gray-200"></view>
          </view>

          <view class="flex items-center justify-center space-x-2">
            <text class="text-sm text-gray-500">
              Powered by
            </text>
            <view
              class="inline-flex items-center text-sm text-primary-600 font-medium transition-colors duration-200 space-x-1 active:text-primary-700"
              @click="onProjectClick"
            >
              <view>{{ appExtra.name }}</view>
              <view class="i-carbon-launch size-3"></view>
            </view>
          </view>

          <view class="flex items-center justify-center text-xs text-gray-400 space-x-2">
            <view class="i-carbon-information h-3 w-3"></view>
            <text>版本 v{{ appVersion }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

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
