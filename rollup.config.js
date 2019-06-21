import commonjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import { eslint } from 'rollup-plugin-eslint'
import bundleSize from 'rollup-plugin-filesize'
import resolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'
import css from 'rollup-plugin-css-only'

const external = Object.keys(pkg.dependencies)
const extensions = ['.js', '.vue']
const isProduction = !process.env.ROLLUP_WATCH
const globals = { vue: 'Vue' }

const lintOpts = {
  extensions,
  exclude: ['**/*.json'],
  cache: true,
  throwOnError: true
}

const plugins = [
  resolve(),
  bundleSize(),
  commonjs(),
  css(),
  eslint(lintOpts),
  vue({
    template: {
      isProduction,
      compilerOptions: { preserveWhitespace: false }
    },
    css: false
  })
]

export default {
  external,
  plugins,
  input: 'src/feature-viscovery.vue',
  output: [
    {
      format: 'esm',
      file: 'dist/feature-viscovery.esm.js',
      globals
    },
    {
      format: 'umd',
      name: 'featureViscovery',
      file: 'dist/feature-viscovery.umd.js',
      globals
    },
    {
      format: 'cjs',
      file: 'dist/feature-viscovery.cjs.js',
      globals
    }
  ]
}
