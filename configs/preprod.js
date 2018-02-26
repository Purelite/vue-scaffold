'use strict'
/* eslint-disable no-console */
const webpack = require('webpack')
const webpackConfig = require('./webpack.preprod.config')

webpack(webpackConfig, function(){
  console.log('------------------预发环境打包完毕--------------------')
})
