module.exports = {
  esConfig: '.eslintrc',
  esFiles: ['jest.config.js', 'lint-janitor.config.js', 'packages/works.client/webpack.config.js', 'packages/**/src/**/*.ts', 'packages/**/src/**/*.tsx'],
  styleConfig: '.stylelintrc',
  styleFiles: ['packages/**/src/**/*.less', 'packages/**/less/**/*.less'],
  htmlFiles: ['packages/**/src/**/*.html'],
  markdownFiles: ['*.md', 'packages/**/*.md'],
  jsonFiles: ['*.json', 'packages/**/*.json'],
  yamlFiles: ['./docker-compose.yml', '.travis.yml']
};
