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
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?optional[]=runtime',
          options: {
            presets: [
              ['@babel/preset-env', {
                  targets: {
                    // browsers: ['last 2 versions', 'ie >= 10']}}]]}}}]},/*
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1",
                    ie: "10"
                }//,useBuiltIns: "usage"
              }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin()
  ]
};
