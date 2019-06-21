<template lang="pug">
  div.feature-viscovery.wrapper(v-if='opened')
    div.tap-target(@click.stop="propagateClick")
      div.overlay(:style="overlayStyle")
      div.circle(:style="circleStyle" ref="circle")
        div.waves-effect
      div.content(:style="contentStyle" ref="content")
        slot
</template>
<script>
import {
  getWindowDimension,
  getQuarterName,
  getCornerName
} from './helpers.js'
const defaultShadowSpread = 278
const contentPadding = 25

export default {
  name: 'FeatureViscovery',
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
      opened: false,
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
    open (x, y) {
      this.opened = true
      this.$nextTick(() => {
        this.openTarget(x, y)
      })
    },
    close () {
      this.opened = false
    },
    openTarget (x, y) {
      const diameter = this.$refs.circle.clientWidth
      const radius = this.$refs.circle.clientWidth / 2

      const contentHeight = this.$refs.content.clientHeight
      const contentWidth = this.$refs.content.clientWidth

      this.circle.left = x - radius
      this.circle.top = y - radius

      const windowDimension = getWindowDimension()
      const w = windowDimension[0]
      const h = windowDimension[1]
      this.overlay.shadowSpread = w * 2

      const fitContentHorizontally = () => {
        const left = this.content.left
        const overflow = Math.abs(w - (left + contentWidth))
        if (contentWidth + left > w) {
          this.content.left = left - overflow - contentPadding
        } else if (x < radius) {
          this.content.left = 0
        }
      }

      const cornerName = getCornerName(x, y)
      if (!cornerName) {
        const quarterName = getQuarterName(w, h, x, y)
        if (quarterName === 'topLeft') {
          this.circle.shadowX = radius
          this.circle.shadowY = contentHeight
          this.circle.shadowSpread = contentHeight + radius
          this.content.top = y + diameter
          this.content.left = x - radius
          fitContentHorizontally()
          return
        }
        if (quarterName === 'topRight') {
          this.circle.shadowX = -radius
          this.circle.shadowY = contentHeight
          this.circle.shadowSpread = contentHeight + contentHeight / 2
          this.content.top = y + diameter
          this.content.left = x - (radius + contentHeight)
          fitContentHorizontally()
          return
        }
        if (quarterName === 'bottomLeft') {
          this.circle.shadowX = radius
          this.circle.shadowY = -contentHeight
          this.circle.shadowSpread = contentHeight + radius
          this.content.top = y - (contentHeight + diameter)
          this.content.left = x - radius
          fitContentHorizontally()
          return
        }
        if (quarterName === 'bottomRight') {
          this.circle.shadowX = -radius
          this.circle.shadowY = -contentHeight
          this.circle.shadowSpread = contentHeight + radius
          this.content.top = y - (contentHeight + diameter)
          this.content.left = x - (radius + contentHeight)
          fitContentHorizontally()
          return
        }
      }

      if (cornerName === 'cornerTopLeft') {
        this.content.top = y + radius + contentPadding
        this.content.left = radius
        this.resetCircleShadow()
        return
      }

      if (cornerName === 'cornerBottomLeft') {
        this.content.top = y - radius - contentHeight - contentPadding
        this.content.left = radius
        this.resetCircleShadow()
        return
      }

      if (cornerName === 'cornerTopRight') {
        this.content.top = y + radius + contentPadding
        this.content.left = x - contentWidth
        this.resetCircleShadow()
        return
      }

      if (cornerName === 'cornerBottomRight') {
        this.content.top = y - radius - contentHeight - contentPadding
        this.content.left = x - contentWidth
        this.resetCircleShadow()
      }
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
        'cancelable': true,
        'screenX': e.screenX,
        'screenY': e.screenY,
        'clientX': e.clientX,
        'clientY': e.clientY,
        'pageX': e.pageX,
        'pageY': e.pageY
      })

      targetElement.dispatchEvent(clickEvent)
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

  $targetDiameter = 88px

  .feature-viscovery
    box-shadow: 0 0 0 278px #020506
    position: fixed
    height: 100%
    width: 100%
    left: 0
    top: 0
    overflow: hidden
    z-index: 10

    .overlay
      width: $targetDiameter
      height: $targetDiameter
      border-radius: 50%
      position: absolute

    .tap-target
      border-radius: 50%
      box-sizing: inherit
      position: absolute

    .circle
      border-radius: 50%
      width: $targetDiameter
      height: $targetDiameter
      position: absolute
      box-shadow: 0px 0px 0px 0px rgba(30, 143, 255, 0.719)
      transition: box-shadow 0.5s ease

    .waves-effect
      width: $targetDiameter
      height: $targetDiameter
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

</style>
