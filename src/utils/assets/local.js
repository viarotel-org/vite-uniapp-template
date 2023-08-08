function useLocalAssets(filePath) {
  let fileURL = ''

  const assets = import.meta.globEager('/src/assets/**/*')
  fileURL = assets[`/src/assets${filePath}`].default
  // console.log('fileURL', fileURL)

  return fileURL
}

export const useAssets = useLocalAssets

export default useLocalAssets
