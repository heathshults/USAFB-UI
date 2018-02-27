const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebPackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, './dist/')
  },
  module: {
    rules: [{
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      },

      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.json$/,
        use: [
          'json-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new CleanWebPackPlugin(['dist']),
    new HtmlWebPackPlugin({
      template: './src/index-wp.html',
      filename: './index-wp.html'
    }),
    new ExtractTextPlugin({
      filename: 'css/bs-theme.css'
    })
  ],
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css', 'html']
  },
  devtool: 'source-map',
  devServer: {
    publicPath: path.join('/src/'),
    compress: true,
    port: 9000
  }
}
