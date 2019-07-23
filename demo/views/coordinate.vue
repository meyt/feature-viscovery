<template lang="pug">
  v-container

    p Click anywhere to open the guide

    feature-viscovery(ref='guide')
      h3 Title this text
      |Lorem ipsum dolor sit amet consectetur adipisicing elit.
      |Quam expedita laborum nemo! Illo eaque iste explicabo. Vel animi
      h4.red--text.text--darken-4 Click anywhere again to dismiss

</template>

<script>
export default {
  data () {
    return {
      enabled: true
    }
  },
  methods: {
    onClick (e) {
      if (this.enabled) {
        this.$refs.guide.close()
      } else {
        this.$refs.guide.open(e.clientX, e.clientY)
      }
      this.enabled = !this.enabled
    }
  },
  mounted () {
    window.addEventListener('click', this.onClick)
  },
  beforeDestroy () {
    window.removeEventListener('click', this.onClick)
  }
}
</script>

<style lang="stylus">
.theme--light.application.coordinate
  background-image: linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%) !important
</style>
