var isApp = typeof pbE != 'undefined';
if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtGeneralRequest: function () {
                  var data = {
                   moduleId: 90002,
                   functionNO: parseInt(conf.th.functionNO),
                   jData: {
                     '1': 1,
                     data: [
                       {
                         '364':'AU7890', 
                         '365': '黄金1111', 
                         '171': '1111111',
                         '201': '111111', 
                         '405': '1111111',
                         '412': '111111'
                       },
                       {
                         '364':'AU7890', 
                         '365': '黄金1111', 
                         '171': '1111111',
                         '201': '111111', 
                         '405': '1111111',
                         '412': '111111'
                       },
                       {
                         '364':'AU7890', 
                         '365': '黄金1111', 
                         '171': '1111111',
                         '201': '111111', 
                         '405': '1111111',
                         '412': '111111'
                       }
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

function tihuoQuery (msg) {
  var CONTENTS = msg.jData.data;
  if (CONTENTS.length == 0) {
      $('#contents').html("");
    $('#alert').removeClass('hide');
  } else if (CONTENTS.length > 0) {
    $('#alert').addClass('hide');
    if (dataTime['171'] == strThree && dataTime['172'] == strYesterday) {
      dataThree = CONTENTS;
    } else if (dataTime['171'] == strWeek && dataTime['172'] == strYesterday) {
      dataWeek = CONTENTS;
    } else if (dataTime['171'] == strMonth && dataTime['172'] == strYesterday) {
      dataMonth = CONTENTS;
    } else {
      dataRandom = CONTENTS;
    }
    ReactDOM.render(React.createElement(TihuoContents, { contents: CONTENTS }), document.getElementById('contents'));
  }
}

var date = new Date();
var yesterday = new Date(date.getTime()), strYesterday = pbUtils.dateFormat(yesterday, 'yyyyMMdd'),
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

var conf, //配置文件读取，JSON字符串
    CID = pbE.WT().wtGetCurrentConnectionCID();

$(function () {
  $('#alert').addClass('hide');
  
  if (!isApp) {
    $('#goBack').click(function () {
      location.href = document.referrer;
    })
  }/* else{
    $('#goBack').click(function () {
      location.href = 'goBack';
    })
  }*/
  
  if (!isApp) {
    conf = $.get('../conf/gold.json', function (data) {conf = data;});
    /*conf = {
      "th": {  //提货查询
        "title": "提货查询",
        "functionNO": 9308,
        "item": [{ 'name': '品种名称', 'id': 'number', 'num': '365' }, 
                 { 'name': '开始/结束日期', 'id': 'app', 'num': '171,201' }, 
                 { 'name': '提货重量/状态', 'id': 'start', 'num': '405,412' }]
      }
    };*/
  } else {
    conf = pbUtils.parseJSON(pbE.SYS().readConfig('gold/conf/gold.json'));
  }
  
  var TIMES = {
    yesterday: strYesterday,
    three: strThree,
    week: strWeek,
    month: strMonth
  };
  ReactDOM.render(React.createElement(NavHeader, { name: conf.th.title }), document.getElementById('nav-header'));
  ReactDOM.render(React.createElement(TimeTitle, { times: TIMES, tihuo: true }), document.getElementById('time-title'));
  ReactDOM.render(React.createElement(TihuoTitle, { par: conf.th.item }), document.getElementById('title'));

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
    clearTimeout(timer);
    dataRandom = null;
    timer = setTimeout(function () {
      if ($('#date-from').val() <= $('#date-to').val()) {
        dataTime = {
          '171': $('#date-from').val(),
          '172': $('#date-to').val()
        };
        pbE.SYS().startLoading();
        console.log(dataTime);
        pbE.WT().wtGeneralRequest(CID, parseInt(conf.th.functionNO), JSON.stringify(dataTime));
      } else {
        alert('起始日期不得晚于终止日期');
      }
    }, 2000);
  });
  $('#date-to').change(function (e) {
    var timer = 0;
    clearTimeout(timer);
    dataRandom = null;
    timer = setTimeout(function () {
      if ($('#date-to').val() >= $('#date-from').val() && $('#date-to').val() <= date) {
        dataTime = {
          '171': $('#date-from').val(),
          '172': $('#date-to').val()
        };
        pbE.SYS().startLoading();
        pbE.WT().wtGeneralRequest(CID, parseInt(conf.th.functionNO), JSON.stringify(dataTime));
      } else if ($('#date-to').val() > strYesterday) {
        alert('终止日期不得晚于今天');
      } else if ($('#date-to').val() < $('#date-from').val()) {
        alert('终止日期不得早于起始日期');
      }
    }, 2000);
  });
  
  var option = {
    callbacks: [{ fun: parseInt(conf.th.functionNO), module: 90002, callback: function (msg) {
        tihuoQuery(msg);
      }
    }],

    reload: function () {
      $('#alert').addClass('hide');
      CID = pbE.WT().wtGetCurrentConnectionCID();
      pbE.SYS().startLoading();
      pbE.WT().wtGeneralRequest(CID, parseInt(conf.th.functionNO), JSON.stringify({}));
    },

    refresh: function () {
      $('#alert').addClass('hide');
      pbE.SYS().startLoading();
      pbE.WT().wtGeneralRequest(CID, parseInt(conf.th.functionNO), JSON.stringify({}));
    },

    doShow: function (flag) {
      if (!flag) {
        pbE.SYS().stopLoading();
      }
    },
    
    fresh: function () {}
  };
  
  pbPage.initPage(option);
  
  pbE.SYS().startLoading();
  pbE.WT().wtGeneralRequest(CID, parseInt(conf.th.functionNO), JSON.stringify(dataTime));
});