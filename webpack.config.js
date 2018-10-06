var debug = process.env.NODE_ENV !== "production"
var webpack = require('webpack')
var path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/js/index.js',
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
    path: __dirname + "/src/dist",
    filename: "project_bundle.js",
    publicPath: '/'
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({ template: "./src/index.html" })
  ]
}