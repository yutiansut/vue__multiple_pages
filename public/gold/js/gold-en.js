var isApp = typeof pbE != 'undefined';
if(!isApp){
  window.pbE = {
    WT:function () {
     var obj = {
       wtGetCurrentConnectionCID:function () {},
       wtQueryEntrust:function() {
         var data = {
           moduleId: 90002,
           functionNO: 6019,
           jData: {
             data: [
               {
                 '113': '88',
                 '114': '888',
                 '156': '0',
                 '133': '8888',
                 '64': '88888888',
                 '116': '88888888',
                 '66': '88.88%',
                 '63': '88888888',
                 '159': '08:08:08'
               },
               {
                 '113': '88',
                 '114': '888',
                 '156': '1',
                 '133': '8888',
                 '64': '88888888',
                 '116': '88888888',
                 '66': '88.88%',
                 '63': '88888888',
                 '159': '17:08:08'
               },
               {
                 '113': '88',
                 '114': '888',
                 '156': '2',
                 '133': '8888',
                 '64': '88888888',
                 '116': '88888888',
                 '66': '88.88%',
                 '63': '88888888',
                 '159': '13:08:08'
               }
             ]
           }
         };
         callback(JSON.stringify(data));
       },
       wtCancelEntrust: function () {
         var data = {
           moduleId: 90002,
           functionNO: 6022,
           jData: {
             '1': -1,
             '2':"异常",
             data: []
           }
         };
         callback(JSON.stringify(data));
       },
       wtResetKeepAccOnlineTimer: function () {},
       wtGetGDZH: function () {},
       wtGetXWH: function () {},
       wtGetHQInfo: function () {return JSON.stringify("Felix");},
       wtIsGoldFutureOrSpot: function () {return 1;}
     }
      return obj;
    },
    SYS:function () {
      var obj1 = {
        stopLoading:function () {},
        startLoading:function () {},
        showFutureTradeConfirm: function () {},
        showCircleView: function () {},
        hideCircleView: function () {}
      }
      return obj1;
    }
  }
}

function queryEntrust (msg) {
  pbE.SYS().stopLoading();
  var CONTENTS = msg.jData.data;
  if (CONTENTS.length == 0) {
    $('#alert').removeClass('hide');
  } else if (CONTENTS.length > 0) {
    $('#alert').addClass('hide');
    ReactDOM.render(React.createElement(EntrustContents, { contents: pbUtils.sortDlEn(CONTENTS, '159') }), document.getElementById('contents'));
  }
}

function cancelOrd (msg) {
  pbE.SYS().stopLoading();
  pbE.SYS().hideCircleView('Pbkey_Trade_WT_Circle');
  if (msg.jData['1'] >= 0) {
    $('#indicate').removeClass('hide');
    //撤单请求已发送的弹框，定时器1s
    timer = setTimeout(function () {
      $('#indicate').addClass('hide');reload();
    }, 1000);
  } else {
    $('#cancel').addClass('hide');
    alert('撤单失败，请稍后重试');
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID(),
    timer;

$(function () {
  $('#alert').addClass('hide');
  $('#indicate').addClass('hide');
  $('#cancel').addClass('hide');
  
  ReactDOM.render(React.createElement(EntrustTitle, null), document.getElementById('title'));
  
  var option = {
      callbacks: [{fun: 6019, module: 90002, callback: function (msg) {
              queryEntrust(msg);
          }},
                  {fun: 6022, module: 90002, callback: function (msg) {
              cancelOrd(msg);
          }}
                 ],

      reload: function () {
          pbE.SYS().startLoading();
          CID = pbE.WT().wtGetCurrentConnectionCID();
          pbE.WT().wtQueryEntrust(CID, JSON.stringify({}));
      },
      refresh: function () {
          pbE.SYS().startLoading();
          pbE.WT().wtQueryEntrust(CID, JSON.stringify({}));
      },
      fresh: function () {},

      doShow: function (flag) {
          if (!flag) {
            pbE.SYS().stopLoading();
            clearTimeout(timer);
          }
      }
  };
  pbPage.initPage(option);
  
  pbE.SYS().startLoading();
  pbE.WT().wtQueryEntrust(CID, JSON.stringify({}));
});
