var bb = require("bb");
bb.Console = {
    EventType: {
        UPDATE_LOG: "UPDATE_LOG",
        UPDATE_CUSTOM: "UPDATE_CUSTOM"
    },
    log: "",
    customs: [],
    cmds: {},
    serverConf: {},

    init: function(){
        var self = this;
        self.addCustom("测试日志", function(){
            bb.log("this is a test log");
        });
        self.addCmd("testcmd", function(){
            bb.log("this is a test cmd");
        })
        self.addCmd("server", function(name){
            var host = self.serverConf[name];
            if(host){
                bb.Http.setHost(host);
            }
        })
    },

    addLog: function(str){
        this.log = this.log + str + "\n";
        bb.dispatch(this.EventType.UPDATE_LOG, this.log);
    },
    clearLog: function(){
        log = "";
        bb.dispatch(this.EventType.UPDATE_LOG, this.log);
    },

    addCustom(name, callback){
        // bb.log("addCustom", name, callback);
        this.customs.push({
            name: name,
            callback: callback
        })
        bb.dispatch(this.EventType.UPDATE_CUSTOM, this.customs);
    },
    doCustom(name){
        for (const i in this.customs) {
            if (this.customs.hasOwnProperty(i)) {
                const element = this.customs[i];
                element.callback.call(element.callback);
            }
        }
        var callback = this.customs[name];
        if(!callback){
            bb.log("custom not exist:", name);
        }
        callback.call(callback);
    },

    addCmd(name, callback){
        this.cmds[name] = callback;
    },
    runCmd(str){
        console.assert(str);
        var args = str.split(" ");
        var callback = this.cmds[args[0]];
        if(callback){
            args.shift();
            callback.apply(callback, args);
        }else{
            bb.log("todo send cmd to server");
        }
    },
    setServerConf(conf){
        this.serverConf = conf;
    },
};
