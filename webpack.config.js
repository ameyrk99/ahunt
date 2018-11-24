var debug = process.env.NODE_ENV !== "production"
var webpack = require('webpack')
var path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

var DIST_DIR = path.resolve(__dirname, "dist")
var SRC_DIR = path.resolve(__dirname, "src")

module.exports = {
  entry: SRC_DIR + "/js/index.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  output: {
    path: DIST_DIR,
    filename: "bundle.js",
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({ template: SRC_DIR + "/index.html" })
  ]
}