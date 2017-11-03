if(typeof pbE == 'undefined'){
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
                 '112': '0',
                 '117': '1',
                 '133': '88.8888',
                 '64': '鸡蛋8881',
                 '113': '88',
                 '114': '88.8888',
                 '116': '',
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
                 '116': '',
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
                 '116': '',
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
                 '116': '',
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

function queryDeal(msg) {
  pbE.SYS().stopLoading();
  var CONTENTS1 = msg.jData.data;
  if (CONTENTS1.length == 0) {
    $('#alert').removeClass('hide');
  } else if (CONTENTS1.length > 0) {
    $('#alert').addClass('hide');
    //倒序排列
    ReactDOM.render(React.createElement(DealContentsOptions, { contents: pbUtils.sortDlEn(CONTENTS1, '116') }), document.getElementById('contents'));
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID();

$(function () {
  $('#alert').addClass('hide');
  ReactDOM.render(React.createElement(DealTitleOptions, null), document.getElementById('title'));
  
  var option = {
    callbacks: [{fun: 6013, module: 90002, callback: function (msg) {queryDeal(msg);}}
               ],
    
    reload: function () {
      CID = pbE.WT().wtGetCurrentConnectionCID();
      pbE.SYS().startLoading();
      pbE.WT().wtQueryBargain(CID, JSON.stringify({}));
    },
    
    refresh: function () {
      pbE.SYS().startLoading();
      pbE.WT().wtQueryBargain(CID, JSON.stringify({}));
    },
    
    doShow: function (flag) {
      if (!flag) pbE.SYS().stopLoading();
    },
    
    fresh: function () {}
  };
  
  pbPage.initPage(option);
  
  pbE.SYS().startLoading();
  pbE.WT().wtQueryBargain(CID, JSON.stringify({}));
});