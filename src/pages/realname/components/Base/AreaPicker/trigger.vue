<template>
  <view class="w-full">
    <view
      class="w-full"
      @click="handleClick"
    >
      <slot :value="joinValue" />
    </view>
    <!-- :default-index="defaultIndex" -->
    <uv-picker
      ref="uPicker"
      v-bind="$attrs"
      :show="show"
      :columns="options"
      close-on-click-overlay
      :key-name="labelKey"
      @cancel="onCancel"
      @confirm="onConfirm"
      @change="onChange"
      @close="onClose"
    ></uv-picker>
  </view>
</template>

<script>
import { groupBy } from 'lodash-es'
import { tree2List } from '@/utils/treeSimple'

export default {
  components: {},
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:model-value'],
  data() {
    return {
      show: false,
      flatData: [],
      options: [],
      labelKey: 'deptName',
      valueKey: 'qywechatDeptId',
    }
  },
  computed: {
    joinValue() {
      return this.modelValue
        .map(
          item => item?.deptName
            || this.$showDictLabel(this.flatData, item, {
              labelKey: this.labelKey,
              valueKey: this.valueKey,
            }),
        )
        .join('-')
    },
  },
  created() {
    this.getAreaData()
  },
  methods: {
    async getAreaData() {
      const res = await this.$api.wxdepartTree()
      if (res.success) {
        const data = res.data || []
        this.flatData = tree2List(data, {
          key: 'id',
          parentKey: 'parentId',
          children: 'childrenList',
        })
        console.log('flatData', this.flatData)

        const {
          1: county,
          39: community,
          ...villageMap
        } = groupBy(this.flatData, 'parentId')

        const village = Object.values(villageMap).flat()

        // console.log('county', county)
        // console.log('community', community)
        // console.log('village', village)
        const filterCommunity = community.filter(
          item => item.parentId === county[0]?.qywechatDeptId,
        )
        // console.log('filterCommunity', filterCommunity)
        const filterVillage = village.filter(
          item => item.parentId === filterCommunity[0]?.qywechatDeptId,
        )
        // console.log('filterVillage', filterVillage)
        this.options = [county, filterCommunity, filterVillage]
      }
    },
    onClose() {
      this.show = false
    },
    onConfirm({ value }) {
      console.log('onConfirm.value', value)
      this.$emit('update:model-value', value)
      this.show = false
    },
    onCancel() {
      console.log('onCancel')
      this.$emit('update:model-value', [])
      this.show = false
    },
    handleClick() {
      this.show = true
    },
    onChange(event) {
      console.log('onChange.event', event)
      const { columnIndex, value } = event
      const current = value[columnIndex]
      const subColumn = this.flatData.find(item => item.id === current.id)?.childrenList
        || []

      // console.log('subColumn', subColumn)

      if (columnIndex + 1 >= this.options.length) {
        return
      }

      this.$refs.uPicker.setColumnValues(columnIndex + 1, subColumn)
    },
  },
}
</script>

<style></style>
