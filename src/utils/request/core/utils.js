export const joinPath = (url, path) => {
  if (url.endsWith('/')) {
    url = url.slice(0, -1)
  }
  if (path.startsWith('/')) {
    path = path.slice(1)
  }
  return `${url}/${path}`
}

export const requestModel = async (options = {}) => {
  const { url = '', data = {} } = options

  // console.log('requestModel.path', url)
  // console.log('requestModel.data', data)
  // console.log('requestModel.options', options)

  return new Promise((resolve) => {
    uni.request({
      ...options,
      url,
      data,
      header: options.headers,
      success: async (res) => {
        // console.log('requestModel.res', res)
        resolve(res)
      },

      fail: async (err) => {
        // console.log('requestModel.err', err)
        resolve(err)
      },
    })
  })
}
