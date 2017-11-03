  if(!pbE.isPoboApp){
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

function queryMoneyPart(msg) {
  pbE.SYS().stopLoading();
  var asset = msg.jData.data[0];
  var unit;
  if (asset['56']) {
    unit = pbUtils.getUnit(asset['56']);
  } else {
    unit = '元';
  }
  if (asset['97']) $('#total-asset').html(pbUtils.comma(asset['97'], 2) + unit);
  if (asset['96']) $('#position').html(pbUtils.comma(asset['96'], 2) + unit);
  if (asset['111']) $('#available').html(pbUtils.comma(asset['111'], 2) + unit);
  if (asset['152']) $('#guarantee').html(pbUtils.comma(asset['152'], 2) + unit);
  if (asset['319']) $('#remargin').html(pbUtils.comma(asset['319'], 2) + unit);
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
  var data = msg.jData.data;
  if (data.length > 0) {
    var marketData = [], unique = [], marketInfo = [];
    stockInfo = [], symbolData = {};
    for (var i = 0, a = data.length; i < a; i++) {
      var market = data[i]['54'],
          code = data[i]['63'];
      var obj = {}, symbol = 0; //持仓信息(1：合约代码，2：成本价，3：当前数量，4：放大倍数，5：每手数量，6：买卖方向)
      marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(code, market)); //交易信息转换行情信息
      if (code.indexOf('&') >= 0) symbol = 1;
      if (!marketInfo.HQCode || !marketInfo.HQMarket || isNaN(parseFloat(data[i]['136'])) || symbol) {
        continue;
      }
      var rate = pbE.HQ().hqGetPriceRate(marketInfo.HQCode, marketInfo.HQMarket), //获取行情商品价格倍数
          handNum = pbE.WT().wtGetMSSL(code, market); //获取交易每手数量
      //合约代码
      obj['1'] = marketInfo.HQCode;
      //买入均价
      obj['2'] = data[i]['136'] - 0;
      //当前数量
      obj['3'] = data[i]['135'] - 0;
      //放大倍数
      obj['4'] = rate;
      //每手数量
      obj['5'] = handNum;
      //买卖方向
      obj['6'] = data[i]['112'];
      //基准价
      //obj['8'] = base;
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
    pbE.SYS().startLoading();
    pbE.HQ().hqSubscribe(0, JSON.stringify(symbolData));
  } else if (data.length <= 0) {
    pbE.SYS().stopLoading();
    stockInfo = [];
    pbE.SYS().storePrivateData("float", '0');
    $('#total-PL').removeClass();
    $('#total-PL').addClass('c1 bolder');
    $('#total-PL').html('0' + '元');
  }
}

function hqPart(msg) {
  var data = msg.jData.Data,
      base = 0, pl = 0, price = 0;
  for (var i = 0, l = stockInfo.length; i < l; i++) {
    for (var j = 0, ll = data.length; j < ll; j++) {
      if (stockInfo[i]['1'] == data[j]['10']) {
        base = pbE.HQ().hqGetLastBasePrice(stockInfo[i]['1'], stockInfo[i]['9']);
        if (data[j]['29'] && !isNaN(data[j]['29'])) {
          price = (data[j]['29'] - 0) / stockInfo[i]['4']; //获取现价/最新价
          if (price && !isNaN(price)) {
            pl = ((price - stockInfo[i]['2'] - 0).toFixed(4) - 0) * stockInfo[i]['3'] * stockInfo[i]['5'];
            if (stockInfo[i]['6'] == '1') {
              pl = 0 - pl;
            }
          }
        } else if (base && !isNaN(base)) {
          pl = ((base - stockInfo[i]['2'] - 0).toFixed(4) - 0) * stockInfo[i]['3'] * stockInfo[i]['5'];
          if (stockInfo[i]['6'] == '1') {
            pl = 0 - pl;
          }
        } else {
          pl = 0;
        }
        stockInfo[i]['7'] = pl;
        break;
      }
    }
  }

  var complete = false, totalPL = 0;
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
    if (totalPL > 0) {
      $('#total-PL').removeClass();
      $('#total-PL').addClass('c3');
      $('#total-PL').html('+' + pbUtils.comma(totalPL, 2) + '元');
    } else if (totalPL < 0) {
      $('#total-PL').removeClass();
      $('#total-PL').addClass('c4');
      $('#total-PL').html(pbUtils.comma(totalPL, 2) + '元');
    } else {
      totalPL = 0;
      $('#total-PL').removeClass();
      $('#total-PL').addClass('c1 bolder');
      $('#total-PL').html('0' + '元');
    }
    pbE.SYS().storePrivateData("float", pbUtils.comma(totalPL, 2) + '');
    if (p == 1) pbE.SYS().stopLoading();
  }
}

function confirm() {
  $('.my-modal').removeClass('hide');
}

function logout() {
  pbE.WT().wtLoginOut(CID);
  pbE.WT().wtSetCurrentAccLoginOutState();
  $('.my-modal').addClass('hide');
}

function cancel() {
  $('.my-modal').addClass('hide');
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

var stockInfo = [], p = 0, symbolData = {};
var CID = pbE.WT().wtGetCurrentConnectionCID();

$(function () {
    var option = {
        callbacks: [{fun: 6012, module: 90002, callback: function (msg) {
            if (msg.reservId == CID) {
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
              $('#position').html('--元');
              $('#guarantee').html('--元');
              $('#available').html('--元');
              $('#total-PL').html('--元');
              $('#remargin').html('--元');
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

    if(pbE.isPoboApp) {
      process(pbUtils.parseJSON(pbE.SYS().readConfig('option/conf/option.json')));
    } else{
      $.get('conf/option.json',process);
    }
});

function process(data) {
  console.log(data)
  var dat = data.index;
  var e = "",r = "",v = 0,h = '';

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
    dat.property.forEach(function (d) {
        h += '<li><p>'+d.name+'</p><p id="'+d.id+'">--</p></li>'
    })
    $('.position-row1 ul').html(h);
}

