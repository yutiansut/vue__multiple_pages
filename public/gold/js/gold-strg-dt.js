$(function () {
  if (!pbE.isPoboApp) {
    $('#goBack').click(function () {
      location.href = document.referrer;
    })
  }/* else{
    $('#goBack').click(function () {
      location.href = 'goBack';
    })
  }*/
  
  var conf;
  if (!pbE.isPoboApp) {
    $.get('../conf/gold.json', function (data) {conf = data;});
    /*conf = {
      "strg-detail": {  //库存详情
        "title": "库存信息",
        "functionNO": "",
        "item": [{'name': '品种代码', 'id': 'number', 'num': '364'}, 
                 {'name': '品种名称', 'id':'app', 'num': '365'}, 
                 {'name': '库存总量', 'id': 'start', 'num': '366'}, 
                 {'name': '可用库存', 'id': 'end', 'num': '367'}, 
                 {'name': '待提库存', 'id': 'bank', 'num': '368'}, 
                 {'name': '今买入量', 'id': 'status', 'num': '369'}, 
                 {'name': '今卖出量', 'id': 'city', 'num': '370'}, 
                 {'name': '今存入', 'id': 'code', 'num': '371'}, 
                 {'name': '今提出', 'id': 'name', 'num': '372'}, 
                 {'name': '今借入', 'id': 'weight', 'num': '373'}, 
                 {'name': '今借出', 'id': 'people', 'num': '374'}, 
                 {'name': '出库量', 'id': 'id', 'num': '375'}, 
                 {'name': '现货冻结库存', 'id': 'idNum', 'num': '376'}, 
                 {'name': '质押库存', 'id': 'storage', 'num': '377'}, 
                 {'name': '质押冻结库存', 'id': 'contact', 'num': '378'}, 
                 {'name': '法律冻结库存', 'id': 'phone', 'num': '379'}, 
                 {'name': '银行冻结库存', 'id': 'mode', 'num': '380'}, 
                 {'name': '库存均价', 'id': 'channel', 'num': '381'}, 
                 {'name': '交易日期', 'id': 'channel', 'num': '248'}]
      }
    };*/
  } else {
    conf = pbUtils.parseJSON(pbE.SYS().readConfig('gold/conf/gold.json'));
  }
  
  var content = pbUtils.parseJSON(pbUtils.GetQueryString("par"));
  for (var i = 0, j = conf["strg-detail"].item.length; i < j; i++) {
    $('#content').append('<div class="row status-row">' + conf["strg-detail"].item[i].name + '<span class="pull-right" id=' + conf["strg-detail"].item[i].id + '></span></div>');
    if (content[conf["strg-detail"].item[i].num]) {
      $('#' + conf["strg-detail"].item[i].id).html(content[conf["strg-detail"].item[i].num]);
    }
  }
});