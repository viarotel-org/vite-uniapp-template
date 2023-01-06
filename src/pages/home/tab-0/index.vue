<template>
  <div class="">
    <div class="h-[35vh] flex flex-col justify-center">
      <img
        src="@/assets/images/logo.png"
        alt=""
        class="w-20 h-20 block mx-auto"
      />
      <div class="text-black text-xl text-center font-bold mt-4">
        {{ title }}
      </div>
    </div>
    <div class="px-4 pb-8 leading-loose">
      <div class="mb-2">💡 基于 vite 驱动的 uniapp 最佳实践的集成模板,</div>
      <div class="">
        💕 css 框架 使用
        <a
          href="https://uno.antfu.me/"
          class=""
        >unocss</a>
      </div>
      <div class="">
        💕 request 库 使用
        <a
          href="https://github.com/uni-helper/uni-network/"
          class=""
        >uni-network</a>
        (api 同 axios)
      </div>
      <div class="">
        💕 router 路由 使用
        <a
          href="https://github.com/Gertyxs/uni-native-router/"
          class=""
        >uni-native-router</a>
        (通过二次封装 api 同 vue-router)
      </div>
      <div class="">
        💕 store 库 使用
        <a
          href="https://pinia.vuejs.org/"
          class=""
        >pinia</a>
      </div>
      <div class="">
        💕 ui 库 使用
        <a
          href="https://v1.uviewui.com/"
          class=""
        >uview</a>
        (已配置自动按需导入)
      </div>
    </div>
  </div>
</template>

<script>
import { company } from '@/configs/index'

export default {
  data() {
    return {
      title: company.name,
    }
  },
}
</script>

<style></style>
