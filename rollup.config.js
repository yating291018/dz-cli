import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import typescript from '@rollup/plugin-typescript'
import clear from 'rollup-plugin-clear'

export default {
  input: './src/index.ts',
  output: {
    file: 'lib/index.es.js',
    format: 'es'
  },
  plugins: [
    commonjs(),
    json(),
    typescript(),
    clear({
      targets: 'lib'
    })
  ]
}