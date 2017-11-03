require('./check-versions')()

var cmdInfo = require('./cmdInfo'); //指令简写集合

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'production'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
staticPath = '/';
app.use(staticPath, express.static('static'))


var comUrl = getCommand();
var uri;
if (comUrl.length < 1) {
  uri = 'http://localhost:' + port;
} else {
  var tempUrl = comUrl[0];
  uri = 'http://localhost:' + port + `/${tempUrl}/index.html`;
}

//var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})


function getCommand() {
  var allArr = process.env.npm_config_argv;
  allArr = JSON.parse(allArr);
  var tempArr = [];
  var commandArr = [];
  for (var key in allArr) {
    if (key == 'cooked' || key == 'original') {
      tempArr = allArr[key];
    }
  }

  for (var i = 2; i < tempArr.length; i++) {
    commandArr.push(tempArr[i].replace('--', ''));
  }
  for (var key in cmdInfo) {
    if (contains(commandArr, key)) {
      remove(commandArr, key);
      commandArr = commandArr.concat(cmdInfo[key]['cmd']);
      commandArr = unique(commandArr);
      // let arr1 = new Set(commandArr);
      // let arr2 = new Set(cmdInfo[key]);
      // commandDirName =  Array.from(new Set([...new Set(commandDirName),...new Set(cmdInfo[key])]));
    }
  }
  return commandArr;
}

function contains(arr, obj) { //判断数组是否存在某个值
  var i = arr.length;
  while (i--) {
    if (arr[i] === obj) {
      return true;
    }
  }
  return false;
}

function unique(arr) { //数组去重
  var res = []; //创建一个存放数组结果集
  var json = {};//对象属性标识数组中是否有重复元素
  for (var i = 0, len = arr.length; i < len; i++) {
    if (!json[arr[i]]) {
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }
  return res;
}

function remove(arr, val) {
  var index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
}
