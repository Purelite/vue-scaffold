'use strict'
const path = require('path')
const webpack = require('webpack')
const project = require('./project')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-px2rem')
var config =  {
  entry: {
    [`${project.projectName}/js/vendor`]: ['es6-promise/auto','vue', 'vuex', 'vue-router', 'vue-resource'],
    [`${project.projectName}/js/index`]: path.resolve(project.path.src, './index.js')
  },
  output: {
    path: project.path.dist,
    publicPath: '/',
    filename: project.namePattern.js,
    chunkFilename: project.projectName + '/js/' + project.namePattern.js
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loaders: [{
          loader: 'vue-loader',
          options: {
            postcss: [autoprefixer({browsers: ['> 1%', 'ie >= 9', 'iOS >= 6', 'Android >= 2.1']}), px2rem({remUnit: 75})]
          }
        }]
      },
      {
        test: /\.(scss|sass)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader'})
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|svg)(\?t=\d+)?$/,
        loaders: [{
          loader: `url-loader?limit=10&name=${project.projectName}/img/[name]-[hash].[ext]`
        }]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin(`created ${new Date().toLocaleString()}`),
    new webpack.optimize.CommonsChunkPlugin({
      name: `${project.projectName}/js/vendor`,
      filename: `${project.projectName}/js/vendor.[hash:8].js`,
    }),
    new HtmlwebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'index.html',
      chunks: 'index.js',
      chunksSortMode: 'dependency',
      inject: 'body'
    }),
    new ExtractTextPlugin(project.projectName + '/css/app.css')
  ]
}

config.devtool = 'source-map'
config.devServer = {
    port: project.devPort,
    host: project.devHost,
    https: false,
    hot: true,
    disableHostCheck: true,
    compress: true,
}
config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"',
            API_DOMAIN: project.apiDomain['development']
        }
    }),
    new webpack.HotModuleReplacementPlugin()
])

module.exports = config
