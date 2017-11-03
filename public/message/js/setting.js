var types, statuses;

function status(typeid) {
    for(var i=0;i<statuses.length;i++){
        if(statuses[i].typeid == typeid) {
            return statuses[i].offline;
        }
    }
    return "0";
}

//function status(typeid) {
//    for(var i=0;i<statuses.length;i++){
//        if(statuses[i]["4"] == typeid) {
//            return statuses[i]["5"];
//        }
//    }
//    return "0";
//}

function genBtns() {
    $("#ul li").each(function(){
        var t = $(this), s = status(t.attr("_id"));
        t.append("<span><i></i></span>");
        t.data("on", s==0?s:(s==1));
        s!=2 && t.addClass("on");
    });
}

function callback(msg) {
    msg = JSON.parse(msg);
    if(msg.moduleId == 90007 && msg.functionNO == 113){
        if(msg.errorCode != 0) {
            alert("errorCode:" + msg.errorCode);
            return;
        }
        if(msg.jData["1"] != "0"){
            alert("return code:" + msg.jData["1"]);
            return;
        }
        statuses = JSON.parse(pbMSG.ytzLoadOffLineMsg()).Types;
        genBtns();    
//        statuses = msg.jData.content;
//        $("#ul li").each(function(){
//            var t = $(this), s = status(t.attr("_id"));
//            t.append("<span><i></i></span>").data("on", s=="0");
//            s=="0" && t.addClass("on");
//        });
    }
}

function dataTimeOut(msg){
    msg = JSON.parse(msg);
    if(msg.moduleId == 90007 && msg.functionNO == 113) {
        alert("查询超时！");
    }
}

function init() {
    !types.length && (types = JSON.parse(pbMSG.ytzLoadHDMsgTypes(3)).Messages);
    if(types.length == 0) {
        alert("消息类型加载失败");
        return;
    }
    var html = "", type, typeid;
    for(var i=0;i<types.length;i++){
        type = types[i];
        typeid = type.typeid;
        if(type.isoff == "1") 
            html += "<li _id='" + typeid + "'>" + type.types + "</li>";
    }
    $("#ul").html(html).on("click", "span", function(){
        $(this).parent().toggleClass("on");
    });
    statuses = JSON.parse(pbMSG.ytzLoadOffLineMsg()).Types;
    if(statuses.length) {
        genBtns();
        return;
    }
    isReady(function(){
        pbMSG.ytzCloudRequestInquire();
    })
}

function save(e) {
    $("#ul li").each(function(){
        var t = $(this);
        if(t.data("on")!==undefined && t.data("on") !== t.hasClass("on"))
            pbMSG.ytzCloudRequestOffLineMsg(t.attr("_id")-0, t.hasClass("on"));
    })
}

function backCallback(){
    backBtn.click();
}

types = JSON.parse(pbMSG.ytzLoadHDMsgTypes(3)).Messages;
if(types.length==0) 
    isReady(init, init);
else
    init();