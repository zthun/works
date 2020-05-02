module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json'
    }
  },
  rootDir: '.',
  testTimeout: 60000,
  testRegex: '.spec.(tsx|ts)$',
  transform: {
    '^.+\\.(tsx|ts)$': 'ts-jest'
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '@zthun/auth.core': '<rootDir>/../zauth.core/src/index'
  },
  coverageDirectory: './reports/coverage'
};
