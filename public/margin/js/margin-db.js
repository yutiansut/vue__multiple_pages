var isApp = typeof pbE != 'undefined';
if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtGeneralRequest: function () {
                  var data = {functionNO: '7000',
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
                stopLoading: function () {}
            };
            return obj1;
        }
    }
}

function dbQuery (msg) {
  pbE.SYS().stopLoading();
  if (msg.jData['1'] < 0) {
    //错误信息
    alert(msg.jData['2']);
    if (clickFlag) {
      clickFlag = 0;
    }
    return;
  } else {
    var data = msg.jData.data;
    //alert("返回数据合约条数"+data.length+"总数"+msg.jData['7']);
    if (data.length == 0) {
      $('.content').addClass('hide');
      $('#more').addClass('hide');
      $('#indicator').addClass('hide');
      $('#alert').removeClass('hide');
      $('.col-my-1').css('border-bottom', '1px solid #e4e7f0');
    } else {
      $('.content').removeClass('hide');
      $('#alert').addClass('hide');
      $('#indicator').removeClass('hide');
      $('.col-my-1').css('border-bottom', '');
      if (data.length > 100) {
        data = data.slice(0, 40);
      }
      if (requestNum == 1) {
        //第一次进入页面查询
        total = msg.jData['7'];
        if (!isNaN(total)) {
          pageNum = Math.ceil(total / 100); //总页数
          $('#total').html(pageNum); //取大于等于的整数
        }
      }
      if (clickFlag == 1) {
        //点击筛选
        $('#more').addClass('hide');
        $('#indicator').addClass('hide');
        for (var j = 0; j < conf.db.title.length; j++) {
          $('#title' + j + ' .content').empty();
        }
        clickFlag = 0;
      } else if (requestNum > 1 && pageFlag == 1) {
        //分页
        pageFlag = 0;
        page++;
        $('#more').addClass('hide');
        $('#num').html(page);
      }
      for (var i = 0, m = data.length; i < m; i++) {
        for (var j = 0, n = conf.db.title.length; j < n; j++) {
          if (data[i][conf.db.title[j].code]) {
            $('#title' + j + ' .content').append('<p>' + data[i][conf.db.title[j].code] + '</p>');
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
    start = 1,
    end = 100,
    page = 1,
    pageNum,
    total,
    requestNum = 1,
    clickFlag = 0,
    pageFlag = 0;

$(function () {
  $('.content').removeClass('hide');
  $('#alert').addClass('hide');
  $('#searchButton').unbind("click");
  $('.searchButton').click(function () {
    if (clickFlag == 0) {
      $('#more').addClass('hide');
      $('#indicator').addClass('hide');
      clickFlag = 1;
      var market = pbE.WT().wtGetGPTradeMarketFromHQCode($('#search').val());
      if (!market) {
        alert("请输入正确的证券代码");
        clickFlag = 0;
      } else {
        var par = { '54': market, '512': $('#search').val() };
        pbE.SYS().startLoading();
        pbE.WT().wtGeneralRequest(CID, parseInt(conf.db.functionNO), JSON.stringify(par));
      }
    }
  });
  
  if (!isApp) {
    conf = $.get('../conf/margin.json', function (data) {conf = data;});
    /*conf = {
      "db":{
        "barName": "查询担保证券",
        "search": {'flag': '1', 'placeholder': '请输入您要查询的担保证券', 'item': '证券名称', 'code': '513'},
        "title": [{'name':'市场名称','code':'55'}, 
                  {'name':'证券代码','code':'512'}, 
                  {'name':'证券名称','code':'513'}, 
                  {'name':'担保品折算比例','code':'588'}, 
                  {'name':'担保品浮动比例','code':'587'}, 
                  {'name':'担保状态','code':'586'}, 
                  {'name':'融资比例','code':'642'}, 
                  {'name':'融券比例','code':'643'}
                 ],
        "functionNO":7000
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
    callbacks: [{ fun: parseInt(conf.db.functionNO), module: 90002, callback: function (msg) {
        dbQuery(msg);
      }
    }],

    reload: function () {},

    refresh: function () {
      $('.content').removeClass('hide');
      $('#alert').addClass('hide');
      var data = { '9': start.toString(), '10': end.toString() };
      pbE.SYS().startLoading();
      pbE.WT().wtGeneralRequest(CID, parseInt(conf.db.functionNO), JSON.stringify(data));
    },

    doShow: function (flag) {
      if (!flag) {
        pbE.SYS().stopLoading();
      }
    },
    
    fresh: function () {}
  };
  
  pbPage.initPage(option);
  
  for (var i = 0; i < conf.db.title.length; i++) {
    $('#title').append('<div class="col-my-1" id="title' + i + '"><p class="title">' + conf.db.title[i].name + '</p><div class="content"></div></div>');
  }

  var data = { '9': start.toString(), '10': end.toString() };
  pbE.SYS().startLoading();
  pbE.WT().wtGeneralRequest(CID, parseInt(conf.db.functionNO), JSON.stringify(data));
  
  var totalheight;
  window.onscroll = function () {
    //监听事件内容
    totalheight = parseFloat($(window).height()) + parseFloat($(window).scrollTop());
    if ($(document).height() <= totalheight) {
      if (page == pageNum) {
        $('#more').addClass('hide');
        return;
      } else if (page < pageNum) {
        $('#more').removeClass('hide');
        start += end;
        if (page == pageNum - 1) {
          var data1 = { '9': start.toString(), '10': (total - 100 * (pageNum - 1)).toString() };
        } else {
          var data1 = { '9': start.toString(), '10': end.toString() };
        }
        requestNum++;
        pbE.SYS().startLoading();
        //alert("请求数据起始"+data1['9']+"条数"+data1['10']);
        if (requestNum == 2 || requestNum > 2 && pageFlag == 0) {
          pageFlag = 1;
          pbE.WT().wtGeneralRequest(CID, parseInt(conf.db.functionNO), JSON.stringify(data1));
        }
      }
    }
  };
  
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