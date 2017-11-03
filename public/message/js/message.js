var types = [1,2,3], syncCode, list = $("#app a");

function callback(msg){
    msg = JSON.parse(msg);
    if (msg.moduleId == 90007 && msg.functionNO == 111 && msg.requestNO in syncCode) {
//        alert("同步完成" + types[syncCode[msg.requestNO]]);
        getMsg(syncCode[msg.requestNO]);
    }
}

function dataTimeOut(msg){
    msg = JSON.parse(msg);
    if (msg.moduleId == 90007 && msg.functionNO == 111 && msg.requestNO in syncCode) {
//        alert("同步超时" + types[syncCode[msg.requestNO]]);
        getMsg(syncCode[msg.requestNO]);
    }
}

function getMsg(index) {
    var type = types[index], a = list.eq(index);
    var unread = pbMSG.ytzGetUnReadMsgCountByType(type);
    a[unread>0?"addClass":"removeClass"]("red");
    var msg = JSON.parse(pbMSG.ytzLoadProfileTypeMsg(type, 1, "")).Messages;
    if(msg.length>0)
        a.addClass("b").find("span").text(msg[0].cont);    
    else
        a.removeClass("b").find("span").html("");  
}

function sync(){
    syncCode = {};
    for(var i=0;i<types.length;i++) {
        syncCode[pbMSG.ytzHandleMsgHistoryQuery(types[i],"")] = i;
    }
}

function reload() {
    for(var i=0;i<types.length;i++){
        getMsg(i);
    }
    isReady(sync, sync);
}

reload();