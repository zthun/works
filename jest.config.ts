import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
  coverageDirectory: '../reports/coverage',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  reporters: ['default', ['jest-junit', { outputDirectory: 'reports/results' }]],
  rootDir: compilerOptions.baseUrl,
  testEnvironment: 'jsdom',
  testRegex: '.spec.(ts|tsx)$',
  testTimeout: 60000,
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' }
};
