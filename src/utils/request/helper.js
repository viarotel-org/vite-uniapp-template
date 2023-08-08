export async function binaryParser(response, { dataKey = '_data' } = {}) {
  return new Promise((resolve) => {
  // console.log('response', response)
    const data = response[dataKey]
    let headers = response.headers
    if (headers.toString() === '[object Headers]') {
      headers = Object.fromEntries(headers.entries())
    // console.log('headers', headers)
    }

    let resData = ''
    let fileName
    if (headers['content-disposition']) {
      fileName = headers['content-disposition'].split(';')[1].split('=')[1]
    }
    const blob = data
    if (!fileName) {
      const errorData = new FileReader()
      errorData.addEventListener('loadend', (data) => {
        try {
          resData = JSON.parse(data.target.result)
        }
        catch (e) {
          resData = ''
        }
        resolve(resData)
      })
      errorData.readAsText(blob)
    }
    else {
      resData = {
        fileName: window.decodeURIComponent(fileName),
        blob: data,
      }
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onload = (e) => {
        const aEl = document.createElement('a')
        aEl.download = window.decodeURIComponent(resData.fileName)
        aEl.href = e.target.result
        document.body.appendChild(aEl)
        aEl.click()
        document.body.removeChild(aEl)
        resData = {
          code: '0000',
          message: '成功',
        }
        resolve(resData)
      }
    }
  })
}
