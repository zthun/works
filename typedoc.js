module.exports = {
  out: 'docs/typedoc',
  json: 'docs/typedoc.json',
  mode: 'file',
  exclude: ['src/index.ts'],
  excludePrivate: true,
  excludeNotExported: true,
  tsconfig: 'tsconfig.esm.json'
};
