import request from '@/utils/request/index.js'
import { baseURL } from '@/configs/request'
import { assetURL } from '@/configs/index'
/**
 * @description 模拟接口
 * @param mockData 想要返回的模拟数据
 */

export const mockRequest = ({ mockData = {}, delay = 500 } = {}) => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      code: '0000',
      data: mockData,
    })
  }, delay)
})

/**
 * @description 获取基础地址
 */
export const getBaseURL = () => baseURL

/**
 * 获取字典数据
 */
export const dictDataList = (dictType) => request.post('/api/dictDataList', {
  dictType,
})

/**
 * @description 获取上传地址
 */
export const getUploadUrl = () => `${baseURL}/audit/attachment/upload`

/**
 * @description 下载文件
 */
export const downloadFile = (id) => window.open(`${baseURL}/audit/attachment/downloadFile?id=${id}`)

/**
 * @description 获取CDN资源文件
 */
export const getAssetFile = (path) => assetURL + path
