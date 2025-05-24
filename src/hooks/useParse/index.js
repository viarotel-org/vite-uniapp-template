import { omit } from 'es-toolkit'

export function useParse() {
  const router = useRouter()
  const parseStore = useParseStore()

  function open(props) {
    parseStore.content = props.content

    router.push({
      path: '/pages/parse/index',
      query: omit(props, ['content']),
    })
  }

  return {
    open,
  }
}

export default useParse
