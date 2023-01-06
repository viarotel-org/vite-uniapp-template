<template>
  <i :class="['iconfont inline-block', deepClass, iconName]">
    <slot />
  </i>
</template>

<script>
import '@/icons/fonts/iconfont.css'

export default {
  props: {
    prefix: {
      type: String,
      default: 'icon-',
    },
    name: {
      type: String,
      required: true,
    },
    deepClass: {
      type: [String, Object, Array],
      default: '',
    },
  },
  computed: {
    iconName() {
      return `${this.prefix}${this.name}`
    },
  },
}
</script>
