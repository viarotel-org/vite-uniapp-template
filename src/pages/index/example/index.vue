<script setup>

const tabModel = [
  {
    label:'业务场景',
    children: [
      {
        icon: 'i-carbon-customer-service',
        text: '实名认证',
        path: '/pages/realname/index',
      },
    ]
  },
  {
    label:'实用技巧',
    children: [
      {
        icon: 'i-carbon-customer-service',
        text: '技巧-1',
        path: '/pages/contact/index',
      },
    ]
  },
]

const tabIndex = ref(0)

function onTabClick(index) {
  tabIndex.value = index
}

const activeTabItem = computed(()=> tabModel[tabIndex.value].children)
</script>

<template>
  <view class="">
    <view class="flex bg-white px-3 py-2">
      <view v-for="(item,index) of tabModel" :key="index" class="flex-1 w-0 flex items-center justify-center h-10 rounded-lg" :class="[tabIndex === index ? 'bg-primary-50 text-primary-600 font-bold' : '']" @click="onTabClick(index)">
        {{ item.label }}
      </view>
    </view>

    <view class="mx-3 mt-3 overflow-hidden rounded-xl shadow-sm">
      <view
        v-for="(item, index) of activeTabItem"
        :key="index"
        class="flex items-center bg-white px-5 py-4 transition-colors duration-200 active:bg-gray-50"
        :class="[
          index !== activeTabItem.length - 1 ? 'border-b border-gray-100' : '',
        ]"
        hover-class="bg-gray-50"
        @click="$router.push(item.path)"
      >
        <view class="w-10 flex flex-none items-center justify-center text-gray-500">
          <view class="size-6 text-primary-500" :class="item.icon"></view>
        </view>
  
        <view class="flex-1 text-gray-700 font-medium">
          {{ item.text }}
        </view>
        <view class="text-gray-400">
          <view class="i-carbon-chevron-right size-5"></view>
        </view>
      </view>
    </view>
  </view>
</template>