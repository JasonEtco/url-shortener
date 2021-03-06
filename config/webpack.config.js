const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '..', 'app', 'main.js'),
  ],
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].js',
    publicPath: '/public/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'app', 'index.tpl.html'),
      inject: 'body',
      filename: 'index.html',
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: [
          'react',
          'es2015',
          'stage-0',
          'react-hmre',
        ],
      },
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap'],
    }],
  },
};
