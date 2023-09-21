<template>
  <button
    open-type="chooseAvatar"
    hover-class="none"
    class="overflow-hidden !hover:bg-transparent !active:bg-transparent"
    @chooseavatar="onChooseAvatar"
  >
    <slot :show-value="showValue">
      <image
        :src="showValue"
        mode="scaleToFill"
        class="w-16 h-16 flex-none rounded-full overflow-hidden"
      />
    </slot>
  </button>
</template>

<script>
import { getFileBaseURL } from '@/configs/request'
import defaultAvatar from '@/static/avatar.png'

export default {
  props: {
    defaultValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showValue: defaultAvatar,
    }
  },

  watch: {
    defaultValue: {
      handler(value) {
        if (!value) {
          return
        }

        this.showValue = value
      },
      immediate: true,
    },
  },
  methods: {
    onChooseAvatar(event) {
      console.log('onChooseAvatar.event', event)
      const { avatarUrl } = event.detail
      this.showValue = avatarUrl
      this.uploadAvatar()
    },
    async uploadAvatar() {
      const res = await this.$api.uploadFile({
        name: 'file',
        filePath: this.showValue,
      })
      console.log('uploadAvatar.res', res)

      if (res.success) {
        const data = `${getFileBaseURL()}/${res.data}`
        this.showValue = data
        this.submitAvatar()
      }
    },
    async submitAvatar() {
      const params = {
        headPicUrl: this.showValue,
      }

      const res = await this.$api.userHeadimg(params)
      if (res.success) {
        await this.$toast('头像设置成功')
      }
    },
  },
}
</script>

<style></style>
