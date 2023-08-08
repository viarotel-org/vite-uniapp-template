// import request from '@/utils/request/index.js'
import { mock } from '../base/index.js'

/**
 * 获取手机号
 */
export const phoneNumber = data => mock(data)

/**
 * 获取可供选择的户籍地区
 */
export const wxdepartTree = data => mock(data)

/**
 * 验证用户信息在数据库中是否已存在
 */
export const checkUserinfo = data => mock({ ...data, mockData: true })

/**
 * 数据库中已存在 直接绑定该用户
 */
export const bindUserinfo = data => mock({ ...data, mockData: true })

/**
 * 数据库中不存在 提交实名认证信息
 */
export const wxrealnameAuth = data => mock(data)
