const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    path.join(__dirname, '..', 'app', 'main.js'),
  ],
  output: {
    path: path.join(__dirname, '..', 'dist'),
    filename: 'public/[name]-[hash].min.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '..', 'app', 'index.tpl.html'),
      inject: 'body',
      filename: 'index.html',
    }),
    new ExtractTextPlugin('public/[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0', 'react'],
      },
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(['css', 'sass!postcss']),
    }],
  },
  postcss: [
    autoprefixer,
  ],
};
