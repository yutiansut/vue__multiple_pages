var isApp = typeof pbE != 'undefined';
if(!isApp){
  window.pbE = {
    WT:function () {
     var obj = {
       wtGetCurrentConnectionCID:function () {},
       wtGetHQInfo:function () {},
       wtQueryMoney:function() {
         var data = {
           moduleId: 90002,
           functionNO: 6012,
           jData: {
             data: [
               {
                 '56': '0',
                 '97': '88888888',
                 '111': '88888888',
                 '152': '88888888',
                 '345': '88.88%',
                 '96': '88888888'
               }
             ]
           }
         };
         callback(JSON.stringify(data));
       },

       wtQueryStock:function() {},
       wtGetMSSL:function () {},
       wtLoginRe:function () {
         return '{"data":[{"51":"123","74":"刘","50":"456"}]}';
       },
       wtGetLoginList:function () {
         return '{"Accinfo":[{"AccType": "a"}]}';
       },
       wtLoginOut: function () {},
       wtSetCurrentAccLoginOutState: function () {}

     }
      return obj;
    },
    SYS:function () {
      var obj1 = {
        stopLoading:function () {},
        startLoading:function () {},
        storePrivateData: function () {}
      }
      return obj1;
    },
    HQ:function () {
      var obj2 = {
        hqGetPriceRate:function () {},
        hqGetLastBasePrice:function () {},
        hqSubscribe:function () {}
      }
      return obj2;
    }
  }
  $('#total-PL').removeClass();
  $('#total-PL').addClass('c3');
  $('#total-PL').html('+' + 888888 + '元');
}

function tradePart(CID) {
  var CONTENTS1 = pbE.WT().wtQueryStockRe(CID);
  if (CONTENTS1) {
    var data = JSON.parse(CONTENTS1).data;
    if (data.length > 0) {
      symbolData = {};
      stockInfo = data;
      var marketData = [],
          unique = [],
          marketInfo = [];
      for (var i = 0, l = stockInfo.length; i < l; i++) {
        var market = stockInfo[i]['54'],
            code = stockInfo[i]['63'];
        var obj = {}, symbol = 0; //持仓信息(1：合约代码，2：成本价，3：当前数量，4：放大倍数，5：每手数量，6：买卖方向)
        marketInfo = JSON.parse(pbE.WT().wtGetHQInfo(code, market)); //交易信息转换行情信息
        if (code.indexOf('&') >= 0) symbol = 1;
        if (!marketInfo.HQCode || !marketInfo.HQMarket || isNaN(parseFloat(stockInfo[i]['136'])) || symbol) {
          continue;
        }
        var a = marketInfo.HQMarket, qhqq = 0;
        if ((a == '2090') || (a == '2190') || (a == '2290') || (a == '2390') || (a == '2102') || (a == '2202')) {qhqq = 1;}  //期货期权行情market合集
        /*if (qhqq) {  //期货期权
          var handNum = pbE.HQ().hqGetOptionStrikeUnit(marketInfo.HQCode, marketInfo.HQMarket);  //期货期权用行权比例代替每手数量计算
        } else {
          var handNum = pbE.WT().wtGetMSSL(code, market); //获取交易每手数量，期货合约
        }*/
        var handNum = pbE.WT().wtGetMSSL(code, market); //获取交易每手数量，期货合约
        var rate = pbE.HQ().hqGetPriceRate(marketInfo.HQCode, marketInfo.HQMarket), //获取行情商品价格倍数
            base = pbE.HQ().hqGetLastBasePrice(marketInfo.HQCode, marketInfo.HQMarket); //获取基准价
        //合约代码
          stockInfo[i]['1'] = marketInfo.HQCode;
        //买入均价
          stockInfo[i]['2'] = stockInfo[i]['136'] - 0;
        //当前数量
          stockInfo[i]['3'] = stockInfo[i]['135'] - 0;
        //放大倍数
          stockInfo[i]['4'] = rate;
        //每手数量
          stockInfo[i]['5'] = handNum;
        //买卖方向
          stockInfo[i]['6'] = stockInfo[i]['112'];
          stockInfo[i]['9'] = marketInfo.HQMarket;
        //期货期权
          stockInfo[i]['qhqq'] = qhqq;
        //存入持仓信息
        //stockInfo.push(obj);
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
      }

      symbolData['1'] = marketData;
      /*symbolData['5'] = column;*/
      //symbolData['7'] = '1';
      pbE.HQ().hqSubscribe(0, JSON.stringify(symbolData));
    } else if (stockInfo.length >= 0) {
        symbolData = {};
      pbE.SYS().stopLoading();
      stockInfo = [];
      var profit = closePl - 0;
      if (profit > 0) {

        $('#total-PL').removeClass();
        $('#total-PL').addClass('c3');
        $('#total-PL').html('+' + pbUtils.comma(profit, 2) + '元');
      } else if (profit < 0) {
        $('#total-PL').removeClass();
        $('#total-PL').addClass('c4');
        $('#total-PL').html(pbUtils.comma(profit, 2) + '元');
      } else {
        $('#total-PL').removeClass();
        $('#total-PL').addClass('c1 bolder');
        $('#total-PL').html('0' + '元');
      }
    }
  }else{
      symbolData = {};
      stockInfo = [];
  }
}
//计算当日盈亏
function calcProfit(positions, index, handNum) {
    var i = index;
    var currP = positions[index];
    //计算当日盈亏
    if (currP['503'] == '1') {
        //今仓，现价-开仓均价
        if (currP['price'] && !isNaN(currP['price']) && currP['price'] != '--') {
            currP['dayPl'] = (( currP['price'] - currP['136'] - 0).toFixed(4) - 0) * currP['135'] * handNum;
            if (currP['112'] == '1') {
                currP['dayPl'] = 0 - currP['dayPl'];
            }
        } else if (currP['price'] == '--') {
            currP['dayPl'] = 0
        }
    } else if (currP['503'] == '2') {
        //昨仓，现价-基准价
        if (currP['price'] && !isNaN(currP['price']) && currP['price'] != '--' && currP['base'] && !isNaN(currP['base'])) {
            currP['dayPl'] = ((currP['price'] - currP['base'] - 0).toFixed(4) - 0) * currP['135'] * handNum;
            if (currP['112'] == '1') {
                currP['dayPl'] = 0 - currP['dayPl'];
            }
        } else if (currP['price'] == '--') {
            currP['dayPl'] = 0
        }
    } else if (currP['503'] == '0') {
        //不分今昨仓，拆仓，1101字段代表今仓数量
        if (currP['1101'] == currP['135']) {
            //判断有没有昨仓
            if (currP['price'] && !isNaN(currP['price']) && currP['price'] != '--') {
                //没有昨仓，现价-今仓开仓成本
                currP['dayPl'] = ((currP['price'] - currP['1102'] - 0).toFixed(4) - 0) * currP['1101'] * handNum;
                if (currP['112'] == '1') {
                    currP['dayPl'] = 0 - currP['dayPl'];
                }
            } else if (currP['price'] == '--') {
                currP['dayPl'] = 0
            }
        } else if (currP['1101'] < currP['135']) {
            if (currP['price'] && !isNaN(currP['price']) && currP['price'] != '--' && currP['base'] && !isNaN(currP['base'])) {
                currP['dayPl'] = ((currP['price'] - currP['1102'] - 0).toFixed(4) - 0) * currP['1101'] * handNum + ((currP['price'] - currP['base'] - 0).toFixed(4) - 0) * (currP['135'] - currP['1101'] - 0) * handNum;
                if (currP['112'] == '1') {
                    currP['dayPl'] = 0 - currP['dayPl'];
                }
            } else if (currP['price'] == '--') {
                currP['dayPl'] = 0
            }
        }
    }

    /*console.log(currP['503'] + "**" + currP['price']+"***" +  currP['dayPl']);*/
}

function hqPart(msg) {

  var data = msg.jData.Data;
  for (var i = 0, l = stockInfo.length; i < l; i++) {
    for (var j = 0, ll = data.length; j < ll; j++) {
      if (stockInfo[i]['1'] == data[j]['10'] && stockInfo[i]['qhqq'] == 0) {//非期货期权才计算当日盈亏
          stockInfo[i]["base"] = pbE.HQ().hqGetLastBasePrice(stockInfo[i]['1'], stockInfo[i]['9']);
        if (data[j]['29'] && !isNaN(data[j]['29'])) {
            stockInfo[i]["price"] = (data[j]['29'] - 0) / stockInfo[i]['4'];

            calcProfit(stockInfo, i, stockInfo[i]['5']);
        } else if (stockInfo[i]["base"] && !isNaN(stockInfo[i]["base"])) {
            stockInfo[i]['dayPl'] = 0
        }
        //stockInfo[i]['7'] = pl;
        break;
      }
    }
  }

  var complete = true, totalPL = 0;

  for (var i = 0, l = stockInfo.length; i < l; i++) {
      /*console.log(stockInfo[i]['dayPl']);*/

    if (typeof stockInfo[i]['dayPl'] == 'undefined' || isNaN(stockInfo[i]['dayPl'])) {
        continue
    } else {
      totalPL = totalPL + (stockInfo[i]['dayPl'] - 0);
    }
  }

  if (complete) {
    p++;
    if (p == 1) pbE.SYS().stopLoading();
    totalPL = totalPL + (closePl - 0);
    if (totalPL > 0) {
      $('#total-PL').removeClass();
      $('#total-PL').addClass('c3');
      $('#total-PL').html('+' + pbUtils.comma(totalPL, 2) + '元');
    } else if (totalPL < 0) {
      $('#total-PL').removeClass();
      $('#total-PL').addClass('c4');
      $('#total-PL').html(pbUtils.comma(totalPL, 2) + '元');
    } else {
      $('#total-PL').removeClass();
      $('#total-PL').addClass('c1 bolder');
      $('#total-PL').html('0' + '元');
    }
  }
}

function queryMoneyPart(msg) {
  // if(hqShow){
      pbE.SYS().stopLoading();
  console.log(msg);
      var data = msg.jData.data[0];
      if (data['102'] && !isNaN(data['102'])) {
          closePl = data['102']-0;
          tradePart(CID);
      } else {
          closePl = 0;
      }
      var unit;
      if (data['56']) {
          unit = pbUtils.getUnit(data['56']);
      } else {
          unit = '元';
      }
      if (data['97'] && !isNaN(data['97'])) {
          $('#total-asset').html(pbUtils.comma(data['97'], 2) + unit);
      }
      if (data['152'] && !isNaN(data['152'])) {
          $('#guarantee').html(pbUtils.comma(data['152'], 2) + unit);
      }
      if (data['111'] && !isNaN(data['111'])) {
          $('#available').html(pbUtils.comma(data['111'], 2) + unit);
      }
      if (data['345']) {
          if(data['345'].indexOf('%') >= 0){
              $('#risk').html(data['345']);
          } else {
              $('#risk').html(data['345']+ '%');
          }
      } else {
          $('#risk').html('--');
      }
  // }else{
  //   return;
  // }

}

function userInfo (CID) {
  var loginInfo = pbUtils.parseJSON(pbE.WT().wtLoginRe(CID));
  var loginList = pbUtils.parseJSON(pbE.WT().wtGetLoginList());
  var AccType;
  if (loginList.Count > 1) {
    for (var i = 0, j = loginList.Accinfo.length; i < j; i++) {
      if (loginList.Accinfo[i].LoginAcc == loginInfo.data[0]['51'] || loginList.Accinfo[i].LoginAcc == loginInfo.data[0]['50']) {
        AccType = loginList.Accinfo[i]['AccType'];
      }
    }
  } else if (loginList.Count == 1) {
    AccType = loginList.Accinfo[0]['AccType'];
  }
  if (AccType == 'a') {  //客户号
    $('#accName').html('客户号');
    $('#accnum').html(loginInfo.data[0]['50']);
  } else if (AccType == '0') {  //资金账号
    $('#accName').html('资金账号');
    $('#accnum').html(loginInfo.data[0]['51']);
  }
  if (loginInfo.data[0]['74']) {  //74字段可能没有
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    if(reg.test(loginInfo.data[0]['74'].substr(0, 1))) {  //客户姓名是汉字
      $('#name').removeClass('hide');
      $('#name').html(loginInfo.data[0]['74'].substr(0, 1) + '先生/女士');
    } else {
      $('#name').addClass('hide');
    }
  } else {
    $('#name').addClass('hide');
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID(),
    closePl = 0,
    p = 0,
    symbolData = {},
    stockInfo = [],
    hqShow = 1;


$(function () {
  var option = {
      callbacks: [{fun: 6012, module: 90002, callback: function(msg){
          if (msg.reservId == CID)
          {
              queryMoneyPart(msg);
          }
      }},
          {fun: 56004, module: 90002, callback: function(msg){
              if(hqShow == '1' || hqShow == 1) {
                  if (msg.reservId == CID && msg.jData['223'] == 5) {
                      pbPage.fresh();
                  }
              }
          }},
          {fun: 56005, module: 90002, callback: function(msg){
              if(hqShow == '1' || hqShow == 1) {
                  if (msg.reservId == CID)
                      pbPage.fresh();
              }
          }},
          {fun: 56006, module: 90002, callback: function(msg){
              if(hqShow == '1' || hqShow == 1) {
                  if (msg.reservId == CID)
                      pbPage.fresh();
              }
          }},
          {fun: 56014, module: 90002, callback: function(msg){
              if(hqShow == '1' || hqShow == 1) {
                  if (msg.reservId == CID)
                      pbPage.fresh();
              }
          }},
          {module: 90000, callback: function(msg){
              if(hqShow == '1' || hqShow == 1) {
                  hqPart(msg);
              }
          }}],

      reload: function () {
          pbE.SYS().startLoading();
          var temp = CID;
          CID = pbE.WT().wtGetCurrentConnectionCID();
          p = 0;
          if (temp != CID) {
            $('#total-asset').html('--元');
            $('#guarantee').html('--元');
            $('#available').html('--元');
            $('#risk').html('--');
            $('#total-PL').html('--元');
            userInfo(CID);
            var dataHis1 = pbE.WT().wtQueryMoneyRe(CID);
            if (dataHis1) {
              var data = pbUtils.parseJSON(dataHis1).data[0];
              if (data['102'] && !isNaN(data['102'])) {
                closePl = data['102'];
              } else {
                closePl = 0;
              }
              var unit;
              if (data['56']) {
                unit = pbUtils.getUnit(data['56']);
              } else {
                unit = '元';
              }
              if (data['97'] && !isNaN(data['97'])) {
                $('#total-asset').html(pbUtils.comma(data['97'], 2) + unit);
              }
              if (data['152'] && !isNaN(data['152'])) {
                $('#guarantee').html(pbUtils.comma(data['152'], 2) + unit);
              }
              if (data['111'] && !isNaN(data['111'])) {
                $('#available').html(pbUtils.comma(data['111'], 2) + unit);
              }
              if (data['345']) {
                if(data['345'].indexOf('%') >= 0){
                  $('#risk').html(data['345']);
                } else {
                  $('#risk').html(data['345']+ '%');
                }
              } else {
                $('#risk').html('--');
              }
            }
          }

          pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
          tradePart(CID);
      },

      refresh: function () {
          pbE.SYS().startLoading();
          p = 0;
          pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
          pbE.WT().wtSynFlash(CID);
      },

      fresh: function () {
          p = 0;
          pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
          tradePart(CID);
      },

      doShow: function (flag) {
          // if (!flag) {
          //   pbE.HQ().hqUnSubscribe(0, JSON.stringify(symbolData));
          //   pbE.SYS().stopLoading();
          // }
          hqShow = flag;
      }
  };


  pbPage.initPage(option);

  if (!isApp) {
    $.get('conf/future.json',process);
  } else {
    process(pbUtils.parseJSON(pbE.SYS().readConfig('future/conf/future.json')));
  }
  userInfo(CID);
  pbE.SYS().startLoading();
  pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
  var dataHis1 = pbE.WT().wtQueryMoneyRe(CID);
  if (dataHis1) {
    var data = pbUtils.parseJSON(dataHis1).data[0];
    if (data['102'] && !isNaN(data['102'])) {
      closePl = data['102'];
    } else {
      closePl = 0;
    }
    var unit;
    if (data['56']) {
      unit = pbUtils.getUnit(data['56']);
    } else {
      unit = '元';
    }
    if (data['97'] && !isNaN(data['97'])) {
      $('#total-asset').html(pbUtils.comma(data['97'], 2) + unit);
    }
    if (data['152'] && !isNaN(data['152'])) {
      $('#guarantee').html(pbUtils.comma(data['152'], 2) + unit);
    }
    if (data['111'] && !isNaN(data['111'])) {
      $('#available').html(pbUtils.comma(data['111'], 2) + unit);
    }
    if (data['345']) {
      if(data['345'].indexOf('%') >= 0){
        $('#risk').html(data['345']);
      } else {
        $('#risk').html(data['345']+ '%');
      }
    } else {
      $('#risk').html('--');
    }
  }
  tradePart(CID);
});

function process(data) {
  var dat = data.index;
  var e = "",r = "",v = 0;

  dat.stacked.forEach(function (d) {
    if(d.url == undefined){
      if(d.menu == undefined){
        e += "<li>" +
            "<a>"+d.name+"</a>" +
            "</li>";
      }else{
        e +="<li><a>"+d.name+"<img class='more' src='images/more.png' alt='详细'></a>" +
            "</li>"+
            "<ul class='hide'>";
        for(var i= 0;i < d.menu.length;i++){
          if(d.menu[i].tip == undefined){
            e +="<li><a href='"+d.menu[i].url+"' id='tip'>"+d.menu[i].name+"</a></li>"
          }else{
            e +="<li><a href='"+d.menu[i].url+"' id='tip'>"+d.menu[i].name+"<span class='tip'>"+d.menu[i].tip+"</span></a></li>"
          }
        }
        e += "</ul>";
      }
    }else{
      if(d.menu == undefined){
        e += "<li>" +
            "<a href='"+d.url+"' id='tip'>"+d.name+"</a>" +
            "</li>";
      }else{
        e +="<li><a>"+d.name+"<img class='more' src='images/more.png' alt='详细'></a>" +
            "</li>"+
            "<ul class='hide'>";
        for(var i= 0;i < d.menu.length;i++){
          if(d.menu[i].tip == undefined){
            e +="<li><a href='"+d.menu[i].url+"' id='tip'>"+d.menu[i].name+"</a></li>"
          }else{
            e +="<li><div><a href='"+d.menu[i].url+"'  id='tip'>"+d.menu[i].name+"</a><span class='tip'>"+d.menu[i].tip+"</span></div></li>"
          }
        }
        e += "</ul>";
      }
    }

  });
  $('.nav-stacked').html(e);
  $('.nav-stacked>li').each(function (i,e) {
    $(e).on('click',function () {
      $(this).next('ul').toggleClass('hide');
      if(!$(this).next('ul').is('.hide')){
        $(this).find('img').attr('src','images/arrow-down.png').css({
          "width":"auto",
          "height":"auto"
        })
      }else{
        $(this).find('img').attr('src','images/more.png').css({
          "width":"7px",
          "height":"16px"
        })
      }
    })
  });
}
