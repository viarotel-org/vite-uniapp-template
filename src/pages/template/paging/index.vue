<script setup>
import { sleep } from '@/utils'

const pagingRef = ref(null)

const dataList = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const isLoading = ref(false)

const stats = computed(() => ({
  loaded: dataList.value.length,
  total: total.value,
  pages: Math.ceil(total.value / pageSize.value),
  currentPage: currentPage.value,
}))

const mockDataTypes = [
  {
    type: 'article',
    icon: 'i-carbon-document',
    color: 'from-blue-400 to-blue-600',
    titles: [
      'Vue 3 Composition API 最佳实践',
      'UniApp 跨平台开发指南',
      '前端性能优化技巧分享',
      'TypeScript 进阶使用技巧',
      '移动端适配解决方案',
    ],
  },
  {
    type: 'video',
    icon: 'i-carbon-video',
    color: 'from-red-400 to-red-600',
    titles: [
      '深入理解 JavaScript 异步编程',
      'CSS Grid 布局完全指南',
      'React Hooks 实战教程',
      'Webpack 配置优化实践',
      'Node.js 后端开发入门',
    ],
  },
  {
    type: 'project',
    icon: 'i-carbon-code',
    color: 'from-green-400 to-green-600',
    titles: [
      '开源组件库设计与实现',
      '微前端架构实践案例',
      '全栈项目开发经验',
      'DevOps 自动化部署',
      '数据可视化项目实战',
    ],
  },
  {
    type: 'tutorial',
    icon: 'i-carbon-education',
    color: 'from-purple-400 to-purple-600',
    titles: [
      'Git 版本控制进阶教程',
      'Docker 容器化部署指南',
      'API 设计最佳实践',
      '代码重构技巧与方法',
      '软件架构设计原则',
    ],
  },
]

const mockTags = [
  '前端开发',
  '后端开发',
  'UI设计',
  '产品设计',
  '数据分析',
  '人工智能',
  '云计算',
  '微服务',
  '区块链',
  '物联网',
]

function generateMockData(page, size) {
  const data = []
  const startIndex = (page - 1) * size

  for (let i = 0; i < size; i++) {
    const index = startIndex + i
    const dataType = mockDataTypes[index % mockDataTypes.length]
    const title = dataType.titles[index % dataType.titles.length]

    data.push({
      id: index + 1,
      type: dataType.type,
      icon: dataType.icon,
      color: dataType.color,
      title: `${title} #${index + 1}`,
      description: `这是第 ${index + 1} 条内容的详细描述，展示了丰富的功能特性和优秀的用户体验设计。内容包含了最新的技术趋势和实践经验分享。`,
      tags: [
        mockTags[index % mockTags.length],
        mockTags[(index + 1) % mockTags.length],
      ],
      stats: {
        views: Math.floor(Math.random() * 9999) + 100,
        likes: Math.floor(Math.random() * 999) + 10,
        comments: Math.floor(Math.random() * 99) + 1,
        shares: Math.floor(Math.random() * 50) + 1,
      },
      publishTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      readTime: `${Math.floor(Math.random() * 15) + 1} 分钟`,
      isLiked: Math.random() > 0.7,
      isBookmarked: Math.random() > 0.8,
      difficulty: ['入门', '进阶', '高级'][Math.floor(Math.random() * 3)],
      status: Math.random() > 0.9 ? 'hot' : Math.random() > 0.7 ? 'new' : 'normal',
    })
  }

  return data
}

async function mockRequest(page, size = 10) {
  await sleep(800 + Math.random() * 1200)

  const totalItems = 156
  const data = generateMockData(page, size)
  const hasMore = page * size < totalItems

  if (Math.random() < 0.05) {
    throw new Error('网络连接异常，请稍后重试')
  }

  return {
    code: 200,
    data,
    total: totalItems,
    page,
    pageSize: size,
    hasMore,
    message: 'success',
  }
}

async function onQuery(pageNo, pageSize) {
  try {
    isLoading.value = true
    currentPage.value = pageNo

    const result = await mockRequest(pageNo, pageSize)

    if (result.code === 200) {
      total.value = result.total

      if (pageNo === 1) {
        dataList.value = result.data
      }
      else {
        dataList.value.push(...result.data)
      }

      pagingRef.value.complete(result.data)

      if (!result.hasMore) {
        pagingRef.value.completeByNoMore(result.data)
      }
    }
    else {
      throw new Error(result.message || '数据加载失败')
    }
  }
  catch (error) {
    console.error('数据加载失败:', error)

    uni.showToast({
      title: error.message || '加载失败',
      icon: 'none',
      duration: 2000,
    })

    pagingRef.value.complete(false)
  }
  finally {
    isLoading.value = false
  }
}

function onRefresh() {
  onQuery(1, pageSize.value)
}

function toggleLike(item) {
  item.isLiked = !item.isLiked
  if (item.isLiked) {
    item.stats.likes++
  }
  else {
    item.stats.likes--
  }

  uni.vibrateShort?.()
}

function handleItemClick(item) {
  uni.showToast({
    title: `查看: ${item.title}`,
    icon: 'none',
  })
}

function formatNumber(num) {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}w`
  }
  else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}
</script>

<template>
  <view class="h-full">
    <z-paging
      ref="pagingRef"
      v-model="dataList"
      class="flex-1"
      :refresher-enabled="true"
      :refresher-threshold="80"
      refresher-default-text="下拉刷新数据"
      refresher-pulling-text="释放立即刷新"
      refresher-refreshing-text="正在刷新..."
      refresher-complete-text="刷新完成"
      :loading-more-enabled="true"
      :loading-more-text="['点击加载更多', '正在加载...', '已全部加载']"
      empty-view-text="暂无内容数据"
      :auto-show-back-to-top="true"
      :back-to-top-threshold="300"
      @query="onQuery"
      @on-refresh="onRefresh"
    >
      <template #refresher>
        <view class="flex flex-col items-center justify-center bg-white/80 py-6 backdrop-blur-sm">
          <view class="mb-2 h-8 w-8 animate-spin border-3 border-blue-500 border-t-transparent rounded-full"></view>
          <text class="text-sm text-blue-600 font-medium">
            正在刷新内容...
          </text>
        </view>
      </template>

      <view class="px-4 py-2 space-y-4">
        <view
          v-for="(item, index) in dataList"
          :key="item.id"
          class="overflow-hidden border border-gray-100 rounded-2xl bg-white shadow-sm transition-all duration-200 active:scale-98"
          @click="handleItemClick(item)"
        >
          <view class="p-4 pb-3">
            <view class="mb-3 flex items-start justify-between">
              <view class="flex flex-1 items-center space-x-3">
                <view
                  class="h-10 w-10 flex items-center justify-center rounded-xl text-white"
                  :class="`bg-gradient-to-r ${item.color}`"
                >
                  <view :class="`${item.icon} w-5 h-5`"></view>
                </view>

                <view class="min-w-0 flex-1">
                  <view class="mb-1 flex items-center space-x-2">
                    <text class="truncate text-base text-gray-900 font-semibold leading-tight">
                      {{ item.title }}
                    </text>
                  </view>
                  <text class="line-clamp-2 text-sm text-gray-600 leading-relaxed">
                    {{ item.description }}
                  </text>
                </view>
              </view>
            </view>

            <view class="mb-3 flex items-center space-x-2">
              <view
                v-for="tag in item.tags"
                :key="tag"
                class="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700 font-medium"
              >
                {{ tag }}
              </view>
              <view class="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-600">
                {{ item.difficulty }}
              </view>
            </view>
          </view>

          <view class="border-t border-gray-100 bg-gray-50 px-4 py-3">
            <view class="flex items-center justify-between">
              <view class="flex items-center space-x-4">
                <view class="flex items-center text-gray-500 space-x-1">
                  <view class="i-carbon-view h-4 w-4"></view>
                  <text class="text-sm">
                    {{ formatNumber(item.stats.views) }}
                  </text>
                </view>

                <button
                  class="flex items-center transition-colors duration-200 active:scale-95 space-x-1"
                  :class="item.isLiked ? 'text-red-500' : 'text-gray-500'"
                  @click.stop="toggleLike(item)"
                >
                  <view :class="item.isLiked ? 'i-carbon-favorite-filled' : 'i-carbon-favorite'" class="h-4 w-4"></view>
                  <text class="text-sm">
                    {{ formatNumber(item.stats.likes) }}
                  </text>
                </button>

                <view class="flex items-center text-gray-500 space-x-1">
                  <view class="i-carbon-chat h-4 w-4"></view>
                  <text class="text-sm">
                    {{ formatNumber(item.stats.comments) }}
                  </text>
                </view>
              </view>

              <view class="flex items-center space-x-2">
                <button class="p-2 text-gray-400 transition-all active:scale-95 hover:text-gray-600">
                  <view class="i-carbon-share h-4 w-4"></view>
                </button>
                <button class="p-2 text-gray-400 transition-all active:scale-95 hover:text-gray-600">
                  <view class="i-carbon-overflow-menu-horizontal h-4 w-4"></view>
                </button>
              </view>
            </view>
          </view>
        </view>
      </view>

      <template #loadingMore>
        <view class="flex flex-col items-center justify-center py-8">
          <view class="mb-2 h-6 w-6 animate-spin border-2 border-gray-300 border-t-blue-500 rounded-full"></view>
          <text class="text-sm text-gray-500">
            正在加载更多内容...
          </text>
        </view>
      </template>

      <template #noMore>
        <view class="flex flex-col items-center justify-center py-8">
          <view class="i-carbon-checkmark-filled mb-2 h-8 w-8 text-green-500"></view>
          <text class="text-sm text-gray-500">
            已加载全部内容
          </text>
          <text class="mt-1 text-xs text-gray-400">
            共 {{ stats.total }} 条数据
          </text>
        </view>
      </template>

      <template #empty>
        <view class="flex flex-col items-center justify-center py-16">
          <view class="i-carbon-document-blank mb-4 h-16 w-16 text-gray-300"></view>
          <text class="mb-2 text-base text-gray-500 font-medium">
            暂无内容
          </text>
          <text class="mb-6 text-sm text-gray-400">
            下拉刷新试试看
          </text>
          <button
            class="rounded-lg bg-blue-500 px-6 py-2 text-sm text-white font-medium transition-transform active:scale-95"
            @click="onRefresh"
          >
            立即刷新
          </button>
        </view>
      </template>
    </z-paging>
  </view>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
