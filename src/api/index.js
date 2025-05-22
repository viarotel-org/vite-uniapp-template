import AdapterUniapp from '@alova/adapter-uniapp'
import { createAlova } from 'alova'

const alova = createAlova({
  baseURL: process.env.VITE_API_BASE,
  ...AdapterUniapp(),
})

export default alova
