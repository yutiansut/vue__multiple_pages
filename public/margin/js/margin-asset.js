var isApp = typeof pbE != 'undefined';
if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtGeneralRequest: function () {
                  var data = {functionNO: '7105',
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
                readConfig: function () {}
            };
            return obj1;
        }
    }
}

function creditDebt (msg) {
  pbE.SYS().stopLoading();
  if (msg.jData['1'] < 0) {  //错误信息
    alert(msg.jData['2']);
  } else {
    var content = msg.jData.data[0];
    if (content['51']) {
      $('#account').html(content['51']);  //资金账号
    }
    if (content['57']) {
      $('#currencyName').html(content['57']);  //币种名称
      $('#currency').html(pbUtils.getCode(content['56']));  //币种
    } else {
      $('#currencyName').html('人民币');
      $('#currency').html('CNY');  //币种名称
    }
    if(content['110']) {$('#cash').html(pbUtils.comma(content['110']) + '元')};  //现金资产
    if(content['111']) {$('#available').html(pbUtils.comma(content['111']) + '元')};  //可用保证金
    if(content['152']) {$('#taken').html(pbUtils.comma(content['152']) + '元');}  //已用保证金
    if(content['620']) {$('#guarantee').html(pbUtils.comma(content['620']) + '元');}  //担保资产
    if(content['621']) {$('#total').html(pbUtils.comma(content['621']) + '元');}  //总负债
    $('#ratio').html(content['464']);  //维持担保比例
    if(content['623']) {$('#remainRZ').html(pbUtils.comma(content['623']) + '元');}  //融资余额
    if(content['624']) {$('#remainRQ').html(pbUtils.comma(content['624']) + '元');}  //融券余额
    if(content['740']) {$('#cashRtn').html(pbUtils.comma(content['740']) + '元');}  //现金还款可用资金
    if(content['741']) {$('#tktRtn').html(pbUtils.comma(content['741']) + '元');}  //买券还券可用资金
    if(content['627']) {$('#mktTkt').html(pbUtils.comma(content['627']) + '元');}  //融券市值

    if(content['628']) {$('#plRZ').html(pbUtils.comma(content['628']) + '元');}  //融资合约盈亏
    if(content['629']) {$('#plRQ').html(pbUtils.comma(content['629']) + '元');}  //融券盈亏
    if(content['630']) {$('#netAst').html(pbUtils.comma(content['630']) + '元');}  //净资产
    if(content['95']) {$('#kequ').html(pbUtils.comma(content['95']) + '元');}  //可取资金
    if(content['625']) {$('#kehuan ').html(pbUtils.comma(content['625']) + '元');}  //可还款金额

    if(content['671']) {$('#oweRZ').html(pbUtils.comma(content['671']) + '元');}  //融资负债 ？？？
    if(content['744']) {$('#feeRQ').html(pbUtils.comma(content['744']) + '元');}  //融券费用 ？？？
     // if(content['745']) {$('#oweRZ').html(pbUtils.comma(content['745']) + '元');}  //融资负债 ？？？
    if(content['745']) {$('#profitRQ').html(pbUtils.comma(content['745']) + '元');}  //融券利息 ？？？
  }
}

var CID = pbE.WT().wtGetCurrentConnectionCID();

$(function () {
  $('#alert').addClass('hide');
  
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
    callbacks: [{ fun: 7105, module: 90002, callback: function (msg) {
        creditDebt(msg);
      }
    }],

    reload: function () {},

    refresh: function () {
      $('#alert').addClass('hide');
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
});