<script setup>
import { appVersion } from '@/settings/index.js'

const appStore = useAppStore()

const router = useRouter()

const settings = ref({
  darkMode: false,
  themeColor: 'blue',
  fontSize: 'medium',
  pushNotification: true,
  soundAlert: true,
  vibration: true,
  biometric: false,
  autoClean: true,
})

const storageUsed = ref('2.3GB')
const storageTotal = ref('64GB')
const cacheSize = ref('156MB')
const hasUpdate = ref(false)

const fontSizes = {
  small: '小',
  medium: '中',
  large: '大',
}

const autoLockOptions = {
  1: '1分钟',
  5: '5分钟',
  10: '10分钟',
  30: '30分钟',
  0: '从不',
}

const currentThemeColor = computed(() => appStore.primaryColor)
const currentThemeText = computed(() => appStore.currentThemeInfo?.name || '默认')
const fontSizeText = computed(() => fontSizes[settings.value.fontSize] || '中')
const autoLockText = computed(() => autoLockOptions[settings.value.autoLock] || '5分钟')

function resetSettings() {
  uni.showModal({
    title: '重置设置',
    content: '确定要将所有设置恢复为默认值吗？',
    confirmText: '重置',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm) {
        settings.value = {
          darkMode: false,
          themeColor: 'blue',
          fontSize: 'medium',
          pushNotification: true,
          soundAlert: true,
          vibration: true,
          biometric: false,
          autoLock: 5,
          autoClean: true,
        }
        showToast('设置已重置')
      }
    },
  })
}

function toggleSetting(key) {
  settings.value[key] = !settings.value[key]

  if (settings.value.vibration) {
    uni.vibrateShort()
  }

  saveSettings()
}

function selectThemeColor() {
  const items = Object.entries(appStore.themeModel).map(([key, value]) => value.name)

  uni.showActionSheet({
    itemList: items,
    success: (res) => {
      const colorKeys = Object.keys(appStore.themeModel)

      appStore.currentTheme = colorKeys[res.tapIndex]

      showToast('主题已更换')
    },
  })
}

function adjustFontSize() {
  const items = Object.values(fontSizes)

  uni.showActionSheet({
    itemList: items,
    success: (res) => {
      const sizeKeys = Object.keys(fontSizes)
      settings.value.fontSize = sizeKeys[res.tapIndex]
      saveSettings()
      showToast('字体大小已调整')
    },
  })
}

function setAutoLock() {
  const items = Object.values(autoLockOptions)

  uni.showActionSheet({
    itemList: items,
    success: (res) => {
      const lockKeys = Object.keys(autoLockOptions)
      settings.value.autoLock = Number.parseInt(lockKeys[res.tapIndex])
      saveSettings()
      showToast('自动锁屏时间已设置')
    },
  })
}

function clearCache() {
  uni.showModal({
    title: '清除缓存',
    content: `确定要清除 ${cacheSize.value} 的缓存数据吗？`,
    confirmText: '清除',
    cancelText: '取消',
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({
          title: '清除中...',
        })

        setTimeout(() => {
          uni.hideLoading()
          cacheSize.value = '0MB'
          showToast('缓存清除成功')
        }, 2000)
      }
    },
  })
}

function viewStorageInfo() {
  showToast('存储空间')
}

function viewPrivacyPolicy() {
  showToast('隐私政策')
}

function checkUpdate() {
  uni.showLoading({
    title: '检查中...',
  })

  setTimeout(() => {
    uni.hideLoading()
    if (hasUpdate.value) {
      uni.showModal({
        title: '发现新版本',
        content: '发现新版本 1.3.0，是否立即更新？',
        confirmText: '更新',
        cancelText: '稍后',
        success: (res) => {
          if (res.confirm) {
            showToast('开始下载更新')
          }
        },
      })
    }
    else {
      showToast('已是最新版本')
    }
  }, 1500)
}

function openHelpCenter() {
  router.push('/contact')
}

function submitFeedback() {
  router.push('/contact')
}

function aboutUs() {
  router.push('/contact')
}

function saveSettings() {
  uni.setStorageSync('app_settings', settings.value)
}

function showToast(title, icon = 'success') {
  uni.showToast({
    title,
    icon,
  })
}

function loadSettings() {
  try {
    const savedSettings = uni.getStorageSync('app_settings')
    if (savedSettings) {
      settings.value = { ...settings.value, ...savedSettings }
    }
  }
  catch (error) {
    console.log('读取设置失败:', error)
  }
}

loadSettings()
</script>

<template>
  <view class="p-4">
    <view class="pb-4 text-center text-gray-500">
      以下部分内容仅为组件演示，暂无实际功能。
    </view>

    <view class="settings-card">
      <view class="card-header">
        <view class="i-carbon-paint-brush text-lg text-primary-500"></view>
        <view class="card-title">
          显示与主题
        </view>
      </view>

      <view class="divide-y divide-gray-100">
        <view class="setting-item">
          <view class="setting-label">
            <view class="i-carbon-moon text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                深色模式
              </text>
              <text class="setting-desc">
                开启后界面将使用深色主题
              </text>
            </view>
          </view>
          <view class="setting-control">
            <switch
              :checked="settings.darkMode"
              :color="currentThemeColor"
              @change="toggleSetting('darkMode')"
            />
          </view>
        </view>

        <view class="setting-item" @click="selectThemeColor">
          <view class="setting-label">
            <view class="i-carbon-color-palette text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                主题色彩
              </text>
              <text class="setting-desc">
                {{ currentThemeText }}
              </text>
            </view>
          </view>
          <view class="setting-control">
            <view class="h-6 w-6 border-2 border-gray-200 rounded-full" :style="{ backgroundColor: currentThemeColor }"></view>
            <view class="i-carbon-chevron-right ml-2 text-sm text-gray-400"></view>
          </view>
        </view>

        <view class="setting-item" @click="adjustFontSize">
          <view class="setting-label">
            <view class="i-carbon-text-font text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                字体大小
              </text>
              <text class="setting-desc">
                {{ fontSizeText }}
              </text>
            </view>
          </view>
          <view class="setting-control">
            <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
          </view>
        </view>
      </view>
    </view>

    <view class="settings-card">
      <view class="card-header">
        <view class="i-carbon-notification text-lg text-primary-500"></view>
        <view class="card-title">
          通知设置
        </view>
      </view>

      <view class="divide-y divide-gray-100">
        <view class="setting-item">
          <view class="setting-label">
            <view class="i-carbon-notification-new text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                推送通知
              </text>
              <text class="setting-desc">
                接收应用推送消息
              </text>
            </view>
          </view>
          <view class="setting-control">
            <switch
              :checked="settings.pushNotification"
              :color="currentThemeColor"
              @change="toggleSetting('pushNotification')"
            />
          </view>
        </view>

        <view class="setting-item">
          <view class="setting-label">
            <view class="i-carbon-volume-up text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                声音提醒
              </text>
              <text class="setting-desc">
                消息到达时播放提示音
              </text>
            </view>
          </view>
          <view class="setting-control">
            <switch
              :checked="settings.soundAlert"
              :color="currentThemeColor"
              @change="toggleSetting('soundAlert')"
            />
          </view>
        </view>

        <view class="setting-item">
          <view class="setting-label">
            <view class="i-carbon-phone-vibrate text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                震动反馈
              </text>
              <text class="setting-desc">
                操作时提供震动反馈
              </text>
            </view>
          </view>
          <view class="setting-control">
            <switch
              :checked="settings.vibration"
              :color="currentThemeColor"
              @change="toggleSetting('vibration')"
            />
          </view>
        </view>
      </view>
    </view>

    <view class="settings-card">
      <view class="card-header">
        <view class="i-carbon-security text-lg text-primary-500"></view>
        <view class="card-title">
          隐私与安全
        </view>
      </view>

      <view class="divide-y divide-gray-100">
        <view class="setting-item">
          <view class="setting-label">
            <view class="i-carbon-fingerprint-recognition text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                生物识别
              </text>
              <text class="setting-desc">
                使用指纹或面容解锁
              </text>
            </view>
          </view>
          <view class="setting-control">
            <switch
              :checked="settings.biometric"
              :color="currentThemeColor"
              @change="toggleSetting('biometric')"
            />
          </view>
        </view>

        <view class="setting-item" @click="setAutoLock">
          <view class="setting-label">
            <view class="i-carbon-locked text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                自动锁屏
              </text>
              <text class="setting-desc">
                {{ autoLockText }}
              </text>
            </view>
          </view>
          <view class="setting-control">
            <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
          </view>
        </view>

        <view class="setting-item" @click="viewPrivacyPolicy">
          <view class="setting-label">
            <view class="i-carbon-document text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                隐私协议
              </text>
              <text class="setting-desc">
                查看隐私政策和用户协议
              </text>
            </view>
          </view>
          <view class="setting-control">
            <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
          </view>
        </view>
      </view>
    </view>

    <view class="settings-card">
      <view class="card-header">
        <view class="i-carbon-data-base text-lg text-primary-500"></view>
        <view class="card-title">
          存储与缓存
        </view>
      </view>

      <view class="divide-y divide-gray-100">
        <view class="setting-item" @click="viewStorageInfo">
          <view class="setting-label">
            <view class="i-carbon-data-volume text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                存储空间
              </text>
              <text class="setting-desc">
                已使用 {{ storageUsed }}，共 {{ storageTotal }}
              </text>
            </view>
          </view>
          <view class="setting-control">
            <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
          </view>
        </view>

        <view class="setting-item" @click="clearCache">
          <view class="setting-label">
            <view class="i-carbon-clean text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                清除缓存
              </text>
              <text class="setting-desc">
                缓存大小：{{ cacheSize }}
              </text>
            </view>
          </view>
          <view class="setting-control">
            <view class="rounded-full bg-red-50 px-3 py-1 text-sm text-red-500">
              清除
            </view>
          </view>
        </view>

        <view class="setting-item">
          <view class="setting-label">
            <view class="i-carbon-automatic text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                自动清理
              </text>
              <text class="setting-desc">
                定期自动清理临时文件
              </text>
            </view>
          </view>
          <view class="setting-control">
            <switch
              :checked="settings.autoClean"
              :color="currentThemeColor"
              @change="toggleSetting('autoClean')"
            />
          </view>
        </view>
      </view>
    </view>

    <view class="settings-card">
      <view class="card-header">
        <view class="i-carbon-information text-lg text-primary-500"></view>
        <view class="card-title">
          关于与帮助
        </view>
      </view>

      <view class="divide-y divide-gray-100">
        <view class="setting-item" @click="checkUpdate">
          <view class="setting-label">
            <view class="i-carbon-application text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                版本信息
              </text>
              <text class="setting-desc">
                当前版本 {{ appVersion }}
              </text>
            </view>
          </view>
          <view class="setting-control">
            <view v-if="hasUpdate" class="rounded-full bg-red-500 px-2 py-1 text-xs text-white">
              有更新
            </view>
            <view class="i-carbon-chevron-right ml-2 text-sm text-gray-400"></view>
          </view>
        </view>

        <view class="setting-item" @click="openHelpCenter">
          <view class="setting-label">
            <view class="i-carbon-help text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                帮助中心
              </text>
              <text class="setting-desc">
                常见问题和使用指南
              </text>
            </view>
          </view>
          <view class="setting-control">
            <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
          </view>
        </view>

        <view class="setting-item" @click="submitFeedback">
          <view class="setting-label">
            <view class="i-carbon-chat text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                意见反馈
              </text>
              <text class="setting-desc">
                向我们反馈问题和建议
              </text>
            </view>
          </view>
          <view class="setting-control">
            <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
          </view>
        </view>

        <view class="setting-item" @click="aboutUs">
          <view class="setting-label">
            <view class="i-carbon-favorite text-lg text-gray-400"></view>
            <view class="setting-info">
              <text class="setting-title">
                关于我们
              </text>
              <text class="setting-desc">
                了解更多关于我们的信息
              </text>
            </view>
          </view>
          <view class="setting-control">
            <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
          </view>
        </view>
      </view>
    </view>

    <view class="mt-4">
      <button
        class="w-full flex items-center justify-center rounded-lg bg-primary-400 py-3 text-white font-medium transition-colors duration-200 active:bg-primary-600"
        hover-class="bg-primary-600"
        @click="resetSettings"
      >
        <view class="i-carbon-reset mr-2 text-lg"></view>
        重置设置
      </button>
    </view>
  </view>
</template>

<style scoped>
/* 设置卡片样式 */
.settings-card {
  @apply bg-white rounded-xl shadow-sm mb-4 overflow-hidden;
}

.card-header {
  @apply flex items-center px-5 py-4 border-b border-gray-100;
}

.card-title {
  @apply ml-3 text-lg font-bold text-gray-800;
}

/* 设置项样式 */
.setting-item {
  @apply flex items-center justify-between px-5 py-4 active:bg-gray-50 transition-colors duration-200;
}

.setting-label {
  @apply flex items-start flex-1 min-w-0;
}

.setting-info {
  @apply ml-3 flex-1 min-w-0;
}

.setting-title {
  @apply text-gray-800 font-medium block;
}

.setting-desc {
  @apply text-gray-500 text-sm mt-0.5 block;
}

.setting-control {
  @apply flex items-center flex-none ml-4;
}

/* 响应式调整 */
@media (max-width: 375px) {
  .setting-item {
    @apply px-4 py-3;
  }

  .card-header {
    @apply px-4 py-3;
  }

  .setting-info {
    @apply ml-2;
  }

  .setting-control {
    @apply ml-2;
  }
}
</style>
