var isApp = typeof pbE != 'undefined';
ReactDOM.render(React.createElement(EntrustTitleFutures, null), document.getElementById('title'));

if(typeof pbE == 'undefined'){
  window.pbE = {
    WT:function () {
      var obj = {
        wtGetCurrentConnectionCID:function () {

        },
        wtQueryEntrustRe:function () {
          var data = {
            functionNO:56004,
            jData:{
              '223':1
            },
            data:[
              {
                '64': '50ETF',
                '54': '',
                '129': 200,
                '112': 0,
                '117': 0,
                '130': 222,
                '156': 4,
                '63': '',
                '40':1,
                '113':2222,
                '159':'13:00:00',
                '114':1234,
                '163':'备注信息'
              },
              {
                '64': '50ETF',
                '54': '',
                '129': 200,
                '112': 0,
                '117': 0,
                '130': 222,
                '156': 4,
                '63': '',
                '40':1,
                '113':123,
                '159':'20:00:00',
                '114':1234,
                '163':'   '
              },
              {
                '64': '50ETF',
                '54': '',
                '129': 200,
                '112': 0,
                '117': 0,
                '130': 222,
                '156': 1,
                '63': '',
                '40':1,
                '113':123,
                '159':'20:00:00',
                '114':1234,
                '163':'备注信息'
              }
            ]
          };
          return JSON.stringify(data);
        },
      }
      return obj;
    },
    SYS:function () {
      var obj2 = {
        stopLoading:function () {

        },
        startLoading:function () {

        }
      }
      return obj2;
    }

  }
}

function callback(message) {
  var msg = JSON.parse(message);
  if (msg.functionNO == 56004) {
    if (msg.jData['223'] == 1) {
      if (!refreshFlag) {
        pbE.SYS().stopLoading();
        refreshFlag = 1;
      }
      var CONTENTS1 = pbE.WT().wtQueryEntrustRe(CID);
      if (CONTENTS1) {
        var CONTENTS = JSON.parse(CONTENTS1).data;
        //倒序排列
        if (CONTENTS[0]) {
          ReactDOM.render(React.createElement(EntrustContentsFutures, { contents: pbUtils.sortDlEn(CONTENTS, '159') }), document.getElementById('contents'));
        }
      }
    }
  } else if (msg.functionNO == 6022) {
    pbE.SYS().hideCircleView('Pbkey_Trade_WT_Circle');
    if (msg.jData['1'] >= 0) {
      $('#indicate').removeClass('hide');
      //撤单请求已发送的弹框，定时器1s
      timer = setTimeout(function () {
        $('#indicate').addClass('hide');
      }, 1000);
    } else {
      $('#cancel').addClass('hide');
      alert('撤单失败，请稍后重试');
    }
  } else if (msg.functionNO == 56005) {
    var CONTENTS2 = pbE.WT().wtQueryEntrustRe(CID);
    if (CONTENTS2) {
      var CONTENTS3 = JSON.parse(CONTENTS2).data;
      //倒序排列
      if (CONTENTS3[0]) {
        ReactDOM.render(React.createElement(EntrustContentsFutures, { contents: pbUtils.sortDlEn(CONTENTS3, '159') }), document.getElementById('contents'));
      }
    }
  }
}

function reload() {
  $('#indicate').addClass('hide');
  $('#cancel').addClass('hide');
  pbE.SYS().startLoading();
  CID = pbE.WT().wtGetCurrentConnectionCID();
  //先取上一次查询结果显示
  var dataHis1 = pbE.WT().wtQueryEntrustRe(CID);
  if (dataHis1) {
    var dataHis = pbUtils.parseJSON(dataHis1).data;
    //倒序排列
    if (dataHis[0]) {
      ReactDOM.render(React.createElement(EntrustContentsFutures, { contents: pbUtils.sortDlEn(dataHis, '159') }), document.getElementById('contents'));
    }
  }
  pbE.SYS().stopLoading();
}

function refresh() {
  pbE.SYS().startLoading();
  refreshFlag = 0;
  pbE.WT().wtSynFlash(CID);
}

function doShow(flag) {
  if (!flag) {
    pbE.SYS().stopLoading(); //离开页面时停止转圈
    $('#cancel').addClass('hide');
    $('#indicate').addClass('hide');
    clearTimeout(timer);
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID();
var timer,
    refreshFlag = 1;

$('.my-modal-backdrop').click(function () {
  $('.my-modal').addClass('hide');
});

var CONTENTS1 = pbE.WT().wtQueryEntrustRe(CID);
      if (CONTENTS1) {
        var CONTENTS = JSON.parse(CONTENTS1).data;
        //倒序排列
        if (CONTENTS[0]) {
          ReactDOM.render(React.createElement(EntrustContentsFutures, { contents: pbUtils.sortDlEn(CONTENTS, '159') }), document.getElementById('contents'));
        }
      }

