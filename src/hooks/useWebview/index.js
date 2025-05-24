export function useWebview() {
  const router = useRouter()

  function open(props) {
    router.push({
      path: '/pages/webview/index',
      query: props,
    })
  }

  return {
    open,
  }
}

export default useWebview
