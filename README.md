# feature-viscovery

[![Build Status](https://travis-ci.org/meyt/feature-viscovery.svg?branch=master)](https://travis-ci.org/meyt/feature-viscovery)

[Demo](https://meyt.github.io/feature-viscovery)

## Install

```
npm install --save feature-viscovery
```

## Usage

```vue
  <template>
    <div>
      <feature-viscovery ref="featureViscovery">
        <h3>Title this text</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quam expedita laborum nemo! Illo eaque iste explicabo. Vel animi
        </p>
      </feature-viscovery>

      <button @click="openGuide">Open</button>
    </div>
  </template>

  <script>
  import featureViscovery from 'feature-viscovery'
  import 'feature-viscovery/dist/feature-viscovery.esm.css'

  export default {
    components: {
      featureViscovery
    },
    methods: {
      openGuide (e) {
        this.$refs.featureViscovery.open(e.clientX, e.clientY)
      }
    }
  }
  </script>
```
