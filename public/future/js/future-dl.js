var isApp = typeof pbE != 'undefined';
ReactDOM.render(React.createElement(DealTitleFutures, null), document.getElementById('title'));

if(typeof pbE == 'undefined'){
  window.pbE = {
    WT:function () {
      var obj = {
        wtGetCurrentConnectionCID:function () {

        },
        wtQueryBargainRe:function () {
          var data = {
            functionNO:56004,
            jData:{
              '223':3
            },
            data:[
              {
                '64': '股指期权50ETF',
                '54': '',
                '159': 0,
                '129': 200,
                '112': 1,
                '117': 1,
                '130': 222,
                '156': 3,
                '63': '',
                '40':1,
                '113':125,
                '116':'10:10:11',
                '114':1000
              },
              {
                '64': '50ETF',
                '54': '',
                '159': 123,
                '129': 200,
                '112': 0,
                '117': 0,
                '130': 222,
                '156': 3,
                '63': '',
                '40':1,
                '113':123,
                '116':'11:00:11',
                '114':1234
              }
            ]
          }
          return JSON.stringify(data);
        },
        wtGetHQInfo: function () {return JSON.stringify('Felix');}
      }
      return obj;
    },
    SYS:function () {
      var obj1 = {
        stopLoading:function () {

        },
        startLoading:function () {

        }
      }
      return obj1;
    }
  }
}

function callback(message) {
  var msg = JSON.parse(message);
  if (msg.functionNO == 56004) {
    if (msg.jData['223'] == 3) {
      if (!refreshFlag) {
        pbE.SYS().stopLoading();
        refreshFlag = 1;
      }
      setBargain();
    }
  } else if (msg.functionNO == 56006) {
      setBargain();
  }
}

function setBargain() {
  pbE.SYS().startLoading();
  //先取上一次查询结果显示
  var dataHis1 = pbE.WT().wtQueryBargainRe(CID);
  if (dataHis1) {
    var dataHis = pbUtils.parseJSON(dataHis1).data;
      for (var i = 0, m= dataHis.length; i < m; i++) {
        var market = dataHis[i]['54'],
            code = dataHis[i]['63'];
        var marketInfo = JSON.parse(pbE.WT().wtGetHQInfo(code, market)); //交易信息转换行情信息
        dataHis[i]["name"] = marketInfo.HQName || "";
      }
    if (dataHis[0]) {
        ReactDOM.render(React.createElement(DealContentsFutures, {contents: pbUtils.sortDlEn(dataHis, '116')}), document.getElementById('contents'));
    }
  }
  pbE.SYS().stopLoading();
}

function reload() {
  CID = pbE.WT().wtGetCurrentConnectionCID();
  setBargain();
}

function refresh() {
  pbE.SYS().startLoading();
  refreshFlag = 0;
  pbE.WT().wtSynFlash(CID);
}

function doShow(flag) {
  if (!flag) {
    pbE.SYS().stopLoading(); //离开页面时停止转圈
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID(),
    refreshFlag = 1;
setBargain();
