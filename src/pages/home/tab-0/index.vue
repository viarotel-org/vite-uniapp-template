<template>
  <view class="">
    <view class="h-[35vh] flex flex-col justify-center">
      <image
        :src="logoURL"
        alt=""
        class="w-20 h-20 block mx-auto"
      />
      <view
        class="text-black text-xl text-center font-bold mt-4"
        @click="$Router.push('/login')"
      >
        {{ title }}
      </view>
    </view>
    <view class="px-4 pb-8 leading-loose">
      <view class="mb-2">💡 基于 vite 驱动的 uniapp 最佳实践的集成模板,</view>
      <view class="">
        💕 css 框架 使用
        <a
          href="https://uno.antfu.me/"
          class=""
        >unocss</a>
      </view>
      <view class="">
        💕 request 库 使用
        <a
          href="https://github.com/uni-helper/uni-network/"
          class=""
        >uni-network</a>
        (api 同 axios)
      </view>
      <view class="">
        💕 router 路由 使用
        <a
          href="https://github.com/Gertyxs/uni-native-router/"
          class=""
        >uni-native-router</a>
        (通过二次封装 api 同 vue-router)
      </view>
      <view class="">
        💕 store 库 使用
        <a
          href="https://pinia.vuejs.org/"
          class=""
        >pinia</a>
      </view>
      <view class="">
        💕 ui 库 使用
        <a
          href="https://v1.uviewui.com/"
          class=""
        >uview</a>
        (已配置自动按需导入)
      </view>
    </view>
  </view>
</template>

<script>
import logoURL from '@/assets/images/logo.png'
import { company } from '@/configs/index'

export default {
  data() {
    console.log('logoURL', logoURL)
    return {
      title: company.name,
      logoURL,
    }
  },
}
</script>

<style></style>
