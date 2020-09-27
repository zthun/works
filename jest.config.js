const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  rootDir: compilerOptions.baseUrl,
  testTimeout: 60000,
  testRegex: '.spec.(ts|tsx)$',
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  testEnvironmentOptions: { resources: 'usable' },
  coverageDirectory: '../reports/coverage',
  setupFiles: ['jest-canvas-mock']
};
