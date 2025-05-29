import { createAlovaMockAdapter, defineMock } from '@alova/mock'
import adapterFetch from 'alova/fetch'
import avatarUrl from '~@/assets/images/avatar.gif'
import { appExtra } from '@/settings/index.js'

function mockRequestAdapter() {
  const userMock = defineMock({
    '[POST]/login': {
      token: 'mock-token',
      code: 200,
    },
    '/getInfo': {
      data: {
        ...appExtra,
        userId: 1,
        username: appExtra.name,
        avatar: avatarUrl,
      },
      code: 200,
    },
  })

  return createAlovaMockAdapter([userMock], {
    httpAdapter: adapterFetch(),
    matchMode: 'methodurl',
    enable: true,
    delay: 1000,
    mockRequestLogger: true,
    onMockResponse: async (response) => {
      return {
        response: {
          ...response,
          data: response.body,
        },
      }
    },
  })
}

export default mockRequestAdapter
