var CustButton = React.createClass({
    displayName: 'CustButton',
    render: function () {
        var item = this.props.button;
        var cols = Math.ceil(item.length / 8);
        var btnWraps = [];
        var creatContents = function (content) {
            var style = {backgroundImage: 'url(images/' + content['image'] + ')', backgroundSize: '42px 42px'};
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'a',
                    {className: 'btn btn-default', style: style, href: content['url'], id: content['id']},
                    React.createElement(
                      'p',
                      null,
                      content['title']
                    ) 
                )
            );
        };
      
        var createBtns = function (contents) {
          return contents.map(creatContents);
        };
        
        for (var i = 0; i < cols; i++)
            btnWraps.push(React.createElement(
                'div',
                {className: 'btn-wrap'},
                React.createElement(
                  'div',
                  {className: 'btn-group clearfix'},
                  createBtns(item.slice(i * 8, i * 8 + 4))
                ),
                React.createElement(
                  'div',
                  {className: 'btn-group clearfix'},
                  createBtns(item.slice(i * 8 + 4, i * 8 + 8))
                )
            ));
        return React.createElement(
            'div',
            {className: 'area'},
            btnWraps
        );
    }
});

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

$('.my-modal-backdrop').click(cancel);

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
  
  var custom = data.customs.contents,
      length = custom.length,
      num = Math.ceil(length / 8);
  
  ReactDOM.render(React.createElement(CustButton, {button: custom}), document.getElementById('customized'));
  
  //图标滑动
  var inds = $(".indicator"), s = "";
  if (num > 1)
      for (var i = 0; i < num; i++)
          s += '<li' + (!i ? ' class="ind"' : '') + '></li> ';
  inds.html(s);

  var width = document.documentElement.clientWidth;
  $('#customized .area>div').css('float', 'left');
  $('.btn-group').css('width', width);
  $('.btn-group>div').css('width', width/4);
  $('#customized .area').css('width', width*num);
  $('#customized .area>div').css('width', width);
  $('#ind3').addClass('hide');
  $('#ind1').removeClass();
  $('#ind2').removeClass();
  $('#ind1').addClass('ind');
  
  if (navScroll)
      navScroll.destroy();
  if (num > 1) {
    inds = inds.find("li");
    navScroll = new IScroll('#customized', {
        eventPassthrough: true,
        scrollX: true,
        scrollY: false,
        preventDefault: false,
        snap: '.btn-wrap',
        tap: true,
        mouseWheelSpeed: 10
    });
    navScroll.on('scrollEnd', function () {
        inds.removeClass().eq(Math.floor(-this.x / width)).addClass("ind");
    });
  }
}

function queryMoneyPart (msg) {
  pbE.SYS().stopLoading();
  var content = msg.jData.data[0];
  if (content['97']) {
    $('#total-asset').html(pbUtils.comma(content['97'])+'元');  //总资产
  }
  if (content['93']) {
    $('#available').html(pbUtils.comma(content['93'])+'元');  //可用资金
  }
  if (content['96']) {
    $('#market').html(pbUtils.comma(content['96']) + '元');  //总市值
  }
  if (content['101']) {
    $('#float').html(pbUtils.comma(content['101']) + '元');  //持仓浮动盈亏
  }
}
  
function tradePart (msg) {
  pbE.SYS().stopLoading();
  var data = msg.jData.data;
  if (data.length > 0) {
    stockInfo = [];
    var marketData = [], unique = [], marketInfo = [];
    symbolData = {};
    for (var i = 0; i < data.length; i++) {
      var market = data[i]['54'],
          code = data[i]['63'];
      var obj = {}, symbol = 0; //持仓信息(1：合约代码，2：成本价，3：当前数量，4：放大倍数，5：每手数量，6：买卖方向)
      marketInfo = pbUtils.parseJSON(pbE.WT().wtGetHQInfo(code, market)); //交易信息转换行情信息
      if (code.indexOf('&') >= 0) symbol = 1;
      if (!marketInfo.HQCode || !marketInfo.HQMarket || isNaN(parseFloat(data[i]['136'])) || symbol) {
        continue;
      }
      var rate = pbE.HQ().hqGetPriceRate(marketInfo.HQCode, marketInfo.HQMarket); //获取行情商品价格倍数
          //base = pbEngine.getHQLastBasePrice(marketInfo.HQCode, marketInfo.HQMarket); //获取基准价
      //合约代码
      obj['1'] = marketInfo.HQCode;
      //成本价
      obj['2'] = data[i]['139'] - 0;
      //当前数量
      obj['3'] = data[i]['135'] - 0;
      //放大倍数
      obj['4'] = rate;
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
    pbE.HQ().hqSubscribe(0, JSON.stringify(symbolData));
  } else if (data.length <= 0) {
    pbE.SYS().stopLoading();
    stockInfo = [];
    $('#float').removeClass();
    $('#float').addClass('c1 bolder');
    $('#float').html('0' + '元');
  }
}

function hqPart (msg) {
  var data = msg.jData.Data,
      price, pl, base;
  for (var i = 0, l = stockInfo.length; i < l; i++) {
    for (var j = 0, ll = data.length; j < ll; j++) {
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
    if (p == 1) pbE.SYS().stopLoading();
    if (totalPL > 0) {
      $('#float').removeClass();
      $('#float').addClass('c3');
      $('#float').html('+' + pbUtils.comma(totalPL, 2) + '元');
    } else if (totalPL < 0) {
      $('#float').removeClass();
      $('#float').addClass('c4');
      $('#float').html(pbUtils.comma(totalPL, 2) + '元');
    } else {
      $('#float').removeClass();
      $('#float').addClass('c1 bolder');
      $('#float').html('0' + '元');
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

var stockInfo = [],
    CID = pbE.WT().wtGetCurrentConnectionCID(),
    navScroll,
    symbolData = {},
    p = 0;

$(function () {
  var option = {
      callbacks: [{fun: 6012, module: 90002, callback: function (msg) {
          if (msg.reservId == CID){queryMoneyPart(msg);}
      }},
          {fun: 6014, module: 90002, callback: function (msg) {
              if (msg.reservId == CID){tradePart(msg);}
          }},

          {module: 90000, callback: function(msg){
              hqPart(msg);
          }}],

      reload: function () {
          $('.my-modal').addClass('hide');
          var temp = CID;
          CID = pbE.WT().wtGetCurrentConnectionCID(), p = 0, stockInfo = [];
          if (temp != CID) {
            $('#total-asset').html('--元');
            $('#market').html('--元');
            $('#float').html('--元');
            $('#available').html('--元');
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
  
  if (!isApp) {
    $.get('../conf/margin.json',process);
  } else {
    process(pbUtils.parseJSON(pbE.SYS().readConfig('margin/conf/margin.json')));
  }

  userInfo(CID);
  pbE.SYS().startLoading();
  pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
  pbE.WT().wtQueryStock(CID, JSON.stringify({}));
});