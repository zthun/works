import pkg from './package.json';
import typescript from 'rollup-plugin-typescript';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'zauth.core',
        file: pkg.umd,
        format: 'umd'
      },
      {
        name: 'zauth.core',
        file: pkg.fesm5,
        format: 'cjs'
      },
      {
        name: 'zauth.core',
        file: pkg.fesm2015,
        format: 'es'
      }
    ],
    plugins: [
      typescript()
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      {
        name: 'zauth.core',
        file: pkg.umdMin,
        format: 'umd'
      }
    ],
    plugins: [
      typescript(),
      terser()
    ]
  }
];
