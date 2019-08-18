module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json'
    }
  },
  rootDir: 'packages',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/zauth.core/dist',
    '<rootDir>/zauth.angular/dist',
    '<rootDir>/zauth.vue/dist',
    '<rootDir>/zauth.react/dist'
  ],
  moduleNameMapper: {
    '@zthun/auth.core': '<rootDir>/zauth.core/src/index',
    '@zthun/auth.angular': '<rootDir>/zauth.angular/src/index',
    '@zthun/auth.vue': '<rootDir>/zauth.vue/src/index',
    '@zthun/auth.react': '<rootDir>/zauth.react/src/index'
  },
  coverageDirectory: '../reports/coverage'
};
