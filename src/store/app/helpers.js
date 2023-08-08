import Color from 'color'

// 根据基础颜色生成不同深度的颜色
export function generateShades(
  color,
  {
    shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    baseShade = 500,
    returnRgb = false,
  } = {},
) {
  const baseColor = Color(color)
  console.log('baseColor', baseColor)
  const result = {}

  // Iterate through the shades and generate the corresponding color
  shades.forEach((shade) => {
    let adjustedColor

    // Set the base color for the specified baseShade
    if (shade === baseShade) {
      adjustedColor = baseColor
    }
    else if (shade < baseShade) {
      // Mix the base color with white for lighter shades
      const weight = 1 - shade / baseShade
      adjustedColor = baseColor.mix(Color('white'), weight)
    }
    else {
      // Mix the base color with black for darker shades
      const weight = (shade - baseShade) / (1000 - baseShade)
      adjustedColor = baseColor.mix(Color('black'), weight)
    }

    // Add the shade to the result object
    result[shade] = returnRgb
      ? adjustedColor.color.join(',')
      : adjustedColor.hex()
  })

  // Set the DEFAULT key to the base color
  result.DEFAULT = returnRgb ? baseColor.color.join(',') : baseColor.hex()

  return result
}

// 设置全局主题变量
export function setThemeVariables(baseColor) {
  const shadeColors = generateShades(baseColor, { returnRgb: true })
  console.log('shadeColors', shadeColors)

  const setProperty = (key, value) =>
    document.documentElement.style.setProperty(key, value)

  Object.entries(shadeColors).forEach(([weight, rgbColor]) => {
    // console.log('rgbColor', rgbColor)
    if (weight === 'DEFAULT') {
      setProperty('--color-primary', rgbColor)
    }
    else {
      setProperty(`--color-primary-${weight}`, rgbColor)
    }
  })
}
