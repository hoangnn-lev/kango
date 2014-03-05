function Controller() {
    function changeDayOffset() {
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
        delete_view("shift");
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
        var win = Ti.UI.createView({
            height: Ti.UI.FILL,
            width: Ti.UI.FILL
        }), view = [];
        view.push(Ti.UI.createView({
            backgroundImage: "/tutorial/step01.png",
            height: Ti.UI.FILL,
            width: Ti.UI.FILL
        }));
        view.push(Ti.UI.createView({
            backgroundImage: "/tutorial/step02.png",
            height: Ti.UI.FILL,
            width: Ti.UI.FILL
        }));
        view.push(Ti.UI.createView({
            backgroundImage: "/tutorial/step03.png",
            height: Ti.UI.FILL,
            width: Ti.UI.FILL
        }));
        var step_final = Ti.UI.createView({
            backgroundImage: "/tutorial/step04.png",
            height: Ti.UI.FILL,
            width: Ti.UI.FILL
        });
        view.push(step_final);
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
        win.add(scrollView);
        var pageController = func.pagingControl(scrollView);
        var close = Ti.UI.createButton({
            bottom: "120dp",
            zIndex: 999,
            font: {
                fontSize: "14dp"
            },
            backgroundImage: "/tutorial/btnUse.png",
            backgroundSelectedImage: "/tutorial/btnUse_action.png",
            backgroundFocusedImage: "/tutorial/btnUse_action.png",
            width: "250dp",
            height: "39dp",
            visible: false
        });
        close.addEventListener("click", function() {
            Ti.API.activeTab = 2;
            openView("schedule");
            $.setting.remove(guide_flag["win"]);
            $.setting.remove(guide_flag["page"]);
            guide_flag["win"] = guide_flag["page"] = false;
        });
        pageController.add(close);
        scrollView.addEventListener("scroll", function(e) {
            3 == e.currentPage ? close.setVisible(true) : close.setVisible(false);
        });
        guide_flag["page"] = pageController;
        guide_flag["win"] = win;
        $.setting.add(win);
        $.setting.add(pageController);
    }
    function checkFirstUsing() {
        var myFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "using.txt");
        if (!myFile.exists()) {
            myFile.write("using");
            guideUseCalendar();
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
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: 0,
        layout: "vertical",
        id: "main"
    });
    $.__views.setting.add($.__views.main);
    $.__views.title = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        backgroundColor: "#ed829c",
        top: 0,
        id: "title"
    });
    $.__views.main.add($.__views.title);
    $.__views.__alloyId63 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: 0,
        text: "その他",
        id: "__alloyId63"
    });
    $.__views.title.add($.__views.__alloyId63);
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
    $.__views.__alloyId64 = Ti.UI.createButton({
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
        title: "シフトの設定",
        id: "__alloyId64"
    });
    $.__views.content.add($.__views.__alloyId64);
    shift_setting ? $.__views.__alloyId64.addEventListener("click", shift_setting) : __defers["$.__views.__alloyId64!click!shift_setting"] = true;
    $.__views.__alloyId65 = Ti.UI.createButton({
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
        title: "勤務メンバーの設定",
        id: "__alloyId65"
    });
    $.__views.content.add($.__views.__alloyId65);
    edit_members ? $.__views.__alloyId65.addEventListener("click", edit_members) : __defers["$.__views.__alloyId65!click!edit_members"] = true;
    $.__views.__alloyId66 = Ti.UI.createView({
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
        id: "__alloyId66"
    });
    $.__views.content.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: 0,
        top: "5dp",
        text: "勤務メンバーを表示する",
        id: "__alloyId67"
    });
    $.__views.__alloyId66.add($.__views.__alloyId67);
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
    $.__views.__alloyId66.add($.__views.showMember);
    showMember ? $.__views.showMember.addEventListener("click", showMember) : __defers["$.__views.showMember!click!showMember"] = true;
    $.__views.__alloyId68 = Ti.UI.createView({
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
        id: "__alloyId68"
    });
    $.__views.content.add($.__views.__alloyId68);
    $.__views.__alloyId69 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: 0,
        top: "5dp",
        text: "カレンダーを月曜始まりにする",
        id: "__alloyId69"
    });
    $.__views.__alloyId68.add($.__views.__alloyId69);
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
    $.__views.__alloyId68.add($.__views.monday_set);
    changeDayOffset ? $.__views.monday_set.addEventListener("click", changeDayOffset) : __defers["$.__views.monday_set!click!changeDayOffset"] = true;
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
        title: "全国の病院情報をみる"
    });
    $.__views.content.add($.__views.allHospital);
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
        title: "カレンダーの使い方",
        id: "__alloyId70"
    });
    $.__views.content.add($.__views.__alloyId70);
    guideUseCalendar ? $.__views.__alloyId70.addEventListener("click", guideUseCalendar) : __defers["$.__views.__alloyId70!click!guideUseCalendar"] = true;
    $.__views.__alloyId71 = Ti.UI.createButton({
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
        title: "アプリのご感想・ご要望",
        id: "__alloyId71"
    });
    $.__views.content.add($.__views.__alloyId71);
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
    $.__views.about = Ti.UI.createButton({
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
        id: "about",
        title: "看護のシフト帳（仮）について"
    });
    $.__views.content.add($.__views.about);
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
    }, dayOffset = 0, showMember = 0, configs = Alloy.Collections.configs, guide_flag = {
        win: false,
        page: false
    };
    checkFirstUsing();
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
        Ti.API.activeTab = false !== guide_flag["win"] ? 4 : 2;
        if (false !== guide_flag["win"]) {
            $.setting.remove(guide_flag["win"]);
            $.setting.remove(guide_flag["page"]);
            guide_flag["win"] = guide_flag["page"] = false;
        } else openView("schedule");
    });
    $.allHospital.addEventListener("click", function() {
        openView("hospital");
    });
    $.about.addEventListener("click", function() {
        openView("about");
    });
    $.report.addEventListener("click", function() {
        var emailDialog = Titanium.UI.createEmailDialog();
        emailDialog.setSubject("不具合やエラーのお問い合わせ");
        emailDialog.setToRecipients([ "hoangnn@leverages.jp" ]);
        emailDialog.addEventListener("complete", function() {});
        emailDialog.open();
    });
    __defers["$.__views.__alloyId64!click!shift_setting"] && $.__views.__alloyId64.addEventListener("click", shift_setting);
    __defers["$.__views.__alloyId65!click!edit_members"] && $.__views.__alloyId65.addEventListener("click", edit_members);
    __defers["$.__views.showMember!click!showMember"] && $.__views.showMember.addEventListener("click", showMember);
    __defers["$.__views.monday_set!click!changeDayOffset"] && $.__views.monday_set.addEventListener("click", changeDayOffset);
    __defers["$.__views.__alloyId70!click!guideUseCalendar"] && $.__views.__alloyId70.addEventListener("click", guideUseCalendar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;