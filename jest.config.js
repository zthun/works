module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json'
    }
  },
  rootDir: 'packages',
  testTimeout: 60000,
  testRegex: '.spec.(ts|tsx)$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '@zthun/auth.core': '<rootDir>/zauth.core/src/index'
  },
  globalSetup: '../jest.setup.js',
  globalTeardown: '../jest.teardown.js',
  coverageDirectory: '../reports/coverage'
};
