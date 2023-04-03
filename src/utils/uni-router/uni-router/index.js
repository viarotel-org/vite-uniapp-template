import { createRouter as _createRouter } from '@gowiny/uni-router'
import { aliasTransformer } from './utils.js'

export const createRouter = ({ pages = {}, ...options } = {}) => {
  const router = _createRouter({ ...options, pageData: pages })

  aliasTransformer(router, pages)

  console.log('router', router)

  return router
}
