'use strict'
const webpack = require('webpack')
const config = require('./webpack.base.config')
const project = require('./project')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')


let publicPath = project.testCdnPath
let testShell = 'cd configs/sh && sh daily.sh'

config.output.publicPath = publicPath
config.output.path = project.path.test + '/'

config.plugins = (config.plugins || []).concat([
  new CleanWebpackPlugin([project.path.test], {root: '/'}),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"testing"',
      API_DOMAIN: project.apiDomain['testing']
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new WebpackShellPlugin({
    onBuildStart: ['echo "---------------测试环境开始打包---------------"'],
    onBuildExit: [testShell]
  })
])

module.exports = config
