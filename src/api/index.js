import uniappAdapter from '@alova/adapter-uniapp'
import { isH5 } from '@uni-helper/uni-env'
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

function getBaseURL() {
  let value = process.env.VITE_API_ORIGIN + process.env.VITE_API_PATH

  if (process.env.VITE_PROXY_USE === '1' && isH5) {
    value = process.env.VITE_PROXY_PATH
  }

  return value
}

const alova = createAlova({
  ...useAdapter(process.env.VITE_API_MOCK === '1'),

  baseURL: getBaseURL(),

  beforeRequest: (method) => {
    const userStore = useUserStore()

    if (userStore.token) {
      Object.assign(method.config.headers, {
        [process.env.VITE_API_TOKEN_KEY]: `Bearer ${userStore.token}`,
      })
    }
  },

  responded: {
    onSuccess: async (response) => {
      if (response.status >= 400) {
        throw new Error(response.statusText)
      }

      const data = response.data

      if (data.code !== Number(process.env.VITE_API_SUCCESS_CODE)) {
        throw data
      }

      return data
    },

    onError: (error) => {
      console.error(`alova.responded.onError:${error.message || error}`)
    },

    onComplete: () => {},
  },
})

export default alova
