var webpack = require('webpack')
var pathResolve = require('path').resolve

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    filename: 'app.js',
    path: pathResolve(process.cwd(), 'build'),
    publicPath: '/build/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
