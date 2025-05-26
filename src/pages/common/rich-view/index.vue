<script setup>
const route = useRoute()

const richViewStore = useRichViewStore()

const richViewProps = computed(() => ({
  ...route.query,
  content: richViewStore.content,
}))

watchEffect(() => {
  if (richViewProps.value.title) {
    uni.setNavigationBarTitle({
      title: decodeURIComponent(richViewProps.value.title),
    })
  }
})
</script>

<template>
  <view class="p-4">
    <uv-parse :content="richViewProps.content"></uv-parse>
  </view>
</template>
