<template lang="pug">
  v-container

    p Auto-aim tap target to center of given element

    pre(v-text="snippetTemplate")
    pre(v-text="snippetScript")

    v-btn(
      flat
      outline
      ref="showBtn"
      @click="() => $refs.guide.open($refs.showBtn.$el)"
    ) Show

    feature-viscovery(ref='guide')
      h3 Title this text
      |Lorem ipsum dolor sit amet consectetur adipisicing elit.
      |Quam expedita laborum nemo! Illo eaque iste explicabo. Vel animi
      h4.red--text.text--darken-4 Click outside to dismiss

    div.text-xs-left(v-for="(n, index) in 5")
      | Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      br
</template>

<script>
export default {
  data () {
    return {
      snippetTemplate: '<button ref="targetButton">Run!</button>\n<feature-viscovery ref="guide" :auto-aim-delay="500">',
      snippetScript: '$refs.guide.open($refs.targetButton.$el)'
    }
  },
  metaInfo () {
    return {
      title: 'auto-aim - feature-viscovery demo'
    }
  }
}
</script>

<style lang="stylus">
.theme--light.application.autoaim
  background-image: linear-gradient(60deg, #64b3f4 0%, #c2e59c 100%) !important
</style>
