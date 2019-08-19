import html from 'rollup-plugin-generate-html-template';
import globals from 'rollup-plugin-node-globals';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'zauth.vue.client',
      format: 'umd',
      file: 'dist/index.js',
      sourcemap: true
    },
    plugins: [
      html({
        template: 'src/index.html'
      }),
      globals(),
      typescript({
        clean: true
      }),
      commonjs(),
      vue(),
      resolve(),
      terser()
    ]
  }
];
