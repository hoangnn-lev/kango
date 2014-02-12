function Controller() {
    function changeDayOffset() {
        if (0 == dayOffset) {
            $.monday_set.setBackgroundColor("#fff2cc");
            $.monday_set.setTitle("ON");
            dayOffset = 1;
        } else {
            $.monday_set.setBackgroundColor("#cccccc");
            $.monday_set.setTitle("OFF");
            dayOffset = 0;
        }
        var model = Alloy.createModel("configs", {
            id: configs.models[0].get("id"),
            cg_name: "dayOffset",
            cg_value: dayOffset
        });
        Alloy.Collections.configs.add(model);
        model.save();
        delete_view("schedule");
    }
    function edit_members() {
        openView("edit_member");
    }
    function shift_setting() {
        openView("shift_setting");
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
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu",
        __parentSymbol: $.__views.setting
    });
    $.__views.tabMenu.setParent($.__views.setting);
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: "50dp",
        id: "main"
    });
    $.__views.setting.add($.__views.main);
    $.__views.__alloyId60 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        top: "0",
        id: "__alloyId60"
    });
    $.__views.main.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#ff3974",
        id: "__alloyId61"
    });
    $.__views.__alloyId60.add($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "30dp",
        color: "#fff",
        zIndex: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        top: "5dp",
        right: "10dp",
        bottom: "5dp",
        left: "10dp",
        text: "設定",
        id: "__alloyId62"
    });
    $.__views.__alloyId61.add($.__views.__alloyId62);
    $.__views.content = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        left: "10dp",
        right: "10dp",
        top: "10dp",
        layout: "vertical",
        id: "content"
    });
    $.__views.__alloyId60.add($.__views.content);
    $.__views.__alloyId63 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId63"
    });
    $.__views.content.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        zIndex: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        top: 0,
        left: "0",
        text: "ID",
        id: "__alloyId64"
    });
    $.__views.__alloyId63.add($.__views.__alloyId64);
    $.__views.uid = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        zIndex: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        top: 0,
        id: "uid",
        right: "0"
    });
    $.__views.__alloyId63.add($.__views.uid);
    $.__views.__alloyId65 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "1",
        color: "#676767",
        zIndex: "0",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        top: "10dp",
        bottom: "10dp",
        backgroundColor: "#ccc",
        id: "__alloyId65"
    });
    $.__views.content.add($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        bottom: "10dp",
        id: "__alloyId66"
    });
    $.__views.content.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        zIndex: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        top: 0,
        left: "0",
        text: "名前",
        id: "__alloyId67"
    });
    $.__views.__alloyId66.add($.__views.__alloyId67);
    $.__views.name = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        zIndex: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        top: 0,
        right: "0",
        id: "name",
        text: "ホァン　グェン"
    });
    $.__views.__alloyId66.add($.__views.name);
    $.__views.__alloyId68 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        height: "35dp",
        backgroundColor: "#f19c99",
        backgroundFocusedColor: "#e4f7ff",
        backgroundSelectedColor: "#e4f7ff",
        color: "#000",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 0,
        borderColor: "#ed4580",
        borderWidth: 1,
        left: 0,
        top: "10dp",
        title: "勤務メンバーの名前を変える",
        id: "__alloyId68"
    });
    $.__views.content.add($.__views.__alloyId68);
    edit_members ? $.__views.__alloyId68.addEventListener("click", edit_members) : __defers["$.__views.__alloyId68!click!edit_members"] = true;
    $.__views.__alloyId69 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        height: "35dp",
        backgroundColor: "#f19c99",
        backgroundFocusedColor: "#e4f7ff",
        backgroundSelectedColor: "#e4f7ff",
        color: "#000",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 0,
        borderColor: "#ed4580",
        borderWidth: 1,
        left: 0,
        top: "10dp",
        title: "シフトの時間や名前を変える",
        id: "__alloyId69"
    });
    $.__views.content.add($.__views.__alloyId69);
    shift_setting ? $.__views.__alloyId69.addEventListener("click", shift_setting) : __defers["$.__views.__alloyId69!click!shift_setting"] = true;
    $.__views.__alloyId70 = Ti.UI.createView({
        height: "35dp",
        width: Ti.UI.FILL,
        backgroundColor: "#f19c99",
        borderRadius: 0,
        borderColor: "#ed4580",
        borderWidth: 1,
        color: "#000",
        left: 0,
        top: "10dp",
        font: {
            fontSize: "14dp"
        },
        id: "__alloyId70"
    });
    $.__views.content.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        zIndex: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        top: "5dp",
        text: "勤務メンバーを表示しない",
        id: "__alloyId71"
    });
    $.__views.__alloyId70.add($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "60dp",
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        height: Ti.UI.FILL,
        backgroundColor: "#fff2cc",
        backgroundFocusedColor: "#e4f7ff",
        backgroundSelectedColor: "#e4f7ff",
        color: "#000",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 0,
        right: 0,
        title: "ON",
        id: "__alloyId72"
    });
    $.__views.__alloyId70.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createView({
        height: "35dp",
        width: Ti.UI.FILL,
        backgroundColor: "#f19c99",
        borderRadius: 0,
        borderColor: "#ed4580",
        borderWidth: 1,
        color: "#000",
        left: 0,
        top: "10dp",
        font: {
            fontSize: "14dp"
        },
        id: "__alloyId73"
    });
    $.__views.content.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        zIndex: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        top: "5dp",
        text: "カレンダーを月曜始まりにする",
        id: "__alloyId74"
    });
    $.__views.__alloyId73.add($.__views.__alloyId74);
    $.__views.monday_set = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "60dp",
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        height: Ti.UI.FILL,
        backgroundColor: "#cccccc",
        backgroundFocusedColor: "#e4f7ff",
        backgroundSelectedColor: "#e4f7ff",
        color: "#000",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 0,
        right: 0,
        id: "monday_set",
        title: "OFF"
    });
    $.__views.__alloyId73.add($.__views.monday_set);
    changeDayOffset ? $.__views.monday_set.addEventListener("click", changeDayOffset) : __defers["$.__views.monday_set!click!changeDayOffset"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Collections.configs = Alloy.createCollection("configs");
    var configs = Alloy.Collections.configs;
    configs.fetch({
        query: 'select id,cg_value from configs where cg_name="dayOffset"'
    });
    var dayOffset = configs.models[0].get("cg_value");
    $.uid.setText(Ti.API.UID["id"]);
    $.name.setText(Ti.API.UID["name"]);
    if (1 == dayOffset) {
        $.monday_set.setBackgroundColor("#fff2cc");
        $.monday_set.setTitle("ON");
    }
    $.setting.addEventListener("android:back", function() {
        openView("schedule");
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
    __defers["$.__views.__alloyId68!click!edit_members"] && $.__views.__alloyId68.addEventListener("click", edit_members);
    __defers["$.__views.__alloyId69!click!shift_setting"] && $.__views.__alloyId69.addEventListener("click", shift_setting);
    __defers["$.__views.monday_set!click!changeDayOffset"] && $.__views.monday_set.addEventListener("click", changeDayOffset);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;