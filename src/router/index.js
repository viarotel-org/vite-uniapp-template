import { createRouter } from '$uni-router'
import pages from '@/pages.json'

// console.log('pages', pages)

const router = createRouter({
  pages,
  addRoutes: [
    {
      path: '*',
      redirect: () => {
        return { path: '/404' }
      },
    },
  ],
})

// console.log('router', router)

export default router
