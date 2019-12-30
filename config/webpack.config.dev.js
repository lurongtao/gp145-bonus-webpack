const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack.config.common.js')
const merge = require('webpack-merge')

const devConfig = {
  mode: 'development',

  output: {
    filename: 'scripts/[name].js'
  },


  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
    }),
  ],

  devServer: {
    contentBase: '../dist',
    host: 'localhost',
    port: 3333
  }
}

module.exports = merge(commonConfig, devConfig)