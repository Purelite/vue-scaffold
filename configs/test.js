'use strict'
/* eslint-disable no-console */
const webpack = require('webpack')
const webpackConfig = require('./webpack.test.config')

webpack(webpackConfig, function(){
  console.log('------------------测试环境打包完毕-----------------')
})
