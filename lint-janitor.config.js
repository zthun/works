module.exports = {
  esConfig: '.eslintrc',
  esFiles: ['jest.config.js', 'lint-janitor.config.js', 'packages/works.client/webpack.config.js', 'packages/**/src/**/*.ts', 'packages/**/src/**/*.tsx'],
  styleFiles: ['packages/**/src/**/*.less'],
  htmlFiles: ['packages/**/src/**/*.html'],
  markdownFiles: ['*.md', 'packages/**/*.md'],
  jsonFiles: ['*.json', 'packages/**/*.json'],
  yamlFiles: ['./docker-compose.yml', '.travis.yml']
};
