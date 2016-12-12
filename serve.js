var express = require('express')
var pathResolve = require('path').resolve
var app = express()
var createWebpackMiddleware = require('webpack-dev-middleware')
var createWebpackHotMiddleware = require('webpack-hot-middleware')
var webpack = require('webpack')
var config = require('./webpack.config')

var compiler = webpack(config)

app.use(
  createWebpackMiddleware(compiler, {
    quiet: true,
    noInfo: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    publicPath: '/build/'
  })
)

app.use(createWebpackHotMiddleware(compiler))

app.get('*', function html(req, resp, next) {
  resp.sendFile(pathResolve(__dirname, './index.html'))
})

app.listen(1337, () => console.log('Server running on ', 1337))
