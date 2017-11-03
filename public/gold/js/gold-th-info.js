var isApp = typeof pbE != 'undefined';
if (typeof pbE == 'undefined') {
    window.pbE = {
        WT: function () {
            var obj = {
                wtGetCurrentConnectionCID: function () {},
                wtGeneralRequest: function () {
                  var data = {
                   moduleId: 90002,
                   functionNO: parseInt(conf['th-info'].functionNO),
                   jData: {
                     '1': 1,
                     data: []
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

function cancel() {
  $('.my-modal').addClass('hide');
}

function withdraw() {
  $('.my-modal').removeClass('hide');
}

function confirm() {
  var obj1 = document.getElementById("pwd");
  if(pbUtils.JTrim(obj1.value) == '') {
    alert('请输入提货密码');
    return;
  } else {
    var data = {
      '383': '', //流水号
      '406': obj1.value, //提货密码
      '413': content['413']  //提货人姓名
    };
    pbE.SYS().startLoading();
    pbE.WT().wtGeneralRequest(CID, parseInt(conf['th-info'].functionNO), JSON.stringify(data));
    $('.my-modal').addClass('hide');
  }
}

function withdrawRqst(msg) {
  pbE.SYS().stopLoading();
  if (msg.jData['1'] < 0) {
    //错误信息
    alert(msg.jData['2']);
    return;
  } else {
    alert("撤销申请已发送");
  }
}

var conf, //配置文件读取，JSON字符串
    CID = pbE.WT().wtGetCurrentConnectionCID();

$(function () {
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
  
  if (!isApp) {
    conf = $.get('../conf/gold.json', function (data) {conf = data;});
    /*conf = {
      "th-info": {
        "title": "提货单信息",
        "functionNO": 9309,
        "item": [{ 'name': '提货单号', 'id': 'number', 'num': '410' }, { 'name': '申请日期', 'id': 'app', 'num': '227' }, { 'name': '起始日期', 'id': 'start', 'num': '171' }, { 'name': '结束日期', 'id': 'end', 'num': '201' }, { 'name': '银行提货日', 'id': 'bank', 'num': '411' }, { 'name': '提货状态', 'id': 'status', 'num': '412' }, { 'name': '城市名称', 'id': 'city', 'num': '400' }, { 'name': '品种代码', 'id': 'code', 'num': '364' }, { 'name': '品种名称', 'id': 'name', 'num': '365' }, { 'name': '提货重量', 'id': 'weight', 'num': '405' }, { 'name': '提货人', 'id': 'people', 'num': '413' }, { 'name': '证件类型', 'id': 'id', 'num': '407' }, { 'name': '证件号码', 'id': 'idNum', 'num': '310' }, { 'name': '仓库名称', 'id': 'storage', 'num': '402' }, { 'name': '联系人', 'id': 'contact', 'num': '404' }, { 'name': '联系电话', 'id': 'phone', 'num': '414' }, { 'name': '提货模式', 'id': 'mode', 'num': '409' }, { 'name': '交易渠道', 'id': 'channel', 'num': '415' }]
      }
    };*/
  } else {
    conf = pbUtils.parseJSON(pbE.SYS().readConfig('gold/conf/gold.json'));
  }
  
  var option = {
    callbacks: [{ fun: parseInt(conf['th-info'].functionNO), module: 90002, callback: function (msg) {
        withdrawRqst(msg);
      }
    }],

    reload: function () {},

    refresh: function () {
      $('.my-modal').addClass('hide');
    },

    doShow: function (flag) {
      if (!flag) {
        pbE.SYS().stopLoading();
        $('.my-modal').addClass('hide');
      }
    },
    
    fresh: function () {}
  };
  
  pbPage.initPage(option);
  
  for (var i = 0; i < conf['th-info'].item.length; i++) {
    $('#content').append('<div class="row status-row">' + conf['th-info'].item[i].name + '<span class="pull-right" id=' + conf['th-info'].item[i].id + '></span></div>');
  }

  var content = pbUtils.parseJSON(pbUtils.GetQueryString("par"));

  for (var i = 0; i < conf['th-info'].item.length; i++) {
    if (content[conf['th-info'].item[i].num]) {
      $('#' + conf['th-info'].item[i].id).html(content[conf['th-info'].item[i].num]);
    }
  }

});