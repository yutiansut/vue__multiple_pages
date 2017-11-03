var isApp = typeof pbE != 'undefined';
if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtGeneralRequest: function () {
                  var data = {functionNO: '7009',
                              moduleId: 90002,
                              jData:{'1': 1,
                                     'data': [
                                       {'54': '上海', '55':'HZ', '512':'CU1788', '513':'沪铜1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1789', '513':'沪银1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1786', '513':'铅铝1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1785', '513':'石油1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1788', '513':'沪铜1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1789', '513':'沪银1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1786', '513':'铅铝1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1785', '513':'石油1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1788', '513':'沪铜1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1789', '513':'沪银1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1786', '513':'铅铝1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1785', '513':'石油1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1788', '513':'沪铜1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1789', '513':'沪银1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1786', '513':'铅铝1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1785', '513':'石油1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1788', '513':'沪铜1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1789', '513':'沪银1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1786', '513':'铅铝1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1785', '513':'石油1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1788', '513':'沪铜1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1789', '513':'沪银1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1786', '513':'铅铝1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1785', '513':'石油1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1788', '513':'沪铜1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1789', '513':'沪银1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1786', '513':'铅铝1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1785', '513':'石油1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1788', '513':'沪铜1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1789', '513':'沪银1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1786', '513':'铅铝1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1785', '513':'石油1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1788', '513':'沪铜1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1789', '513':'沪银1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1786', '513':'铅铝1789', '137': '123'},
                                       {'54': '上海', '55':'HZ', '512':'CU1785', '513':'石油1789', '137': '123'}
                                     ]
                                    }
                             };
                  callback(JSON.stringify(data));
                },
              wtGetJYGT: function () {return '101';}
            };
            return obj;
        },
        SYS: function () {
            var obj1 = {
                startLoading: function () {},
                stopLoading: function () {},
                readConfig: function () {}
            };
            return obj1;
        }
    }
}

function creditDebt (msg) {
  pbE.SYS().stopLoading();
  if (msg.jData['1'] < 0) {
    //错误信息
    alert(msg.jData['2']);
    return;
  } else {
    var data = msg.jData.data;
    //alert("返回数据合约条数"+data.length+"总数"+msg.jData['7']);
    if (data.length == 0) {
      $('.content').addClass('hide');
      $('#alert').removeClass('hide');
      $('.col-my-1').css('border-bottom', '1px solid #e4e7f0');
    } else {
      $('.content').removeClass('hide');
      $('#alert').addClass('hide');
      $('.col-my-1').css('border-bottom', '');
      if (data.length > 100) {
        data = data.slice(0, 40);
      }
      for (var i = 0, m = data.length; i < m; i++) {
        for (var j = 0, n = conf.kzdb.title.length; j < n; j++) {
          if (data[i][conf.kzdb.title[j].code]) {
            $('#title' + j + ' .content').append('<p>' + data[i][conf.kzdb.title[j].code] + '</p>');
          } else {
            $('#title' + j + ' .content').append('<p>——</p>');
          }
        }
      }
    }
  }
}

function checkAcc(msg) {
  if (msg.jData['1'] < 0) {
    alert(msg.jData['2']);
    return;
  } else {
    $('.my-modal').addClass('hide');
    pbE.SYS().startLoading();
    pbE.WT().wtGeneralRequest(CID, 7009, JSON.stringify({}));
  }
}

//可转入担保证券，输入普通证券账号和密码之后，点击确定
function confirm() {
  var obj1 = document.getElementById("account");
  var obj2 = document.getElementById("pwd");
  if(pbUtils.JTrim(obj1.value) == '') {
    alert("请输入客户号！");
    return;
  } else if(pbUtils.JTrim(obj2.value) == '') {
    alert("请输入交易密码！");
    return;
  } else {
    var par = {
      '50': $('#account').val(),  //客户号
      '58': pbE.WT().wtEncrypt(CID,$('#pwd').val())  //交易密码
    };
    pbE.SYS().startLoading();
    pbE.WT().wtGeneralRequest(CID, 6150, JSON.stringify(par));
    /*alert(transfer['52'] + '***1' + transfer['512'] + '***2' + transfer['54'] + '***3' + transfer['617']);*/
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID(),
    conf;

$(function () {
  $('#alert').addClass('hide');

  if (!isApp) {
    conf = $.get('../conf/margin.json', function (data) {conf = data;});
    /*conf = {
      "kzdb": {
        "barName": "可转入担保证券查询",
        "search": {'flag': '0', 'placeholder': '', 'item': '', 'code': ''},
        "title": [{'name':'证券代码','code':'512'},
                  {'name':'证券名称','code':'513'},
                  {'name':'交易市场','code':'55'},
                  {'name':'币种','code':'57'},
                  {'name':'盈亏金额','code':'614'},
                  {'name':'当前数量','code':'135'},
                  {'name':'可用数量','code':'137'},
                  {'name':'保本价','code':'140'},
                  {'name':'最新价','code':'138'},
                  {'name':'证券市值','code':'142'},
                  {'name':'浮动盈亏','code':'141'},
                  {'name':'累计盈亏','code':'143'},
                  {'name':'成本价','code':'139'},
                  {'name':'昨持仓量','code':'2002'},
                  {'name':'买入均价','code':'136'},
                  {'name':'买入金额','code':'148'},
                  {'name':'卖出金额','code':'149'},
                  {'name':'冻结数量','code':'145'},
                  {'name':'未交收数量','code':'146'},
                  {'name':'利息报价','code':'150'},
                  {'name':'非流通数量','code':'151'},
                  {'name':'非流通市值','code':'615'},
                  {'name':'开仓日期','code':'147'},
                  {'name':'股东账号','code':'52'}],
        "functionNO":7009
      }
    };*/
  } else {
    conf = pbUtils.parseJSON(pbE.SYS().readConfig('margin/conf/margin.json'));
  }

  if (!isApp) {
    $('#goBack').click(function () {
      location.href = document.referrer;
    })
  } /*else{
    $('#goBack').click(function () {
      location.href = 'goBack';
    })
  }*/

  var option = {
    callbacks: [{ fun: parseInt(conf.kzdb.functionNO), module: 90002, callback: function (msg) {creditDebt(msg);}},
               {fun: 6150, module: 90002, callback: function (msg) {checkAcc(msg);}}
               ],

    reload: function () {},

    refresh: function () {
      $('#alert').addClass('hide');
      pbE.SYS().startLoading();
      pbE.WT().wtGeneralRequest(CID, parseInt(conf.kzdb.functionNO), JSON.stringify({}));
    },

    doShow: function (flag) {
      if (!flag) {
        pbE.SYS().stopLoading();
      }
    },

    fresh: function () {}
  };

  pbPage.initPage(option);

  for (var i = 0; i < conf.kzdb.title.length; i++) {
    $('#title').append('<div class="col-my-1" id="title' + i + '"><p class="title">' + conf.kzdb.title[i].name + '</p><div class="content"></div></div>');
  }

  var gtCode = pbE.WT().wtGetJYGT();
  if (gtCode == '101' || gtCode == '105') {
    $('.my-modal').removeClass('hide');
    var khh = JSON.parse(pbE.WT().wtLoginRe(CID)).data[0]['50'];
    if(khh && khh != '' && khh != undefined){
      $('#account').val(khh);
    }
  } else {
    pbE.SYS().startLoading();
    pbE.WT().wtGeneralRequest(CID, parseInt(conf.kzdb.functionNO), JSON.stringify({}));
  }

  var width = document.documentElement.clientWidth;
  var num = $('#title').children('div').length;
  var subWidth = width / 4;
  $('#title>div').css('width', subWidth);
  $('#title').css('width', subWidth * num);

  $(document).ready(function () {
    try {
      var btnScroll = new IScroll('#title-wrap', {
        eventPassthrough: true,
        scrollX: true,
        scrollY: false,
        preventDefault: false,
        snap: '#title div',
        tap: true
      });
      btnScroll.on('scrollEnd', function () {
        /*if (this.x <= -subWidth) {
          $('#right').addClass('hide');
          $('#left').removeClass('hide');
        } else if (this.x == 0) {
          $('#left').addClass('hide');
          $('#right').removeClass('hide');
        }*/
      });
    } catch (e) {}
  });
});