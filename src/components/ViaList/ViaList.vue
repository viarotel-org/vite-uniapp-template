<template>
  <scroll-view
    :refresher-triggered="refreshed"
    :class="[customClass]"
    :style="[customStyle]"
    :refresher-enabled="refresherEnabled"
    scroll-y
    scroll-anchoring
    class=""
    @scrolltolower="onScrolltolower"
    @refresherrefresh="onRefresherrefresh"
  >
    <slot v-if="$slots.default"></slot>

    <template v-if="$slots.item">
      <slot
        v-for="(item, index) in modelValue"
        name="item"
        :item="item"
        :index="index"
      ></slot>
    </template>

    <template v-if="_openEmpty">
      <slot name="empty">
        <view class="flex flex-col items-center justify-center h-full">
          <u-empty
            :text="emptyText"
            :mode="emptyType"
          >
            <template #bottom>
              <view
                v-if="!!emptyButtonText"
                class="w-full"
              >
                <u-button
                  hover-class="none"
                  ripple
                  size="medium"
                  shape="circle"
                  type="primary"
                  @click="$emit('empty-button', $event)"
                >
                  {{ emptyButtonText }}
                </u-button>
              </view>
            </template>
          </u-empty>
        </view>
      </slot>
    </template>

    <view
      v-if="isData && !closeLoadmore"
      class="py-4 trigger"
    >
      <u-loadmore
        :status="loadmoreType"
        @click="
          !finished &&
            ($emit('update:loaded', true), $emit('load-more', $event))
        "
      />
    </view>
  </scroll-view>
</template>

<script>
export default {
  name: 'ViaList',
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
    customClass: {
      type: [Object, String, Array],
      default: () => {},
    },
    customStyle: {
      type: [Object, String, Array],
      default: () => {},
    },
    finished: {
      type: Boolean,
      default: false,
    },
    loaded: {
      type: Boolean,
      default: false,
    },
    refreshed: {
      type: Boolean,
      default: false,
    },
    // 开启空状态功能
    openEmpty: {
      type: Boolean,
      default: false,
    },
    emptyType: {
      type: String,
      default: 'data',
    },
    emptyText: {
      type: String,
      default: '列表数据为空',
    },
    emptyButtonText: {
      type: String,
      default: '点击刷新',
    },
    // 关闭下拉刷新
    closeRefresh: {
      type: Boolean,
      default: false,
    },
    // 关闭下拉加载
    closeLoadmore: {
      type: Boolean,
      default: false,
    },
  },
  emits: [
    'update:refreshed',
    'refresh',
    'update:loaded',
    'load',
    'load-more',
    'update:finished',
    'update:model-value',
    'empty-button',
  ],
  computed: {
    refresherEnabled() {
      return !this.closeRefresh && !this._openEmpty
    },
    isData() {
      return !!this.modelValue.length
    },
    _openEmpty() {
      return !this.isData && this.openEmpty && this.emptyType
    },
    siteInfo() {
      return this.$store.getters.siteInfo
    },
    loadmoreType() {
      let tempStr = ''
      if (this.finished) {
        tempStr = 'nomore'
      } else if (this.loaded) {
        tempStr = 'loading'
      } else {
        tempStr = 'loadmore'
      }
      return tempStr
    },
  },
  created() {
    // console.log("via-list", this);
  },
  methods: {
    // 自定义下拉刷新被触发
    onRefresherrefresh(e) {
      this.$emit('update:refreshed', true)
      this.$emit('refresh', e)
    },
    // 滚动到底部触发
    onScrolltolower(e) {
      if (this.finished) {
        return
      }

      this.$emit('update:loaded', true)
      this.$emit('load', e)
    },
    /**
     * @desc 下拉刷新 上拉加载 数据封装
     * @param {Array} data 数组
     * @param {string} list 列表名称
     * @param {function} length 每次返回的数组长度
     */
    $loadUtils(data, { length = 10 } = {}) {
      if (this.loaded) {
        this.$emit('update:model-value', [...this.modelValue, ...data])
        this.$emit('update:loaded', false)
      } else {
        this.$emit('update:model-value', [...data])
        this.$emit('update:refreshed', false)
      }

      if (data.length < length) {
        this.$emit('update:finished', true)
      } else {
        this.$emit('update:finished', false)
      }
    },
  },
}
</script>
<style></style>
