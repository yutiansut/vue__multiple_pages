<template>
  <div class="with-status-bar" :class="{ 'andriod-status-bar': isAndroid }" id="withStatusBar">
    <div class="status-bar-bgc"></div>
    <div class="navbar-bgc">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'with-status-bar',
  data() {
    return {
      appName:"",
      color:""
    }
  },
  computed: {
    isAndroid () {
      if (pbE.isPoboApp) {
        var DeviceJsonInfo = JSON.parse(pbE.SYS().getDeviceJsonInfo());
        if (DeviceJsonInfo['255']) {  //平台
          var platNum = DeviceJsonInfo['255'];
          if (platNum == '3') {
            return true;
          }
        }
      }
      return false;
    }
  },
  created(){
    var _this = this;
    if (pbE.isPoboApp) {
      var confObj =  pbUtils.getModuleConfig("main.json","main")
      let conf = confObj["appSetting"];
      _this.appName = conf["appName"];
      _this.color = conf["baseColor"];
    }
    else
    {
      _this.$axios.get(_this.confUrl + 'main.json').then(function (data) {

        var confObj = data.data;
        let conf = confObj["appSetting"];
        _this.appName = conf["appName"];
        _this.color = conf["baseColor"];
      }).catch(function (err) {
        _this.$axios.get("../"+ _this.pbconfUrl + 'main.json').then(function (data) {

          var confObj = data.data;
          let conf = confObj["appSetting"];
          _this.appName = conf["appName"];
          _this.color = conf["baseColor"];
        });
      });
    }
  },
  mounted () {
      var _this = this;
    document.querySelector('#index-content-wrapper').onscroll = function () {
      var top = document.querySelector('#index-content-wrapper').scrollTop;
      var withStatusBar = document.getElementById('withStatusBar');
      _this.$emit('changeco','');
      if (top > 20 && top <= 40) {
        _this.$emit('changeco','');
        withStatusBar.style.backgroundColor = _this.RGB2RGBA(_this.color,".2");// 'rgba(51,102,204,.2)';
      } else if (top > 40 && top <= 60) {
        _this.$emit('changeco','');
        withStatusBar.style.backgroundColor = _this.RGB2RGBA(_this.color,".4");//'rgba(51,102,204,.4)';
      } else if (top > 60 && top <= 80) {
        _this.$emit('changeco','');
        withStatusBar.style.backgroundColor = _this.RGB2RGBA(_this.color,".6");//'rgba(51,102,204,.6)';
      } else if (top > 80 && top <= 100) {
        _this.$emit('changeco','');
        withStatusBar.style.backgroundColor = _this.RGB2RGBA(_this.color,".8");//'rgba(51,102,204,.8)';
      } else if (top > 100) {
        _this.$emit('changeco',_this.appName);
        withStatusBar.style.backgroundColor = _this.RGB2RGBA(_this.color,"1");//'rgba(51,102,204,1)';
      } else {
        _this.$emit('changeco','');
        withStatusBar.style.backgroundColor = _this.RGB2RGBA(_this.color,"0");//'rgba(51,102,204,0)';
      }
    }
  },
  methods: {
    RGB2RGBA(rgb,alp){
      //注：rgb_color的格式为#FFFFFFF，alp为透明度
      var r = parseInt("0x" + rgb.substr(1,2));
      var g = parseInt("0x" + rgb.substr(3,2));
      var b = parseInt("0x" + rgb.substr(5,2));
      var a = alp;
      return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    }
  }
}
</script>

