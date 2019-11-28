const dal = require('@zthun/dal');

module.exports = async function setup() {
  await dal.ZDatabaseMemory.start();
};
