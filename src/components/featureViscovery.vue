<template lang="pug">
  div.gav(v-if='open')
    .tap-target
      div.circle(:style="circleStyle" ref="circle")
        .waves-effect
      div.content(:style="contentStyle" ref="content")
        h3 Title this text
        |Lorem ipsum dolor sit amet consectetur adipisicing elit.
        |Quam expedita laborum nemo! Illo eaque iste explicabo. Vel animi
</template>
<script>
// get Window Dimention
function getWindowDimention () {
  return [
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  ]
}

// get Zone By Position
function getZoneByPosition (x, y) {
  const windowDimention = getWindowDimention()
  const w = windowDimention[0]
  const h = windowDimention[1]
  const xName = x < w / 2 ? 'Left' : 'Right'
  const yName = y < h / 2 ? 'top' : 'bottom'
  return [yName, xName].join('')
}

//  Detection Corner
function detectionCorner (x, y) {
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

const defaultShadowSpread = 278

export default {
  name: 'HelloWorld',
  props: {
    color: {
      type: String,
      default: 'rgba(30, 143, 255, 0.719)'
    }
  },
  data () {
    return {
      open: false,
      circle: {
        left: 0,
        top: 0,
        shadowX: 0,
        shadowY: 0,
        shadowSpread: defaultShadowSpread
      },
      content: {
        top: 0,
        left: 0
      }
    }
  },
  computed: {
    circleStyle () {
      return {
        top: this.circle.top + 'px',
        left: this.circle.left + 'px',
        boxShadow: [
          this.circle.shadowX + 'px',
          this.circle.shadowY + 'px',
          '0',
          this.circle.shadowSpread + 'px',
          this.color
        ].join(' ')
      }
    },
    contentStyle () {
      return {
        top: this.content.top + 'px',
        left: this.content.left + 'px'
      }
    }
  },
  methods: {
    resetCircleShadow () {
      this.circle.shadowX = 0
      this.circle.shadowY = 0
      this.circle.shadowSpread = defaultShadowSpread
    },
    openTaregt (x, y) {
      this.open = true
      this.$nextTick(() => {
        // Get Wave height and width
        const circleHalfHeight = this.$refs.circle.clientHeight / 2
        const circleHalfWidth = this.$refs.circle.clientWidth / 2

        const contentHeight = this.$refs.content.clientHeight
        const contentWidth = this.$refs.content.clientWidth

        this.circle.left = x - circleHalfHeight
        this.circle.top = y - circleHalfWidth

        // get width screen
        var windowDimention = getWindowDimention()
        var w = windowDimention[0]

        // Get Corner was clicked Name
        var cornerName = detectionCorner(x, y)

        // Corner topLeft
        if (cornerName === 'cornerTopLeft') {
          this.content.top = y + circleHalfHeight + 25
          this.content.left = circleHalfWidth
          this.resetCircleShadow()
        }

        // Corner bottomLeft
        if (cornerName === 'cornerBottomLeft') {
          this.content.top = y - circleHalfHeight - contentHeight - 25
          this.content.left = circleHalfWidth
          this.resetCircleShadow()
        }

        // Corner topRight
        if (cornerName === 'cornerTopRight') {
          this.content.top = y + circleHalfHeight + 25
          this.content.left = x - contentWidth
          this.resetCircleShadow()
        }

        // Corner bottomRight
        if (cornerName === 'cornerBottomRight') {
          this.content.top = y - circleHalfHeight - contentHeight - 25
          this.content.left = x - contentWidth
          this.resetCircleShadow()
        }

        // ---------If Not In Corner now Detect areas-----------------------

        // get Position Name was clicked
        var position = getZoneByPosition(x, y)

        // 1: TopLeft
        if (cornerName === 'noInCorner' && position === 'topLeft') {
          this.circle.shadowX = circleHalfWidth
          this.circle.shadowY = contentHeight
          this.circle.shadowSpread = contentHeight + 40

          this.content.top = y + circleHalfHeight + 40
          let left = x - circleHalfHeight
          let overflow = Math.abs(w - (left + contentWidth))
          if ((contentWidth + left > w)) {
            this.content.left = left - overflow - 20
          } else if (x < circleHalfWidth) {
            this.content.left = 0
          } else {
            this.content.left = left
          }
        }
        // 2: TopRight
        if (cornerName === 'noInCorner' && position === 'topRight') {
          this.circle.shadowX = -circleHalfWidth
          this.circle.shadowY = contentHeight
          this.circle.shadowSpread = contentHeight + 40

          this.content.top = y + circleHalfHeight + 40

          let left = x - (circleHalfWidth * 2 + 60)
          let overflow = Math.abs(w - (left + contentWidth))
          if ((contentWidth + left > w)) {
            this.content.left = left - overflow - (circleHalfWidth - 16)
          } else {
            this.content.left = x - (circleHalfWidth * 2 + 60)
          }
        }
        // 3:bottomLeft
        if (cornerName === 'noInCorner' && position === 'bottomLeft') {
          this.circle.shadowX = circleHalfWidth
          this.circle.shadowY = -contentHeight
          this.circle.shadowSpread = contentHeight + 40

          this.content.top = (y - (contentHeight + (circleHalfWidth * 2)))

          let left = x - circleHalfHeight
          let overflow = Math.abs(w - (left + contentWidth))
          if ((contentWidth + left > w)) {
            this.content.left = left - overflow - 20
          } else if (x < circleHalfWidth) {
            this.content.left = 0
          } else {
            this.content.left = left
          }
        }
        // 4:bottomRight
        if (cornerName === 'noInCorner' && position === 'bottomRight') {
          this.circle.shadowX = -circleHalfWidth
          this.circle.shadowY = -contentHeight
          this.circle.shadowSpread = contentHeight + 40

          this.content.top = y - (contentHeight + (circleHalfWidth * 2))

          let left = x - (circleHalfWidth * 2 + 60)
          let overflow = Math.abs(w - (left + contentWidth))
          if ((contentWidth + left > w)) {
            this.content.left = left - overflow - (circleHalfWidth - 16)
          } else {
            this.content.left = x - (circleHalfWidth * 2 + 60)
          }
        }
      })
    },
    closeTaregt () {
      this.open = false
    }
  }
}
</script>

<style lang="stylus">

  @keyframes shadow-animate
    0%
      box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.2)
    100%
      box-shadow: 0 0 0 20px rgba(0, 0, 0, 0)

  @keyframes fade-content
    0%
      opacity  0
    100%
      opacit 1

  .tap-target
    border-radius: 50%
    z-index: 1000
    box-sizing: inherit
    position: absolute
    .circle
      border-radius: 50%
      width: 88px
      height: 88px
      z-index: 1000
      position: absolute
      transition: all 0.5s ease

  .waves-effect
    width: 88px
    height: 88px
    border-radius: 50%
    animation: shadow-animate 1.5s infinite
    transition: all 0.5s ease
    position: absolute

  .content
    font-size: 0.9rem
    lineHeight: 1.6
    color: #fff
    max-width: 220px
    z-index: 1002
    position: absolute
    animation: fade-content 4s
    animation-iteration-count: 1
    text-align: left
    min-width: 220px
    transition: all 0.5s ease
    padding: 0 20px
    text-align:justify
    brder: 1px solid red

</style>
