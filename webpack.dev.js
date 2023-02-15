const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: DIST_PATH,
    watchFiles: [ './src/*' ]
  }
});