import pkg from './package.json';
import html from 'rollup-plugin-generate-html-template';
import typescript from 'rollup-plugin-typescript2';
import globals from 'rollup-plugin-node-globals';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.tsx',
    output: {
      name: 'zauth.core',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      html({
        template: 'src/index.html',
        target: 'index.html'
      }),
      commonjs({
        namedExports: {
          'react': ['React'],
          'react-dom': ['ReactDOM']
        }
      }),
      globals(),
      typescript({ clean: true }),
      resolve(),
      terser()
    ]
  }
];
