import { generateShades, updateShades } from './helpers.js'

import 'color'

function presetShades(colorValue = '', { primaryKey = 'primary', root = ':root', ...options } = {}) {
  const shades = generateShades(colorValue, {
    returnRgb: true,
    ...options,
  })

  const shadeList = Object.entries(shades)
  return {
    name: 'presetShades',
    preflights: [
      {
        getCSS: () => {
          const vars = shadeList.reduce((style, [key, value]) => {
            if (key === 'DEFAULT') {
              style += `--color-${primaryKey}: ${value};`
            }
            else {
              style += `--color-${primaryKey}-${key}: ${value};`
            }
            return style
          }, '')
          return `
            ${root} {
              ${vars}
            }
          `
        },
      },
    ],
    theme: {
      colors: {
        [primaryKey]: shadeList.reduce(
          (obj, [key]) => {
            if (key === 'DEFAULT') {
              obj[key] = `rgba(var(--color-${primaryKey}), <alpha-value>)`
            }
            else {
              obj[key] = `rgba(var(--color-${primaryKey}-${key}), <alpha-value>)`
            }
            return obj
          },
          {},
        ),
      },
    },
  }
}

export { generateShades, presetShades, updateShades }
