module.exports = {
  esConfig: '.eslintrc',
  esFiles: ['jest.config.js', 'lint-janitor.config.js', 'packages/works.client/webpack.config.js', 'packages/**/src/**/*.ts', 'packages/**/src/**/*.tsx'],
  styleFiles: ['packages/**/*.less'],
  htmlFiles: ['packages/**/*.html'],
  markdownFiles: ['*.md'],
  jsonFiles: ['*.json', 'packages/**/*.json'],
  yamlFiles: ['./*.yml']
};
