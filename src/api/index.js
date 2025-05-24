import uniappAdapter from '@alova/adapter-uniapp'
import { createAlova } from 'alova'
import mockRequestAdapter from './mock'

function useAdapter(isMock) {
  if (isMock) {
    return {
      requestAdapter: mockRequestAdapter(),
    }
  }

  return uniappAdapter()
}

const alova = createAlova({
  baseURL: process.env.VITE_API_BASE,
  ...useAdapter(process.env.VITE_API_MOCK === '1'),
})

export default alova