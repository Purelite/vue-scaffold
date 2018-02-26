'use strict'
/* eslint-disable no-console */
const webpack = require('webpack')
const webpackConfig = require('./webpack.prod.config')

webpack(webpackConfig, function(){
  console.log('------------------生产环境打包完毕-----------------')
})
