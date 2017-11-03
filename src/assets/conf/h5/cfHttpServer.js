/**
 * Created by fzj on 2017/8/28.
 */

//
var PBHttpServer = {
  analysis: {
    serverUrl: "http://101.226.207.143:58080" //http://101.226.207.143:58080 http://101.230.0.69:30003
  },
  mine: {
    serverUrl: "http://101.226.207.143:58080"
  },
  condition:{
    serverUrl:'http://101.226.207.149/cloud_trade/1_0',//测试部测试
    // serverUrl:'http://101.226.207.143:8888/cloud_trade/1_0'//内部测试
  },
  indNews:{
    newsUrl:'http://pbzx1.pobo.net.cn/HdNews2/Web/',
    // companyUrl:'http://192.168.6.119:8181/pobo_info_app/1_0'
    // companyUrl:'http://192.168.6.119:8080/',
    serverUrl:'http://180.169.30.6:8080/',
    // companyUrl:'http://pbnetserver.pobo.net.cn:8989/',
    // shareUrl:'http://pbnetserver.pobo.net.cn:8989/share/indexNews.html?'//分享
    shareUrl:'http://180.169.30.6:8080/share/indexNews.html?'//分享
  },
  eCalendar : {
    serverUrl: "http://101.226.207.143:58080/FinancialCalendar/economicindicator/webservice"
  },
  activity: {
    //http://pbnetserver.pobo.net.cn/PbMobile/FZJ/share/active.html
    //http://180.169.30.6:8080/poboactivityws/active.html
    serverUrl: "http://180.169.30.6:8080/",
    // serverUrl: "http://pbnetserver.pobo.net.cn:8989/",
    // shareUrl: "http://pbnetserver.pobo.net.cn:8989/share/active.html"   //http://180.169.30.6:8080/poboactivityws/active.html
    shareUrl: "http://180.169.30.6:8080/share/active.html"   //http://180.169.30.6:8080/poboactivityws/active.html
  },
  apply:{
    "serverUrl":'http://192.168.6.49:8080/pobocmhelperapp/0.0.1/pc/'
  }
};
