function Controller() {
    function changeDayOffset(e) {
        if (dayOffset != e.rowIndex) {
            dayOffset = e.rowIndex;
            var model = Alloy.createModel("configs", {
                id: configs.models[0].get("id"),
                cg_name: "dayOffset",
                cg_value: dayOffset
            });
            Alloy.Collections.configs.add(model);
            model.save();
            scheduleViewObj = "";
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "setting";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.setting = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "setting"
    });
    $.__views.setting && $.addTopLevelView($.__views.setting);
    $.__views.__alloyId29 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        top: "0",
        id: "__alloyId29"
    });
    $.__views.setting.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        backgroundColor: "#ff3974",
        id: "__alloyId30"
    });
    $.__views.__alloyId29.add($.__views.__alloyId30);
    $.__views.__alloyId31 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "30dp",
        color: "#fff",
        zIndex: 1,
        textAlign: "center",
        font: {
            fontSize: "20sp"
        },
        text: "設定",
        top: "5dp",
        bottom: "5dp",
        id: "__alloyId31"
    });
    $.__views.__alloyId30.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "10dp",
        right: "10dp",
        top: "5dp",
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId32"
    });
    $.__views.__alloyId29.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId33"
    });
    $.__views.__alloyId32.add($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#333",
        zIndex: 1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "20sp"
        },
        text: "ID",
        top: "0",
        left: "0",
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    $.__views.uid = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#666",
        zIndex: 1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "20sp"
        },
        right: "0",
        top: "0",
        id: "uid"
    });
    $.__views.__alloyId33.add($.__views.uid);
    $.__views.__alloyId35 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "1",
        color: "#333",
        zIndex: "0",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "20sp"
        },
        top: 20,
        bottom: 20,
        backgroundColor: "#ccc",
        id: "__alloyId35"
    });
    $.__views.__alloyId32.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId36"
    });
    $.__views.__alloyId32.add($.__views.__alloyId36);
    $.__views.__alloyId37 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#333",
        zIndex: 1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "20sp"
        },
        text: "名前",
        top: "0",
        left: "0",
        id: "__alloyId37"
    });
    $.__views.__alloyId36.add($.__views.__alloyId37);
    $.__views.name = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#666",
        zIndex: 1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "20sp"
        },
        text: "ホァン　グェン",
        right: "0",
        top: "0",
        id: "name"
    });
    $.__views.__alloyId36.add($.__views.name);
    $.__views.__alloyId38 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "1",
        color: "#333",
        zIndex: "0",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "20sp"
        },
        top: 20,
        bottom: 20,
        backgroundColor: "#ccc",
        id: "__alloyId38"
    });
    $.__views.__alloyId32.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        id: "__alloyId39"
    });
    $.__views.__alloyId32.add($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#333",
        zIndex: 1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "20sp"
        },
        text: "カレンダー設定",
        left: "0",
        id: "__alloyId40"
    });
    $.__views.__alloyId39.add($.__views.__alloyId40);
    var __alloyId41 = [];
    $.__views.dayOffset = Ti.UI.createPicker({
        right: "0",
        id: "dayOffset"
    });
    $.__views.__alloyId39.add($.__views.dayOffset);
    $.__views.__alloyId42 = Ti.UI.createPickerRow({
        title: "日曜始まり",
        id: "__alloyId42"
    });
    __alloyId41.push($.__views.__alloyId42);
    $.__views.__alloyId43 = Ti.UI.createPickerRow({
        title: "月曜始まり",
        id: "__alloyId43"
    });
    __alloyId41.push($.__views.__alloyId43);
    $.__views.dayOffset.add(__alloyId41);
    changeDayOffset ? $.__views.dayOffset.addEventListener("change", changeDayOffset) : __defers["$.__views.dayOffset!change!changeDayOffset"] = true;
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#ededed",
        width: Ti.UI.FILL,
        heigth: Ti.UI.SIZE,
        id: "tabMenu",
        __parentSymbol: $.__views.setting
    });
    $.__views.tabMenu.setParent($.__views.setting);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.tabMenu.getView("setting").setImage(Ti.API.TABMENU["setting_active"]);
    Alloy.Collections.configs = Alloy.createCollection("configs");
    var configs = Alloy.Collections.configs;
    configs.fetch({
        query: 'select id,cg_value from configs where cg_name="dayOffset"'
    });
    var dayOffset = configs.models[0].get("cg_value");
    $.uid.setText(Ti.API.UID["id"]);
    $.name.setText(Ti.API.UID["name"]);
    $.dayOffset.setSelectedRow(0, dayOffset);
    $.setting.addEventListener("android:back", function() {
        scheduleView();
    });
    $.uid.addEventListener("click", function() {
        var confirm = Ti.UI.createAlertDialog({
            title: Ti.API.UID["name"],
            message: "UID " + Ti.API.UID["id"],
            buttonNames: [ "コピー", "キャンセル" ]
        });
        confirm.addEventListener("click", function(e) {
            0 == e.index && Ti.UI.Clipboard.setText(Ti.API.UID["id"]);
        });
        confirm.show();
    });
    $.name.addEventListener("click", function() {
        var textfield = Ti.UI.createTextField({
            maxLength: 40,
            value: $.name.getText()
        });
        var dialog = Ti.UI.createAlertDialog({
            title: "名前変更",
            androidView: textfield,
            buttonNames: [ "はい", "いいえ" ]
        });
        dialog.addEventListener("click", function(e) {
            if (0 == e.index) {
                var newName = textfield.getValue();
                if (newName != Ti.API.UID["name"]) {
                    var progressIndicator = Ti.UI.Android.createProgressIndicator({
                        message: "処理中。。。",
                        location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
                        type: Ti.UI.Android.PROGRESS_INDICATOR_STATUS_BAR
                    });
                    progressIndicator.show();
                    var client = Ti.Network.createHTTPClient({
                        onload: function() {
                            configs.fetch({
                                query: 'select id from configs where cg_name="usrname"'
                            });
                            var model = Alloy.createModel("configs", {
                                id: configs.models[0].get("id"),
                                cg_name: "usrname",
                                cg_value: newName
                            });
                            Alloy.Collections.configs.add(model);
                            model.save();
                            $.name.setText(newName);
                            Ti.API.UID["name"] = newName;
                            progressIndicator.hide();
                        },
                        onerror: function() {
                            progressIndicator.hide();
                            Ti.UI.createAlertDialog({
                                buttonNames: [ "OK" ],
                                message: "エラーが発生しました！",
                                title: "お知らせ"
                            }).show();
                        }
                    });
                    client.open("POST", Ti.API.KANGO_API_CHANGE_NAME);
                    client.send({
                        uid: Ti.API.UID["id"],
                        name: newName
                    });
                }
            }
        });
        dialog.show();
    });
    __defers["$.__views.dayOffset!change!changeDayOffset"] && $.__views.dayOffset.addEventListener("change", changeDayOffset);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;