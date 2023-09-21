import { mock } from '../base/index.js'

/**
 * @description 用户登录
 */
export const userLogin = data =>
  mock({ ...data, mockData: { token: 'mock-token' } })

/**
 * @description 获取当前登录用户信息
 * @param realStatus 1-未实名 2-实名中 3--已经实名 4-实名失败
 */
export const getUserInfo = data =>
  mock({
    ...data,
    mockData: {
      id: 'mock-id',
      username: 'viarotel',
      realStatus: '1',
    },
  })

/**
 * @description 获取当前登录用户菜单
 */
export const getUserMenus = data => mock({ ...data, mockData: [] })

/**
 * @description 用户修改密码
 */
export const updatePassword = data => mock(data)

/**
 * @description 上传用户头像
 */
export const userHeadimg = data => mock(data)

/**
 * @description 退出登录
 */
export const logout = () => mock()
