import { createAlovaMockAdapter, defineMock } from '@alova/mock'
import adapterFetch from 'alova/fetch'
import avatarUrl from '~@/assets/images/avatar.gif'
import { extraInfo } from '@/settings/index.js'

function mockRequestAdapter() {
  const userMock = defineMock({
    '/user/info': {
      data: {
        ...extraInfo,
        userId: 1,
        username: extraInfo.name,
        avatar: avatarUrl,
      },
      code: 200,
    },
  })

  return createAlovaMockAdapter([userMock], {
    httpAdapter: adapterFetch(),
    enable: true,
    delay: 1000,
    mockRequestLogger: true,
    onMockResponse: async (response) => {
      return {
        response: response.body,
      }
    },
  })
}

export default mockRequestAdapter
