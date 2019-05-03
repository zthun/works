import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

function output(file, format) {
  return {
    name: 'zauth.core',
    file: file,
    format: format
  };
}

export default [
  {
    input: 'src/index.ts',
    output: [
      output(pkg.umd, 'umd'),
      output(pkg.fesm5, 'cjs'),
      output(pkg.fesm2015, 'es')
    ],
    plugins: [
      typescript()
    ]
  },
  {
    input: 'src/index.ts',
    output: [
      output(pkg.umdMin, 'umd')
    ],
    plugins: [
      typescript(),
      terser()
    ]
  }
];
