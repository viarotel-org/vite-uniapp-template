import request from '@/utils/request/index.js'

/**
 * @description 用户修改密码
 */
export const personChangePwd = (data) => request.post('/person/changePwd', data)

/**
 * @description 获取当前登录用户信息
 */
export const personInfo = (data) => request.form('/platform/detail/get', data)

/**
 * @description 更新用户信息
 */
export const personUpdateInfo = (data) => request.post('/person/updateInfo', data)

/**
 * @description 获取当前登录用户菜单
 */
export const personMenu = (data) => request.post('/person/menu', data)

/**
 * @description 用户登录
 */
export const login = (data) => request.form('/login', data)

/**
 * @description 退出登录
 */
export const logout = () => request.get('/logout')
