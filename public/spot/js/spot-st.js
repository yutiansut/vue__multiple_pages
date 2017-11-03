var isApp = typeof pbE != 'undefined';
if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtQueryMoney: function () {
                  var data = {
                   moduleId: 90002,
                   functionNO: 6012,
                   jData: {
                     '1': 1,
                     data: [
                       {
                         '74':'田馥甄', 
                         '310': '123456789088888', 
                         '407': '身份证', 
                         '401': '1'
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

function queryMoneyPart(msg) {
  pbE.SYS().stopLoading();
  var asset = msg.jData.data[0];
  if (asset['51']) {
    $('#accNum').html(asset['51']);
  }
  if (asset['56']) {
    $('#currency').html(pbUtils.getCurrency(asset['56']));
  }
  if (asset['97'] && !isNaN(asset['97'])) {
    $('#rightNow').html(pbUtils.comma(asset['97']));
  }
  if (asset['99'] && !isNaN(asset['99'])) {
    $('#rightLast').html(pbUtils.comma(asset['99']));
  }
  if (asset['111'] && !isNaN(asset['111'])) {
    $('#available').html(pbUtils.comma(asset['111']));
  }

  if (asset['345']) {
    if(asset['345'].indexOf('%') >= 0){
      $('#risk').html(asset['345']);
    } else {
      $('#risk').html(asset['345']+ '%');
    } 
  } else {
    $('#risk').html('--');
  }

  if (asset['101'] > 0) {
    $('#ccpl').addClass('a3');
  } else if (asset['101'] < 0) {
    $('#ccpl').addClass('a4');
  } else if (asset['101'] == 0) {
    $('#ccpl').addClass('bolder');
  }
  if (asset['102'] > 0) {
    $('#pcpl').addClass('a3');
  } else if (asset['102'] < 0) {
    $('#pcpl').addClass('a4');
  } else if (asset['102'] == 0) {
    $('#pcpl').addClass('bolder');
  }
  if (asset['101'] && !isNaN(asset['101'])) {
    $('#ccpl').html(pbUtils.comma(asset['101']));
  }
  if (asset['102'] && !isNaN(asset['102'])) {
    $('#pcpl').html(pbUtils.comma(asset['102']));
  }
  if (asset['94'] && !isNaN(asset['94'])) {
    $('#frozen').html(pbUtils.comma(asset['94']));
  }
  if (asset['152'] && !isNaN(asset['152'])) {
    $('#take').html(pbUtils.comma(asset['152']));
  }
  if (asset['182'] && !isNaN(asset['182'])) {
    $('#charge').html(pbUtils.comma(asset['182']));
  }
  if (asset['422'] && !isNaN(asset['422'])) {
    $('#inOut').html(pbUtils.comma(asset['422']));
  }
}

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
  
  var option = {
    callbacks: [{ fun: 6012, module: 90002, callback: function (msg) {queryMoneyPart(msg);}  //客户信息查询
                }
               ],
    

    reload: function () {
      var myDate = new Date();
      var strToday = pbUtils.format(myDate, 'yyyy-MM-dd');
      $('#date').html(strToday);
      CID = pbE.WT().wtGetCurrentConnectionCID();
      pbE.SYS().startLoading();
      pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
    },

    refresh: function () {
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
  
  var myDate = new Date();
  var strToday = pbUtils.dateFormat(myDate, 'yyyy-MM-dd');
  $('#date').html(strToday);

  pbE.SYS().startLoading();
  pbE.WT().wtQueryMoney(CID, JSON.stringify({}));  //客户信息查询
});
