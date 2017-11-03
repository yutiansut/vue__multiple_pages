if (!pbE.isPoboApp) {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtGetHQInfo: function () {},
                wtQueryMoney: function () {
                  var data = {
                        moduleId: 90002,
                        functionNO: 6012,
                        jData: {
                            data: [
                                {
                                    '97': '8888',
                                    '152': '8888',
                                    '56': '0',
                                    '93': '8888',
                                    '345': '88.88%'
                                }
                            ]
                        }
                    };
                    callback(JSON.stringify(data));
                    $("#float").html('+88,888.88元')
                },
                wtQueryStock:function() {
                   var data = {
                     moduleId: 90002,
                     functionNO: 6014,
                     jData: {
                       data: [{'136': '888.88', 'price': '888', 'profit': '888', '64': '鸡蛋8881', 'available': '888', '125': '1', '112':          '0', 'remain': '88'},
                              {'136': '888.88', 'price': '888', 'profit': '-888', '64': '鸡蛋8882', 'available': '888', '125': '0', '112': '0', 'remain': '88'},
                              {'136': '888.88', 'price': '888', 'profit': '888', '64': '鸡蛋8883', 'available': '888', '125': '0', '112': '1', 'remain': '88', '152': '8888'}
                       ]
                     }
                   };
                   //callback(JSON.stringify(data));
                  ReactDOM.render(React.createElement(PositionContentsOptions, { contents: data.jData.data }), document.getElementById('contents'));
                 },
                wtGetMSSL: function () {},
                wtQueryEntrust: function () {}
            };
            return obj;
        },
        SYS: function () {
            var obj1 = {
                startLoading: function () {},
                stopLoading: function () {}
            };
            return obj1;
        },
        HQ:function () {
          var obj2 = {
            hqGetPriceRate: function () {},
            hqGetLastBasePrice: function () {},
            hqSubscribe: function () {},
            hqGetDueDate: function () {},
            hqGetGroupFlag: function () {},
            hqGetPriceDecimal: function () {},
            hqGetNowPrice: function () {}
          }
          return obj2;
        }
    }
}

function queryMoneyPart(msg) {
  pbE.SYS().stopLoading();
  var asset = msg.jData.data[0];
  var unit;
  if (asset['56']) {
    unit = pbUtils.getUnit(asset['56']);
  } else {
    unit = '元';
  }
  if (asset['346'] && !isNaN(asset['346'])) {//占用保证金
    $('#taken').html(pbUtils.comma(asset['346'], 2) + unit);
  }
    if (asset['152'] && !isNaN(asset['152'])) {//持仓保证金/已用保证金
        $('#position').html(pbUtils.comma(asset['152'], 2) + unit);
    }
    if(asset['111']){//可用保证金/可用资金（实时）
        $('#usableMargin').text(pbUtils.comma(asset['111'], 2) + unit)
    }
  if (asset['97'] && !isNaN(asset['97'])) {
    $('#asset').html(pbUtils.comma(asset['97'], 2) + unit);
  }
  if (asset['93'] && !isNaN(asset['93'])) {
    $('#available').html(pbUtils.comma(asset['93'], 2) + unit);
  }
  if (asset['345']) {
    if(asset['345'].indexOf('%') >= 0){
      $('#risk').html(asset['345']);
      if(asset['361'])
        $('#dd-risk').html((10000/(asset['361'].replace('%','') -0)).toFixed(2) + '%');
    } else {
      if(asset['345'] - 0 > 1)
          $('#risk').html(100/(asset['345']-0)+ '%');
        else
           $('#risk').html(asset['345']+ '%');
    }
  } else {
    $('#risk').html('--');
    $('#dd-risk').html('--');
  }
}

function tradePart(msg) {
  pbE.SYS().stopLoading();
  position = msg.jData.data;
  if (position.length > 0) {
    var marketData = [],
        unique = [],
        marketInfo = [],
        flag = 0;
    symbolData = {};
    for (var i = 0, m = position.length; i < m; i++) {
      if (position[i]['137'] == '-99999999') {
        flag = 1; //需要发委托请求
        break;
      }
    }

    for (i = 0; i < m; i++) {
      position[i]['flag'] = 0;
      var market = position[i]['54'],
          code = position[i]['63'];
      var symbol = 0;
      marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(code, market)); //交易信息转换行情信息
      if (code.indexOf('&') >= 0) symbol = 1;
      if (!marketInfo.HQCode || !marketInfo.HQMarket || isNaN(position[i]['136']) || symbol) {
        position[i]['flag'] = 1;
      }
      var rate = pbE.HQ().hqGetPriceRate(marketInfo.HQCode, marketInfo.HQMarket),
          //获取行情商品价格倍数
      handNum = pbE.WT().wtGetMSSL(code, market); //获取交易每手数量
      var dueDay = pbE.HQ().hqGetDueDate(marketInfo.HQCode, marketInfo.HQMarket);
      position[i]['date'] = dueDay;  //到期日
      if (!dueDay) {
        position[i]['remain'] = '--';
      } else {
        var dateToday = new Date();
        var strToday = pbUtils.dateFormat(dateToday, 'yyyy-MM-dd');
        position[i]['remain'] = pbUtils.countTimeLength('D', strToday, dueDay);  //剩余天数
      }
      if (unique.indexOf(marketInfo.HQCode) < 0) {
        //存入去重数组
        unique.push(marketInfo.HQCode);
        //存入市场合约代码集合
        marketData.push({
          '2': marketInfo.HQMarket,
          '3': marketInfo.HQCode
        });
      }
      position[i]['rate'] = rate;
      position[i]['handNum'] = handNum;
      position[i]['market'] = marketInfo.HQMarket;
      position[i]['code'] = marketInfo.HQCode;
      position[i]['groupflag'] = pbE.HQ().hqGetGroupFlag(marketInfo.HQCode, marketInfo.HQMarket);
      var decimal = pbE.HQ().hqGetPriceDecimal(marketInfo.HQCode, marketInfo.HQMarket);
      position[i]['decimal'] = decimal;
      if (position[i]['137'] == '-99999999') {
        position[i]['available'] = '--';
      } else {
        position[i]['available'] = position[i]['137'];
      }

      if (!position[i]['flag']) {
        var price = pbE.HQ().hqGetNowPrice(marketInfo.HQCode, marketInfo.HQMarket);
        var base = pbE.HQ().hqGetLastBasePrice(marketInfo.HQCode, marketInfo.HQMarket);
        var pl = 0;
        //计算每条合约的盈亏
        if (price && !isNaN(price)) {
          pl = ((price - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * handNum;
          if (position[i]['112'] == '1') {
            pl = 0 - pl;
          }
          position[i]['dayPl'] = pl;
          position[i]['profit'] = (pl - 0).toFixed(2);
          position[i]['price'] = pbUtils.decimalDecPrice(decimal, price);
        } else if (base && !isNaN(base)) {
          //接口没有拿到现价，有基准价就用基准价计算盈亏，现价显示'--'
          pl = ((base - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * handNum;
          if (position[i]['112'] == '1') {
            pl = 0 - pl;
          }
          position[i]['dayPl'] = pl;
          position[i]['profit'] = (pl - 0).toFixed(2);
          position[i]['price'] = pbUtils.decimalDecPrice(position[i]['decimal'], base);//'--';
        } else {
          position[i]['dayPl'] = 0;
          position[i]['profit'] = '--';
          position[i]['price'] = '--';
        }
      } else if (position[i]['flag']) {
        position[i]['profit'] = '--';
        position[i]['dayPl'] = 0;
        position[i]['price'] = '--';
      }
      position[i]['136'] = pbUtils.decimalDec(decimal, position[i]['136'] + '');
    }
    $('#contents').empty();
    position.sort(
                firstBy(function (v) { return v[63].toUpperCase(); })
                    .thenBy("112")
            );
    ReactDOM.render(React.createElement(PositionContentsOptions, { contents: position }), document.getElementById('contents'));

    var totalPL = 0;
    for (i = 0; i < m; i++) {
      if (typeof position[i]['dayPl'] == 'undefined' || isNaN(position[i]['dayPl'])) {
        continue;
      } else {
        totalPL = totalPL + (position[i]['dayPl'] - 0);
      }
    }
    if (totalPL > 0) {
      $('#float').removeClass();
      $('#float').addClass('a3');
      $('#float').html('+' + pbUtils.comma(totalPL, 2) + '元');
    } else if (totalPL < 0) {
      $('#float').removeClass();
      $('#float').addClass('a4');
      $('#float').html(pbUtils.comma(totalPL, 2) + '元');
    } else {
      $('#float').removeClass();
      $('#float').addClass('a1 bolder');
      $('#float').html('0' + '元');
    }
    symbolData['1'] = marketData;
    /*symbolData['5'] = column;*/
    //symbolData['7'] = '1';
    pbE.SYS().startLoading();
    pbE.HQ().hqSubscribe(0, JSON.stringify(symbolData));
  } else if (position.length <= 0) {
    pbE.SYS().stopLoading();
    $('#contents').empty();
    $('#float').removeClass();
    $('#float').addClass('a1 bolder');
    $('#float').html('0' + '元');
  }
  if (flag) {
    pbE.SYS().startLoading();
    pbE.WT().wtQueryEntrust(CID, JSON.stringify({}));
  }
}

function hqPart(msg) {
  var data = msg.jData.Data,
      lastPrice = 0,
      pl = 0,
      base = 0;
  for (var i = 0, l = position.length; i < l; i++) {
    if (!position[i]['flag']) {
      for (var j = 0, ll = data.length; j < ll; j++) {
        if (position[i]['code'] == data[j]['10']) {
          base = pbE.HQ().hqGetLastBasePrice(position[i]['code'], position[i]['market']);
          if (data[j]['29'] && !isNaN(data[j]['29'])) {
            lastPrice = (data[j]['29'] - 0) / position[i]['rate']; //获取现价/最新价
            pl = ((lastPrice - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * position[i]['handNum'];
            if (position[i]['112'] == '1') {
              pl = 0 - pl;
            }
            lastPrice = pbUtils.decimalDecPrice(position[i]['decimal'], lastPrice);
            position[i]['profit'] = (pl - 0).toFixed(2);
            position[i]['price'] = lastPrice;
            position[i]['dayPl'] = pl;
          } else if (base && !isNaN(base)) {
            pl = ((base - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * position[i]['handNum'];
            if (position[i]['112'] == '1') {
              pl = 0 - pl;
            }
            position[i]['profit'] = (pl - 0).toFixed(2);
            position[i]['price'] = pbUtils.decimalDecPrice(position[i]['decimal'], base);//'--';
            position[i]['dayPl'] = pl;
          } else {
            position[i]['profit'] = '--';
            position[i]['price'] = '--';
            position[i]['dayPl'] = 0;
          }
          hqFresh(position[i]);
          break;
        }
      }
    } else if (position[i]['flag']) {
      position[i]['profit'] = '--';
      position[i]['price'] = '--';
      position[i]['dayPl'] = 0;
    }
  }
  //ReactDOM.render(React.createElement(PositionContentsOptions, { contents: position }), document.getElementById('contents'));

  var complete = false, totalPL = 0;
  for (var i = 0, l = position.length; i < l; i++) {
    if (typeof position[i]['dayPl'] == 'undefined' || isNaN(position[i]['dayPl'])) {
      if (position[i]['flag']) {
        continue;
      } else {
        complete = false;
        break;
      }
    } else {
      totalPL = totalPL + (position[i]['dayPl'] - 0);
      complete = true;
    }
  }

  if (complete) {
    p++;
    if (totalPL > 0) {
      $('#float').removeClass();
      $('#float').addClass('a3');
      $('#float').html('+' + pbUtils.comma(totalPL, 2) + '元');
    } else if (totalPL < 0) {
      $('#float').removeClass();
      $('#float').addClass('a4');
      $('#float').html(pbUtils.comma(totalPL, 2) + '元');
    } else {
      $('#float').removeClass();
      $('#float').addClass('a1 bolder');
      $('#float').html('0' + '元');
    }
    if (p == 1) pbE.SYS().stopLoading();
    ReactDOM.render(React.createElement(PositionContentsOptions, { contents: position }), document.getElementById('contents'));
  }
}

function entrustPart(msg) {
  pbE.SYS().stopLoading();
  var entrust = msg.jData.data;
  var froze = 0;
  for (var i = 0, l = position.length; i < l; i++) {
    if (position[i]['137'] == '-99999999') {
      froze = 0;
      for (var j = 0, m = entrust.length; j < m; j++) {
        if (position[i]['54'] == entrust[j]['54'] && position[i]['63'] == entrust[j]['63']) {
          if (entrust[j]['117'] == '1' && (entrust[j]['156'] == '0' || entrust[j]['156'] == '1' || entrust[j]['156'] == '2') && (entrust[j]['112'] == '0' && position[i]['112'] == '1' || entrust[j]['112'] == '1' && position[i]['112'] == '0')) {
            froze += (entrust[j]['130'] - entrust[j]['113']);
          }
        }
      }
      position[i]['available'] = position[i]['135'] - froze;
      wtFresh(position[i]);
    }
  }
}

function hqFresh (position) {//行情推送时只刷新最新价和持仓，不重画整个页面的持仓显示
  var id = '#' + position['63'] + '_' + position['112'];
  if (isNaN(position['profit'])) {
    $(id + ' .imageBar').empty();
    $(id + ' .profit').removeClass('a3').removeClass('a4').addClass('a1');
    $(id + ' .profit').html(position['profit']);
  } else {
    if (position['profit'] > 0) {
      $(id + ' .imageBar').empty();
      if (position['125'] == '1' || (position['125'] == '0' && position['112'] == '0')) {
        $(id + ' .imageBar').append('<img src="../../images/redBar.png" alt="盈利条">');
      } else if (position['125'] == '0' && position['112'] == '1') {
        $(id + ' .imageBar').append('<img src="../../images/redBar.png" alt="盈利条" height="100" width="2">');
      }
      $(id + ' .profit').removeClass('a1').removeClass('a4').addClass('a3');
      $(id + ' .profit').html('+' + position['profit']);
    } else if (position['profit'] < 0) {
      $(id + ' .imageBar').empty();
      if (position['125'] == '1' || (position['125'] == '0' && position['112'] == '0')) {
        $(id + ' .imageBar').append('<img src="../../images/greenBar.png" alt="盈利条">');
      } else if (position['125'] == '0' && position['112'] == '1') {
        $(id + ' .imageBar').append('<img src="../../images/greenBar.png" alt="盈利条" height="100" width="2">');
      }
      $(id + ' .profit').removeClass('a1').removeClass('a3').addClass('a4');
      $(id + ' .profit').html(position['profit']);
    } else if (position['profit'] == 0) {
      $(id + ' .imageBar').empty();
      $(id + ' .profit').removeClass('a3').removeClass('a4').addClass('a1');
      $(id + ' .profit').html(position['profit']);
    }
  }
  $(id +" .price").html(position['price']);
}

function wtFresh (position) {
  var id = '#' + position['63'] + '_' + position['112'];
  $(id +" .available").html(position['available']);
}

var position = [],
    CID = pbE.WT().wtGetCurrentConnectionCID(),
    p = 0,
    symbolData = {};

$(function () {
  var option = {
    callbacks: [{fun: 6012, module: 90002, callback: function (msg) {
        if (msg.reservId == CID){queryMoneyPart(msg);}}},
                {fun: 6014, module: 90002, callback: function (msg) {
                    if (msg.reservId == CID){tradePart(msg);}}},
                {fun: 6019, module: 90002, callback: function (msg) {if (msg.reservId == CID){entrustPart(msg);}}},
                {module: 90000, callback: function (msg) {hqPart(msg);}}
               ],

    reload: function () {
      CID = pbE.WT().wtGetCurrentConnectionCID(), p = 0, position = [];
      pbE.SYS().startLoading();
      pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
      pbE.WT().wtQueryStock(CID, JSON.stringify({}));
    },

    refresh: function () {
      pbE.SYS().startLoading();
      p = 0;
      pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
      pbE.WT().wtQueryStock(CID, JSON.stringify({}));
    },

    doShow: function (flag) {
      if (!flag) {
        pbE.SYS().stopLoading();
        //pbE.HQ().hqUnSubscribe(0, JSON.stringify(symbolData));
      }
    },

    fresh: function () {}
  };
  pbPage.initPage(option);

  pbE.SYS().startLoading();
  pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
  pbE.WT().wtQueryStock(CID, JSON.stringify({}));
    if(pbE.isPoboApp) {
        process(pbUtils.parseJSON(pbE.SYS().readConfig('option/conf/option.json')));
    } else{
        $.get('../conf/option.json',process);
    }
});
function process(data) {
    var h = '';
    data.po.forEach(function (d){
      h += '<li><p>'+d.name+'</p><p id="'+d.id+'">--</p></li>'
    })
    $('#fund-left ul').html(h);
}
