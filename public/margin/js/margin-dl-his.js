var isApp = typeof pbE != 'undefined';
if(!isApp){
  window.pbE = {
    WT:function () {
     var obj = {
       wtGetCurrentConnectionCID:function () {},
       wtGeneralRequest:function() {
         var data = {
           moduleId: 90002,
           functionNO: 6053,
           jData: {
             data: [
               {
                 '112': '0',
                 '117': '1',
                 '133': '88.8888',
                 '64': '鸡蛋8881',
                 '113': '88',
                 '114': '88.8888',
                 '116': '88:88:88',
                 '126': '1',
                 '133': '88.8888'
               },
               {
                 '112': '1',
                 '117': '1',
                 '133': '88.8888',
                 '64': '鸡蛋8882',
                 '113': '88',
                 '114': '88.8888',
                 '116': '88:88:88',
                 '126': '1',
                 '133': '88.8888'
               },
               {
                 '112': '1',
                 '117': '0',
                 '133': '88.8888',
                 '64': '鸡蛋8883',
                 '113': '88',
                 '114': '88.8888',
                 '116': '88:88:88',
                 '126': '1',
                 '133': '88.8888'
               },
               {
                 '112': '0',
                 '117': '0',
                 '133': '88.8888',
                 '64': '鸡蛋8884',
                 '113': '88',
                 '114': '88.8888',
                 '116': '88:88:88',
                 '126': '1',
                 '133': '88.8888'
               }
             ]
           }
         };
         callback(JSON.stringify(data));
       }
     }
      return obj;
    },
    SYS:function () {
      var obj1 = {
        stopLoading:function () {},
        startLoading:function () {},
      }
      return obj1;
    }
  }
}

function queryDeal(msg, dataTime) {
  pbE.SYS().stopLoading();
  var CONTENTS1 = msg.jData.data;
  if (CONTENTS1.length == 0) {
    $('#alert').removeClass('hide');
  } else if (CONTENTS1.length > 0) {
    $('#alert').addClass('hide');
    //var CONTENTS = pbUtils.sortDlEn(CONTENTS1, '116');
    var CONTENTS = CONTENTS1;
    if (dataTime['171'] == strThree && dataTime['172'] == strYesterday) {
      dataThree = CONTENTS;
    } else if (dataTime['171'] == strWeek && dataTime['172'] == strYesterday) {
      dataWeek = CONTENTS;
    } else if (dataTime['171'] == strMonth && dataTime['172'] == strYesterday) {
      dataMonth = CONTENTS;
    } else {
      dataRandom = CONTENTS;
    }
      ReactDOM.render(React.createElement(DealContents, { contents: CONTENTS, history: true }), document.getElementById('contents'));
  }
}


var date = new Date();
var yesterday = new Date(date.getTime() - 1000 * 60 * 60 * 24 * 1), strYesterday = pbUtils.dateFormat(yesterday, 'yyyyMMdd'),
    three = new Date(date.getTime() - 1000 * 60 * 60 * 24 * 3), strThree = pbUtils.dateFormat(three, 'yyyyMMdd'),
    week = new Date(date.getTime() - 1000 * 60 * 60 * 24 * 7), strWeek = pbUtils.dateFormat(week, 'yyyyMMdd'),
    month = new Date(date.getTime() - 1000 * 60 * 60 * 24 * 30), strMonth = pbUtils.dateFormat(month, 'yyyyMMdd');

var dataThree = null,
    dataWeek = null,
    dataMonth = null,
    dataRandom = null;

var dataTime = {
    '171': strThree,
    '172': strYesterday
  };

var CID = pbE.WT().wtGetCurrentConnectionCID();

$(function () {
  if (!isApp) {
    $('#goBack').click(function () {
      location.href = document.referrer;
    })
  } /*else{
    $('#goBack').click(function () {
      location.href = 'goBack';
    })
  }*/
  
  $('#alert').addClass('hide');
  var TIMES = {
    yesterday: strYesterday,
    three: strThree,
    week: strWeek,
    month: strMonth
  };
  
  ReactDOM.render(React.createElement(NavHeader, { name: "历史成交" }), document.getElementById('nav-header'));
  ReactDOM.render(React.createElement(TimeTitle, { times: TIMES }), document.getElementById('time-title'));
  
  var dateFrom = pikadayResponsive($('#date-from')[0], {
    format: 'YYYY-MM-DD',
    outputFormat: 'YYYYMMDD',
    placeholder: '起始日期'
  });
  var dateTo = pikadayResponsive($('#date-to')[0], {
    format: 'YYYY-MM-DD',
    outputFormat: 'YYYYMMDD',
    placeholder: '终止日期'
  });
  dateFrom.setDate(moment(strYesterday, 'YYYYMMDD'), 'YYYY-MM-DD');
  dateTo.setDate(moment(strYesterday, 'YYYYMMDD'), 'YYYY-MM-DD');
  
  $('#date-from').change(function (e) {
    var timer = 0;
      dataRandom = null;
      $("#contents").empty();
    clearTimeout(timer);
    timer = setTimeout(function () {
      if ($('#date-from').val() <= $('#date-to').val()) {
        dataTime = {
          '171': $('#date-from').val(),
          '172': $('#date-to').val()
        };
        pbE.SYS().startLoading();
        pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
      } else {
        alert('起始日期不得晚于终止日期');
      }
    }, 2000);
  });
  $('#date-to').change(function (e) {
    var timer = 0;
      dataRandom = null;
      $("#contents").empty();
    clearTimeout(timer);
    timer = setTimeout(function () {
      if ($('#date-to').val() >= $('#date-from').val() && $('#date-to').val() <= strYesterday) {
        dataTime = {
          '171': $('#date-from').val(),
          '172': $('#date-to').val()
        };
        pbE.SYS().startLoading();
        pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
      } else if ($('#date-to').val() > strYesterday) {
        alert('终止日期不得晚于昨天');
      } else if ($('#date-to').val() < $('#date-from').val()) {
        alert('终止日期不得早于起始日期');
      }
    }, 2000);
  });
  
  if (!isApp) {
    $('#goBack').click(function () {
      location.href = document.referrer;
    })
  } else{
    $('#goBack').click(function () {
      location.href = 'goBack';
    })
  }
  
  var option = {
    callbacks: [{fun: 6053, module: 90002, callback: function (msg) {queryDeal(msg, dataTime);}}
               ],
    
    reload: function () {
      CID = pbE.WT().wtGetCurrentConnectionCID();
      pbE.SYS().startLoading();
      pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
    },
    
    refresh: function () {
      pbE.SYS().startLoading();
      pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
    },
    
    doShow: function (flag) {
      if (!flag) pbE.SYS().stopLoading();
    },
    
    fresh: function () {}
  };
  
  pbPage.initPage(option);
  
  pbE.SYS().startLoading();
  pbE.WT().wtGeneralRequest(CID, 6053, JSON.stringify(dataTime));
  
});
