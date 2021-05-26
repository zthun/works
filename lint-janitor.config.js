module.exports = {
  esFiles: ['*.js', '*.ts', 'packages/**/*.js', 'packages/**/src/**/*.ts', 'packages/**/src/**/*.tsx'],
  styleFiles: ['packages/**/src/**/*.less', 'packages/**/less/**/*.less'],
  htmlFiles: ['packages/**/src/**/*.html'],
  markdownFiles: ['*.md', 'packages/**/*.md'],
  markdownFilesExclude: ['**/CHANGELOG.md'],
  jsonFiles: ['*.json', 'packages/**/*.json'],
  yamlFiles: ['*.yaml', '*.yml', 'packages/**/*.yaml', 'packages/**/*.yml'],
  yamlFilesExclude: ['packages/works.k8s/templates/**']
};
