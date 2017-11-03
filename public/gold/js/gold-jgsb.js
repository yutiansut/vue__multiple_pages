var isApp = typeof pbE != 'undefined';
if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtGeneralRequest: function () {
                  var data = {functionNO: 9304,
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
                stopLoading: function () {},
                getPrivateData: function (a) {if (a == "flag") return (flag1 + ',' + flag2 + ',' + flag3 + ',' + flag4);},
                storePrivateData: function (a, b) {var flagArr = b.split(','),  //[code, market, 合约名称]
        flag1 = parseInt(flagArr[0]), flag2 = parseInt(flagArr[1]), flag3 = parseInt(flagArr[2]), flag4 = parseInt(flagArr[3]);}
            };
            return obj1;
        }
    }
}

function ordRequest (msg) {
  pbE.SYS().stopLoading();
  if (msg.jData['1'] < 0) {  //错误信息
    alert(msg.jData['2']);
    return;
  } else {
    alert('下单请求已发送');
  }
}

function order() {
  var obj1 = document.getElementById("number");
  var obj2 = document.getElementById("jgsb");
  var obj3 = document.getElementById("zlc");
  if(flag1 && !flag2) {
    if (pbUtils.JTrim(obj2.innerHTML) == '') {
      alert('请选择合约');
      return;
    }
  } else if (flag2 && !flag1) {
    if (pbUtils.JTrim(obj3.innerHTML) == '') {
      alert('请选择合约');
      return;
    }
  }
  if(pbUtils.JTrim(obj1.value) == '') {
    alert('请输入交割数量');
    return;
  } else {
    var type;
    if (flag2 && flag3) {  //中立仓交货
      type = '104';
    } else if (flag1 && flag3) {  //延期交货
      type = '102';
    } else if (flag2 && flag4) {  //中立仓收货
      type = '103';
    } else if (flag1 && flag4) {  //延期收货
      type = '101';
    }
    var position = pbE.SYS().getPrivateData('position'),
        positionArr = position.split(',');  //[code, market, 合约名称]
    var data = {
      '54': positionArr[1], //市场代码
      '63': positionArr[0], //合约代码
      '130': obj1.value, //委托数量
      '52': pbE.WT().wtGetGDZH(positionArr[1]), //股东账号
      '389': type, //交易类型
      '161': pbE.WT().wtGetXWH(positionArr[1]) //席位号
    };
    pbE.SYS().startLoading();
    pbE.WT().wtGeneralRequest(CID, 9304, JSON.stringify(data));
  }
}

function init () {  //交割申报对应jgsb，中立仓对应zlc
  var flag = pbE.SYS().getPrivateData("flag");
  console.log("flag");
  console.log(flag);
  if (flag) {
    var flagArr = flag.split(','),  //[code, market, 合约名称]
        a = parseInt(flagArr[0]), b = parseInt(flagArr[1]), c = parseInt(flagArr[2]), d = parseInt(flagArr[3]);
    flag1 = a, flag2 = b, flag3 = c, flag4 = d;
    if (flag1 && !flag2) {
      $('.choose p:nth-child(1)').css('color', '#3366cc');
      $('.jgsb').removeClass('hide');
      $('.zlc').addClass('hide');
      $('.choose p:nth-child(2)').css('color', '#808086');
    } else if (!flag1 && flag2) {
      $('.choose p:nth-child(2)').css('color', '#3366cc');
      $('.jgsb').addClass('hide');
      $('.zlc').removeClass('hide');
      $('.choose p:nth-child(1)').css('color', '#808086');
    }
    if (flag3 && !flag4) {
      $('.jiaohuo').css({'background-color': '#3366cc', 'color': '#fff'});
      $('.shouhuo').css({'background-color': '#fff', 'color': '#808086'});
    } else if (!flag3 && flag4) {
      $('.shouhuo').css({'background-color': '#3366cc', 'color': '#fff'});
      $('.jiaohuo').css({'background-color': '#fff', 'color': '#808086'});
    }
  } else {
    $('.choose p:nth-child(1)').css('color', '#3366cc');
    $('.choose p:nth-child(2)').css('color', '#808086');
    $('.zlc').addClass('hide');
    $('.jgsb').removeClass('hide');
    $('.jiaohuo').css({'background-color': '#3366cc', 'color': '#fff'});
    $('.shouhuo').css({'background-color': '#fff', 'color': '#808086'});
    pbE.SYS().storePrivateData("flag", '1,0,1,0');
  }
  
  var position = pbE.SYS().getPrivateData('position');
  console.log("position");
  console.log(position);
  if (position) {
    var positionArr = position.split(',');  //[code, market, 合约名称]
    if (!flag1 && flag2) {
      $('.zlc #zlc').html(positionArr[2]);
    } else if (flag1 && !flag2) {
      $('.jgsb #jgsb').html(positionArr[2]);
    }
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID(),
    flag1 = 1, flag2 = 0, flag3 = 1, flag4 = 0;

$(function () {
  init();
  
  if (!isApp) {
    $('#goBack').click(function () {
      location.href = document.referrer;
    })
  }/* else{
    $('#goBack').click(function () {
      location.href = 'goBack';
    })
  }*/
  
  $('.choose p:nth-child(1)').click(function() {
    if (!flag1) {
      $('#number').val('');
      $('.jgsb #jgsb').html('');
      $('.zlc #zlc').html('');
      flag1 = 1, flag2 = 0;
      pbE.SYS().storePrivateData("flag", flag1 + ',' + flag2 + ',' + flag3 + ',' + flag4); //[交割申报，中立仓，交货，收货]
      pbE.SYS().storePrivateData("position", '');
      $('.choose p:nth-child(1)').css('color', '#3366cc');
      $('.zlc').addClass('hide');
      $('.jgsb').removeClass('hide');
      $('.choose p:nth-child(2)').css('color', '#808086');
    }
  })
  $('.choose p:nth-child(2)').click(function() {
    if (!flag2) {
      $('#number').val('');
      $('.jgsb #jgsb').html('');
      $('.zlc #zlc').html('');
      flag1 = 0, flag2 = 1;
      pbE.SYS().storePrivateData("flag", flag1 + ',' + flag2 + ',' + flag3 + ',' + flag4); //[交割申报，中立仓，交货，收货]
      pbE.SYS().storePrivateData("position", '');
      $('.choose p:nth-child(2)').css('color', '#3366cc');
      $('.zlc').removeClass('hide');
      $('.jgsb').addClass('hide');
      $('.choose p:nth-child(1)').css('color', '#808086');
    }
  })
  $('.jiaohuo').click(function() {
    if (!flag3) {
      flag3 = 1, flag4 = 0;
      pbE.SYS().storePrivateData("flag", flag1 + ',' + flag2 + ',' + flag3 + ',' + flag4); //[交割申报，中立仓，交货，收货]
      $('.jiaohuo').css({'background-color': '#3366cc', 'color': '#fff'});
      $('.shouhuo').css({'background-color': '#fff', 'color': '#808086'});
    }
  })
  $('.shouhuo').click(function() {
    if (!flag4) {
      flag3 = 0, flag4 = 1;
      pbE.SYS().storePrivateData("flag", flag1 + ',' + flag2 + ',' + flag3 + ',' + flag4); //[交割申报，中立仓，交货，收货]
      $('.shouhuo').css({'background-color': '#3366cc', 'color': '#fff'});
      $('.jiaohuo').css({'background-color': '#fff', 'color': '#808086'});
    }
  })

  var option = {
    callbacks: [{ fun: 9304, module: 90002, callback: function (msg) {
        ordRequest(msg);
      }
    }],

    reload: function () {init();},

    refresh: function () {},

    doShow: function (flag) {
      if (!flag) {
        pbE.SYS().storePrivateData("position", "");
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