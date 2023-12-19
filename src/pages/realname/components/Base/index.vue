<template>
  <view class="h-full px-4 flex flex-col">
    <view class="font-bold pt-8 pb-4 flex-none">
      个人基本信息
    </view>
    <view class="flex-1 h-0">
      <uv-form
        ref="uForm"
        label-position="left"
        :model="formData"
        :label-width="90"
      >
        <uv-form-item label="性别" prop="userSex" border-bottom>
          <uv-radio-group
            v-model="formData.userSex"
            placement="row"
            v-bind="{
              activeColor: 'rgba(var(--color-primary), 1)',
            }"
            disabled
          >
            <view>
              <uv-radio label="男" :name="1"></uv-radio>
            </view>
            <view class="pl-4">
              <uv-radio label="女" :name="2"></uv-radio>
            </view>
          </uv-radio-group>
        </uv-form-item>
        <uv-form-item label="户籍信息" prop="nativePlace" border-bottom>
          <AreaPickerTrigger v-model="formData.nativePlace">
            <template #default="{ value }">
              <view class="flex items-center w-full">
                <view class="flex-1 w-0">
                  <uv-input
                    :model-value="value"
                    placeholder="请选择户籍信息"
                    border="none"
                    readonly
                  ></uv-input>
                </view>
                <view class="flex-none">
                  <uv-icon name="arrow-right"></uv-icon>
                </view>
              </view>
            </template>
          </AreaPickerTrigger>
        </uv-form-item>
        <uv-form-item label="户主" prop="realName" border-bottom>
          <uv-input
            v-model="formData.realName"
            placeholder="请输入户主姓名"
            border="none"
          ></uv-input>
        </uv-form-item>
        <uv-form-item label="手机号" prop="userPhone" border-bottom>
          <view class="flex">
            <uv-input
              v-model="formData.userPhone"
              placeholder="请输入手机号"
              border="none"
            ></uv-input>
            <view class="flex-none pl-1">
              <uv-button
                type="primary"
                size="small"
                open-type="getPhoneNumber"
                readonly
                @getphonenumber="getPhoneNumber"
              >
                获取手机号
              </uv-button>
            </view>
          </view>
        </uv-form-item>
      </uv-form>
    </view>
    <view class="flex-none pb-4">
      <uv-button
        type="primary"
        text="确定"
        shape="circle"
        size="large"
        @click="handleSubmit"
      ></uv-button>
    </view>
  </view>
</template>

<script>
import AreaPickerTrigger from './AreaPicker/trigger.vue'
import { getSexText, sleep } from '@/utils'

export default {
  components: {
    AreaPickerTrigger,
  },
  props: {
    handler: {
      type: Function,
      default: () => () => {},
    },
    params: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      formData: {
        userSex: 1,
        nativePlace: [],
        realName: '',
        userPhone: '',
      },
      formRules: {
        nativePlace: {
          validator: (rule, value, callback) => !!value.length,
          message: '户籍信息不能为空',
          trigger: ['blur'],
        },
        realName: {
          required: true,
          message: '户主姓名不能为空',
          trigger: ['blur'],
        },
        userPhone: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: ['blur'],
          },
          {
            validator: (rule, value, callback) => uni.$u.test.mobile(value),
            message: '手机号格式错误',
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
      realName: this.params.realName || this.userInfo.realName,
      userSex: this.getUserSex(),
      nativePlace: this.userInfo.nativePlace
        ? [
            this.userInfo.countyId,
            this.userInfo.townId,
            this.userInfo.villageId,
          ]
        : [],
      userPhone: this.userInfo.userPhone,
    }
  },
  mounted() {
    this.$refs.uForm.setRules(this.formRules)
  },
  methods: {
    getUserSex() {
      const idcardNo = this.params.idcardNo || this.userInfo.idcardNo
      const value = getSexText(idcardNo) === '男' ? 1 : 2
      return value
    },
    async getPhoneNumber(event) {
      console.log('getPhoneNumber.event', event)

      const params = {
        wxCode: event.detail.code,
      }

      const res = await this.$api.phoneNumber(params)
      if (res.success) {
        this.formData.userPhone = res.data.phoneNumber
      }
    },

    async handleSubmit() {
      try {
        await this.$refs.uForm.validate()
      }
      catch (error) {
        console.warn('error', error)
        return
      }

      const [county, town, village] = this.formData.nativePlace
      const params = {
        ...this.formData,
        nativePlace: this.formData.nativePlace
          .map(item => item.deptName)
          .join(''),
        countyId: county.qywechatDeptId,
        townId: town.qywechatDeptId,
        villageId: village.qywechatDeptId,
      }

      console.log('params', params)

      this.$loading(true)
      await sleep()
      this.$loading(false)

      this.handler({
        active: 2,
        params,
      })
    },
  },
}
</script>

<style></style>
