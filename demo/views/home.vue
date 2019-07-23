<template lang="pug">
  v-container
    v-layout.mb-3
      v-flex.px-1
        v-text-field(
          label="Background color"
          v-model="backgroundColor"
          hide-details
        )
      v-flex.px-1
        v-text-field(
          label="Wave color"
          v-model="waveColor"
          hide-details
        )
      v-flex.px-1
        v-text-field(
          label="Overlay color"
          v-model="overlayColor"
          hide-details
        )
    v-layout.mb-3
      v-flex.px-1
        v-text-field(
          label="Left"
          v-model="left"
          hide-details
        )
      v-flex.px-1
        v-text-field(
          label="Top"
          v-model="top"
          hide-details
        )

    pre(v-text="snippetTemplate")
    pre(v-text="snippetScript")

    v-btn(
      flat
      outline
      @click="$refs.guide.open(parseInt(left), parseInt(top))"
    ) Show

    feature-viscovery(
      ref='guide'
      :background-color="backgroundColor"
      :wave-color="waveColor"
      :overlay-color="overlayColor"
    )
      h3 Title this text
      |Lorem ipsum dolor sit amet consectetur adipisicing elit.
      |Quam expedita laborum nemo! Illo eaque iste explicabo. Vel animi
      h4.red--text.text--darken-4 Click outside to dismiss

</template>

<script>
export default {
  data () {
    return {
      backgroundColor: 'rgba(30, 143, 255, 0.719)',
      waveColor: '#ffffff',
      overlayColor: 'rgba(0, 0, 0, 0.35)',
      left: 20,
      top: 20
    }
  },
  computed: {
    snippetTemplate () {
      return `<feature-viscovery 
  ref="guide"
  background-color="${this.backgroundColor}"
  wave-color="${this.waveColor}"
  overlay-color="${this.overlayColor}"
>
  <h3>Title this text</h3>
  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Quam expedita laborum nemo! Illo eaque iste explicabo. Vel animi
  </div>
</feature-discovery>`
    },
    snippetScript () {
      return `$refs.guide.open(${this.left}, ${this.top})`
    }
  }
}
</script>

<style lang="stylus">
.theme--light.application.home
  background-image: linear-gradient(to top, #d299c2 0%, #fef9d7 100%) !important
</style>
