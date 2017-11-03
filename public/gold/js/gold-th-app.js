var isApp = typeof pbE != 'undefined';
if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtGeneralRequest: function () {
                  var data = {
                   moduleId: 90002,
                   functionNO: 9310,
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
                stopLoading: function () {},
                getPrivateData: function () {return JSON.stringify({"type": {"name": "品种名称", "code": "品种代码"}, "city": {"name": "城市名称", "code": "城市代码"}, "mode": {"name": "提货模式", "code": "模式代码"}});}
            };
            return obj1;
        }
    }
}

function apply() {
  $('.my-modal').removeClass('hide');
}

function confirm() {
  var obj1 = document.getElementById("pwd");
  var obj2 = document.getElementById("again");
  if(pbUtils.JTrim(obj1.value) == '') {
    alert('请设置提货密码');
    return;
  } else if(pbUtils.JTrim(obj2.value) == '') {
    alert('请确认提货密码');
    return;
  } else if(obj1.value != obj2.value) {
    alert('设置密码与确认密码要一致');
    return;
  } else {
    var data = {
      '364': par.type.code, //品种代码  9301
      '405': $('#num').val(), //提货重量  输入
      '399': par.city.code, //城市代码  9305
      '401': storage, //仓库代码  选择城市后9306
      '406': obj1.value, //提货密码  输入
      '407': $('#id').html(), //证件类型
      '310': $('#number').html(), //证件号码
      '409': par.mode.code, //提货模式  
      '413': $('#person').html() //提货人    9310
    };
    pbE.WT().wtGeneralRequest(CID, 9307, JSON.stringify(data));
    $('.my-modal').addClass('hide');
  }
}

function cancel() {
  $('.my-modal').addClass('hide');
}

function clientInfo(msg) {
  pbE.SYS().stopLoading();
  if (msg.jData['1'] < 0) {  //错误信息
    alert(msg.jData['2']);
    return;
  } else {
    console.log('9310');
    console.log(msg);
    if (msg.jData.data.length > 0) {
      var data = msg.jData.data[0]; 
      if (data['74']) {
        $('#person').html(data['74']);
      }
      if (data['407']) {
        $('#id').html(data['407']);
      }
      if (data['310']) {
        $('#number').html(data['310']);
      }
    } 
  }
}

function queryStrg(msg) {  //已知城市，提货仓库查询
  pbE.SYS().stopLoading();
  if (msg.jData['1'] < 0) {  //错误信息
    alert(msg.jData['2']);
    return;
  } else {
    var data = msg.jData.data[0];
    if (data['401']) {
      storage = data['401'];
    }
  }
}

function applyRqst(msg) {
  pbE.SYS().stopLoading();
  if (msg.jData['1'] < 0) {  //错误信息
    alert(msg.jData['2']);
    return;
  } else {
    alert('提货申请已发送');
  }
}

function getStoreJson (CID) {
  if (pbE.SYS().getPrivateData('tihuo') != '') {
    par = pbUtils.parseJSON(pbE.SYS().getPrivateData('tihuo')); 
  } else {
    par = {"type": {"name": "", "code": ""}, "city": {"name": "", "code": ""}, "mode": {"name": "", "code": ""}};
  }
  //par = pbUtils.parseJSON(pbE.SYS().getPrivateData("tihuo")); // {"type": {"name": "品种名称", "code": "品种代码"}, "city": {"name": "", "code": ""}, "mode": {"name": "", "code": ""}}
  if (par.type.name) {  //品种名称
    $('#type').html(par.type.name);
  } else if (par.type.code) {
    $('#type').html(par.type.code);
  }
  if (par.city.name) {  //城市名称
    $('#city').html(par.city.name);
  }
  if (par.mode.name) {  //提货模式
    $('#mode').html(par.mode.name);
  }
  if (par.city.code) {
    pbE.SYS().startLoading();
    pbE.WT().wtGeneralRequest(CID, 9306, JSON.stringify({'399':par.city.code}));
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID(),
    storage = '',
    par = '';

$(function () {
  console.log('par');
  console.log(par);
  $('.my-modal').addClass('hide');
  $('.my-modal-backdrop').click(cancel);
  
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
    callbacks: [{ fun: 9310, module: 90002, callback: function (msg) {clientInfo(msg);}  //客户信息查询
                },
                {fun: 9306, module: 90002, callback: function (msg) {queryStrg(msg);}
                },  //查询城市提货仓库
                {fun: 9307, module: 90002, callback: function (msg) {applyRqst(msg);}}
               ],
    

    reload: function () {
      $('.my-modal').addClass('hide');
      CID = pbE.WT().wtGetCurrentConnectionCID();
      storage = '';
      pbE.SYS().startLoading();
      pbE.WT().wtGeneralRequest(CID, 9301, JSON.stringify({}));
      getStoreJson(CID);
    },

    refresh: function () {
      $('.my-modal').addClass('hide');
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
  
  pbE.SYS().startLoading();
  pbE.WT().wtGeneralRequest(CID, 9310, JSON.stringify({}));  //客户信息查询
  getStoreJson (CID);
  
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