<template>
  <view class="px-4 h-full overflow-auto">
    <ua-markdown :source="content" />
  </view>
</template>

<script>
import content from '/README.md?raw'

export default {
  data() {
    return {
      content,
    }
  },
}
</script>
