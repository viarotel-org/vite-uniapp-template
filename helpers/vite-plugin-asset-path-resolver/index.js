import { console } from 'node:inspector'
import path from 'node:path'

/**
 * @typedef {object} AssetPathResolverOptions
 * @property {string} [alias='~@assets'] - 要匹配替换的路径前缀，例如 "~@assets"
 * @property {string} [local='/src/assets'] - 本地资源根路径，例如 "/src/assets" 或 "/public/assets"
 * @property {string} [cdn] - CDN 路径前缀，例如 "https://cdn.assets.com"
 * @property {boolean} [remote=false] - 是否启用远程资源路径，默认 false（即使用本地路径）
 * @property {RegExp} [fileRegex=/\.(js|ts|jsx|tsx|vue|html|svelte|css)$/] 需要处理的文件类型的正则表达式。
 */

/**
 * 创建资源路径替换插件
 * @param {AssetPathResolverOptions} options - 插件配置选项
 * @returns {import('vite').Plugin} Vite插件
 */
export default function vitePluginAssetPathResolver(options) {
  // 设置默认选项
  options = {
    alias: options.alias || '~@assets',
    local: options.local || path.join(process.cwd(), './src/assets'),
    cdn: options.cdn,
    remote: options.remote || false,
    fileRegex: options.fileRegex || /\.(js|ts|jsx|tsx|vue|html|svelte|css)$/,
  }

  // 验证必要的配置项
  if (!options.alias)
    throw new Error('Missing required option: alias')
  if (!options.local)
    throw new Error('Missing required option: local')
  if (!options.cdn)
    throw new Error('Missing required option: cdn')

  // 规范化路径前缀
  const aliasPattern = new RegExp(`${escapeRegExp(options.alias)}\\/(.*?)(['"])`, 'g')
  const isRemote = options.remote === true

  // 移除开头的斜杠以便于拼接
  const localPath = options.local.startsWith('/') ? options.local : `/${options.local}`

  // 确保CDN路径结尾有斜杠
  const cdnPath = options.cdn.endsWith('/') ? options.cdn : `${options.cdn}/`

  return {
    name: 'vite-plugin-asset-path-resolver',

    enforce: 'pre',

    /**
     * 转换代码中的资源路径
     * @param {string} code - 源代码
     * @param {string} id - 文件ID
     * @returns {string|undefined} 转换后的代码或undefined（如果未修改）
     */
    transform(code, id) {
      // 跳过不匹配的文件
      if (!options?.fileRegex?.test?.(id)) {
        return undefined
      }

      // 跳过不包含目标前缀的文件
      if (options.alias && !code.includes(options.alias)) {
        return undefined
      }

      // 根据模式决定替换为本地路径还是CDN路径
      const replacement = isRemote
        ? (_, assetPath, quote) => `${cdnPath}${assetPath}${quote}`
        : (_, assetPath, quote) => `${localPath}/${assetPath}${quote}`

      // 执行替换
      const result = code.replace(aliasPattern, replacement)

      // 如果代码没变，返回undefined
      return result !== code ? result : undefined
    },

    /**
     * 转换HTML代码中的资源路径
     * @param {string} html - HTML代码
     * @returns {string} 转换后的HTML代码
     */
    transformIndexHtml(html) {
      // 处理HTML中的资源路径
      return html.replace(aliasPattern, isRemote
        ? (_, assetPath, quote) => `${cdnPath}${assetPath}${quote}`
        : (_, assetPath, quote) => `${localPath}/${assetPath}${quote}`)
    },

    /**
     * 配置插件
     * @param {import('vite').ResolvedConfig} config - Vite配置
     */
    configResolved(config) {
      console.log(`[asset-path-resolver] Mode: ${isRemote ? 'remote (CDN)' : 'local'}`)
      console.log(`[asset-path-resolver] Alias: ${options.alias}`)
      console.log(`[asset-path-resolver] Path: ${isRemote ? cdnPath : localPath}`)
    },
  }
}

/**
 * 转义正则表达式中的特殊字符
 * @param {string} string - 需要转义的字符串
 * @returns {string} 转义后的字符串
 */
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
