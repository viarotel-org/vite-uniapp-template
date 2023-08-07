<template>
  <view class="h-full px-4 flex flex-col">
    <view class="font-bold pt-8 pb-4 flex-none">
      个人身份信息
    </view>
    <view class="flex-1 h-0">
      <u--form
        ref="uForm"
        label-position="left"
        :model="formData"
        v-bind="{
          labelWidth: 90,
        }"
      >
        <u-form-item
          label="姓名"
          prop="realName"
          border-bottom
        >
          <u--input
            v-model="formData.realName"
            placeholder="请输入姓名"
            v-bind="{
              border: 'none',
            }"
          ></u--input>
        </u-form-item>
        <u-form-item
          label="身份证号"
          prop="idcardNo"
          border-bottom
        >
          <u--input
            v-model="formData.idcardNo"
            placeholder="请输入身份证号"
            v-bind="{
              border: 'none',
            }"
          ></u--input>
        </u-form-item>
      </u--form>
    </view>
    <view class="flex-none pb-4">
      <u-button
        type="primary"
        text="确定"
        shape="circle"
        size="large"
        @click="handleSubmit"
      ></u-button>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    handler: {
      type: Function,
      default: () => () => {},
    },
  },
  data() {
    return {
      formData: {
        realName: '',
        idcardNo: '',
      },
      formRules: {
        realName: {
          type: 'string',
          required: true,
          message: '姓名不能为空',
          trigger: ['blur'],
        },
        idcardNo: [
          {
            type: 'string',
            required: true,
            message: '身份证号不能为空',
            trigger: ['blur'],
          },
          {
            validator: (rule, value, callback) => uni.$u.test.idCard(value),
            message: '身份证号格式错误',
            trigger: ['blur'],
          },
        ],
      },
    }
  },
  computed: {
    userInfo() {
      return this.$store.user.userInfo
    },
  },
  created() {
    this.formData = {
      ...this.formData,
      realName: this.userInfo.realName,
      idcardNo: this.userInfo.idcardNo,
    }
  },
  mounted() {
    this.$refs.uForm.setRules(this.formRules)
  },
  methods: {
    async handleSubmit() {
      try {
        await this.$refs.uForm.validate()
      }
      catch (error) {
        console.warn('error', error)
        return
      }

      const params = {
        ...this.formData,
      }
      this.$loading(true)
      const res = await this.$api.checkUserinfo(params)
      this.$loading(false)
      if (res.code == '20000') {
        const imported = res.data
        if (imported) {
          this.handleBind()
          return
        }

        this.handler({
          active: 1,
          params: this.formData,
        })
      }
    },
    async handleBind() {
      const params = {
        ...this.formData,
      }
      this.$loading(true)
      const res = await this.$api.bindUserinfo(params)
      this.$loading(false)
      if (res.code == '20000') {
        const binded = res.data
        if (binded) {
          this.handler({
            active: 3,
            params: {
              ...this.formData,
              binded,
            },
          })
          return
        }

        this.$toast('绑定失败, 请联系客服')
      }
    },
  },
}
</script>

<style></style>
