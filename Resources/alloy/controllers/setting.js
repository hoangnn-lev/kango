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
        openView("friend");
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
    $.__views.content = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        left: "10dp",
        right: "10dp",
        top: "10dp",
        layout: "vertical",
        id: "content"
    });
    $.__views.main.add($.__views.content);
    $.__views.__alloyId52 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "20dp",
        color: "#000",
        textAlign: "left",
        font: {
            fontSize: "16sp"
        },
        top: "20dp",
        zIndex: 0,
        bottom: "0",
        text: "シフトや勤務メンバーを変更できます",
        id: "__alloyId52"
    });
    $.__views.content.add($.__views.__alloyId52);
    $.__views.__alloyId53 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        height: "35dp",
        backgroundColor: "#f19c99",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#000",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 0,
        zIndex: 0,
        borderColor: "#ed4580",
        borderWidth: 1,
        left: 0,
        top: "10dp",
        title: "勤務メンバーの名前を変える",
        id: "__alloyId53"
    });
    $.__views.content.add($.__views.__alloyId53);
    edit_members ? $.__views.__alloyId53.addEventListener("click", edit_members) : __defers["$.__views.__alloyId53!click!edit_members"] = true;
    $.__views.__alloyId54 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        height: "35dp",
        backgroundColor: "#f19c99",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#000",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 0,
        zIndex: 0,
        borderColor: "#ed4580",
        borderWidth: 1,
        left: 0,
        top: "10dp",
        title: "シフトの時間や名前を変える",
        id: "__alloyId54"
    });
    $.__views.content.add($.__views.__alloyId54);
    shift_setting ? $.__views.__alloyId54.addEventListener("click", shift_setting) : __defers["$.__views.__alloyId54!click!shift_setting"] = true;
    $.__views.__alloyId55 = Ti.UI.createView({
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
        id: "__alloyId55"
    });
    $.__views.content.add($.__views.__alloyId55);
    $.__views.__alloyId56 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        top: "5dp",
        zIndex: 0,
        text: "勤務メンバーを表示しない",
        id: "__alloyId56"
    });
    $.__views.__alloyId55.add($.__views.__alloyId56);
    $.__views.__alloyId57 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "60dp",
        font: {
            fontSize: "14dp"
        },
        height: Ti.UI.FILL,
        backgroundColor: "#fff2cc",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#000",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 0,
        zIndex: 0,
        right: 0,
        title: "ON",
        id: "__alloyId57"
    });
    $.__views.__alloyId55.add($.__views.__alloyId57);
    $.__views.__alloyId58 = Ti.UI.createView({
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
        id: "__alloyId58"
    });
    $.__views.content.add($.__views.__alloyId58);
    $.__views.__alloyId59 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        top: "5dp",
        zIndex: 0,
        text: "カレンダーを月曜始まりにする",
        id: "__alloyId59"
    });
    $.__views.__alloyId58.add($.__views.__alloyId59);
    $.__views.monday_set = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "60dp",
        font: {
            fontSize: "14dp"
        },
        height: Ti.UI.FILL,
        backgroundColor: "#cccccc",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#000",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 0,
        zIndex: 0,
        right: 0,
        id: "monday_set",
        title: "OFF"
    });
    $.__views.__alloyId58.add($.__views.monday_set);
    changeDayOffset ? $.__views.monday_set.addEventListener("click", changeDayOffset) : __defers["$.__views.monday_set!click!changeDayOffset"] = true;
    $.__views.__alloyId60 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "20dp",
        color: "#000",
        textAlign: "left",
        font: {
            fontSize: "16sp"
        },
        top: "20dp",
        zIndex: 0,
        bottom: "0",
        text: "つかいかた　　ご意見",
        id: "__alloyId60"
    });
    $.__views.content.add($.__views.__alloyId60);
    $.__views.__alloyId61 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        height: "35dp",
        backgroundColor: "#f19c99",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#000",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 0,
        zIndex: 0,
        borderColor: "#ed4580",
        borderWidth: 1,
        left: 0,
        top: "10dp",
        title: "カレンダーの使い方を見る",
        id: "__alloyId61"
    });
    $.__views.content.add($.__views.__alloyId61);
    $.__views.__alloyId62 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        height: "35dp",
        backgroundColor: "#f19c99",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#000",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 0,
        zIndex: 0,
        borderColor: "#ed4580",
        borderWidth: 1,
        left: 0,
        top: "10dp",
        title: "アプリの感想・要望を書く",
        id: "__alloyId62"
    });
    $.__views.content.add($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "14dp"
        },
        height: "35dp",
        backgroundColor: "#f19c99",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#000",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 0,
        zIndex: 0,
        borderColor: "#ed4580",
        borderWidth: 1,
        left: 0,
        top: "10dp",
        title: "不具合やエラーを報告する",
        id: "__alloyId63"
    });
    $.__views.content.add($.__views.__alloyId63);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Collections.configs = Alloy.createCollection("configs");
    var configs = Alloy.Collections.configs;
    configs.fetch({
        query: 'select id,cg_value from configs where cg_name="dayOffset"'
    });
    var dayOffset = configs.models[0].get("cg_value");
    if (1 == dayOffset) {
        $.monday_set.setBackgroundColor("#fff2cc");
        $.monday_set.setTitle("ON");
    }
    $.setting.addEventListener("android:back", function() {
        openView("schedule");
    });
    __defers["$.__views.__alloyId53!click!edit_members"] && $.__views.__alloyId53.addEventListener("click", edit_members);
    __defers["$.__views.__alloyId54!click!shift_setting"] && $.__views.__alloyId54.addEventListener("click", shift_setting);
    __defers["$.__views.monday_set!click!changeDayOffset"] && $.__views.monday_set.addEventListener("click", changeDayOffset);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;