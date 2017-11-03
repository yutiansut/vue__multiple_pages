var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var glob = require('glob');
var cmdInfo = require('./cmdInfo'); //指令简写集合
var entries = getEntry('./src/module/*/*.js'); // 获得入口js文件
var webpack = require('webpack');
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: Object.assign(entries, {
    //用到什么公共lib（例如vue），就把它加进vendors去，目的是将公用库单独提取打包
    'js/vendors': ['./src/assets/js/lib.js']
  }),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js'
    /*    publicPath: process.env.NODE_ENV === 'production'
     ? config.build.assetsPublicPath
     : config.dev.assetsPublicPath*/
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      "underscore": 'underscore'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      "_": "underscore"
    })
  ],
  module: {
    rules: [
      /*  {
       test: /\.(js|vue)$/,
       loader: 'eslint-loader',
       enforce: "pre",
       include: [resolve('src'), resolve('test')],
       options: {
       formatter: require('eslint-friendly-formatter')
       }
       },*/
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
          name: 'images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
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
  var res=[]; //创建一个存放数组结果集
  var json={};//对象属性标识数组中是否有重复元素
  for(var i = 0, len = arr.length; i < len; i++){
    if (!json[arr[i]]) {
      res.push(arr[i]);
      json[arr[i]]=1;
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


function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;
  var commandDirName = getCommand();//要打包的文件目录
  glob.sync(globPath).forEach(function (entry) {
    var dirName = getDirName(entry);

    basename = path.basename(entry, path.extname(entry));
    if (entry.split('/').length > 4) {
      var fileName;
      var tmp = entry.split('/').splice(-3);
      fileName = tmp.splice(-2, 1) + '/js/' + basename; // 正确输出js和html的路径

      //判断该打包的是哪个文件夹
      if (commandDirName.length > 0) {
        for (var i = 0; i < commandDirName.length; i++) {
          if (dirName == commandDirName[i]) {
            entries[fileName] = ["babel-polyfill", entry];
          }
        }
      } else {
        entries[fileName] = entry;
      }

    } else {
      entries[basename] = entry;
    }
  });
  return entries;
}

//获取文件夹名称
function getDirName(entry) {
  var lastString = '';
  var currentString = '';
  var dirEntryName = '';
  var lastIndex = entry.lastIndexOf('/');
  lastString = entry.slice(0, lastIndex);
  var currentIndex = lastString.lastIndexOf('/');
  dirEntryName = lastString.slice(currentIndex + 1, lastIndex);
  return dirEntryName;
}

//获取参数信息(npm run build --main --my)获取其中的main ，my目录
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
