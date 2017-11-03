var isApp = typeof pbE != 'undefined';
if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtGeneralRequest: function () {
                  var data = {functionNO: '7007',
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

function query() {
  pbE.SYS().startLoading();
  pbE.WT().wtGeneralRequest(CID, parseInt(conf['debt-recd'].functionNO), JSON.stringify(dataTime));
}

function creditDebt (msg) {
  pbE.SYS().stopLoading();
  if (msg.jData['1'] < 0) {
    //错误信息
    alert(msg.jData['2']);
    return;
  } else {
    var CONTENTS = msg.jData.data;
    /*sortDeal(CONTENTS);*/
    if (CONTENTS.length == 0) {
      $('.content').addClass('hide');
      $('#alert').removeClass('hide');
    } else {
      $('.content').removeClass('hide');
      $('#alert').addClass('hide');
      for (var i = 0; i < CONTENTS.length; i++) {
        for (var j = 0; j < conf['debt-recd'].title.length; j++) {
          if (CONTENTS[i][conf['debt-recd'].title[j].code]) {
            $('#title' + j + ' .content').append('<p class=row' + i + '>' + CONTENTS[i][conf['debt-recd'].title[j].code] + '</p>');
          } else {
            $('#title' + j + ' .content').append('<p class=row' + i + '>——</p>');
          } 
        }
      }
    }
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID(),
    conf,
    dataTime;

$(function () {
  $('#alert').addClass('hide');
  
  if (!isApp) {
    conf = $.get('../conf/margin.json', function (data) {conf = data;});
    /*conf = {
      "debt-recd": {
        "barName": "负债流水",
        "search": {'flag': '0', 'placeholder': '', 'item1': '', 'item2':''},
        "title": [{'name':'交易市场','code':'55'}, 
                  {'name':'流水号','code':'383'}, 
                  {'name':'买卖类别','code':'270'}, 
                  {'name':'客户姓名','code':'74'}, 
                  {'name':'证券代码','code':'512'}, 
                  {'name':'证券名称','code':'513'}, 
                  {'name':'发生日期','code':'202'}, 
                  {'name':'发生时间','code':'203'}, 
                  {'name':'发生数量','code':'508'}, 
                  {'name':'发生金额','code':'382'}, 
                  {'name':'清算标志','code':'613'}, 
                  {'name':'备注','code':'163'}, 
                  {'name':'股东账号','code':'52'}],
        "functionNO": "7007",
        "history": "1"
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
  
  var dateYesterday = new Date();
  dateYesterday = new Date(dateYesterday.getTime() - 1000*60*60*24*1);
  var strYesterday = pbUtils.dateFormat(dateYesterday, 'yyyyMMdd');
  
  var dataTime = {
    '56': '',
    '171': strYesterday,
    '172': strYesterday
  };

  var dateFrom = pikadayResponsive($('#date-from')[0],{
    format: 'YYYY-MM-DD',
    outputFormat: 'YYYYMMDD',
    placeholder: '起始日期'
  });
  var dateTo = pikadayResponsive($('#date-to')[0],{
    format: 'YYYY-MM-DD',
    outputFormat: 'YYYYMMDD',
    placeholder: '终止日期'
  });
  dateFrom.setDate(moment(strYesterday, 'YYYYMMDD'), 'YYYY-MM-DD');
  dateTo.setDate(moment(strYesterday, 'YYYYMMDD'), 'YYYY-MM-DD');
  $('#date-from').change(function(e) {
    if ($('#date-from').val() <= $('#date-to').val()) {
      dataTime = {
        '56': '',
        '171': $('#date-from').val(),
        '172': $('#date-to').val()
      };
    } else {
      alert('起始日期不得晚于终止日期');
    }
  });
  $('#date-to').change(function(e) {
    if ($('#date-to').val() >= $('#date-from').val() && $('#date-to').val() <= strYesterday) {
      dataTime = {
        '56': '',
        '171': $('#date-from').val(),
        '172': $('#date-to').val()
      };
    } else if ($('#date-to').val() > strYesterday) {
      alert('终止日期不得晚于昨天');
    } else if ($('#date-to').val() < $('#date-from').val()) {
      alert('终止日期不得早于起始日期');
    }
  });
  
  var option = {
    callbacks: [{ fun: parseInt(conf['debt-recd'].functionNO), module: 90002, callback: function (msg) {
        creditDebt(msg);
      }
    }],

    reload: function () {},

    refresh: function () {
      $('#alert').addClass('hide');
      pbE.SYS().startLoading();
      pbE.WT().wtGeneralRequest(CID, parseInt(conf['debt-recd'].functionNO), JSON.stringify(data));
    },

    doShow: function (flag) {
      if (!flag) {
        pbE.SYS().stopLoading();
      }
    },
    
    fresh: function () {}
  };
  
  pbPage.initPage(option);
  
  for (var i = 0; i < conf['debt-recd'].title.length; i++) {
    $('#title').append('<div class="col-my-1" id="title' + i + '"><p class="title">' + conf['debt-recd'].title[i].name + '</p><div class="content"></div></div>');
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