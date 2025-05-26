export function useWebView() {
  const router = useRouter()

  function open(props) {
    router.push({
      path: '/web-view',
      query: props,
    })
  }

  return {
    open,
  }
}

export default useWebView
