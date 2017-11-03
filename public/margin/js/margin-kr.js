if (!pbE.isPoboApp) {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtGeneralRequest: function () {
                  var data = {functionNO: '7106',
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
    DATA = msg.jData.data;
    //alert("返回数据合约条数"+data.length+"总数"+msg.jData['7']);
    if (DATA.length == 0) {
      $('.content').addClass('hide');
      $('#alert').removeClass('hide');
      $('.col-my-1').css('border-bottom', '1px solid #e4e7f0');
    } else {
      $('.content').removeClass('hide');
      $('#alert').addClass('hide');
      $('.col-my-1').css('border-bottom', '');
      if (DATA.length > 100) {
        DATA = DATA.slice(0, 40);
      }
      for (var i = 0, m = DATA.length; i < m; i++) {
        for (var j = 0, n = conf.kr.title.length; j < n; j++) {
          if (DATA[i][conf.kr.title[j].code]) {
            $('#title' + j + ' .content').append('<p>' + DATA[i][conf.kr.title[j].code] + '</p>');
          } else {
            $('#title' + j + ' .content').append('<p>——</p>');
          }
        }
      }
    }
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID(),
    conf,
    DATA = [];

$(function () {
  $('#alert').addClass('hide');
  $('#searchButton').unbind("click");
  
  if (!pbE.isPoboApp) {
    conf = $.get('../conf/margin.json', function (data) {conf = data;});
    /*conf = {
      "kr": {
        "barName": "查询可融证券",
        "search": {'flag': '1', 'placeholder': '请输入您要查询的可融证券', 'item': '证券名称', 'code': '513'},
        "title": [{'name':'交易市场','code':'55'},
                  {'name':'证券代码','code':'512'},
                  {'name':'证券名称','code':'513'},
                  {'name':'可用数量','code':'137'}],
        "functionNO": 7106
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
  
  var option = {
    callbacks: [{ fun: parseInt(conf.kr.functionNO), module: 90002, callback: function (msg) {
        creditDebt(msg);
      }
    }],

    reload: function () {},

    refresh: function () {
      $('#alert').addClass('hide');
      pbE.SYS().startLoading();
      pbE.WT().wtGeneralRequest(CID, parseInt(conf.kr.functionNO), JSON.stringify({}));
    },

    doShow: function (flag) {
      if (!flag) {
        pbE.SYS().stopLoading();
      }
    },
    
    fresh: function () {}
  };
  
  pbPage.initPage(option);
  
  for (var i = 0; i < conf.kr.title.length; i++) {
    $('#title').append('<div class="col-my-1" id="title' + i + '"><p class="title">' + conf.kr.title[i].name + '</p><div class="content"></div></div>');
  }

  pbE.SYS().startLoading();
  pbE.WT().wtGeneralRequest(CID, parseInt(conf.kr.functionNO), JSON.stringify({}));
  
  $('.searchButton').click(function () {
    for (var i = 0, a = DATA.length; i < a; i++) {
      if ($('#search').val() == DATA[i]['512']) {
        $('.content').addClass('hide');
        for (var j = 0, b = conf.kr.title.length; j < b; j++) {
          $('#title' + j).append('<div class="content1"></div>');
        }
        for (var k = 0, c = conf.kr.title.length; k < c; k++) {
          $('#title' + k + ' .content1').append('<p class=row' + i + '>' + DATA[i][conf.kr.title[k].code] + '</p>');
        }
        break;
      }
    }
    if (i >= DATA.length) {
      alert("请输入正确的证券代码");
    }
  });
  
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