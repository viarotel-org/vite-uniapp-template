import CryptoJS from 'crypto-js'

const mode = CryptoJS.mode.ECB
const padding = CryptoJS.pad.Pkcs7
const iv = ''
const isBase64 = false // 是否使用base64进行处理
export const baseKey = 'qeUlOJdw9TMR3VPc'
export const aes = {
  encrypt(content, key = baseKey) {
    content = JSON.stringify(content)
    content = CryptoJS.enc.Utf8.parse(content)
    key = CryptoJS.enc.Utf8.parse(key)
    content = CryptoJS.AES.encrypt(content, key, {
      iv,
      mode,
      padding,
    }).toString()
    if (isBase64) {
      (content = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(content),
      ))
    }

    return content
  },
  decrypt(content, key = baseKey) {
    if (isBase64) {
      (content = CryptoJS.enc.Utf8.stringify(
        CryptoJS.enc.Base64.parse(content),
      ))
    }

    key = CryptoJS.enc.Utf8.parse(key)
    content = CryptoJS.AES.decrypt(content, key, {
      iv,
      mode,
      padding,
    })
    content = CryptoJS.enc.Utf8.stringify(content)
    content = JSON.parse(content)

    return content
  },
}

export default {
  baseKey,
  aes,
}
