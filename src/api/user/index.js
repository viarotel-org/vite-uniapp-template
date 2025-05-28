import alova from '@/api/index.js'

export function postUserLogin() {
  return alova.Post('/login')
}

export function getUserInfo() {
  return alova.Get('/getInfo')
}
