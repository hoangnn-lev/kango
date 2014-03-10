function Controller() {
    function register() {
        var pass = $.password.getValue().trim();
        var email = $.email.getValue();
        "" == $.fullname.getValue().trim() ? alert("Please enter name") : func.validateEmail(email) ? "" == pass ? alert("Please enter password") : 6 > pass.length ? alert("Password is too short") : doRegister() : alert("Email is not valid");
    }
    function doRegister() {
        $.fullname.blur();
        $.email.blur();
        $.password.blur();
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
                            if (data.result) {
                                var userData = Alloy.createModel("configs", {
                                    cg_name: "uid",
                                    cg_value: data["data"].id
                                });
                                configs.add(userData);
                                userData.save();
                                var confirm = Ti.UI.createAlertDialog({
                                    title: "お知らせ",
                                    message: "アカウントの登録に成功しました！",
                                    buttonNames: [ "OK" ]
                                });
                                confirm.addEventListener("click", function() {
                                    openView("setting");
                                    $.index.close();
                                });
                                progressIndicator.hide();
                                confirm.show();
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
                        name: $.fullname.getValue(),
                        email: $.email.getValue(),
                        password: Titanium.Utils.md5HexDigest($.password.getValue()),
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
            }
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
    var __defers = {};
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
    $.__views.__alloyId35 = Ti.UI.createLabel({
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
        id: "__alloyId35"
    });
    $.__views.loginForm.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#888888",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "18sp"
        },
        bottom: "20dp",
        text: "登録は簡単・無料なので、今すぐ登録してください。",
        id: "__alloyId36"
    });
    $.__views.loginForm.add($.__views.__alloyId36);
    $.__views.fullname = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#fff",
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
        id: "email",
        hintText: "メール"
    });
    $.__views.loginForm.add($.__views.email);
    $.__views.password = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#fff",
        passwordMask: "true",
        maxLength: "32",
        id: "password",
        hintText: "パスワード"
    });
    $.__views.loginForm.add($.__views.password);
    $.__views.register = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        height: "35dp",
        backgroundColor: "#f3acbd",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
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
        query: 'select cg_value from configs where cg_name="uid"'
    });
    if (configs.models.length > 0) {
        Ti.API.UID = configs.models[0].get("cg_value");
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