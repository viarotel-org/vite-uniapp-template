<script setup>
// const router = useRouter()

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)

const genderText = computed(() => {
  const genderMap = {
    0: '未设置',
    1: '男',
    2: '女',
  }
  return genderMap[userInfo.value.gender] || '未设置'
})

function formatPhone(phone) {
  if (!phone)
    return '未设置'
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3')
}

function changeAvatar() {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      userInfo.value.avatar = res.tempFilePaths[0]
      showToast('头像已更新')
    },
  })
}

function editField(field) {
  showToast('编辑基本信息')
}

function changePassword() {
  showToast('修改密码')
}

function privacySettings() {
  showToast('隐私设置')
}

function deleteAccount() {
  uni.showModal({
    title: '警告',
    content: '注销账户将永久删除您的所有数据，此操作不可恢复。确定要继续吗？',
    confirmText: '确定注销',
    cancelText: '取消',
    confirmColor: '#ef4444',
    success: (res) => {
      if (res.confirm) {
        showToast('账户注销功能暂未开放', 'none')
      }
    },
  })
}

async function saveProfile() {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    showToast('保存成功')
  }
  catch (error) {
    showToast('保存失败，请重试', 'none')
  }
}

function showToast(title, icon = 'success') {
  uni.showToast({
    title,
    icon,
  })
}
</script>

<template>
  <view class="profile-edit-page h-full flex flex-col bg-gray-50">
    <view class="header-section relative">
      <view class="relative h-40 overflow-hidden bg-primary-400">
        <view class="absolute h-32 w-32 rounded-full bg-white opacity-10 -right-8 -top-8"></view>
        <view class="absolute bottom-4 right-16 h-16 w-16 rounded-full bg-white opacity-10"></view>
      </view>

      <view class="absolute bottom-0 left-1/2 translate-y-1/2 transform -translate-x-1/2">
        <view class="relative">
          <view class="h-24 w-24 overflow-hidden border-4 border-white rounded-full shadow-lg" @click="changeAvatar">
            <image
              v-if="userInfo.avatar"
              :src="userInfo.avatar"
              class="size-full"
              mode="aspectFill"
            />

            <image
              v-else
              src="~@assets/images/avatar-default.png"
              class="size-full"
              mode="aspectFill"
            />
          </view>
          <view class="absolute bottom-0 right-0 h-7 w-7 flex items-center justify-center border-2 border-white rounded-full bg-primary-500">
            <view class="i-carbon-edit text-sm text-white"></view>
          </view>
        </view>
      </view>
    </view>

    <view class="content-section flex-1 px-4 pb-4 pt-16">
      <view class="info-card mb-4 overflow-hidden rounded-xl bg-white shadow-sm">
        <view class="card-header">
          <view class="i-carbon-user text-lg text-primary-500"></view>
          <view class="card-title">
            基本信息
          </view>
        </view>

        <view class="divide-y divide-gray-100">
          <view class="info-item" @click="editField('username')">
            <view class="info-label">
              <view class="i-carbon-user-identification text-lg text-gray-400"></view>
              <text>用户名</text>
            </view>
            <view class="info-value">
              <text>{{ userInfo.username || '未设置' }}</text>
              <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
            </view>
          </view>

          <view class="info-item" @click="editField('realName')">
            <view class="info-label">
              <view class="i-carbon-identification text-lg text-gray-400"></view>
              <text>真实姓名</text>
            </view>
            <view class="info-value">
              <text>{{ userInfo.realName || '未设置' }}</text>
              <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
            </view>
          </view>

          <view class="info-item" @click="editField('gender')">
            <view class="info-label">
              <view class="i-carbon-gender-male text-lg text-gray-400"></view>
              <text>性别</text>
            </view>
            <view class="info-value">
              <text>{{ genderText }}</text>
              <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
            </view>
          </view>

          <view class="info-item" @click="editField('birthday')">
            <view class="info-label">
              <view class="i-carbon-calendar text-lg text-gray-400"></view>
              <text>生日</text>
            </view>
            <view class="info-value">
              <text>{{ userInfo.birthday || '未设置' }}</text>
              <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
            </view>
          </view>
        </view>
      </view>

      <view class="info-card mb-4 overflow-hidden rounded-xl bg-white shadow-sm">
        <view class="card-header">
          <view class="i-carbon-phone text-lg text-primary-500"></view>
          <view class="card-title">
            联系方式
          </view>
        </view>

        <view class="divide-y divide-gray-100">
          <view class="info-item" @click="editField('phone')">
            <view class="info-label">
              <view class="i-carbon-mobile text-lg text-gray-400"></view>
              <text>手机号</text>
            </view>
            <view class="info-value">
              <text>{{ formatPhone(userInfo.phone) }}</text>
              <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
            </view>
          </view>

          <view class="info-item" @click="editField('email')">
            <view class="info-label">
              <view class="i-carbon-email text-lg text-gray-400"></view>
              <text>邮箱地址</text>
            </view>
            <view class="info-value">
              <text>{{ userInfo.email || '未设置' }}</text>
              <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
            </view>
          </view>

          <view class="info-item" @click="editField('wechat')">
            <view class="info-label">
              <view class="i-carbon-logo-wechat text-lg text-gray-400"></view>
              <text>微信号</text>
            </view>
            <view class="info-value">
              <text>{{ userInfo.wechat || '未设置' }}</text>
              <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
            </view>
          </view>
        </view>
      </view>

      <view class="info-card mb-4 overflow-hidden rounded-xl bg-white shadow-sm">
        <view class="card-header">
          <view class="i-carbon-location text-lg text-primary-500"></view>
          <view class="card-title">
            地址信息
          </view>
        </view>

        <view class="divide-y divide-gray-100">
          <view class="info-item" @click="editField('region')">
            <view class="info-label">
              <view class="i-carbon-earth text-lg text-gray-400"></view>
              <text>所在地区</text>
            </view>
            <view class="info-value">
              <text>{{ userInfo.region || '未设置' }}</text>
              <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
            </view>
          </view>

          <view class="info-item" @click="editField('address')">
            <view class="info-label">
              <view class="i-carbon-map text-lg text-gray-400"></view>
              <text>详细地址</text>
            </view>
            <view class="info-value">
              <text>{{ userInfo.address || '未设置' }}</text>
              <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
            </view>
          </view>
        </view>
      </view>

      <view class="info-card mb-4 overflow-hidden rounded-xl bg-white shadow-sm">
        <view class="card-header">
          <view class="i-carbon-settings text-lg text-primary-500"></view>
          <view class="card-title">
            账户设置
          </view>
        </view>

        <view class="divide-y divide-gray-100">
          <view class="info-item" @click="changePassword">
            <view class="info-label">
              <view class="i-carbon-password text-lg text-gray-400"></view>
              <text>修改密码</text>
            </view>
            <view class="info-value">
              <text class="text-gray-400">
                点击修改
              </text>
              <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
            </view>
          </view>

          <view class="info-item" @click="privacySettings">
            <view class="info-label">
              <view class="i-carbon-security text-lg text-gray-400"></view>
              <text>隐私设置</text>
            </view>
            <view class="info-value">
              <text class="text-gray-400">
                管理隐私
              </text>
              <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
            </view>
          </view>

          <view class="info-item" @click="deleteAccount">
            <view class="info-label">
              <view class="i-carbon-user-x text-lg text-red-400"></view>
              <text class="text-red-500">
                注销账户
              </text>
            </view>
            <view class="info-value">
              <view class="i-carbon-chevron-right text-sm text-gray-400"></view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="action-section px-4 pb-8 pt-4">
      <button
        class="w-full flex items-center justify-center rounded-lg bg-primary-500 py-3 text-white font-medium transition-colors duration-200 active:bg-primary-600"
        hover-class="bg-primary-600"
        @click="saveProfile"
      >
        <view class="i-carbon-save mr-2 text-lg"></view>
        保存修改
      </button>
    </view>
  </view>
</template>

<style scoped>
/* 信息卡片样式 */
.info-card {
  @apply bg-white rounded-xl shadow-sm overflow-hidden;
}

.card-header {
  @apply flex items-center px-5 py-4 border-b border-gray-100;
}

.card-title {
  @apply ml-3 text-lg font-bold text-gray-800;
}

/* 信息项样式 */
.info-item {
  @apply flex items-center justify-between px-5 py-4 active:bg-gray-50 transition-colors duration-200;
}

.info-label {
  @apply flex items-center text-gray-700 font-medium;
}

.info-label text {
  @apply ml-3;
}

.info-value {
  @apply flex items-center text-gray-600;
}

.info-value text {
  @apply mr-2;
}

/* 响应式调整 */
@media (max-width: 375px) {
  .info-item {
    @apply px-4 py-3;
  }

  .card-header {
    @apply px-4 py-3;
  }
}
</style>
