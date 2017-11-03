var InfoListPc = React.createClass({
  displayName: 'InfoList',

  render: function () {
    var creatContents = function (content) {
      var href = this.props.dir + 'info/view/info-de.html?newsId=' + content.ID;
      var time = content.Pubtime.split(' ');
      return React.createElement(
        'a',
        {className: 'list-group-item clearfix', href: href},
        React.createElement('span', {className: 'title', dangerouslySetInnerHTML: {__html: content.Title}}),
        React.createElement(
          'span',
          {className: 'time'},
          time[0]
        )
      );
    };
    return React.createElement(
      'div',
      {className: 'list-group'},
      this.props.contents.map(creatContents, this)
    );
  }
});

function getData(data) {
  // if(isPoboApp){
  var gp = {gcount: data.ids.length, count: data.count};
  for (var i = 0; i < gp.gcount; i++) {
    gp["group" + (i + 1)] = data.ids[i];
  }
  $.get(url.index.webservice, gp, function (result) {
    var CONTENTS = JSON.parse(result).Indexes.slice(0, data.count);
    ReactDOM.render(React.createElement(InfoListPc, {
      contents: CONTENTS,
      dir: dirStr
    }), document.getElementById('info-list'));
  });
  // }else{
  //     count = data.count;
  //     pbE.INFO().infoQueryListWithJson(JSON.stringify({type: 'mu', groupIDs: data.ids, doc: 'json', count: data.count}));
  // }
}

function success(dat) {
  url = dat;
  var data = dat.index,
    con = $(".nav-tabs"),
    t = '',
    elem = $("#info-nav");
  data.data.forEach(function (d, i) {
    if (i == 0) {
      t += '<li id="tab-' + i + '" class="swiper-slide activate"><a href="javascript:void(0);">' + d.name + '</a></li>';
    } else {
      t += '<li id="tab-' + i + '" class="swiper-slide"><a href="javascript:void(0);">' + d.name + '</a></li>';
    }
  });
  con.html(t);
  CONTENTS = [];
  current = 0;

  if (data.data.length > 1) {
    elem.find(".nav-tabs>li").on('click', function () {
      var i = $(this), num = i.index();
      i.addClass("activate").siblings().removeClass().addClass("swiper-slide");
      current = num;
      if (CONTENTS[num])
        ReactDOM.render(React.createElement(InfoList, {
          contents: CONTENTS[num],
          dir: dirStr
        }), document.getElementById('info-list'));
      else
        getData(data.data[num]);
    }).eq(0).addClass("active");
  }

  if (data.data.length > 0) {
    CONTENTS = [];
    getData(data.data[0]);
  }
  $(document).ready(function () {
    /*var navScroll = new IScroll('#info-nav', {
        eventPassthrough: true,
        scrollX: true,
        scrollY: false,
        preventDefault: false,
        snap: 'li',
        tap: true
    });*/
    var mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      observer: true,
      observeParents: true,
      initialSlide: 0,
      freeMode: true //加速滑动(更加流畅)
    })
  });
}

var isPoboApp = typeof pbE == "undefined";
var url, CONTENTS, count;
var dirStr = 'pobo:uncheck=1&pageId=900004&title=详细信息&url=';

function reload() {
  // 去掉ios上300毫秒延迟
  FastClick.attach(document.body);
  if (pbE.isPoboApp) {
    success(JSON.parse(pbE.SYS().readConfig('info/conf/info.json')))
  } else {
    $.get("conf/info.json?" + Date.now(), success);
  }
}

function callback(message) {
  var msg = JSON.parse(message);
  if (msg.moduleId == 90004) {
    var CONTENTS = msg.jData.Indexes.slice(0, count);
    ReactDOM.render(React.createElement(InfoList, {
      contents: CONTENTS,
      dir: dirStr
    }), document.getElementById('info-list'));
  }
}

reload();
