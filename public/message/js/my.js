!function(){
    var pbSYS = pbE.SYS(), pbMSG = pbE.MSG(), el;
    
    function unreadCallback(unread) {
        if(unread > 0)
            $("#msgNum").addClass("red");
        else
            $("#msgNum").removeClass("red");
    }
    
    function unreadReload(){
        if(!pbMSG || !pbSYS.getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName'))
            return;
        var count = pbMSG.ytzGetUnReadMsgCount();
        unreadCallback(count);
        if(count>0)
            return;
        var hides = JSON.parse(pbSYS.readConfig("message/conf/message.json")).hides;
        var types = JSON.parse(pbMSG.ytzLoadHDMsgTypes(3)).Messages;
        for(var i=0;i<types.length;i++) {
            if(hides.indexOf(types[i].typeid) == -1)
                pbMSG.ytzHandleMsgHistoryQuery(types[i].typeid-0, "");
        }
    }

    function reload() {
        var phone;
        if (pbSYS) {
            phone = pbSYS.getAppCertifyInfo('PbKey_H5_Home_Auth_LoginName');
        } else
            phone = 134354545;

        if(!phone) {
            $("#msgCon").hide();
            return;
        }

        if($("#msgCon").length==0) {
            $(el).append('<ul class="nav nav-pills nav-stacked" id="msgCon">'
                + '<li><a class="msgMenu" href="pobo:pageId=900005&url=message/index.html">'
                + '我的消息<span id="msgNum"></span><i class="more"></i>'
                + '</a></li></ul>');
        }
        $("#msgCon").show();
        unreadReload();
    }

    function callback(){
        unreadCallback(pbMSG.ytzGetUnReadMsgCount());
    }

    window.initMyMsg = function(id){
        el = id;
        function init() {
            if(pbPage.getInitState()) {
                pbPage.addModuleFunCallback(90007, 111, callback);
                pbPage.addReloadFunByKey('message-my',reload);
            }else {
                pbPage.initPage({
                    reload: reload,
                    callbacks:[{module:90007, fun:111, callback:callback}]
                });
            }   
            reload();
        }

        if(pbSYS) {
            JSON.parse(pbSYS.readConfig("main/conf/main.json")).my.msg && init();
        }else {
            $.get("../conf/main.json", function(cfg){
                cfg.my.msg && init();
            })
        }
    }
    
    window.initUnreadMsg = function(cb){
        unreadCallback = cb;
        if(pbPage.getInitState()) {
            pbPage.addModuleFunCallback(90007, 111, callback);
            pbPage.addReloadFun(unreadReload);
        }else {
            pbPage.initPage({
                reload: unreadReload,
                callbacks:[{module:90007, fun:111, callback:callback}]
            });
        }   
        unreadReload();
    }
}();
