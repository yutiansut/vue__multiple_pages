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
                 '93': '88888888',
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
        startLoading:function () {}
      }
      return obj1;
    },
    HQ:function () {
      var obj2 = {
        hqGetPriceRate:function () {},
        hqGetLastBasePrice:function () {},
        hqSubscribe:function () {},
        hqUnSubscribe: function () {}
      }
      return obj2;
    }
  }
  $('#total-PL').removeClass();
  $('#total-PL').addClass('c3');
  $('#total-PL').html('+' + 888888 + '元');
}

function cancel() {
  $('.my-modal').addClass('hide');
}

function confirm() {
  $('.my-modal').removeClass('hide');
}

function logout() {
  pbE.WT().wtLoginOut(CID);
  pbE.WT().wtSetCurrentAccLoginOutState();
  $('.my-modal').addClass('hide');
}

function queryMoneyPart(msg) {
  pbE.SYS().stopLoading();
  var info = msg.jData.data[0];
  var unit;
  if (info['56']) {
    unit = pbUtils.getUnit(info['56']);
  } else {
    unit = '元';
  }
  if (info['97']) {
    $('#total-asset').html(pbUtils.comma(info['97'], 2) + unit);  //总资产
  }
  if (info['96']) {
    $('#mktVal').html(pbUtils.comma(info['96'], 2) + unit);  //总市值
  }
  if (info['93']) {
    $('#available').html(pbUtils.comma(info['93'], 2) + unit);  //可用资金
  } 
}

function tradePart(msg) {
  pbE.SYS().startLoading();
  var data = msg.jData.data;
  if (data.length > 0) {
    symbolData = {}, stockInfo = []; 
    var marketData = [], 
        unique = [],
        marketInfo = [];
    for (var i = 0, j = data.length; i < j; i++) {
      var market = data[i]['54'],
          code = data[i]['63'];
      var obj = {}, symbol = 0; //持仓信息(1：合约代码，2：成本价，3：当前数量，4：放大倍数，5：每手数量，6：买卖方向)
      marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(code, market)); //交易信息转换行情信息
      if (code.indexOf('&') >= 0) symbol = 1;
      if (!marketInfo.HQCode || !marketInfo.HQMarket || isNaN(parseFloat(data[i]['136'])) || symbol) {
        continue;
      }
      var rate = pbE.HQ().hqGetPriceRate(marketInfo.HQCode, marketInfo.HQMarket), //获取行情商品价格倍数
          base = pbE.HQ().hqGetLastBasePrice(marketInfo.HQCode, marketInfo.HQMarket); //获取基准价
      //合约代码
      obj['1'] = marketInfo.HQCode;
      //成本价
      obj['2'] = data[i]['139'] - 0;
      //当前数量
      obj['3'] = data[i]['135'] - 0;
      //放大倍数
      obj['4'] = rate;
      //基准价
      obj['8'] = base;
      obj['9'] = marketInfo.HQMarket;

      //存入持仓信息
      stockInfo.push(obj);
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
  } else if (data.length <= 0) {
    pbE.SYS().stopLoading();
    stockInfo = [];
    $('#total-PL').removeClass();
    $('#total-PL').addClass('c1 bolder');
    $('#total-PL').html('0' + '元');
  }
}

function hqPart(msg) {
  var data = msg.jData.Data;
  for (var i = 0, l = stockInfo.length; i < l; i++) {
    for (var j = 0, ll = data.length; j < ll; j++) {
      var price, pl, base;
      if (stockInfo[i]['1'] == data[j]['10']) {
        base = pbE.HQ().hqGetLastBasePrice(stockInfo[i]['1'], stockInfo[i]['9']);
        if (data[j]['29'] && !isNaN(data[j]['29'])) {
          price = (data[j]['29'] - 0) / stockInfo[i]['4']; //获取现价/最新价
          if (price && !isNaN(price)) {
            pl = ((price - stockInfo[i]['2'] - 0).toFixed(4) - 0) * stockInfo[i]['3'];
          }
        } else if (base && !isNaN(base)) {
          pl = ((base - stockInfo[i]['2'] - 0).toFixed(4) - 0) * stockInfo[i]['3'];
        } else {
          pl = 0;
        }
        stockInfo[i]['7'] = pl;
        break;
      } 
    }
  }

  var complete = false,
      totalPL = 0;
  for (var i = 0, l = stockInfo.length; i < l; i++) {
    if (typeof stockInfo[i]['7'] == 'undefined' || isNaN(stockInfo[i]['7'])) {
      complete = false;
      break;
    } else {
      totalPL = totalPL + stockInfo[i]['7'];
      complete = true;
    }
  }

  if (complete) {
    p++;
    if (p == 1) pbE.SYS().stopLoading();
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
    p = 0,
    stockInfo = [],
    symbolData = {};

$(function () {
  $('.my-modal-backdrop').click(cancel);
  
  var option = {
      callbacks: [{fun: 6012, module: 90002, callback: function (msg) {
          if (msg.reservId == CID){
              queryMoneyPart(msg);
          }
          }},
          {fun: 6014, module: 90002, callback: function (msg) {
              if (msg.reservId == CID) {
                  tradePart(msg);
              }
          }},

          {module: 90000, callback: function(msg){
                  hqPart(msg);
          }}],

      reload: function () {
          var temp = CID;
          CID = pbE.WT().wtGetCurrentConnectionCID(), p = 0, stockInfo = [];
          if (temp != CID) {
            $('#total-asset').html('--元');
            $('#total-PL').html('--元');
            $('#available').html('--元');
            $('#mktVal').html('--元');
            userInfo(CID);
          }

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
      fresh: function () {},

      doShow: function (flag) {
          if (!flag) {
            pbE.SYS().stopLoading();
            //pbE.HQ().hqUnSubscribe(0, JSON.stringify(symbolData));
          }
      }
  };
  pbPage.initPage(option);

  userInfo(CID);
  
  pbE.SYS().startLoading();
  pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
  pbE.WT().wtQueryStock(CID, JSON.stringify({}));

  if(isApp) {
    process(pbUtils.parseJSON(pbE.SYS().readConfig('stock/conf/stock.json')));
  } else{
    /*var conf = {
          "index":{
            "stacked":[
              {
                "name":"新股申购",
                "url":"pobo:uncheck=0&pageId=802150"
              },
              {
                "name":"历史委托",
                "url":"pobo:uncheck=0&pageId=802208&url=./view/stock-en-his.html"
              },
              {
                "name":"历史成交",
                "url":"pobo:uncheck=0&pageId=902307&url=./view/stock-dl-his.html"
              },
              {
                "name":"银证转账",
                "url":"pobo:uncheck=0&pageId=902107"
              },
              {
                "name":"修改密码",
                "url":"pobo:uncheck=0&pageId=802004"
              }
            ]
          }};
    process(conf);*/
    $.get('conf/stock.json',process);
  }
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
        e +="<li><a>"+d.name+"<img class='more' src='../images/more.png' alt='详细'></a>" +
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
        e +="<li><a>"+d.name+"<img class='more' src='../images/more.png' alt='详细'></a>" +
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
        $(this).find('img').attr('src','../images/arrow-down.png').css({
          "width":"auto",
          "height":"auto"
        })
      }else{
        $(this).find('img').attr('src','../images/more.png').css({
          "width":"7px",
          "height":"16px"
        })
      }
    })
  });
}