var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var glob = require('glob');
var cmdInfo = require('./cmdInfo'); //指令简写集合
/*var entries = getEntry('./src/module/!**!/!*.js'); // 获得入口js文件
var chunks = Object.keys(entries);*/
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: path.join(  '[name].js'),
    chunkFilename: path.join('[id].chunk.js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
        // drop_debugger: true,
        // drop_console: true
      },
      sourceMap: false
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename:  (getPath) => {
        return getPath('[name].css').replace('js', 'css');
      }
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin(),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
  /*  new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),*/
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'js/vendors',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return(
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0 && module.resource.indexOf(
            path.join(__dirname, '../node_modules/lib-flexible') //避免把阿里的js打进公共js中，避免与impression插件产生冲突
          ) !== 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
   /* new webpack.optimize.CommonsChunkPlugin({
      name: 'js/vendors',
      chunks: chunks
    })*/
    // copy custom static assets
    /*new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])*/
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig


function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;
  if (typeof (globPath) != "object") {
    globPath = [globPath]
  }
  globPath.forEach((itemPath) => {
    glob.sync(itemPath).forEach(function (entry) {
      basename = path.basename(entry, path.extname(entry));
      if (entry.split('/').length > 4) {
       tmp = entry.split('/').splice(-3);
        pathname = tmp.splice(-2, 1) + '/' + basename; // 正确输出js和html的路径

        entries[pathname] = entry;
      } else {
        entries[basename] = entry;
      }
    });
  });
  return entries;
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

function remove(arr, val) { //移除指定元素的值
  var index = arr.indexOf(val);
  if (index > -1) {
    arr.splice(index, 1);
  }
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
    commandArr.push(tempArr[i].replace('--',''));
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

var commandDirName = getCommand();//要打包的文件目录
var pages;

var page1 = getEntry(['./src/module/*.html']);
var page2 = getEntry(['./src/module/**/*.html']);
var tempPage = {};
for (var pathname in page2) {
  if (commandDirName.length <= 0) {
    tempPage = page2;
  }else {
    commandDirName.forEach((dirname) => {
      var lastString = '';
      var lastIndex = pathname.lastIndexOf('/');
      var currentString = pathname.slice(0,lastIndex);
      if (currentString == dirname) {
        tempPage[pathname] = page2[pathname];
      }
    });
  }
}

pages = Object.assign(page1,tempPage);


for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: pathname+'.html',
    template: pages[pathname],   // 模板路径
    inject: true,           // js插入位置
    minify: {
      removeComments: true,
      collapseWhitespace: false,
      removeAttributeQuotes: true
    },
  };

  var moduleType;
  if (pathname.split('/').length > 1) {
    var tmp = pathname.split('/');
    moduleType = tmp.splice(0,1);
  }
  else
    moduleType = pathname;

  var find = false;
  for(var key in module.exports.entry)
  {
      if(key.indexOf(moduleType)>=0)
      {
         conf.chunks = ['js/vendors', key];
         conf.hash = false;
        find = true;
         break;
      }
  }
/*  if ((newPath in module.exports.entry) && pathname.split('/').length > 1) {
    conf.chunks = ['js/vendors', newPath];
    conf.hash = false;
  }*/
  if(!find)
    conf.chunks = [];
  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}
