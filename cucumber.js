module.exports = {
  default: {
    requireModule: ['ts-node/register', 'tsconfig-paths/register', 'jsdom-global/register'],
    require: ['packages/**/features/**/*.ts'],
    paths: ['packages/**/features/**/*.feature']
  }
};
