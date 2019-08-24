const common = require('./webpack.common.config');

const config = {
  mode: 'production'
}

module.exports = Object.assign({}, common, config);
