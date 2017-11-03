if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {

                },
                wtQueryMoney: function () {
                    var data = {
                        moduleId: 90002,
                        functionNO: 6012,
                        jData: {
                            data: [
                                {
                                    '102': 10,
                                    '182': 20,
                                    '97': 30,
                                    '152': 111,
                                    '111': 10,
                                    '63': 'GTF'
                                }
                            ]
                        }
                    }
                    callback(JSON.stringify(data));
                    $("#float").html(1026 + '元')
                },
                wtQueryStockRe: function () {
                  var position = {"moduleId":90002,"reservId":1,"requestNO":12,"errorCode":1,"jData":{"3":"6014","1":"1","7":"4","6":"4","5":"-43","4":"103","data":[{"143":"0","144":"800000000.00","135":"806666666","145":"0","138":"6.9400","119":'3',"57":"人民币","139":"0.993","56":"0","136":"0.992","137":"806666666","155":"0","154":"0","153":"0","64":"华侨城Ａ","614":"4791416622.86","52":"0603916834","63":"000069","54":"SZSE-A","140":"0.993","142":"5598266662.04","141":"4791416622.86", "qhqq": 0},{"125": "0","112": "1", "profit": 120,"remain": 123,"143":"0","144":"0","135":"80808080","145":"0","138":"13.5000","57":"人民币","139":"0","56":"0","136":"0","137":"80808080","155":"0","154":"0","153":"0","64":"东北证券","614":"1089574243.55","52":"0603916834","63":"000686","54":"SZSE-A","140":"0","152":"111", "142":"1090909080.00","141":"1089574243.55", "qhqq": 1},{"125": "1","112": "0", "profit": -120,"remain": 123,"date": 1111111,"143":"0","144":"0","135":"-120","145":"0","138":"11.3100","57":"人民币","139":"0","56":"0","136":"0","137":"-120","155":"0","154":"0","153":"0","64":"平安A1配","614":"0","52":"0603916834","63":"080001","54":"SZSE-A","140":"0","142":"0","141":"0", "qhqq": 1},{"143":"0","144":"0","135":"10000","145":"0","138":"4.1370","57":"人民币","139":"0","56":"0","136":"0","137":"10000","155":"0","154":"0","153":"0","64":"深100ETF","614":"41361.58","52":"0603916834","63":"159901","54":"SZSE-A","140":"0","142":"41370.00","141":"41361.58", "qhqq": 0}],"51":"630100466","9":"1","15":"20161104111016071"},"isLastPack":1,"size":1341,"functionNO":6014};
                  ReactDOM.render(React.createElement(PositionContentsFutures, {contents: position.jData.data}), document.getElementById('contents'));
                }
            }
            return obj;
        },
        SYS: function () {
            var obj1 = {
                startLoading: function () {

                }
            }
            return obj1;
        }
    }
}

function tradePart(CID) {
    var CONTENTS1 = pbE.WT().wtQueryStockRe(CID);
    if (CONTENTS1) {
        position = JSON.parse(CONTENTS1).data;
        console.log("tradepart");
        console.log(position);
        if (position.length > 0) {
            var marketData = [],
                unique = [],
                marketInfo = [];
            for (var i = 0, m = position.length; i < m; i++) {
                var flag = 0,
                    qhqq = 0,
                    handNum,
                    price,
                    base,
                    pl,
                    average = position[i]['136'] + '';
                var market = position[i]['54'],
                    code = position[i]['63'];
                var symbol = 0; //持仓信息(1：合约代码，2：成本价，3：当前数量，4：放大倍数，5：每手数量，6：买卖方向)
                marketInfo = JSON.parse(pbE.WT().wtGetHQInfo(code, market)); //交易信息转换行情信息
                var a = marketInfo.HQMarket;
                if ((a == '2090') || (a == '2190') || (a == '2290') || (a == '2390') || (a == '2102') || (a == '2202')) {qhqq = 1;}  //期货期权行情market合集
                //是期货期权
                if (qhqq) {  //期货期权，计算剩余天数
                  var dateToday = new Date();
                  dateToday = new Date(dateToday.getTime());
                  var strToday = pbUtils.dateFormat(dateToday, 'yyyy-MM-dd');  //当前日期格式化
                  var dueDay = pbE.HQ().hqGetDueDate(marketInfo.HQCode, marketInfo.HQMarket);
                  position[i]['date'] = dueDay;
                  if (!dueDay || dueDay == '0000-00-00') {
                    position[i]['remain'] = '--';
                  } else {
                    position[i]['remain'] = pbUtils.countTimeLength('D', strToday, dueDay);
                  }
                }
                handNum = pbE.WT().wtGetMSSL(code, market); //获取交易每手数量，期货合约
                if (code.indexOf('&') >= 0) symbol = 1;
                if (!marketInfo.HQCode || !marketInfo.HQMarket || isNaN(position[i]['136']) || symbol) {
                    flag = 1;
                }
                var rate = pbE.HQ().hqGetPriceRate(marketInfo.HQCode, marketInfo.HQMarket);  //获取行情商品价格倍数
                position[i]['flag'] = flag;
                position[i]['qhqq'] = qhqq;
                //去重数组不包含当前合约代码
                if (unique.indexOf(marketInfo.HQCode) < 0) {
                    //存入去重数组
                    unique.push(marketInfo.HQCode);
                    //存入市场合约代码集合
                    marketData.push({
                        '2': marketInfo.HQMarket,
                        '3': marketInfo.HQCode
                    });
                }

                position[i]['market'] = marketInfo.HQMarket;
                position[i]['code'] = marketInfo.HQCode;
                position[i]['groupflag'] = pbE.HQ().hqGetGroupFlag(marketInfo.HQCode, marketInfo.HQMarket);
                position[i]['available'] = position[i]['137'];
                position[i]['handNum'] = handNum;
                position[i]['rate'] = rate;
                position[i]['decimal'] = pbE.HQ().hqGetPriceDecimal(marketInfo.HQCode, marketInfo.HQMarket);

                if (!flag) {
                    price = pbE.HQ().hqGetNowPrice(marketInfo.HQCode, marketInfo.HQMarket);
                    base = pbE.HQ().hqGetLastBasePrice(marketInfo.HQCode, marketInfo.HQMarket);
                    //计算每条合约的盈亏
                    if (price && !isNaN(price)) {
                      pl = ((price - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * handNum;
                      if (position[i]['112'] == '1') {
                          pl = 0 - pl;
                      }
                      position[i]['dayPl'] = pl;  //计算当日盈亏
                      position[i]['profit'] = (pl - 0).toFixed(2);  //展示每条合约的浮动盈亏
                      position[i]['price'] = pbUtils.decimalDecPrice(position[i]['decimal'], price);
                    } else if (base && !isNaN(base)) {
                      //接口没有拿到现价，有基准价就用基准价计算盈亏，现价显示'--'
                      pl = ((base - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * handNum;
                      if (position[i]['112'] == '1') {
                          pl = 0 - pl;
                      }
                      position[i]['dayPl'] = pl;
                      position[i]['profit'] = (pl - 0).toFixed(2);
                      position[i]['price'] = '--';
                    } else {
                      position[i]['dayPl'] = 0;
                      position[i]['profit'] = '--';
                      position[i]['price'] = '--';
                    }
                    //calcProfit(position, i, handNum);
                } else if (flag) {
                  position[i]['profit'] = '--';
                  position[i]['price'] = '--';
                  position[i]['dayPl'] = 0;
                }
                position[i]['avg'] = pbUtils.decimalDec(position[i]['decimal'], average);
            }
            //position = sortPosition(position);
            $('#contents').empty();
            position.sort(
                firstBy(function (v) { return v[63].toUpperCase(); })
                    .thenBy("112")
                    .thenBy("503")
            );
            ReactDOM.render(React.createElement(PositionContentsFutures, {contents: position}), document.getElementById('contents'));
            var completeP = false, totalPL = 0;
            for (var i = 0, l = position.length; i < l; i++) {
              if (typeof position[i]['dayPl'] == 'undefined' || isNaN(position[i]['dayPl'])) {
                if (position[i]['flag']) {
                    continue;
                }
              } else {
                totalPL = totalPL + (position[i]['dayPl'] - 0);
                completeP = true;
              }
            }
            if (completeP) {
              $('#float').html(pbUtils.comma((closePl - 0) + (totalPL - 0), 2) + '元');
              float = totalPL;
            }
            symbolData['1'] = marketData;
            /*symbolData['5'] = column;*/
            //symbolData['7'] = '1';
            pbE.HQ().hqSubscribe(0, JSON.stringify(symbolData));
        } else if (position.length <= 0) {
            pbE.SYS().stopLoading();
            $('#contents').empty();
            $('#float').html(pbUtils.comma(closePl, 2) + '元');
        }
    }
}

function hqPart(msg) {
    var data = msg.jData.Data;
    for (var i = 0, l = position.length; i < l; i++) {
        if (!position[i]['flag']) {
            for (var j = 0, ll = data.length; j < ll; j++) {
                var lastPrice, base, pl;
                if (position[i]['code'] == data[j]['10']) {
                    base = pbE.HQ().hqGetLastBasePrice(position[i]['code'], position[i]['market']);
                    if (data[j]['29'] && !isNaN(data[j]['29'])) {
                        lastPrice = (data[j]['29'] - 0) / position[i]['rate']; //获取现价/最新价
                        pl = ((lastPrice - (position[i]['136'] - 0)).toFixed(4) - 0) * position[i]['135'] * position[i]['handNum'];
                        if (position[i]['112'] == '1') {
                            pl = 0 - pl;
                        }
                        //浮动盈亏
                        position[i]['price'] = pbUtils.decimalDecPrice(position[i]['decimal'], lastPrice);
                        position[i]['dayPl'] = pl;
                        position[i]['profit'] = (pl - 0).toFixed(2);
                        //计算当日盈亏
                        //calcProfit(position, i, stockInfo[i]['5']);
                    } else {
                        if (base && !isNaN(base)) {
                            //接口没有拿到现价，有基准价就用基准价计算盈亏，现价显示'--'
                            pl = ((base - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * position[i]['handNum'];
                            if (position[i]['112'] == '1') {
                                pl = 0 - pl;
                            }
                            position[i]['price'] = '--';
                            position[i]['dayPl'] = pl;
                            position[i]['profit'] = (pl - 0).toFixed(2);
                        } else {
                            position[i]['price'] = '--';
                            position[i]['profit'] = '--';
                            position[i]['dayPl'] = 0;
                        }
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
    //position = sortPosition(position);
    var complete = false, totalPL = 0;
    for (var i = 0, l = position.length; i < l; i++) {
        if (typeof position[i]['dayPl'] == 'undefined' || isNaN(position[i]['dayPl'])) {
            if (position[i]['flag']) {
                continue;
            }
        } else {
            totalPL = totalPL + (position[i]['dayPl'] - 0);
            complete = true;
        }
    }

    if (complete) {
        p++;
        $('#float').html(pbUtils.comma((totalPL - 0) + (closePl - 0), 2) + '元');
        float = totalPL;
        if (p == 1) pbE.SYS().stopLoading();
        //position = sortPosition(position);
        //ReactDOM.render(React.createElement(PositionContentsFutures, {contents: position}), document.getElementById('contents'));
    }
}

function hqFresh(position) {  //行情推送时只刷新最新价和持仓，不重画整个页面的持仓显示
  console.log("行情刷新");
  console.log(position);
  var id = '#' + position['63'] + '_' + position['112'] + '_' + position['qhqq'] + '_' + position['125'] + '_' + position['503'];
  if (isNaN(position['profit'])) {
    $(id + ' .imageBar').empty();
    $(id + ' .profit').removeClass('a3').removeClass('a4').addClass('a1');
    $(id + ' .profit').html(position['profit']);
  } else {
    if (position['profit'] > 0) {
      $(id + ' .imageBar').empty();
      if (position['qhqq'] == '1' && position['125'] == '0' && position['112'] == '1') {
        $(id + ' .imageBar').append('<img src=' + '../../images/redBar.png' + ' height=' + '100' + ' width=' + '2' + '>');
      } else {
        $(id + ' .imageBar').append('<img src=' + '../../images/redBar.png' + '>');
      }
      $(id + ' .profit').removeClass('a1').removeClass('a4').addClass('a3');
      $(id + ' .profit').html('+' + position['profit']);
    } else if (position['profit'] < 0) {
      $(id + ' .imageBar').empty();
      if (position['qhqq'] == '1' && position['125'] == '0' && position['112'] == '1') {
        $(id + ' .imageBar').append('<img src=' + '../../images/greenBar.png' + ' height=' + '100' + ' width=' + '2' + '>');
      } else {
        $(id + ' .imageBar').append('<img src=' + '../../images/greenBar.png' + '>');
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

function queryMoneyPart(msg) {
  var asset = msg.jData.data[0];
  var unit;
  if (asset['56']) {
    unit = pbUtils.getUnit(asset['56']);
  } else {
    unit = '元';
  }
  if (asset['97'] && !isNaN(asset['97'])) {
    $('#asset').html(pbUtils.comma(asset['97'], 2) + unit);
  }
  if (asset['152'] && !isNaN(asset['152'])) {
    $('#take').html(pbUtils.comma(asset['152'], 2) + unit);
  }
  if (asset['111'] && !isNaN(asset['111'])) {
    $('#available').html(pbUtils.comma(asset['111'], 2) + unit);
  }
  if (asset['102'] && !isNaN(asset['102'])) {
    closePl = asset['102'] - 0;
  } else {
    closePl = 0;
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID();
var position = [], 
    p = 0,
    closePl,  //平仓浮动盈亏
    symbolData = {},
    float = 0;

$(function () {
  var option = {
      callbacks: [{fun: 6012, module: 90002, callback: function(msg){
          if (msg.reservId == CID){
              queryMoneyPart(msg);
          }
      }},
          {fun: 56004, module: 90002, callback: function(msg){
              if (msg.reservId == CID && msg.jData['223'] == 5) {
                  pbPage.fresh();
              }
          }},
          {fun: 56005, module: 90002, callback: function(msg){
              if(msg.reservId == CID)
                  pbPage.fresh();
          }},
          {fun: 56006, module: 90002, callback: function(msg){
              if(msg.reservId == CID)
                  pbPage.fresh();
          }},
          {fun: 56014, module: 90002, callback: function(msg){
              if(msg.reservId == CID)
                  pbPage.fresh();
          }},
          {module: 90000, callback: function(msg){
              hqPart(msg);
          }}],

      reload: function () {
          pbE.SYS().startLoading();
          CID = pbE.WT().wtGetCurrentConnectionCID();
          p = 0, float = 0, position = [];
          pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
          tradePart(CID);
      },
    
      refresh: function () {
          pbE.SYS().startLoading();
          p = 0, float = 0;
          pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
          pbE.WT().wtSynFlash(CID);
      },
    
      fresh: function () {
          p = 0, float = 0;
          pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
          tradePart(CID);
      },
    
      doShow: function (flag) {
          if (!flag) {
            pbE.HQ().hqUnSubscribe(0, JSON.stringify(symbolData));
            pbE.SYS().stopLoading();
          }
      }
  };

  pbPage.initPage(option);
  
  var dataHis1 = pbE.WT().wtQueryMoneyRe(CID);
  if (dataHis1) {
    var asset = pbUtils.parseJSON(dataHis1).data[0];
    var unit;
    if (asset['56']) {
      unit = pbUtils.getUnit(asset['56']);
    } else {
      unit = '元';
    }
    if (asset['97'] && !isNaN(asset['97'])) {
      $('#asset').html(pbUtils.comma(asset['97'], 2) + unit);
    }
    if (asset['152'] && !isNaN(asset['152'])) {
      $('#take').html(pbUtils.comma(asset['152'], 2) + unit);
    }
    if (asset['111'] && !isNaN(asset['111'])) {
      $('#available').html(pbUtils.comma(asset['111'], 2) + unit);
    }
    if (asset['102'] && !isNaN(asset['102'])) {
      closePl = asset['102'] - 0;
    } else {
      closePl = 0;
    }
  }
  
  pbE.SYS().startLoading();
  pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
  tradePart(CID);
});
