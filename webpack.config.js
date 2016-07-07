var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var entryPath = path.join(__dirname, 'app/src');
var outputPath = path.join(__dirname, 'public');
var webpack = require('webpack');
var ejsBuilder = require('ejs-webpack-builder');
var packageJson = require('./package.json');

module.exports = {
  progress: true,
  devTool: 'source-map',
  entry: {
    app: [
      entryPath + '/app.module.js'
    ]
  },
  output: {
    filename: 'app-' + packageJson.version + '.js',
    path: outputPath,
    publicPath: '/'
  },
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      include: entryPath,
      exclude: [nodeModulesPath]
    }],
    loaders: [
      {
        test: /\.js?$/,
        include: entryPath,
        loader: 'ng-annotate!babel?compact=false',
        exclude: [nodeModulesPath]
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-html?version=' + packageJson.version
      },
      {
        test: /\.(gif|jpg|png|svg)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: '"' + process.env.NODE_ENV + '"'
    }),
    new ejsBuilder({
      files: [{
        source: {
          name: 'index.ejs',
          dir: './app/'
        },
        parameters: {
          version: packageJson.version
        }
      }]
    }),
    new ExtractTextPlugin('styles-' + packageJson.version + '.css')
  ],
  resolve: {
    // Allow to omit extensions when requiring these files
    extensions: ['', '.js']
  }
};
