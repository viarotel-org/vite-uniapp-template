import Color from 'color'

function generateShades(colorValue = '', {
  shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  baseShade = 500,
  returnRgb = false,
} = {}) {
  const baseColor = Color(colorValue)
  const getColor = (color) => {
    if (returnRgb) {
      return color.round().array().join(',')
    }
    return color.hex()
  }
  const value = shades.reduce(
    (obj, shadeValue) => {
      if (baseShade === shadeValue) {
        obj[shadeValue] = obj.DEFAULT
      }
      else if (shadeValue < baseShade) {
        const weight = 1 - shadeValue / baseShade
        const whiten = baseColor.mix(Color('white'), weight)
        obj[shadeValue] = getColor(whiten)
      }
      else {
        const weight = (shadeValue - baseShade) / (1e3 - baseShade)
        const blacken = baseColor.mix(Color('black'), weight)
        obj[shadeValue] = getColor(blacken)
      }
      return obj
    },
    {
      DEFAULT: getColor(baseColor),
    },
  )
  return value
}
function updateShades(baseColor = '') {
  const shadeColors = generateShades(baseColor, { returnRgb: true })
  const setProperty = (key = '', value = '') => document.documentElement.style.setProperty(key, value)
  Object.entries(shadeColors).forEach(([weight, colorValue]) => {
    if (weight === 'DEFAULT') {
      setProperty('--color-primary', colorValue)
    }
    else {
      setProperty(`--color-primary-${weight}`, colorValue)
    }
  })
}

export { generateShades, updateShades }
