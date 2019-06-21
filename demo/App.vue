<template lang="pug">
  v-app
    v-content
      v-layout(justify-center)
        v-flex(xs12)
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
</style>
