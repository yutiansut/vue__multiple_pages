var isApp = typeof pbE != 'undefined';
if(!isApp){
  window.pbE = {
    SYS: function () {
      var obj1 = {
        readConfig: function () {}
      }
      return obj1;
    }
  }
  
  $('#goBack').click(function () {
    location.href = document.referrer;
  });
  $.get('../conf/option.json',process);
} else {
  $('#goBack').click(function () {
    location.href = 'goBack';
  })
  process(JSON.parse(pbE.SYS().readConfig('option/conf/option.json')));
}

function process(data) {
  var e = data.more;
  console.log(e.stacked)
  var s = '';
  e.stacked.forEach(function (i) {
    s += '<li class="login"><a href="'+i.url+'">'+i.name+'<img class="more" src="../../images/more.png" alt="详细"></a></li>'
  })
  $('.nav-stacked').html(s);
}