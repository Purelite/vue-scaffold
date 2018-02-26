'use strict'
const path = require('path')
const webpack = require('webpack')
const project = require('./project')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const px2rem = require('postcss-px2rem')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')

module.exports = {
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
          loader: `url-loader?limit=10&name=${project.projectName}/img/[name]-[hash:8].[ext]`
        }]
      }
    ]
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    new webpack.BannerPlugin({
      banner:`created ${new Date().toLocaleString()}`,
      exclude: `${project.projectName}/js/vendor`
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: `${project.projectName}/js/vendor`,
      minChunks: Infinity,
      filename: `[name].[chunkhash:8].js`
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: `${project.projectName}/js/manifest`,
      minChunks: Infinity
    }),
    new HtmlwebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      filename: 'pages/index.html',
      minify: {
        removeComments: false,
        minifyJS: true,
        minifyCSS: true,
        collapseWhitespace: true
      },
      chunks: 'index.js',
      chunksSortMode: 'dependency',
      inject: 'body'
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: 'manifest'
    }),
    new ExtractTextPlugin({
      filename: `${project.projectName}/css/app.css`,
      allChunks: false
    }),
  ]
}
