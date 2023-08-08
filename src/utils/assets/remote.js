import { getFileBaseURL } from '../../configs/request'

function useRemoteAssets(filePath, { noCache = false } = {}) {
  let fileURL = `${getFileBaseURL()}/assets${filePath}`

  if (noCache) {
    fileURL += `?t=${new Date().getTime()}`
  }

  // console.log('fileURL', fileURL)

  return fileURL
}

export const useAssets = useRemoteAssets

export default useRemoteAssets
