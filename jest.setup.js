const dal = require('@zthun/dal');

module.exports = async function setup() {
  console.log();
  console.log('Starting in memory database...');
  await dal.ZDatabaseMemory.start();
  console.log('In memory database started.');
};
