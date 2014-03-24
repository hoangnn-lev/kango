function Controller() {
    function init() {
        configs.fetch({
            query: 'select cg_value from configs where cg_name="uid"'
        });
        if (configs.models.length > 0) {
            Ti.API.UID = configs.models[0].get("cg_value");
            openView("schedule");
            $.index.close();
        } else doRegister();
    }
    function doRegister() {
        var progressIndicator = Ti.UI.Android.createProgressIndicator({
            message: "処理中。。。",
            location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
            type: Ti.UI.Android.PROGRESS_INDICATOR_STATUS_BAR
        });
        progressIndicator.show();
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                var data = JSON.parse(this.responseText);
                if (data.result) {
                    var userData = Alloy.createModel("configs", {
                        cg_name: "uid",
                        cg_value: data["data"].id
                    });
                    configs.add(userData);
                    userData.save();
                    Ti.API.UID = data["data"].id;
                    Ti.API.activeTab = 4;
                    openView("setting");
                    progressIndicator.hide();
                    $.index.close();
                } else {
                    progressIndicator.hide();
                    errorRegister();
                }
            },
            onerror: function() {
                progressIndicator.hide();
                errorRegister();
            }
        });
        client.open("POST", Ti.API.KANGO_API_REGISTER);
        client.send({
            device_uid: Titanium.Platform.id
        });
    }
    function errorRegister() {
        func.alert("初回起動時はインターネットに接続してから起動してください");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#fff",
        exitOnClose: "true",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.container = Ti.UI.createView({
        id: "container"
    });
    $.__views.index.add($.__views.container);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var configs = Alloy.Collections.configs;
    $.container.setBackgroundImage("/images/screen.png");
    $.index.open();
    setTimeout(function() {
        init();
    }, 2e3);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;