function Controller() {
    function register() {
        $.fullname.getValue() ? doRegister() : Ti.UI.createAlertDialog({
            buttonNames: [ "OK" ],
            message: "名前を入力してください。",
            title: "お知らせ"
        }).show();
    }
    function doRegister() {
        $.register.removeEventListener("click", register);
        $.fullname.blur();
        $.email.blur();
        var progressIndicator = Ti.UI.Android.createProgressIndicator({
            message: "処理中。。。",
            location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
            type: Ti.UI.Android.PROGRESS_INDICATOR_STATUS_BAR
        });
        progressIndicator.show();
        gcm.registerC2dm({
            success: function() {
                var reg_id = gcm.getRegistrationId();
                if (reg_id) {
                    var client = Ti.Network.createHTTPClient({
                        onload: function() {
                            var data = JSON.parse(this.responseText);
                            if (data.id) {
                                var userData = Alloy.createModel("configs", {
                                    cg_name: "uid",
                                    cg_value: data.id
                                });
                                Alloy.Collections.configs.add(userData);
                                userData.save();
                                userData = Alloy.createModel("configs", {
                                    cg_name: "usrname",
                                    cg_value: data.name
                                });
                                Alloy.Collections.configs.add(userData);
                                userData.save();
                                Ti.API.UID = {
                                    id: data.id,
                                    name: data.name
                                };
                                var confirm = Ti.UI.createAlertDialog({
                                    title: "お知らせ",
                                    message: "アカウントの登録に成功しました！",
                                    buttonNames: [ "OK" ]
                                });
                                confirm.addEventListener("click", function() {
                                    openView("schedule");
                                    $.index.close();
                                });
                                progressIndicator.hide();
                                confirm.show();
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
                        name: $.fullname.getValue(),
                        reg_id: reg_id
                    });
                } else {
                    progressIndicator.hide();
                    errorRegister();
                }
            },
            error: function() {
                errorRegister();
                progressIndicator.hide();
            },
            callback: function() {}
        });
    }
    function errorRegister() {
        Ti.UI.createAlertDialog({
            buttonNames: [ "OK" ],
            message: "登録の処理中にエラーが発生しました。",
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
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        backgroundColor: "#fff",
        exitOnClose: "true",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.loginForm = Ti.UI.createScrollView({
        top: 20,
        bottom: 20,
        layout: "vertical",
        left: 50,
        right: 50,
        id: "loginForm",
        zIndex: "-1"
    });
    $.__views.index.add($.__views.loginForm);
    $.__views.__alloyId28 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#ff3974",
        textAlign: "center",
        font: {
            fontSize: "25sp"
        },
        top: "50dp",
        bottom: "10sp",
        text: "アカウント登録",
        id: "__alloyId28"
    });
    $.__views.loginForm.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#888888",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "18sp"
        },
        bottom: "20dp",
        text: "登録は簡単・無料なので、今すぐ登録してください。",
        id: "__alloyId29"
    });
    $.__views.loginForm.add($.__views.__alloyId29);
    $.__views.fullname = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#fff",
        zIndex: "2",
        maxLength: "40",
        id: "fullname",
        hintText: "名前"
    });
    $.__views.loginForm.add($.__views.fullname);
    $.__views.email = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#fff",
        zIndex: "2",
        id: "email",
        hintText: "メール"
    });
    $.__views.loginForm.add($.__views.email);
    $.__views.register = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "25sp"
        },
        height: Ti.UI.SIZE,
        backgroundColor: "#ff3974",
        backgroundFocusedColor: "#e4f7ff",
        backgroundSelectedColor: "#e4f7ff",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        title: "登録",
        top: "10dp",
        id: "register"
    });
    $.__views.loginForm.add($.__views.register);
    register ? $.__views.register.addEventListener("click", register) : __defers["$.__views.register!click!register"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Collections.configs = Alloy.createCollection("configs");
    var configs = Alloy.Collections.configs;
    configs.fetch({
        query: 'select cg_value from configs where cg_name="uid" or cg_name="usrname"'
    });
    if (configs.models.length > 0) {
        Ti.API.UID = {
            id: configs.models[0].get("cg_value"),
            name: configs.models[1].get("cg_value")
        };
        openView("schedule");
    } else $.index.open();
    $.index.addEventListener("android:back", function() {
        Titanium.Android.currentActivity.finish();
    });
    __defers["$.__views.register!click!register"] && $.__views.register.addEventListener("click", register);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;