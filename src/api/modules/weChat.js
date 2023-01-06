import request from '@/utils/request/index.js'

/**
 * @description 微信登录
 */
export const platformMiniProgramLogin = (data) => request.post('/platform/miniProgram/login', data)
