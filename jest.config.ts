import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  rootDir: compilerOptions.baseUrl,
  testTimeout: 60000,
  testRegex: '.spec.(ts|tsx)$',
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  coverageDirectory: '../reports/coverage'
};
