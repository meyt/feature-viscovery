<template lang="pug">
  v-app(:class="[$route.name]")
    v-toolbar(flat style="background-color: transparent")
      v-toolbar-title
        a(href="https://github.com/meyt/feature-viscovery" target="_blank")
         | feature-viscovery demo
      v-spacer
      v-toolbar-items
        v-btn(to="/" flat) basic
        v-btn(to="/coordinate" flat) Coordinate
        v-btn(to="/auto-aim" flat) Auto-aim
    v-content
      v-layout(justify-center)
        v-flex(xs12 md6)
          router-view
</template>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Material+Icons')
@import '~vuetify/src/stylus/main'
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center

  color #2c3e50
body
  margin 0px

a
  text-decoration: none
  color: #444 !important

pre
  display: block
  width: 100%
  background-color: #eee
  text-align: left
  font-family: monospace
  border-radius: 5px
  padding: 10px
  margin-bottom: 10px
  font-size: 11px
</style>
