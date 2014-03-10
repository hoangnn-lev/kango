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
                    openView("setting");
                    progressIndicator.hide();
                } else {
                    progressIndicator.hide();
                    errorRegister(data.msg);
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
    function errorRegister(msg) {
        Ti.UI.createAlertDialog({
            buttonNames: [ "OK" ],
            message: msg ? msg : "登録の処理中にエラーが発生しました。",
            title: "お知らせ"
        }).show();
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
    $.__views.loginForm = Ti.UI.createView({
        layout: "vertical",
        left: 50,
        right: 50,
        id: "loginForm",
        zIndex: "-1"
    });
    $.__views.index.add($.__views.loginForm);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Collections.configs = Alloy.createCollection("configs");
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