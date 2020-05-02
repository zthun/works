const dal = require('@zthun/dal');

module.exports = async function teardown() {
  console.log('Stopping in memory database.');
  await dal.ZDatabaseMemory.kill();
  console.log('In memory database stopped.');
};
