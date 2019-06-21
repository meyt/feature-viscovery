<template lang="pug">
  div.wrapper(v-if='open')
    div.tap-target(@click="propagateClick")
      div.overlay(:style="overlayStyle")
      div.circle(:style="circleStyle" ref="circle")
        div.waves-effect
      div.content(:style="contentStyle" ref="content")
        slot
</template>
<script>
function getWindowDimention () {
  return [
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
  ]
}

function getZoneByPosition (x, y) {
  const windowDimention = getWindowDimention()
  const w = windowDimention[0]
  const h = windowDimention[1]
  const xName = x < w / 2 ? 'Left' : 'Right'
  const yName = y < h / 2 ? 'top' : 'bottom'
  return [yName, xName].join('')
}

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
    boxShadowColor: {
      type: String,
      default: 'rgba(30, 143, 255, 0.719)'
    },
    overlayColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.35)'
    }
  },
  data () {
    return {
      open: false,
      circle: {
        left: null,
        top: null,
        shadowX: 0,
        shadowY: 0,
        shadowSpread: 0
      },
      content: {
        top: null,
        left: null
      },
      overlay: {
        shadowSpread: null
      }
    }
  },
  computed: {
    circleStyle () {
      return {
        top: this.circle.top === null ? null : this.circle.top + 'px',
        left: this.circle.left === null ? null : this.circle.left + 'px',
        boxShadow: [
          this.circle.shadowX + 'px',
          this.circle.shadowY + 'px',
          '0',
          this.circle.shadowSpread + 'px',
          this.boxShadowColor
        ].join(' ')
      }
    },
    contentStyle () {
      return {
        top: this.content.top + 'px',
        left: this.content.left + 'px'
      }
    },
    overlayStyle () {
      return {
        top: this.content.top === null ? null : this.circle.top + 'px',
        left: this.content.left === null ? null : this.circle.left + 'px',
        boxShadow: [
          '0px', '0px', '0px',
          this.overlay.shadowSpread + 'px',
          this.overlayColor
        ].join(' ')
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
        // Content distance from top to circle or margin top
        const contentDistanceToCircle = 25

        const circleHalfHeight = this.$refs.circle.clientHeight / 2
        const circleHalfWidth = this.$refs.circle.clientWidth / 2

        const contentHeight = this.$refs.content.clientHeight
        const contentWidth = this.$refs.content.clientWidth

        this.circle.left = x - circleHalfHeight
        this.circle.top = y - circleHalfWidth

        var windowDimention = getWindowDimention()
        var w = windowDimention[0]
        this.overlay.shadowSpread = w + (w / 2)

        var cornerName = detectionCorner(x, y)

        // ------------- If point(x,y) was In Corner --------------------------
        if (cornerName === 'cornerTopLeft') {
          this.content.top = y + circleHalfHeight + contentDistanceToCircle
          this.content.left = circleHalfWidth
          this.resetCircleShadow()
        }
        if (cornerName === 'cornerBottomLeft') {
          this.content.top = y - circleHalfHeight - contentHeight - contentDistanceToCircle
          this.content.left = circleHalfWidth
          this.resetCircleShadow()
        }
        if (cornerName === 'cornerTopRight') {
          this.content.top = y + circleHalfHeight + contentDistanceToCircle
          this.content.left = x - contentWidth
          this.resetCircleShadow()
        }
        if (cornerName === 'cornerBottomRight') {
          this.content.top = y - circleHalfHeight - contentHeight - contentDistanceToCircle
          this.content.left = x - contentWidth
          this.resetCircleShadow()
        }

        // --------- If point(x,y) wasn't In Corner now Detect areas-----------
        var position = getZoneByPosition(x, y)

        if (cornerName === 'noInCorner' && position === 'topLeft') {
          this.circle.shadowX = circleHalfWidth
          this.circle.shadowY = contentHeight
          this.circle.shadowSpread = contentHeight + circleHalfHeight
          this.content.top = y + circleHalfHeight + circleHalfHeight
          let left = x - circleHalfHeight
          let overflow = Math.abs(w - (left + contentWidth))
          if ((contentWidth + left > w)) {
            this.content.left = left - overflow - (circleHalfWidth / 2)
          } else if (x < circleHalfWidth) {
            this.content.left = 0
          } else {
            this.content.left = left
          }
        }
        if (cornerName === 'noInCorner' && position === 'topRight') {
          this.circle.shadowX = -circleHalfWidth
          this.circle.shadowY = contentHeight
          this.circle.shadowSpread = contentHeight + circleHalfHeight
          this.content.top = y + circleHalfHeight + circleHalfHeight
          let left = x - (circleHalfWidth + contentHeight)
          let overflow = Math.abs(w - (left + contentWidth))
          if ((contentWidth + left > w)) {
            this.content.left = left - overflow - (circleHalfWidth / 5)
          } else {
            this.content.left = x - (circleHalfWidth + contentHeight)
          }
        }
        if (cornerName === 'noInCorner' && position === 'bottomLeft') {
          this.circle.shadowX = circleHalfWidth
          this.circle.shadowY = -contentHeight
          this.circle.shadowSpread = contentHeight + circleHalfHeight
          this.content.top = (y - (contentHeight + (circleHalfWidth * 2)))
          let left = x - circleHalfHeight
          let overflow = Math.abs(w - (left + contentWidth))
          if ((contentWidth + left > w)) {
            this.content.left = left - overflow - (circleHalfWidth / 2)
          } else if (x < circleHalfWidth) {
            this.content.left = 0
          } else {
            this.content.left = left
          }
        }
        if (cornerName === 'noInCorner' && position === 'bottomRight') {
          this.circle.shadowX = -circleHalfWidth
          this.circle.shadowY = -contentHeight
          this.circle.shadowSpread = contentHeight + circleHalfHeight
          this.content.top = y - (contentHeight + (circleHalfWidth * 2))
          let left = x - (circleHalfWidth + contentHeight)
          let overflow = Math.abs(w - (left + contentWidth))
          if ((contentWidth + left > w)) {
            this.content.left = left - overflow - (circleHalfWidth / 5)
          } else {
            this.content.left = x - (circleHalfWidth + contentHeight)
          }
        }
      })
    },
    propagateClick (e) {
      const pointedElements = document.elementsFromPoint(e.clientX, e.clientY)
      let targetElement = null
      for (let pointedElement of pointedElements) {
        if (this.$el.contains(pointedElement)) continue
        targetElement = pointedElement
        break
      }

      const clickEvent = new MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      })

      targetElement.dispatchEvent(clickEvent)
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
      opacity 1

  .overlay
    width: 88px
    height: 88px
    border-radius: 50%
    position: absolute

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
    box-shadow: 0px 0px 0px 0px rgba(30, 143, 255, 0.719)
    transition: box-shadow 0.5s ease

  .waves-effect
    width: 88px
    height: 88px
    border-radius: 50%
    animation: shadow-animate 1.5s infinite
    transition:  box-shadow 0.5s ease
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
    transition: opacity 0.5s ease
    padding: 0 20px
    text-align:justify
    brder: 1px solid red

  .wrapper
    position: fixed
    height: 100%
    width: 100%
    left: 0
    top: 0
    overflow: hidden
    z-index: 10003

  .open
    box-shadow: 0 0 0 278px #020506;

</style>
