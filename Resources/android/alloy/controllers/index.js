function Controller() {
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
    $.__views.__alloyId37 = Ti.UI.createView({
        layout: "vertical",
        left: 50,
        right: 50,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "__alloyId37"
    });
    $.__views.index.add($.__views.__alloyId37);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var configs = Alloy.Collections.configs;
    configs.fetch({
        query: 'select cg_value from configs where cg_name="uid"'
    });
    if (configs.models.length > 0) {
        Ti.API.UID = configs.models[0].get("cg_value");
        openView("schedule");
    } else doRegister();
    $.index.addEventListener("android:back", function() {
        Titanium.Android.currentActivity.finish();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;