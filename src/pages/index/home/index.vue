<template>
  <view class="h-full overflow-auto">
    <zero-markdown-view :markdown="content" :theme-color="primaryColor" />
  </view>
</template>

<script>
import content from '/README.md?raw'
import { primaryColor } from '@/configs/index.js'

export default {
  data() {
    return {
      content,
      primaryColor,
    }
  },
}
</script>
