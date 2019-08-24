const common = require('./webpack.common.config');

const config = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  optimization: {
    usedExports: true
  },
  devServer: {
    contentBase: common.output.path,
    compress: false,
    port: 4200
  }
}

module.exports = Object.assign({}, common, config);
