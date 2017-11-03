$(function () {
  var conf,
      isApp = typeof pbE != 'undefined';
  if (!isApp) {
    conf = $.get('../conf/gold.json', function (data) {conf = data;});
    /*conf = {
      "yy-dt": {
        "title": "预约转账信息",
        "functionNO": "",
        "item": [{'name': '申请日期', 'id': 'number', 'num': '227'}, 
                 {'name': '申请时间', 'id':'app', 'num': '228'}, 
                 {'name': '预约出金日期', 'id': 'start', 'num': '707'}, 
                 {'name': '预约出金金额', 'id': 'end', 'num': '708'}, 
                 {'name': '申请状态', 'id': 'bank', 'num': '545'}, 
                 {'name': '备注信息', 'id': 'status', 'num': '163'}]
      }
    };*/
  } else {
    conf = pbUtils.parseJSON(pbE.SYS().readConfig('gold/conf/gold.json'));
  }
  
  for (var i = 0; i < conf['yy-dt'].item.length; i++) {
    $('#content').append('<div class="row status-row">' + conf['yy-dt'].item[i].name + '<span class="pull-right" id=' + conf['yy-dt'].item[i].id + '></span></div>');
  }

  var content = pbUtils.parseJSON(pbUtils.GetQueryString("par"));

  for (var i = 0; i < conf['yy-dt'].item.length; i++) {
    if (content[conf['yy-dt'].item[i].num]) {
      $('#' + conf['yy-dt'].item[i].id).html(content[conf['yy-dt'].item[i].num]);
    }
  }
  
  if (!isApp) {
    $('#goBack').click(function () {
      location.href = document.referrer;
    })
  }/* else{
    $('#goBack').click(function () {
      location.href = 'goBack';
    })
  }*/
});