'use strict'
const webpack = require('webpack')
const config = require('./webpack.base.config')
const WebpackShellPlugin = require('webpack-shell-plugin')
const project = require('./project')
const StatsPlugin = require('stats-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

let publicPath = project.preCdnPath
//let buildShell = 'cd configs/sh && sh onePackage.sh ' + project.projectName + ' dist'
let buildShell = 'cd configs/sh && sh pre.sh'



config.output.publicPath = publicPath
config.output.path = project.path.dist + '/'

config.plugins = (config.plugins || []).concat([
  new CleanWebpackPlugin([project.path.dist], {root: '/'}),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"preprod"',
      API_DOMAIN: project.apiDomain['preprod']
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new WebpackShellPlugin({
    onBuildStart: ['echo "---------------预发布环境开始打包---------------"'],
    onBuildExit: [buildShell]
  }),
  new StatsPlugin('stats.json', {
    chunkModules: true,
    chunks: true,
    assets: true, //html,css这些
    modules: true,
    children: true,
    chunksSort: true, //排序这两个都要加上
    assetsSort: true
  })
])
module.exports = config
