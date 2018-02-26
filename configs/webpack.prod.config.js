'use strict'
const webpack = require('webpack')
const config = require('./webpack.base.config')
const WebpackShellPlugin = require('webpack-shell-plugin')
const project = require('./project')
const CleanWebpackPlugin = require('clean-webpack-plugin')

let publicPath = project.cdnPath
let buildShell = 'cd configs/sh && sh pro.sh'




config.output.publicPath = publicPath
config.output.path = project.path.dist + '/'

config.plugins = (config.plugins || []).concat([
  new CleanWebpackPlugin([project.path.dist], {root: '/'}),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"',
      API_DOMAIN: project.apiDomain['production']
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new WebpackShellPlugin({
    onBuildStart: ['echo "---------------线上发布开始打包---------------"'],
    onBuildExit: [buildShell]
  }),
])
module.exports = config
