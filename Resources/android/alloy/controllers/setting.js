function Controller() {
    function changeDayOffset() {
        alert(dayOffset);
        $.monday_set.setBackgroundColor(1 == dayOffset ? button["OFF"]["bg"] : button["ON"]["bg"]);
        $.monday_set.setTitle(1 == dayOffset ? button["OFF"]["text"] : button["ON"]["text"]);
        dayOffset = 1 == dayOffset ? 0 : 1;
        var model = Alloy.createModel("configs", {
            id: configs.models[0].get("id"),
            cg_name: "dayOffset",
            cg_value: dayOffset
        });
        Alloy.Collections.configs.add(model);
        model.save();
        delete_view("schedule");
    }
    function showMember() {
        $.showMember.setBackgroundColor(1 == showMember ? button["OFF"]["bg"] : button["ON"]["bg"]);
        $.showMember.setTitle(1 == showMember ? button["OFF"]["text"] : button["ON"]["text"]);
        showMember = 1 == showMember ? 0 : 1;
        var model = Alloy.createModel("configs", {
            id: configs.models[1].get("id"),
            cg_name: "showMember",
            cg_value: showMember
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
    function guideUseCalendar() {
        var win = Ti.UI.createView();
        var view = [];
        view.push(Ti.UI.createView({
            backgroundColor: "#ccc",
            height: Ti.UI.FILL,
            width: Ti.UI.FILL
        }));
        view.push(Ti.UI.createView({
            backgroundColor: "#ffb373",
            height: Ti.UI.FILL,
            width: Ti.UI.FILL
        }));
        view.push(Ti.UI.createView({
            backgroundColor: "#075149",
            height: Ti.UI.FILL,
            width: Ti.UI.FILL
        }));
        var scrollView = Ti.UI.createScrollableView({
            showPagingControl: false,
            id: "intro",
            height: Ti.UI.FILL,
            width: Ti.UI.FILL,
            views: view,
            currentPage: 0,
            pagingControlColor: "transparent",
            zIndex: 2
        });
        var close = Ti.UI.createButton({
            opacity: .8,
            bottom: "10dp",
            title: "クローズ",
            zIndex: 3,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            width: "100dp",
            font: {
                fontSize: "14dp"
            },
            height: "40dp",
            backgroundColor: "#fff",
            color: "#000",
            border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            borderRadius: 10
        });
        close.addEventListener("click", function() {
            $.setting.remove(win);
        });
        win.add(close);
        win.add(scrollView);
        $.setting.add(win);
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
        text: "シフトや勤務メンバーを変更できます",
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
        title: "勤務メンバーの名前を変える",
        id: "__alloyId61"
    });
    $.__views.content.add($.__views.__alloyId61);
    edit_members ? $.__views.__alloyId61.addEventListener("click", edit_members) : __defers["$.__views.__alloyId61!click!edit_members"] = true;
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
        title: "シフトの時間や名前を変える",
        id: "__alloyId62"
    });
    $.__views.content.add($.__views.__alloyId62);
    shift_setting ? $.__views.__alloyId62.addEventListener("click", shift_setting) : __defers["$.__views.__alloyId62!click!shift_setting"] = true;
    $.__views.__alloyId63 = Ti.UI.createView({
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
        id: "__alloyId63"
    });
    $.__views.content.add($.__views.__alloyId63);
    $.__views.__alloyId64 = Ti.UI.createLabel({
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
        id: "__alloyId64"
    });
    $.__views.__alloyId63.add($.__views.__alloyId64);
    $.__views.showMember = Ti.UI.createButton({
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
        id: "showMember",
        title: "OFF"
    });
    $.__views.__alloyId63.add($.__views.showMember);
    showMember ? $.__views.showMember.addEventListener("click", showMember) : __defers["$.__views.showMember!click!showMember"] = true;
    $.__views.__alloyId65 = Ti.UI.createView({
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
        id: "__alloyId65"
    });
    $.__views.content.add($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createLabel({
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
        id: "__alloyId66"
    });
    $.__views.__alloyId65.add($.__views.__alloyId66);
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
    $.__views.__alloyId65.add($.__views.monday_set);
    changeDayOffset ? $.__views.monday_set.addEventListener("click", changeDayOffset) : __defers["$.__views.monday_set!click!changeDayOffset"] = true;
    $.__views.__alloyId67 = Ti.UI.createLabel({
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
        text: "病院情報",
        id: "__alloyId67"
    });
    $.__views.content.add($.__views.__alloyId67);
    $.__views.allHospital = Ti.UI.createButton({
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
        id: "allHospital",
        title: "全国の病院情報を見る"
    });
    $.__views.content.add($.__views.allHospital);
    $.__views.__alloyId68 = Ti.UI.createLabel({
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
        id: "__alloyId68"
    });
    $.__views.content.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createButton({
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
        id: "__alloyId69"
    });
    $.__views.content.add($.__views.__alloyId69);
    guideUseCalendar ? $.__views.__alloyId69.addEventListener("click", guideUseCalendar) : __defers["$.__views.__alloyId69!click!guideUseCalendar"] = true;
    $.__views.__alloyId70 = Ti.UI.createButton({
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
        id: "__alloyId70"
    });
    $.__views.content.add($.__views.__alloyId70);
    $.__views.report = Ti.UI.createButton({
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
        id: "report",
        title: "不具合やエラーを報告する"
    });
    $.__views.content.add($.__views.report);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Collections.configs = Alloy.createCollection("configs");
    var button = {
        ON: {
            text: "ON",
            bg: "#fff2cc"
        },
        OFF: {
            text: "OFF",
            bg: "#ccc"
        }
    }, dayOffset = 0, showMember = 0, configs = Alloy.Collections.configs;
    configs.fetch({
        query: 'select id,cg_value from configs where cg_name="dayOffset" or cg_name="showMember"'
    });
    if (1 == (dayOffset = configs.models[0].get("cg_value"))) {
        $.monday_set.setBackgroundColor(button["ON"]["bg"]);
        $.monday_set.setTitle(button["ON"]["text"]);
    }
    if (1 == (showMember = configs.models[1].get("cg_value"))) {
        $.showMember.setBackgroundColor(button["ON"]["bg"]);
        $.showMember.setTitle(button["ON"]["text"]);
    }
    $.setting.addEventListener("android:back", function() {
        openView("schedule");
    });
    $.allHospital.addEventListener("click", function() {
        openView("hospital");
    });
    $.report.addEventListener("click", function() {
        var emailDialog = Titanium.UI.createEmailDialog();
        emailDialog.setSubject("Report app error");
        emailDialog.setToRecipients([ "hoangnn@leverages.jp" ]);
        emailDialog.addEventListener("complete", function(e) {
            e.result == emailDialog.SENT;
        });
        emailDialog.open();
    });
    __defers["$.__views.__alloyId61!click!edit_members"] && $.__views.__alloyId61.addEventListener("click", edit_members);
    __defers["$.__views.__alloyId62!click!shift_setting"] && $.__views.__alloyId62.addEventListener("click", shift_setting);
    __defers["$.__views.showMember!click!showMember"] && $.__views.showMember.addEventListener("click", showMember);
    __defers["$.__views.monday_set!click!changeDayOffset"] && $.__views.monday_set.addEventListener("click", changeDayOffset);
    __defers["$.__views.__alloyId69!click!guideUseCalendar"] && $.__views.__alloyId69.addEventListener("click", guideUseCalendar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;