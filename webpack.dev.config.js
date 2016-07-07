var config = require('./webpack.config');
var webpack = require('webpack');
var ProgressPlugin = require('webpack/lib/ProgressPlugin');

config['entry']['app'].unshift('webpack-hot-middleware/client?path=/__webpack_hmr&reload=true&timeout=20000')
config['plugins'].unshift(
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
      new ProgressPlugin(function(percentage, msg) {
    if((percentage * 100) % 25 === 0 ){
      console.info((percentage * 100) + '%', msg);
    }
  })
)

module.exports = config;
