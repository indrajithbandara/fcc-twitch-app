'use strict';

const path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  entry: {
    vendor: ['xstream', 'snabbdom-jsx', '@cycle/run', 'cycle-onionify', '@cycle/dom', '@cycle/http', 'cycle-restart'],
    main:[
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server', // For hot style updates
    './src/index.js'
  ]},
  output: {
    path: path.resolve(__dirname, './public/assets'),
    publicPath: '/public',                          // New
    filename: "[name].bundle.js",
  },
  devServer: {
    host: 'localhost',
    port: 4000,
    open: true,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    contentBase: path.resolve(__dirname, './src'),  // New
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader'
        }],
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?sourceMap'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      }, {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream"
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader"
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/i,
        exclude: [/node_modules/],
        use: [{
          loader: 'file-loader',
          options: {name: '[name].[ext]', outputPath: path.resolve(__dirname, './public/images')}
        }]
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity
    })
  ],
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules']
  },
};
