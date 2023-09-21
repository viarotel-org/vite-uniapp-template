import request from '@/utils/request/index.js'
import { baseURL, responseSuccessCode } from '@/configs/request.js'

/**
 * @description 模拟接口
 * @param mockData 想要返回的模拟数据
 */

export function mock({ mockData = {}, delay = 500 } = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: responseSuccessCode,
        success: true,
        data: mockData,
      })
    }, delay)
  })
}

/**
 * @desc 获取基础地址
 */
export const getBaseURL = () => baseURL

/**
 * 获取字典数据
 */
export function getDictList(dictType) {
  return mock({
    dictType,
    mockData: [],
  })
}

/**
 * @desc 获取上传地址
 */
export const getUploadURL = () => `${baseURL}/file/upload`

/**
 * @desc 下载文件
 */
export function downloadFile(id) {
  return window.open(`${baseURL}/downloadFile?id=${id}`)
}

/**
 * @desc 获取站点配置
 */
export const getSiteConfig = () => mock({ mockData: {} })

/**
 * @desc 上传文件
 */
export const uploadFile = params =>
  request.upload({
    url: '/file/upload',
    dataType: 'json',
    headers: {
      'content-type': 'multipart/form-data',
    },
    ...(params || {}),
  })
