var isApp = typeof pbE != 'undefined';
if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtGeneralRequest: function () {
                  var data = {
                   moduleId: 90002,
                   functionNO: 7105,
                   jData: {
                     data: [
                       {
                         '740': '0',
                         '671': '88888888',
                         '601': '88888888',
                         '202': '88888888'
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

function confirmIn() {
  var reg = new RegExp("^[0-9]*$");
  var obj = document.getElementById("return");
  if(pbUtils.JTrim(obj.value) == '') {
    alert('请输入还款金额');
    return;
  } else if(!/^[0-9]+(.[0-9]{1,8})?$/.test(obj.value)) {
    alert('还款金额要为数字');
    return;
  } else {
    var data = {
      '56': content['56'], //货币代码
      '618': obj.value,  //还款金额
      '619':content['202']  //欠债日期
    };
    pbE.WT().wtGeneralRequest(CID, 7103, JSON.stringify(data));  //现金还款
  }
}

function query(msg) {
  pbE.SYS().stopLoading();
  if (msg.jData['1'] < 0) {  //错误信息
    alert(msg.jData['2']);
    return;
  } else {
    content = msg.jData.data[0];
    var available = '',
        owe = '';
    if (content['740']) {
      available = content['740']; //现金还款可用资金
    }
    if (content['671']) {
      owe = content['671']; //融资负债
    } else if (content['621']) {
      owe = content['621']; //没有融资负债就取总负债
    }
    $('#available').val(available);
    $('#owe').val(owe);
    $('#total').click(function() {
      $('#return').val(owe);
    });
  }
}

function cashRtn (msg) {
  pbE.SYS().stopLoading();
  if (msg.jData['1'] < 0) {  //错误信息
    alert(msg.jData['2']);
    return;
  } else {
    alert('还款请求处理中');
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID(),
    content;

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
    callbacks: [{ fun: 7105, module: 90002, callback: function (msg) {query(msg);}},
                {fun: 7103, module: 90002, callback: function (msg) {cashRtn(msg);}}
               ],

    reload: function () {},

    refresh: function () {
      pbE.SYS().startLoading();
      pbE.WT().wtGeneralRequest(CID, 7105, JSON.stringify({}));
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
  pbE.WT().wtGeneralRequest(CID, 7105, JSON.stringify({}));
  
  // 判断浏览器
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
  if (isAndroid) {
      $('input').bind('click',function(e){
          var $this = $(this);
          e.preventDefault();
          setTimeout(function(){
              $(window).scrollTop($this.offset().top - 10);
          },200)
      })
  }
});