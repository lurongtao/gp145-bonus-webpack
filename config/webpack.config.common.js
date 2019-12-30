const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const loaderUse = (firstLoader) => {
  return [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: path.resolve(__dirname, '../dist/styles/'),
        hmr: process.env.NODE_ENV === 'development'
      },
    },
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: (loader) => [
          require('postcss-import')({ root: loader.resourcePath }),
          require('postcss-preset-env')(),
          require('cssnano')(),
          require('autoprefixer')
        ]
      }
    },
    firstLoader,
  ]
}

module.exports = {
  devtool: 'source-map',

  entry: {
    lodash: path.resolve(__dirname, '../src/lodash.js'),
    app: path.resolve(__dirname, '../src/app.js')
  },

  output: {
    path: path.resolve(__dirname, '../dist')
  },

  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/components')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ]
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              [
                '@babel/plugin-proposal-decorators',
                {
                  legacy: true
                }
              ],
              [
                '@babel/plugin-proposal-class-properties',
                {
                  loose: true
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(css|styl)$/,
        use: loaderUse('stylus-loader'),
      },
      {
        test: /\.scss$/,
        use: loaderUse('sass-loader')
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 2048,
              outputPath: '../dist/images'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(), 

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html')
    }),

    new CopyWebpackPlugin([
      {
        context: path.resolve(__dirname, '../public/'),
        from: '**/*',
        to: path.resolve(__dirname, '../dist/'),
        ignore: ['index.html']
      }
    ]),

    new VueLoaderPlugin(),
  ],

  // externals: {
  //   lodash: 'window._'
  // }
}