import alova from '@/api/index.js'

export function getUserInfo() {
  return alova.Get('/user/info')
}
