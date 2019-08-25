module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json'
    }
  },
  rootDir: 'packages',
  testRegex: '.spec.(tsx|ts)$',
  transform: {
    '^.+\\.(tsx|ts)$': 'ts-jest'
  },
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx'
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/zauth.core/dist',
    '<rootDir>/zauth.react/dist'
  ],
  moduleNameMapper: {
    '@zthun/auth.core': '<rootDir>/zauth.core/src/index',
    '@zthun/auth.react': '<rootDir>/zauth.react/src/index'
  },
  setupFilesAfterEnv: [
    '<rootDir>/../jest.setup.ts'
  ],
  coverageDirectory: '../reports/coverage'
};
