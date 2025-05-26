<script setup>
import { showModal, showToast } from '@uni-helper/uni-promises'
import { appName, extraInfo } from '@/settings/index.js'
import { sleep } from '@/utils'
import { version } from '/package.json'

const userStore = useUserStore()

const router = useRouter()

const webView = useWebView()
const richView = useRichView()

const agreed = ref(false)

async function onLoginClick() {
  const result = await showModal({
    title: '登录提示',
    content: '是否已阅读并同意《产品服务协议》?',
  })

  if (result.confirm) {
    agreed.value = true

    await userStore.login()

    await showToast({
      title: '登录成功',
    })

    await sleep()

    router.pushTab({
      path: '/pages/index/index',
    })
  }
}

function onAgreementClick() {
  richView.open({
    title: '产品服务协议',
    content: `
      <div class="">
        <p class="">
          本项目已签署MIT协议
        </p>
        <br/>
        <p class="">
          使用本项目的用户需要遵守如下条款：
        </p>
        <br/>
        <p class="">
          特此授权，免费得以任何目的的使用、复制、修改、合并、出版、发行、散布、再授权及贩售软件及软件的副本，及授予前述权利的许可，无论是否为商业目的。
        </p>
        <br/>
        <p class="">
          上述软件是按「原样」提供，作者不作任何明示或暗示的保证，包括但不限于对适销性和特定目的的适用性的保证。在任何情况下，无论是在合同诉讼、侵权行为或其它方面，作者都不对因使用本软件或其中所包含的内容所产生的任何直接、间接、偶然、特殊及后果性损害（包括但不限于替代商品或服务的采购、使用、数据或利润损失、或业务中断）承担责任。
        </p>
      </div>
    `,
  })
}

function onProjectClick() {
  webView.open({
    src: extraInfo.url,
  })
}
</script>

<template>
  <view class="h-full overflow-hidden bg-white pt-24">
    <view class="mt-8">
      <image src="/static/images/logo.png" alt="" class="mx-auto block h-20 w-20" />
      <view class="mt-4 text-center text-2xl font-bold">
        {{ appName }}
      </view>
    </view>

    <view class="mt-18 px-4">
      <button class="bg-primary-500 py-2 text-gray-50" @click="onLoginClick">
        手机号快捷登录
      </button>

      <view class="mt-4 flex items-center justify-center text-center">
        <checkbox :checked="agreed" class="">
        </checkbox>
        <text class="pt-1">
          我已阅读并同意
          <text
            class="text-primary active:text-primary-700"
            @click.stop="onAgreementClick"
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
          @click="onProjectClick"
        >
          {{ extraInfo.name }}
        </text>
        v{{ version }}
      </view>
    </view>
  </view>
</template>

<style></style>
