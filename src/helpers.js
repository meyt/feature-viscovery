export function getWindowDimention () {
  return [
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  ]
}

export function getZoneByPosition (x, y) {
  const windowDimention = getWindowDimention()
  const w = windowDimention[0]
  const h = windowDimention[1]
  const xName = x < w / 2 ? 'Left' : 'Right'
  const yName = y < h / 2 ? 'top' : 'bottom'
  return [yName, xName].join('')
}

export function detectionCorner (x, y) {
  const windowDimention = getWindowDimention()
  const w = windowDimention[0]
  const h = windowDimention[1]

  // Standard material.io/feature-discovery mobile corner is 88px
  const mobileCornerHeight = 88
  const mobileCornerWidth = 88

  // get Position Name was clicked
  const positionName = getZoneByPosition(x, y)

  // corner topLeft
  if (
    positionName === 'topLeft' &&
    x < mobileCornerWidth && y < mobileCornerHeight
  ) return 'cornerTopLeft'

  if (
    positionName === 'bottomLeft' &&
    x < mobileCornerWidth && (y > (h - mobileCornerHeight))
  ) return 'cornerBottomLeft'

  if (
    positionName === 'topRight' &&
    (x > (w - mobileCornerWidth) && y < mobileCornerHeight)
  ) return 'cornerTopRight'

  if (
    positionName === 'bottomRight' &&
    (x > (w - mobileCornerWidth) && (y > (h - mobileCornerHeight)))
  ) return 'cornerBottomRight'

  return 'noInCorner'
}
