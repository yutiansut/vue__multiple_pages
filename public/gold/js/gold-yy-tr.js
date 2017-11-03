var isApp = typeof pbE != 'undefined';
if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtGeneralRequest: function () {
                  var data = {functionNO: 9316,
                              moduleId: 90002,
                              jData:{'1': 1, 
                                     'data': [
                                       {'54': '上海', '55':'HZ', '512':'CU1788', '513':'沪铜1789', '137': '123'}
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

function apply() {
  var reg = new RegExp("^[0-9]*$");
  var obj1 = document.getElementById("amount");
  var obj2 = document.getElementById("pwd");
  if(pbUtils.JTrim(obj1.value) == '') {
    alert('请输入预约金额');
    return;
  } else if(pbUtils.JTrim(obj2.value) == '') {
    alert('请输入资金密码');
    return;
  } else if(!/^[0-9]+(.[0-9]{1,8})?$/.test(obj1.value)) {
    alert('预约金额要为数字');
    return;
  } else {
    var data = {
      '706': $('#amount').val(),
      '59': $('#pwd').val()
    };
    var CID = pbE.WT().wtGetCurrentConnectionCID();
    pbE.WT().wtGeneralRequest(CID, 9316, JSON.stringify(data));
    pbE.SYS().startLoading();
  }
}

function reset() {
  $('#amount').val('');
  $('#pwd').val('');
}

function transfer (msg) {
  pbE.SYS().stopLoading();
  if (msg.jData['1'] < 0) {  //错误信息
    alert(msg.jData['2']);
    return;
  } else {
    alert('预约申请已提交！');
  }
}

$(function () {
  $('#amount').val('');
  $('#pwd').val('');
  
  if (!isApp) {
    $('#goBack').click(function () {
      location.href = document.referrer;
    })
  }/* else{
    $('#goBack').click(function () {
      location.href = 'goBack';
    })
  }*/
  
  var option = {
    callbacks: [{ fun: 9316, module: 90002, callback: function (msg) {transfer(msg);}
    }],

    reload: function () {},

    refresh: function () {
      $('#amount').val('');
      $('#pwd').val('');
    },

    doShow: function (flag) {
      if (!flag) {
        pbE.SYS().stopLoading();
      }
    },
    
    fresh: function () {}
  };
  
  pbPage.initPage(option);
  
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