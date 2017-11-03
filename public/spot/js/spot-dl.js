var isApp = typeof pbE != 'undefined';
if(!isApp){
  window.pbE = {
    WT:function () {
     var obj = {
       wtGetCurrentConnectionCID:function () {},
       wtQueryBargain:function() {
         var data = {
           moduleId: 90002,
           functionNO: 6013,
           jData: {
             data: [
               {
                 '113': '88',
                 '114': '888',
                 '112': '1',
                 '133': '8888',
                 '64': '88888888',
                 '117': '1',
                 '66': '88.88%',
                 '63': '88888888',
                 '116': '08:08:08'
               },
               {
                 '113': '88',
                 '114': '888',
                 '112': '1',
                 '133': '8888',
                 '64': '88888888',
                 '117': '1',
                 '66': '88.88%',
                 '63': '88888888',
                 '116': '17:08:08'
               },
               {
                 '113': '88',
                 '114': '888',
                 '112': '0',
                 '133': '8888',
                 '64': '88888888',
                 '117': '0',
                 '66': '88.88%',
                 '63': '88888888',
                 '116': '13:08:08'
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
        startLoading:function () {}
      }
      return obj1;
    }
  }
}

function queryDeal (msg) {
  pbE.SYS().stopLoading();
  var CONTENTS = msg.jData.data;
  if (CONTENTS.length == 0) {
    $('#alert').removeClass('hide');
  } else if (CONTENTS.length > 0) {
    $('#alert').addClass('hide');
    //倒序排列
    ReactDOM.render(React.createElement(DealContents, { contents: pbUtils.sortDlEn(CONTENTS, '116') }), document.getElementById('contents'));
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID();

$(function () {
  $('#alert').addClass('hide');
  var option = {
      callbacks: [{fun: 6013, module: 90002, callback: function (msg) {
              queryDeal(msg);
          }}],

      reload: function () {
          pbE.SYS().startLoading();
          CID = pbE.WT().wtGetCurrentConnectionCID();
          pbE.WT().wtQueryBargain(CID, JSON.stringify({}));
      },
      refresh: function () {
          pbE.SYS().startLoading();
          pbE.WT().wtQueryBargain(CID, JSON.stringify({}));
      },
      fresh: function () {},

      doShow: function (flag) {
          if (!flag) {
            pbE.SYS().stopLoading();
          }
      }
  };
  pbPage.initPage(option);
  
  pbE.SYS().startLoading();
  pbE.WT().wtQueryBargain(CID, JSON.stringify({}));
});