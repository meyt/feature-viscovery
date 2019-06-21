export function getWindowDimension () {
  return [
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  ]
}

export function getQuarterName (w, h, x, y) {
  const xName = x < w / 2 ? 'Left' : 'Right'
  const yName = y < h / 2 ? 'top' : 'bottom'
  return [yName, xName].join('')
}

export function getCornerName (x, y, cornerWidth = 88, cornerHeight = 88) {
  // Standard material.io/feature-discovery mobile corner is 88px
  const windowDimension = getWindowDimension()
  const w = windowDimension[0]
  const h = windowDimension[1]

  if (x < cornerWidth && y < cornerHeight) return 'cornerTopLeft'

  if (x < cornerWidth && y > h - cornerHeight) return 'cornerBottomLeft'

  if (x > w - cornerWidth && y < cornerHeight) return 'cornerTopRight'

  if (x > w - cornerWidth && y > h - cornerHeight) return 'cornerBottomRight'
}
