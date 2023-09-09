import store from '@/store/index.js'
import { useDialog, useToast } from '@/utils/modals'

const realname = (router) => {
  const userStore = store.useUserStore()

  router.beforeEach((to, from, next) => {
    // console.log('realname.beforeEach.to', to)
    // console.log('realname.beforeEach.from', from)

    const realStatus = userStore.userInfo.realStatus

    switch (realStatus) {
      case 3:
        next()
        break
      case 2:
        useToast('实名审核中, 请稍后再试').then(() => {
          next(false)
        })
        break
      case 4:
        useDialog(`${userStore.userInfo.auditResult || '提交的实名信息不符'}`, {
          title: '实名失败',
          showCancelButton: true,
          confirmText: '重新认证',
        })
          .then(() => {
            next({ path: '/pages/realname/index' })
          })
          .catch(() => {
            next(false)
          })
        break
      default:
        useDialog('请先进行实名认证', { showCancelButton: true })
          .then(() => {
            next({ path: '/pages/realname/index' })
          })
          .catch(() => {
            next(false)
          })
        break
    }
  })
  // router.afterEach(() => {})
}

export default realname
