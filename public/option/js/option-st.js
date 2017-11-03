var NavHeader = React.createClass({
  displayName: 'NavHeader',

  render: function () {
    return React.createElement(
      'div',
      { className: 'container-fluid' },
      React.createElement(
        'div',
        { className: 'navbar-header' },
        React.createElement(
          'a',
          { href: 'goBack', className: 'navbar-brand', id: 'goBack' },
          React.createElement('img', { src: '../../images/goback.png', alt: '返回' })
        )
      ),
      React.createElement(
        'p',
        { className: 'navbar-text' },
        this.props.name
      )
    );
  }
});

ReactDOM.render(React.createElement(NavHeader, { name: '资金现状' }), document.getElementById('nav-header'));

function queryMoneyPart (msg) {
  pbE.SYS().stopLoading();
  var asset = msg.jData.data[0];
  $('#total-asset').html(pbUtils.comma(asset['97'], 2) + '元');

    if (asset['345']) {
        var num = asset['345'].indexOf('%'),
            value = asset['345'];
        if (num < 0) {
            value = asset['345'] + '%';
        }
        if (value.slice(0, value.length-1) == 0) {
            $('#guarantee').text('0');
        } else {
            $('#guarantee').text(pbUtils.doubleToPercent(1.0 / pbUtils.per2num(value), 2));
        }

        if(num >= 0){
            $('#risk').html(value);
            if(asset['361'])
               $('#dd-risk').html((10000/(asset['361'].replace('%','') -0)).toFixed(2) + '%');
        } else {
            if(value - 0 > 1)
                $('#risk').html(100/(value-0)+ '%');
            else
                $('#risk').html(value+ '%');
        }
    }
    if(asset['107']){//实时风险度
        if(asset['107'].indexOf('%') >= 0){
            $('#jiaoyisuo').html(asset['107']);
            if(asset['345'])
                $('#dd-jiaoyisuo').html((10000/(asset['345'].replace('%','') -0)).toFixed(2) + '%');
        } else {
            if(asset['107'] - 0 > 1)
                $('#jiaoyisuo').html(100/(asset['107']-0)+ '%');
            else
                $('#jiaoyisuo').html(asset['107']+ '%');
        }
    }else{
        $('#jiaoyisuo').text('--')
    }
  if (asset['56']) {
    asset['unit'] = pbUtils.getUnit(asset['56']);
  } else {
    asset['unit'] = '元';
  }
    if(asset['111']){//可用保证金
        $('#available').text(pbUtils.comma(asset['111'], 2) + asset['unit'])
    }else{
        $('#available').text('--' + asset['unit'])
    }
  if (asset['110'] && !isNaN(asset['110'])) {
    $('#cash').text(pbUtils.comma(asset['110'], 2) + asset['unit']); //现金资产
  } else {
      $('#cash').text('--' + asset['unit']);
  }
  if (asset['93'] && !isNaN(asset['93'])) {
    $('#usable').text(pbUtils.comma(asset['93'], 2) + asset['unit']); //可用资金
  } else {
      $('#usable').text('--' + asset['unit']);
    }
  if (asset['152'] && !isNaN(asset['152'])) {
    $('#position').text(pbUtils.comma(asset['152'], 2) + asset['unit']); //持仓保证金
  } else {
      $('#position').text('--' + asset['unit']);
    }
    if (asset['346'] && !isNaN(asset['346'])) {
        $('#occupancy').text(pbUtils.comma(asset['346'], 2) + asset['unit']); //已占用保证金
    } else {
        $('#occupancy').text('--' + asset['unit']);
    }
  if (asset['95'] && !isNaN(asset['95'])) {
     $('#preferred').text(pbUtils.comma(asset['95'], 2) + asset['unit']); //可取资金
  } else {
      $('#preferred').text('--' + asset['unit']);
    }
  if (asset['101'] && !isNaN(asset['101'])) {
    asset['101'] = pbUtils.comma(asset['101'], 2); //持仓浮动盈亏
  } else {
    asset['101'] = '--';
  }
  var float1 = pbE.SYS().getPrivateData('float');
  $('#profit').text(float1 + asset['unit']);
  if (float1) {
    asset['float'] = float1;
  } else if (asset['101'] && !isNaN(asset['101'])) {
    asset['float'] = asset['101'];
  } else {
    asset['float'] = '--';
  }
  if (asset['96'] && !isNaN(asset['96'])) {
    $('#total').text(pbUtils.comma(asset['96'], 2) + asset['unit']); //总市值
  } else {
      $('#total').text('--' + asset['unit']);
    }
  var a;
  if (asset['475'] && !isNaN(asset['475'])) {
    a = pbUtils.comma(asset['475'], 2);
    $('#shanglimitation').text(a.substr(0, a.length - 3) + asset['unit']);
  } else {
      $('#shanglimitation').text('--' + asset['unit']);
  }
  if (asset['476'] && !isNaN(asset['476'])) {
    a = pbUtils.comma(asset['476'], 2);
    $('#shenglimitation').text(a.substr(0, a.length - 3)+ asset['unit']);
  } else {
      $('#shenglimitation').text('--' + asset['unit']);
  }
  if (asset['477'] && !isNaN(asset['477'])) {
    a = pbUtils.comma(asset['477'], 2);
    asset['477'] = a.substr(0, a.length - 3);
  } else {
    asset['477'] = '--';
  }
  if (asset['478'] && !isNaN(asset['478'])) {
    a = pbUtils.comma(asset['478'], 2);
    asset['478'] = a.substr(0, a.length - 3);
  } else {
    asset['478'] = '--';
  }
  // ReactDOM.render(React.createElement(FundsInfoOptions, { asset: asset }), document.getElementById('contents'));
}

var CID = pbE.WT().wtGetCurrentConnectionCID();

$(function () {
  if (!pbE.isPoboApp) {
    $('#goBack').click(function () {
      location.href = document.referrer;
    })
  } else{
    $('#goBack').click(function () {
      location.href = 'goBack';
    })
  }

  var option = {
    callbacks: [{fun: 6012, module: 90002, callback: function (msg) {queryMoneyPart(msg);}}
               ],

    reload: function () {
      CID = pbE.WT().wtGetCurrentConnectionCID();
      pbE.SYS().startLoading();
      pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
    },

    refresh: function () {
      pbE.SYS().startLoading();
      pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
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
  pbE.WT().wtQueryMoney(CID, JSON.stringify({}));
});
if(pbE.isPoboApp){
    process(JSON.parse(pbE.SYS().readConfig('option/conf/option.json')));
}else{
    $.get('../conf/option.json',process);
}

function process(data) {
    data = data.st;
    var html = '<ul>';
    for(var i = 0; i < data.length;i++){
        if(i%2 == 1){
            html += '<li style="margin-left:4%;"><p>'+data[i].name+'</p><p id="'+data[i].id+'">--</p></li>';
        }else{
            html += '<li><p>'+data[i].name+'</p><p id="'+data[i].id+'">--</p></li>';
        }
    }
    html += '</ul>';
    $('#contents').html(html);
}
