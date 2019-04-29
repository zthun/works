import pkg from './package.json';
import typescript from 'rollup-plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: {
      name: 'zauth.core',
      file: pkg.browser,
      format: 'umd'
    },
    plugins: [
      typescript()
    ]
  }
];
