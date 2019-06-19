<template lang="pug">
  div.cotainer(@click="clickContainer")
    featureViscovery(ref='tap_target')
    v-layout(row wrap)
      v-flex(xs2)
        v-navigation-drawer(v-model='drawer' :mini-variant.sync="mini" hide-overlay stateless height="100vh")
          v-toolbar.transparent(flat)
            v-list.pa-0
              v-list-tile(avatar)

                v-list-tile-avatar
                  img(src='https://randomuser.me/api/portraits/men/85.jpg')

                v-list-tile-content
                  v-list-tile-title John Leider

                v-list-tile-action
                  v-btn(icon @click.stop='mini = !mini')
                    v-icon chevron_left

          v-list.pt-0(dense)
            v-divider
            v-list-tile(v-for='item in items' :key='item.title')
              v-list-tile-action
                div(v-if="item.icon=='fiber_manual_record'")
                  v-icon {{ item.icon }}
                div(v-if="item.icon !='fiber_manual_record'")
                  v-icon(medium) {{ item.icon }}
              v-list-tile-content
                v-list-tile-title {{ item.title }}
      v-flex(xs10)
        div.text-lg-right
          v-btn(color='success' @click= 'openTaregt()') open
          v-btn(color='error' @click= 'closeTaregt()') close
    div.purple
    div.blue
    div.lime
    div.red
</template>

<script>
// @ is an alias to /src
import featureViscovery from '@/components/featureViscovery.vue'

export default {
  name: 'home',
  components: {
    featureViscovery
  },
  data () {
    return {
      drawer: true,
      items: [
        { title: 'Bubble', icon: 'fiber_manual_record' },
        { title: 'Bubbles', icon: 'bubble_chart' }
      ],
      mini: true,
      right: null
    }
  },
  methods: {
    openTaregt (x, y) {
      this.$refs.tap_target.openTaregt(x, y)
    },
    closeTaregt () {
      this.$refs.tap_target.closeTaregt()
    },
    clickContainer (e) {
      var x = e.clientX
      var y = e.clientY
      this.openTaregt(x, y)
    }
  }
}
</script>

<style>
  .home{
    height: 1000px;
    position: relative;
    margin: 0px;
  }
  .v-list__tile__action{
    cursor: pointer;
  }
  .cotainer{
    position: relative;
  }
  .purple , .blue , .lime , .red{
    width: 50%;
    height: 50%;
    position: absolute;
    z-index: 100;
    opacity: 0.3;
    top: 0;
  }
  .blue {
    left: 50%!important;
  }
  .lime {
    top: 50%!important;
  }
  .red {
    left: 50%!important;
    top: 50%!important;
  }
</style>
