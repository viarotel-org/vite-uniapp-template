import nested from 'postcss-nested'
import removeInlineComments from 'postcss-remove-inline-comments'
import postcssScss from 'postcss-scss'

export default {
  parser: postcssScss,
  plugins: [removeInlineComments, nested],
}
