const dal = require('@zthun/dal');

module.exports = async function teardown() {
  await dal.ZDatabaseMemory.kill();
};
