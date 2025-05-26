<script setup>
import content from '/README.md?raw'

const appStore = useAppStore()

</script>

<template>
  <view class="h-full overflow-auto">
    <zero-markdown-view :key="appStore.primaryColor" :markdown="content" :theme-color="appStore.primaryColor" />
  </view>
</template>