var isApp = typeof pbE != 'undefined';
if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtGeneralRequest: function () {
                  if (title == "品种列表") {
                    var data = {
                       moduleId: 90002,
                       functionNO: 9301,
                       jData: {
                         '1': 1,
                         data: [
                           {
                             '365':'田馥甄', 
                             '364': 'hebe'
                           },
                           {
                             '365':'任家萱', 
                             '364': 'selina'
                           },
                           {
                             '365':'陈嘉桦', 
                             '364': 'ella'
                           }
                         ]
                       }
                     };
                   } else if (title == "城市列表") {
                     var data = {
                       moduleId: 90002,
                       functionNO: 9305,
                       jData: {
                         '1': 1,
                         data: [
                           {
                             '399':'纽约', 
                             '400': 'NY'
                           },
                           {
                             '399':'波士顿', 
                             '400': 'boston'
                           },
                           {
                             '399':'华盛顿', 
                             '400': 'DC'
                           }
                         ]
                       }
                     };
                   }
                  callback(JSON.stringify(data));
                }
            };
            return obj;
        },
        SYS: function () {
            var obj1 = {
                startLoading: function () {},
                stopLoading: function () {},
                getPrivateData: function () {return JSON.stringify({"type": {"name": "田馥甄", "code": "hebe"}, "city": {"name": "城市名称", "code": "NY"}, "mode": {"name": "提货模式", "code": "1"}});},
                storePrivateData: function (a, b) {par = pbUtils.parseJSON(b);}
            };
            return obj1;
        }
    }
}

function list(msg) {
  pbE.SYS().stopLoading();
  if (msg.jData['1'] < 0) {  //错误信息
    alert(msg.jData['2']);
    return;
  } else {
    var data = msg.jData.data;
    if (data.length == 0) {
      $('#alert').removeClass('hide');
    } else if (data.length > 0) {
      $('#alert').addClass('hide');
      if (title == "城市列表") {
        for (var i = 0, j = data.length; i < j; i++) {
          if (data[i]['399'] == par.city.code) {
            $('.clearfix').append('<div class="row status-row" code="' + data[i]['399'] + '">'+ data[i]['400'] + '<span class="pull-right">&radic;</span></div>');
          } else {
            $('.clearfix').append('<div class="row status-row" code="' + data[i]['399'] + '">'+ data[i]['400'] + '<span class="pull-right hide">&radic;</span></div>');
          }
        }
      } else if (title == "品种列表") {
        for (var i = 0, j = data.length; i < j; i++) {
          if (data[i]['364'] == par.type.code) {
            $('.clearfix').append('<div class="row status-row" code="' + data[i]['364'] + '">'+ data[i]['365'] + '<span class="pull-right">&radic;</span></div>');
          } else {
            $('.clearfix').append('<div class="row status-row" code="' + data[i]['364'] + '">'+ data[i]['365'] + '<span class="pull-right hide">&radic;</span></div>');
          }
        }
      }
      $('.status-row').click(function() {
        var s = $(this).text();
        s = s.substring(0, s.length - 1);
        var data;
        if (title == "品种列表") {
          data = {"type": {"name": s, "code": $(this).attr("code")}, "city": par.city, "mode": par.mode};
        } else if (title == "城市列表") {
          data = {"type": par.type, "city": {"name": s, "code": $(this).attr("code")}, "mode": par.mode};
        } else if (title == "提货模式") {
          data = {"type": par.type, "city": par.city, "mode": {"name": s, "code": $(this).attr("code")}};
        }
        pbE.SYS().storePrivateData("tihuo", JSON.stringify(data));
        if ($("span", this).hasClass("hide")) {
          $('.status-row span').addClass('hide');
          $("span", this).removeClass("hide");
        }
      })
    }
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID(),
    title = pbUtils.GetQueryString("name"),
    par;

if (pbE.SYS().getPrivateData('tihuo') != '') {
  par = pbUtils.parseJSON(pbE.SYS().getPrivateData('tihuo')); 
} else {
  par = {"type": {"name": "", "code": ""}, "city": {"name": "", "code": ""}, "mode": {"name": "", "code": ""}};
}

$(function () {
  if (!isApp) {
    $('#goBack').click(function () {
      location.href = document.referrer;
    })
  }/* else{
    $('#goBack').click(function () {
      location.href = 'goBack';
    })
  }*/
  
  $('#alert').addClass('hide');
  
  var func = pbUtils.GetQueryString("func");
  $('.navbar-text').html(title);
  
  var option = {
    callbacks: [{ fun: parseInt(func), module: 90002, callback: function (msg) { list(msg);}  //客户信息查询
                }
               ],

    reload: function () {},

    refresh: function () {},

    doShow: function (flag) {
      if (!flag) {
        pbE.SYS().stopLoading();
      }
    },
    
    fresh: function () {}
  };
  if (!func) {
    option.callbacks = function () {};
  }
  pbPage.initPage(option);

  if (func) {
    pbE.SYS().startLoading();
    pbE.WT().wtGeneralRequest(CID, parseInt(func), JSON.stringify({}));
  } else if (title == "提货模式") {
    $('.clearfix').append('<div class="row status-row client" code="1">客户自提<span class="pull-right hide">&radic;</span></div>');
    $('.clearfix').append('<div class="row status-row bank" code="2">银行代提<span class="pull-right hide">&radic;</span></div>');
    if (par.mode.code == "1") {
      $('.client span').removeClass('hide');
    } else if (par.mode.code == "2") {
      $('.bank span').removeClass('hide');
    }
    $('.status-row').click(function() {
      var s = $(this).text();
      s = s.substring(0, s.length - 1);
      var data;
      if (title == "品种列表") {
        data = {"type": {"name": s, "code": $(this).attr("code")}, "city": par.city, "mode": par.mode};
      } else if (title == "城市列表") {
        data = {"type": par.type, "city": {"name": s, "code": $(this).attr("code")}, "mode": par.mode};
      } else if (title == "提货模式") {
        data = {"type": par.type, "city": par.city, "mode": {"name": s, "code": $(this).attr("code")}};
      }
      pbE.SYS().storePrivateData("tihuo", JSON.stringify(data));
      if ($("span", this).hasClass("hide")) {
        $('.status-row span').addClass('hide');
        $("span", this).removeClass("hide");
      }
    })
  }
});