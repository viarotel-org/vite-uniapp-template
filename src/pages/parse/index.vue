<script setup>
import { watchEffect } from 'vue'

const route = useRoute()

const parseStore = useParseStore()

const parseProps = computed(() => ({
  ...route.query,
  content: parseStore.content,
}))

watchEffect(() => {
  if (parseProps.value.title) {
    uni.setNavigationBarTitle({
      title: decodeURIComponent(parseProps.value.title),
    })
  }
})
</script>

<template>
  <view class="p-4">
    <uv-parse v-bind="parseProps"></uv-parse>
  </view>
</template>
