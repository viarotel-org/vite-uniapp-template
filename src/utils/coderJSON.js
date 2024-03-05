export function stringify(params) {
  const value = encodeURIComponent(JSON.stringify(params))
  return value
}
export function parse(params) {
  const value = JSON.parse(decodeURIComponent(params))
  return value
}

export default {
  stringify,
  parse,
}
