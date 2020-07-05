const { createProxyMiddleware } = require('http-proxy-middleware')
const Bundler = require('parcel-bundler')
const express = require('express')
let port = Number(process.env.PORT || 8080);

const bundler = new Bundler('frontend/index.html', {
  cache: false
})

const app = express()

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:6789'
  })
)

app.use(bundler.middleware())

app.listen(port);

let url = 'http://localhost:' + port;

if (process.platform == 'wind32') {
  cmd = 'start';
} else if (process.platform == 'linux') {
  cmd = 'xdg-open';
} else if (process.platform == 'darwin') {
  cmd = 'open';
}

require('child_process').exec(`${cmd} "${url}"`);