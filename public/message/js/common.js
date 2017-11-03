var pbMSG = pbE.MSG(), pbSYS = pbE.SYS();

if(!pbMSG) {
    pbMSG = {
               ytzLoadHDMsgTypes: function() {
                   var types = [{"typeid":"1","types":"系统消息","isoff":"1"},
                                {"typeid":"2","types":"预警消息","isoff":"1"},
                       {"typeid":"3","types":"产品消息","isoff":"1"},
                       {"typeid":"4","types":"条件单","isoff":"0"}];
                   return JSON.stringify(
                       {"Messages":types}
                       );   
               },
               ytzLoadProfileTypeMsg: function(type, count, id){
                   var msg = [], time = new Date();
                   id = id - 0;
                   if(type==3)
                       count = 0;
                   for(var i=0;i<count;i++){
                       msg.push({msgid:++id, typeid:type+"", title:"消息标题"+id, cont:"消息类型<span>iii</span>"+type+"消息内容<"+id+"\n"+time+" dddddddddddddddddd",readed:i%2+"",time:"20161213195218",par:""});
                   }
                   return JSON.stringify({
                       Messages:msg
                   });
               },
               ytzGetUnReadMsgCountByType: function(i){
                   return i-1;   
               },
               ytzUpdateReaded: function(){
                   
               },
               ytzGetProFileMsg: function(){
                //   return "{}";
                    return JSON.stringify({msgid:1, typeid:"1", title:"消息标题消息标题消息标题消息标题消息标题消息标题消息标题消息标题", cont:"       消息内容\n消息内容消息内容消息内容消息内容消息内容消息内容https://www.baidu.com消息内容消息内容消息内容消息内容消息内容http://172.234.34.2:80/test/test?id=sdf&id2=lkj\n消息内容",par:"l\"ink", readed:0,time:"20161213195218", cut:"1"});
               },
               ytzGetMsgInfo: function() {
                   var no = ++this.requestNo;
                   if(no >= 0)
                       setTimeout(function(){
                           callback(JSON.stringify({moduleId:90007, functionNO:112, requestNO: no, errorCode:0, jData:{"1":"0"}}));
                       },1000);
                   return this.requestNo;
               },
               ytzDeleteProfileMsg: function(msg){
                   console.log(msg);
               },
               ytzCloudRequestInquire: function(){
                   if(++this.requestNo>=0)
                       setTimeout(function(){
                           callback(JSON.stringify({moduleId:90007, functionNO:113, errorCode:0, jData:{"1":"0","content":[{"4":"1","5":"0"},{"4":"2","5":"1"},{"4":"3","5":"0"},{"4":"4","5":"0"},{"4":"5","5":"1"},{"4":"6","5":"0"},{"4":"7","5":"0"},{"4":"8","5":"0"}]}}));
                       },2000);
                   return this.requestNo;
               },
               ytzLoadOffLineMsg:function(){
//                   return JSON.stringify({Types:[]}); 
                   return JSON.stringify({Types:[{typeid:"1",offline:"1"},{typeid:"2",offline:"2"}]});  
               },
               ytzCloudRequestOffLineMsg: function(typeid, b){console.log(typeid + " " + b);
                   if(++this.requestNo>=0)
                       setTimeout(function(){
                           callback(JSON.stringify({moduleId:90007, functionNO:110, errorCode:0, jData:{"0":"110","1":"0","2":typeid+"","3":b?"1":"2"}}));
                       }, 1000)
                   return this.requestNo;
               },
               ytzHandleMsgHistoryQuery: function(typeid) {
                   console.log("sync:" + typeid);
                   var no = ++this.requestNo;
                   if(no>=0)
                       setTimeout(function(){
                           callback(JSON.stringify({
                           functionNO:111,
                           moduleId:90007,
                           requestNO:no,
                           errorCode:0,       
                           jData:{
                               "1":"0"
                           }       
                       }))}, 1000*typeid);
                   return no;
               },
               ytzIsServiceReady: function(){
                    console.log("ready: " + (++this.count));
                    return this.count;
               },
               ytzCloudReportOnMsgReadedStatus: function(){
      
               },
               count:-2,
               requestNo:0  
    }
}

function getConf(path, cb) {
    if(isPoboApp) {
        cb(JSON.parse(pbE.SYS().readConfig("message/conf/message.json")));
    }else {
        $.get(path + "conf/message.json?" + Date.now(), cb);
    }
}

function isReady(cb, cb2){
    var readyCount = 0, status;
    function a() {
        if((status=pbMSG.ytzIsServiceReady())>=0)
            cb();
        else {
            if(++readyCount>8) {
                cb2 = cb2 || function() {
                    alert("组件异常！"+status);
                }; 
                cb2();
                return;
            }
            setTimeout(a, 1000);
        }
    }
    a();
}

function d2(d) {
    return d < 10 ? "0"+d : d;
}

function msgTime(t){
    try {
        return t.substr(0,4)+"-"+t.substr(4,2)+"-"+t.substr(6,2)+" "+t.substr(8,2)+":"+t.substr(10,2);
    }catch(e){}    
    return t;
}

function replace(s) {
    return s.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
//window.onerror = function(a,b,c,d){
//    alert(a+"\n"+b+"\n"+c+"\n"+d);
//}

//var test = document.createElement("div");
//document.body.appendChild(test);
