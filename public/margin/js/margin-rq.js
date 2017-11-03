if (!pbE.isPoboApp) {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtGeneralRequest: function () {
                  var data = {functionNO: '7006',
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
                }
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
        for (var j = 0, n = conf.rq.title.length; j < n; j++) {
          if (data[i][conf.rq.title[j].code]) {
            $('#title' + j + ' .content').append('<p>' + data[i][conf.rq.title[j].code] + '</p>');
          } else {
            $('#title' + j + ' .content').append('<p>——</p>');
          }
        }
      }
    }
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID(),
    conf;

$(function () {
  $('#alert').addClass('hide');
  
  if (!pbE.isPoboApp) {
    $.get('../conf/margin.json', function (data) {conf = data;});
    /*conf = {
      "rq": {
        "barName": "融券明细",
        "search": {'flag': '0', 'placeholder': ''},
        "title": [{'name':'交易市场','code':'55'},
                  {'name':'币种','code':'57'},
                  {'name':'证券代码','code':'512'},
                  {'name':'证券名称','code':'513'},
                  {'name':'买卖类别','code':'270'},
                  {'name':'发生日期','code':'202'},
                  {'name':'融资数量','code':'589'},
                  {'name':'融资金额','code':'590'},
                  {'name':'融券数量','code':'591'},
                  {'name':'融券金额','code':'592'},
                  {'name':'负债金额','code':'601'},
                  {'name':'负债数量','code':'602'},
                  {'name':'负债状态','code':'609'},
                  {'name':'负债利息','code':'603'},
                  {'name':'负债利率','code':'604'},
                  {'name':'已经还款本金','code':'605'},
                  {'name':'已经还款利息','code':'606'},
                  {'name':'已经还券数量','code':'607'},
                  {'name':'归还截止日期','code':'610'},
                  {'name':'最近还款还券日期','code':'611'},
                  {'name':'直接还款金额','code':'612'},
                  {'name':'流水号','code':'383'},
                  {'name':'委托价格','code':'129'},
                  {'name':'业务类型','code':'422'},
                  {'name':'股东账号','code':'52'}],
        "functionNO": 7006
      }
    };*/
  } else {
    conf = pbUtils.parseJSON(pbE.SYS().readConfig('margin/conf/margin.json'));
  }
  
  if (!pbE.isPoboApp) {
    $('#goBack').click(function () {
      location.href = document.referrer;
    })
  } /*else{
    $('#goBack').click(function () {
      location.href = 'goBack';
    })
  }*/
  console.log(conf.rz)
  var option = {
    callbacks: [{ fun: parseInt(conf.rq.functionNO), module: 90002, callback: function (msg) {
        creditDebt(msg);
      }
    }],

    reload: function () {},

    refresh: function () {
      $('#alert').addClass('hide');
      pbE.SYS().startLoading();
      pbE.WT().wtGeneralRequest(CID, parseInt(conf.rq.functionNO), JSON.stringify({}));
    },

    doShow: function (flag) {
      if (!flag) {
        pbE.SYS().stopLoading();
      }
    },
    
    fresh: function () {}
  };
  
  pbPage.initPage(option);
  
  for (var i = 0; i < conf.rq.title.length; i++) {
    $('#title').append('<div class="col-my-1" id="title' + i + '"><p class="title">' + conf.rq.title[i].name + '</p><div class="content"></div></div>');
  }

  pbE.SYS().startLoading();
  pbE.WT().wtGeneralRequest(CID, parseInt(conf.rq.functionNO), JSON.stringify({}));
  
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