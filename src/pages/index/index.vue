<script setup>
import { primaryColor } from '@/settings/index.js'
import content from '/README.md?raw'
</script>

<template>
  <view class="h-full overflow-auto">
    <zero-markdown-view :markdown="content" :theme-color="primaryColor" />
  </view>
</template>
