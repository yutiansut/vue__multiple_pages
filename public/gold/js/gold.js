var isApp = typeof pbE != 'undefined';
if (typeof pbE == 'undefined') {
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
                 },
                wtGetMSSL: function () {},
                wtQueryEntrust: function () {},
                wtLoginRe:function () {
                   return '{"data":[{"51":"123","74":"刘","50":"456"}]}';
                 },
                 wtGetLoginList:function () {
                   return '{"Accinfo":[{"AccType": "a"}]}';
                 },
                 wtLoginOut: function () {},
                 wtSetCurrentAccLoginOutState: function () {}
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
  var content = msg.jData.data[0];
  if (content['93'] && !isNaN(content['93'])) {
    $('#available').html(pbUtils.comma(content['93']) + '元');
  }
  if (content['182'] && !isNaN(content['182'])) {
    $('#commission').html(pbUtils.comma(content['182']) + '元');
  }
  if (content['94'] && !isNaN(content['94'])) {
    $('#frozen').html(pbUtils.comma(content['94']) + '元');
  }
  if (content['152'] && !isNaN(content['152'])) {  //持仓保证金
    $('#chicang').html(pbUtils.comma(content['152']) + '元');
  }
  if (content['97'] && !isNaN(content['97'])) {  //如果柜台返回了总资产则不需前端计算
    $('#total-asset').html(pbUtils.comma(content['97'], 2) + '元');
  } else if (content['98']) {  //柜台没有返回总资产，但是返回来资金资产总值
    asset = content['98'];  //资金资产总值 
  } else if (content['93'] && content['94'] && content['152']) {  //都没有返回，前端计算资金资产总值
    asset = (content['93'] - 0) + (content['94'] - 0) + (content['152'] - 0);  //可用资金+冻结资金+保证金(152字段) = 资金资产总值
  }
}

function tradePart(msg) {
  pbE.SYS().stopLoading();
  position = msg.jData.data;
  if (position.length > 0) {
    var marketData = [], unique = [], marketInfo = [];
    for (var i = 0; i < position.length; i++) {
      position[i]['flag'] = 0;
      var market = position[i]['54'],
          code = position[i]['63'];
      var symbol = 0; //持仓信息(1：合约代码，2：成本价，3：当前数量，4：放大倍数，5：每手数量，6：买卖方向)
      marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(code, market));  //交易信息转换行情信息
      if (code.indexOf('&') >= 0) symbol = 1;
      if (!marketInfo.HQCode || !marketInfo.HQMarket || isNaN(position[i]['136']) || symbol) {
        position[i]['flag'] = 1;
      }
      position[i]['market'] = marketInfo.HQMarket;
      position[i]['code'] = marketInfo.HQCode;
      var rate = pbE.HQ().hqGetPriceRate(marketInfo.HQCode, marketInfo.HQMarket), //获取行情商品价格倍数
          handNum = pbE.WT().wtGetMSSL(code, market); //获取交易每手数量
      position[i]['rate'] = rate;
      position[i]['handNum'] = handNum;
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
  } else if (position.length <= 0) {
    pbE.SYS().stopLoading();
    if (!asset) asset = 0;
    $('#contents').empty();
    $('#total-asset').html(pbUtils.comma(asset, 2) + '元');
    $('#kaicang').html('0' + '元');
  }
}

function hqPart(msg) {
  var data = msg.jData.Data;
  for (var i=0,l=position.length; i<l; i++) {
    for (var j=0,ll=data.length; j<ll; j++) {
      var lastPrice,
          pl,
          base; 
      if (position[i]['code'] == data[j]['10']) {
        base = pbE.HQ().hqGetLastBasePrice(position[i]['code'], position[i]['market']);
        if (data[j]['29'] && !isNaN(data[j]['29'])) {
          lastPrice = (data[j]['29'] - 0) / position[i]['rate'];  //获取现价/最新价
          pl = ((lastPrice - position[i]['136']).toFixed(4) - 0) * position[i]['135'] * position[i]['handNum'];
          if (position[i]['112'] == '1') {
            pl = 0 - pl;
          }
          //浮动盈亏
          position[i]['profit'] = pl;
        } else if (base && !isNaN(base)) {
          pl = ((base - position[i]['136'] - 0).toFixed(4) - 0) * position[i]['135'] * position[i]['handNum'];
          if (position[i]['112'] == '1') {
            pl = 0 - pl;
          } 
          position[i]['profit'] = pl;
        } else {
          position[i]['profit'] = 0;
        }
        break;
      }
    }
  }

  var complete = false, totalPL = 0, profit = 0;
  for (var i = 0, l = position.length; i < l; i++) {
    profit = position[i]['profit'];
    if (typeof profit == 'undefined' || isNaN(profit)) {
      complete = false;
      break;
    } else {
      totalPL = totalPL + profit;
      complete = true;
    }
  }

  if (complete) {
    if (!asset) {  //asset没有值，要么总资产柜台已返回所有没有赋值，要么资金资产总值没有计算出来
      if ($('#total-asset').html() !== '--元') {  //总资产柜台已返回
        $('#kaicang').html(pbUtils.comma(totalPL, 2) + '元');
      } else {
        asset = 0;
        $('#total-asset').html(pbUtils.comma(totalPL, 2) + '元');
        $('#kaicang').html(pbUtils.comma(totalPL, 2) + '元');
      }
    } else {
      $('#total-asset').html(pbUtils.comma(totalPL + (asset - 0), 2) + '元');
      $('#kaicang').html(pbUtils.comma(totalPL, 2) + '元');
    }
    p++;
    if (p == 1) pbE.SYS().stopLoading();
  }
}

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

var asset,  //资金资产总值
    position = [],
    p = 0,
    CID = pbE.WT().wtGetCurrentConnectionCID(),
    symbolData = {};

$(function () {
  $('.my-modal').addClass('hide');
  
  $('.my-modal-backdrop').click(cancel);
  
  pbE.SYS().storePrivateData("tihuo", '');
  pbE.SYS().storePrivateData("position", '');
  pbE.SYS().storePrivateData("flag", '1,0,1,0');
  
  var option = {
    callbacks: [{ fun: 6012, module: 90002, callback: function (msg) {
        if (msg.reservId == CID){queryMoneyPart(msg);}
      }
    }, { fun: 6014, module: 90002, callback: function (msg) {
        if (msg.reservId == CID){tradePart(msg);}
      }
    }, { module: 90000, callback: function (msg) {
        hqPart(msg);
      }
    }],

    reload: function () {
      pbE.SYS().storePrivateData("tihuo", '');
      pbE.SYS().storePrivateData("position", '');
      pbE.SYS().storePrivateData("flag", '1,0,1,0');
      
      var temp = CID;
      $('.my-modal').addClass('hide');
      CID = pbE.WT().wtGetCurrentConnectionCID();
      p = 0, position = [];
      if (temp != CID) {
        $('#available').html('--元');
        $('#commission').html('--元');
        $('#frozen').html('--元');
        $('#chicang').html('--元');
        $('#total-asset').html('--元');
        $('#kaicang').html('--元');
        userInfo(CID);
      }
      pbE.SYS().startLoading();
      pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
      pbE.WT().wtQueryStock(CID, JSON.stringify({}));
    },

    refresh: function () {
      //点击按钮主动刷新，把refreshFlag置为0
      p = 0;
      pbE.SYS().startLoading();
      pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
      pbE.WT().wtQueryStock(CID, JSON.stringify({}));
    },

    doShow: function (flag) {
      if (!flag) {
        pbE.SYS().stopLoading();
        //pbE.HQ().hqUnSubscribe(0, JSON.stringify(symbolData));
        pbE.SYS().storePrivateData("tihuo", '');
        pbE.SYS().storePrivateData("flag", '');
        pbE.SYS().storePrivateData("position", '');
      }
    },
    
    fresh: function () {}
  };

  pbPage.initPage(option);
  
  if (!isApp) {
    $.get('conf/gold.json',process);
  } else {
    process(pbUtils.parseJSON(pbE.SYS().readConfig('gold/conf/gold.json')));
  }

  userInfo(CID);
  pbE.SYS().startLoading();
  pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
  pbE.WT().wtQueryStock(CID, JSON.stringify({}));
});