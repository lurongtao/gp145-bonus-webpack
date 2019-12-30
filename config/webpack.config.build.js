const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack.config.common.js')
const merge = require('webpack-merge')

const buildConfig = {
  mode: 'production',

  output: {
    filename: 'scripts/[name]-[hash:6].js'
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name]-[hash:6].css'
    }),
  ]
}

module.exports = merge(commonConfig, buildConfig)