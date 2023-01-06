<template>
  <div class="h-full">
    <div
      class="flex items-center bg-gradient-to-l to-primary from-green-700 px-4 h-[30vh]"
      @click="handleLogin"
    >
      <div class="overflow-hidden rounded-full w-20 h-20">
        <!-- :src="userData.headImage" -->
        <img
          src="@/assets/images/image-user.png"
          alt=""
          class="w-full h-full"
        />
      </div>
      <div class="text-white text-xl ml-4">
        <div
          v-if="isLogin"
          class=""
        >
          {{ userData.userName }}
        </div>
        <div v-else>立即登录</div>
      </div>
    </div>
    <div class="">
      <div
        v-for="(item, index) of listModel"
        :key="index"
        class="flex items-center py-4 px-4 border-b border-gray-200 bg-white"
        @click="handleInfo(item)"
      >
        <div class="w-10 flex-none truncate text-primary-500 text-2xl">
          <via-icon :name="item.icon"></via-icon>
        </div>
        <div class="flex-1 w-0">{{ item.text }}</div>
        <div class="flex-none w-10 text-right text-gray-500">
          <via-icon name="right"></via-icon>
        </div>
      </div>
    </div>
    <div
      v-if="isLogin"
      class="mt-8 px-4"
    >
      <u-button
        type="success"
        plain
        ripple
        @click="handleLogout"
      >
        退出登录
      </u-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  // onShow() {},
  computed: {
    isLogin() {
      return !!this.$store.userStore.token
    },
    listModel() {
      return [
        {
          icon: 'telephone',
          text: '联系我们',
          path: '/pages/connect/index',
        },
        {
          icon: 'ico-tips',
          text: '特别声明',
          path: '/pages/statement/index',
        },
      ]
    },
    userData() {
      return this.$store.userStore.userData
    },
  },
  methods: {
    handleInfo(item) {
      this.$Router.push({
        path: item.path,
        query: item.query || {},
      })
    },
    handleLogin() {
      if (this.isLogin) {
        return
      }

      this.$Router.push({
        path: '/login',
      })
    },
    async handleLogout() {
      try {
        await this.$dialog('确定要退出登录吗?', {
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
      } catch (error) {
        console.log(error)
        return
      }

      await this.$store.userStore.logout()
      await this.$toast('退出登录成功', { type: 'success' })
      this.$Router.replace({ path: '/login' })
    },
  },
}
</script>

<style></style>
