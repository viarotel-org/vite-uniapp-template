/**
 * @desc uni 弹窗
 * @param {*} content
 * @param {*} param1
 */
export function useDialog(
  content,
  {
    title = '提示',
    showCancelButton = false,
    confirmButtonText = '确认',
    cancelButtonText = '取消',
    ...moreOptions
  } = {},
) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title,
      content,
      confirmText: confirmButtonText,
      cancelText: cancelButtonText,
      showCancel: showCancelButton,
      ...moreOptions,
      success({ cancel }) {
        if (cancel) {
          reject({ type: 'cancel' })
        }

        resolve({ type: 'confirm' })
      },
    })
  })
}

/**
 * @desc uni 轻提示
 * @param {*} content 内容
 * @param {*} options 扩展参数
 */
export function useToast(
  content,
  {
    position = 'center',
    duration = 1000,
    overlay = true,
    icon = 'none',
    ...moreOptions
  } = {},
) {
  if (!content) {
    uni.hideToast()
    return
  }

  uni.showToast({
    title: content,
    position,
    duration,
    mask: overlay,
    icon,
    ...moreOptions,
  })

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(uni)
    }, duration)
  })
}

/**
 * @desc 显示或隐藏loading
 * @param {*} content
 * @param {*} options
 */
export function useLoading(content, { overlay = true, ...moreOptions } = {}) {
  if (!content) {
    uni.hideLoading()
    return
  }

  uni.showLoading({
    title: content,
    mask: overlay,
    ...moreOptions,
  })
}
