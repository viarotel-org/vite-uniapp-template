<template>
  <picker
    :range-key="labelKey"
    :value="rawValue"
    :disabled="disabled"
    :range="scopedOptions"
    @change="onChange"
    @cancel="onCancel"
  >
    <slot
      :show-value="showValue"
      :value="modelValue"
    >
      <view class="flex items-center w-full">
        <view class="flex-1 w-0">
          <uv-input
            :model-value="showValue"
            :placeholder="placeholder"
            border="none"
            readonly
          ></uv-input>
        </view>
        <view class="flex-none">
          <uv-icon
            name="arrow-right"
          ></uv-icon>
        </view>
      </view>
    </slot>
  </picker>
</template>

<script>
import * as dicts from '@/configs/dict/index.js'

export default {
  components: {},
  props: {
    modelValue: {
      type: [Number, String, Object],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dictType: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
  },
  emits: ['update:model-value'],
  data() {
    return {
      labelKey: 'dictLabel',
      valueKey: 'dictValue',
      rawValue: 0,
    }
  },
  computed: {
    scopedOptions() {
      return dicts[this.dictType] || this.options || []
    },
    showValue() {
      return (
        this.modelValue?.[this.labelKey]
        || this.$showDictLabel(this.scopedOptions, this.modelValue)
        || ''
      )
    },
  },
  watch: {
    modelValue: {
      handler(value) {
        console.log('modelValue.value', value)

        const index = this.scopedOptions.findIndex(
          item => item[this.valueKey] === (value?.[this.valueKey] || value),
        )

        if (index !== -1) {
          this.rawValue = index
        }
      },
    },
  },
  created() {},
  methods: {
    onChange(event) {
      console.log('onChange.event', event)
      const { value: index } = event.detail
      this.rawValue = Number(index)
      const modelValue = this.scopedOptions[index]
      console.log('modelValue', modelValue)
      this.$emit('update:model-value', modelValue)
    },
    onCancel(event) {
      console.log('onCancel.event', event)
      this.rawValue = 0
      this.$emit('update:model-value', null)
    },
  },
}
</script>
