if (!pbE.isPoboApp) {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtGeneralRequest: function () {
                  var data = {"functionNO": 9301, jData: {'1': 1, data:[{'364':'AU7890', '365': '黄金1111', '366': '1111111','367': '111111'}, {'364':'AU7890', '365': '黄金1111', '366': '1111111', '367': '111111'}, {'364':'AU7890','365': '黄金1111', '366': '1111111', '367': '111111'}]}};
                  //callback(JSON.stringify(data));
                  ReactDOM.render(React.createElement(StorageContents, { contents: data.jData.data, par: conf.storage.item }), document.getElementById('content'));
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

function storageQuery (msg) {
  pbE.SYS().stopLoading();
  if (msg.jData['1'] < 0) {
    //错误信息
    alert(msg.jData['2']);
    return;
  } else {
    var CONTENTS = msg.jData.data;
    if (CONTENTS.length == 0) {
      $('#alert').removeClass('hide');
    } else if (CONTENTS.length > 0) {
      $('#alert').addClass('hide');
      ReactDOM.render(React.createElement(StorageContents, { contents: CONTENTS, par: conf.storage.item }), document.getElementById('content'));
    }
  }
}

var conf, //配置文件读取，JSON字符串
    CID = pbE.WT().wtGetCurrentConnectionCID();

$(function () {
  $('#alert').addClass('hide');
  
  if (!pbE.isPoboApp) {
    $('#goBack').click(function () {
      location.href = document.referrer;
    })
  }/* else{
    $('#goBack').click(function () {
      location.href = 'goBack';
    })
  }*/
  
  var option = {
    callbacks: [{ fun: 9301, module: 90002, callback: function (msg) {
        storageQuery(msg);
      }
    }],

    reload: function () {
      $('#alert').addClass('hide');
      CID = pbE.WT().wtGetCurrentConnectionCID();
      pbE.SYS().startLoading();
      pbE.WT().wtGeneralRequest(CID, 9301, JSON.stringify({}));
    },

    refresh: function () {
      $('#alert').addClass('hide');
      pbE.SYS().startLoading();
      pbE.WT().wtGeneralRequest(CID, 9301, JSON.stringify({}));
    },

    doShow: function (flag) {
      if (!flag) {
        pbE.SYS().stopLoading();
      }
    },
    
    fresh: function () {}
  };
  
  pbPage.initPage(option);
  
  if (!pbE.isPoboApp) {
    conf = $.get('../conf/gold.json', function (data) {conf = data;});
   /* conf = {
      "storage": {
        "title": "库存查询",
        "functionNO": 9301,
        "item": [{ 'name': '合约名称', 'id': 'number', 'num': '365' },
                 { 'name': '库存总量', 'id': 'app', 'num': '366' },
                 { 'name': '可用库存', 'id': 'start', 'num': '367' }]
      }
    };*/
  } else {
    conf = pbUtils.parseJSON(pbE.SYS().readConfig('gold/conf/gold.json'));
  }
  
  ReactDOM.render(React.createElement(NavHeader, { name: conf.storage.title }), document.getElementById('nav-header'));
  ReactDOM.render(React.createElement(StorageTitle, { par: conf.storage.item }), document.getElementById('title'));
  
  pbE.SYS().startLoading();
  pbE.WT().wtGeneralRequest(CID, 9301, JSON.stringify({}));
  
});