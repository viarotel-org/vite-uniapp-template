/**
 * @desc 使用async await 进项进行延时操作
 * @param {*} time
 */
export function sleep(time = 500) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time)
  })
}
