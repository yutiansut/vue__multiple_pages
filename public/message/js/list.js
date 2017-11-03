var type = location.search.substr(1)-0, syncCode, appVue;

function sync() {
    syncCode = pbMSG.ytzHandleMsgHistoryQuery(type, "");
    if(syncCode<0) {
        appVue.loading = false;
        return;
    }
    appVue.loading = true;
    setTimeout(function(){
        if(appVue.loading)
            loadData();
    },60000);
}

function callback(msg){
    msg = JSON.parse(msg);
    if (msg.moduleId == 90007 && msg.functionNO == 111 && msg.requestNO == syncCode) {
//        alert("同步完成");
        loadData();    
    }
}

function dataTimeOut(msg){
    msg = JSON.parse(msg);
    if (msg.moduleId == 90007 && msg.functionNO == 111 && msg.requestNO == syncCode) {
//        alert("同步超时");
        loadData();
    }
}

function loadData(){
    appVue.unread = pbMSG.ytzGetUnReadMsgCountByType(type);
    var data = JSON.parse(pbMSG.ytzLoadProfileTypeMsg(type, 100, "")).Messages, d;
    for(var i=data.length-1;i>=0;i--) {
        d = data[i];
        d.checked = false;
        delete d.typeid;
        delete d.title;
        delete d.par;
    }
    appVue.data = data;
    appVue.loading = false;
}

Vue.filter("msgTime", msgTime);

function init(types) {
    !types && (types=JSON.parse(pbMSG.ytzLoadHDMsgTypes(3)).Messages);
    if(types.length == 0) {
        appVue.loading = false;
        alert("消息类型加载失败");
        return;
    }
    for(var i=0;i<types.length;i++) {
        if(types[i].typeid==type) {
            appVue.title = types[i].types;
            loadData();
            appVue.loading = true;
            isReady(sync, sync);
            return;
        }
    }
    appVue.loading = false;
    alert("消息类型错误"); 
}

new Vue({
    el: "#app",               
    data: function(){         
        appVue = this;
        return {type:type, title:"", unread:0, edit:false, data:[], count:0, checked:false, loading:true}
    },
    mounted: function(){
        this.$el.style.display="block";
        var types = JSON.parse(pbMSG.ytzLoadHDMsgTypes(3)).Messages;
        if(types.length==0) 
            isReady(init, init);
        else
            init(types);
    },
    methods:{
        updateUnread: function(data){
            var d;
            for(var i=0;i<data.length;i++) {
                d = data[i];
                if(d.readed==1)
                    continue;
                pbMSG.ytzUpdateReaded(d.msgid);
                pbMSG.ytzCloudReportOnMsgReadedStatus(d.msgid,"");
                d.readed = 1;
                --this.unread;
            }
        },
        read: function(d, e) {
            if(this.edit) {
                e.preventDefault();
                d.checked = !d.checked;
                if(d.checked) ++this.count;
                else --this.count;
                this.checked = this.count==this.data.length;
                return;
            }
            d.readed == 0 && this.updateUnread([d]);
        },
        changeEdit:function(){
            if(this.loading)
                return;
            if(!this.edit) {
                for(var i=this.data.length-1;i>=0;i--)
                    this.data[i].checked = false;
                this.count = 0;
                this.checked = false;
            }
            this.edit = !this.edit;
        },
        checkAll:function(){
            this.checked = !this.checked;
            for(var i=this.data.length-1;i>=0;i--)
                this.data[i].checked = this.checked;
            this.count = (this.checked?this.data.length:0);
        },
        del:function(){
            if(!this.count)
                return;
            if(confirm("是否删除选中消息？")) {
                var ids = [], d;
                for(var i=this.data.length-1;i>=0;i--) {
                    d = this.data[i];
                    d.checked && ids.push(d.msgid);
                }
                pbMSG.ytzDeleteProfileMsg(JSON.stringify({msgs:ids}));
                loadData();
                this.checked = false;
                this.count = 0;
                !this.data.length && (this.edit=false);
            }
        }
    }
});

function reload() {
    if(appVue.loading || appVue.edit)
        return;
    var data = JSON.parse(pbMSG.ytzLoadProfileTypeMsg(type, 1, "")).Messages;
    if(data.length>0 && (!appVue.data.length||data[0].msgid!=appVue.data[0].msgid))
        loadData();
}

