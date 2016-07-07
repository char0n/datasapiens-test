var config = require('./webpack.config');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');
var distPath = 'dist';
var srcPath = path.join(__dirname, 'app');
var outputPath = path.join(__dirname, distPath);

config['output']['path'] = outputPath;
config['output']['publicPath'] = '/' + distPath + '/';
config['plugins'].unshift(
  new CleanWebpackPlugin([distPath]),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: true,
    comments: false
  }),
  new CopyWebpackPlugin([
    {
      from: srcPath + '/index.html'
    },
    {
      from: srcPath + '/robots.txt'
    },
    {
      from: srcPath + '/favicon.png'
    },
    {
      from: srcPath + '/images',
      to: 'images/'
    }
  ])
);
delete config.module.preLoaders;

module.exports = config;
