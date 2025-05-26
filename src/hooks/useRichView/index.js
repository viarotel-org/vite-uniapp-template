import { omit } from 'es-toolkit'

export function useRichView() {
  const router = useRouter()
  const richViewStore = useRichViewStore()

  function open(props) {
    richViewStore.content = props.content

    router.push({
      path: '/rich-view',
      query: omit(props, ['content']),
    })
  }

  return {
    open,
  }
}

export default useRichView
