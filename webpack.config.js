"use strict";

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var webpack = require("webpack");

module.exports = {
  mode: 'development',
  // context: path.resolve(__dirname, 'src'),
  entry: path.resolve(__dirname, './src/index.js'),
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: 'bundle.js',
    publicPath: '/js'
  },
  watch: true,
  devtool: 'source-map',

  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }]
  },
  plugins: [
    new UglifyJsPlugin()
  ]
};
