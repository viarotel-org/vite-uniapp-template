<template>
  <view class="">
    <view class="h-[30vh] relative text-white flex-none">
      <image
        :src="$assets('/bg-app.jpg')"
        mode="aspectFill"
        class="h-full w-full absolute top-0 inset-x-0"
      />
      <view
        class="absolute text-center inset-x-0 top-2 text-shadow-xl"
        :style="`padding-top: ${statusBarHeight}px;`"
      >
        vite-uniapp-template
      </view>
      <view class="flex items-end justify-between relative h-full px-4 pb-4">
        <view class="pb-2">
          <view class="pb-3 text-shadow-xl text-shadow-color-gray-800">
            你好, {{ userInfo.username || "游客" }}
          </view>
          <text
            class="text-primary-500 bg-primary-50 py-1 px-3 rounded-full text-sm active:bg-gray-200"
            @click="handleRealname"
          >
            {{ realNameStatusMap[userInfo.realStatus] || "未实名" }}
          </text>
        </view>
        <view class="flex-none overflow-hidden">
          <ChooseAvatar :default-value="userInfo.avatar"></ChooseAvatar>
        </view>
      </view>
    </view>
    <view class="flex-none py-3 px-1">
      <u-swiper
        key-name="imgUrl"
        :list="bannerList"
        indicator
        indicator-mode="line"
        circular
        height="20vh"
        img-mode="aspectFill"
        bg-color="transparent"
        radius="12px"
        :loading="swiperLoading"
        @click="handleBanner"
      ></u-swiper>
    </view>
    <view class="flex flex-wrap pl-4">
      <view
        v-for="(item, index) of menuModel"
        :key="index"
        :class="item.full ? 'w-full' : 'w-1/3'"
        class="pr-4 pb-4"
        @click="handleMenu(item)"
      >
        <view
          class="bg-primary-50/35 flex items-center justify-center overflow-hidden active:bg-primary-100"
          :class="
            item.full
              ? 'flex-row rounded-full space-x-4 py-6'
              : 'flex-col rounded-xl space-y-1 py-4'
          "
        >
          <view class="flex-none h-10 w-10">
            <image
              :src="item.icon"
              mode="aspectFit"
              class="w-full h-full"
            />
          </view>
          <view class="flex-none truncate">
            {{ item.text }}
          </view>
        </view>
      </view>
    </view>
    <view class="text-gray-500 text-sm text-center pb-4">
      主办方：淅川县就业创业服务中心
    </view>
    <u-loading-page
      icon-size="32px"
      :loading="pageLoading"
      :loading-text="pageLoadingText"
    ></u-loading-page>
  </view>
</template>

<script>
import ChooseAvatar from './components/ChooseAvatar/index.vue'
import { sleep } from '@/utils'
import { appName } from '@/configs'

export default {
  components: {
    ChooseAvatar,
  },
  data() {
    return {
      pageLoading: true,
      pageLoadingText: appName,
      swiperLoading: true,
      bannerList: [],
      realNameStatusMap: {
        1: '未实名',
        2: '实名中',
        3: '已实名',
        4: '实名失败',
      },
    }
  },
  computed: {
    menuModel() {
      return [
        {
          icon: this.$assets('/images/home/menu-personal.png', {
            noCache: true,
          }),
          text: '就业状态',
          route: { path: '/personal' },
        },
        {
          icon: this.$assets('/images/home/menu-enterprise.png', {
            noCache: true,
          }),
          text: '就业直通车',
          route: { path: '/enterprise' },
        },
        {
          icon: this.$assets('/images/home/menu-education.png', {
            noCache: true,
          }),
          text: '培训信息',
          route: { path: '/educate' },
        },
        {
          icon: this.$assets('/images/home/menu-message.png', {
            noCache: true,
          }),
          text: '联系我们',
          route: { path: '/contact' },
          full: true,
        },
        {
          icon: this.$assets('/images/home/menu-support.png', {
            noCache: true,
          }),
          text: '创业扶持',
          route: { path: '/support' },
        },
        {
          icon: this.$assets('/images/home/menu-policy.png', { noCache: true }),
          text: '政策宣传',
          route: { path: '/cms/policy' },
        },
        {
          icon: this.$assets('/images/home/menu-news.png', { noCache: true }),
          text: '工作动态',
          route: { path: '/cms/news' },
        },
      ]
    },
    statusBarHeight() {
      return this.$store.app.systemInfo.statusBarHeight
    },
    userInfo() {
      return this.$store.user.userInfo
    },
  },
  onShow() {
    this.$store.user.getUserInfo().catch(() => {
      this.$store.user.logout()
    })
  },
  created() {
    this.getBannerData()
  },
  async mounted() {
    await sleep(500)
    this.pageLoading = false
  },
  methods: {
    handleBanner(index) {
      const item = this.bannerList[index]
      console.log('handleBanner.item', item)
      if (!item.url) {
        return
      }

      if (item.isJump === 1) {
        this.$Router.push(item.url)
      }
    },
    handleMenu(item) {
      const route = item.route
      if (!route) {
        this.$toast('暂未开放')
        return
      }
      this.$Router.push(route)
    },
    async handleRealname() {
      if (this.userInfo.realStatus === 2) {
        await this.$toast('实名审核中')
        return
      }

      if (this.userInfo.realStatus === 3) {
        await this.$toast('已实名')
        return
      }

      if (this.userInfo.realStatus === 4) {
        try {
          await this.$dialog(
            `${this.userInfo.auditResult || '提交的实名信息不符'}`,
            {
              title: '实名失败',
              showCancelButton: true,
              confirmText: '重新认证',
            },
          )
        }
        catch (error) {
          console.warn(error)
          return
        }
      }

      this.$Router.push({
        path: '/realname',
      })
    },
    async getBannerData() {
      this.swiperLoading = true
      const res = await this.$api.bannerWxlist()
      this.swiperLoading = false
      this.bannerList = res.data
    },
  },
}
</script>

<style lang="postcss" scoped>
:deep(.u-swiper__wrapper__item) {
  @apply !px-3;
}
</style>
