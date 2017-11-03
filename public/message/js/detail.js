var params = location.search.substr(1).split("&"), syncCode, message;

function callback(msg){
    msg = JSON.parse(msg);
    if (msg.moduleId == 90007 && (msg.functionNO == 111 || msg.functionNO == 112) && msg.requestNO == syncCode) {
        if(msg.errorCode != 0) {
            alert("errorCode:" + msg.errorCode);
            return;
        }
        if(msg.jData["1"] != "0"){
            alert("return code:" + msg.jData["1"]);
            return;
        }
        message = JSON.parse(pbMSG.ytzGetProFileMsg(params[0]));
        if(msg.functionNO == 111) {
            if(message.msgid)
                loadCut();
            else
                alert("消息不存在");
        }else
            loadData();
    }
}

function dataTimeOut(msg){
    msg = JSON.parse(msg);
    if (msg.moduleId == 90007 && (msg.functionNO == 111 || msg.functionNO == 112) && msg.requestNO == syncCode) {
        if(msg.functionNO == 111)
            alert("同步数据超时！");
        else {
            alert("获取详细内容超时！");
            loadData();
        }
    }
}

function loadCut() {
    if(message.cut == "1") {
        isReady(function(){
            syncCode = pbMSG.ytzGetMsgInfo(message.msgid);
        }, function(){
            alert("组件异常！");
            loadData();
        })
    }else
        loadData();
}

function loadData() {
    var msg = message;
    if(msg.readed == 0) {
        pbMSG.ytzUpdateReaded(msg.msgid);
        pbMSG.ytzCloudReportOnMsgReadedStatus(msg.msgid,"");
    }
    msgTitle.innerHTML = replace(msg.title);
    msgDate.innerHTML = msgTime(msg.time);
    msgCont.innerHTML = replace(msg.cont).replace(/(https?:\/\/[\w\-]+(\.[\w\-]+)+(:\d+)?(\/[\w\-%\.\/\?#!=&\$]*)?)/g, '<a href="pobo:pageId=900003&url=$1">$1</a>');   
}

function init(types) {
    !types && (types=JSON.parse(pbMSG.ytzLoadHDMsgTypes(3)).Messages);
    if(types.length == 0) {
        alert("消息类型加载失败");
        return;
    }
    for(var i=0;i<types.length;i++){
        if(types[i].typeid == params[1]) {
            navtxt.innerHTML = types[i].types;
            message = JSON.parse(pbMSG.ytzGetProFileMsg(params[0]));
            if(message.msgid)
                loadCut();
            else 
                isReady(function(){
                    syncCode = pbMSG.ytzHandleMsgHistoryQuery(params[1]-0, "");
                })
            return;
        }
    }
    alert("消息类型不存在");
}


var types = JSON.parse(pbMSG.ytzLoadHDMsgTypes(3)).Messages;
if(types.length==0) 
    isReady(init, init);
else
    init(types);