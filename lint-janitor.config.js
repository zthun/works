const generated = ['**/CHANGELOG.md', 'packages/**/dist/**', 'packages/**/docs/**', 'node_modules/**', 'packages/**/node_modules/**', 'package-lock.json', '.yarnrc.yml'];
const k8sTemplates = ['packages/works.k8s/templates/**'];
const partialGenerated = ['cspell.json', 'lerna.json'];

const esFiles = ['*.js', '*.ts', 'packages/**/src/**/*.ts', 'packages/**/src/**/*.tsx'];
const htmlFiles = ['packages/**/src/**/*.html'];
const markdownFiles = ['*.md', 'packages/**/*.md'];
const jsonFiles = ['*.json', 'packages/**/*.json'];
const yamlFiles = ['*.yaml', '*.yml', 'packages/**/*.yaml', 'packages/**/*.yml'];
const prettyFiles = [].concat(esFiles).concat(htmlFiles).concat(markdownFiles).concat(jsonFiles).concat(yamlFiles);
const spellingFiles = [].concat(esFiles).concat(htmlFiles).concat(markdownFiles).concat(jsonFiles).concat(yamlFiles);

const esFilesExclude = generated;
const htmlFilesExclude = generated;
const markdownFilesExclude = generated;
const jsonFilesExclude = generated;
const yamlFilesExclude = generated.concat(k8sTemplates);
const prettyFilesExclude = generated.concat(k8sTemplates).concat(partialGenerated);
const spellingFilesExclude = generated.concat(k8sTemplates).concat(partialGenerated);

module.exports = {
  esFiles,
  esFilesExclude,
  htmlFiles,
  htmlFilesExclude,
  markdownFiles,
  markdownFilesExclude,
  jsonFiles,
  jsonFilesExclude,
  yamlFiles,
  yamlFilesExclude,
  prettyFiles,
  prettyFilesExclude,
  spellingFiles,
  spellingFilesExclude
};
