import { createRouter } from '@/utils/uni-router/index'
import pages from '@/pages.json'
import permission from './permission'

const router = createRouter({
  pages,
})

permission(router, { pages })

console.log('router', router)

export default router
