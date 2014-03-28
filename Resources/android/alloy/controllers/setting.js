function Controller() {
    function changeDayOffset() {
        $.monday_set.setBackgroundColor(1 == dayOffset ? button["OFF"]["bg"] : button["ON"]["bg"]);
        $.monday_set.setTitle(1 == dayOffset ? button["OFF"]["text"] : button["ON"]["text"]);
        dayOffset = 1 == dayOffset ? 0 : 1;
        var model = Alloy.createModel("configs", {
            id: 1,
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
            id: 2,
            cg_name: "showMember",
            cg_value: showMember
        });
        Alloy.Collections.configs.add(model);
        model.save();
        delete_view("schedule");
    }
    function edit_members() {
        openView("friend", {
            tab: 4
        });
    }
    function shift_setting() {
        openView("shift_setting", {
            tab: 4
        });
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
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp",
        layout: "horizontal",
        id: "tabMenu",
        __parentSymbol: $.__views.setting
    });
    $.__views.tabMenu.setParent($.__views.setting);
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: "50dp",
        layout: "vertical",
        id: "main"
    });
    $.__views.setting.add($.__views.main);
    $.__views.content = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        layout: "vertical",
        backgroundColor: "#f5f1e9",
        id: "content"
    });
    $.__views.main.add($.__views.content);
    $.__views.__alloyId16 = Ti.UI.createScrollView({
        top: "0",
        bottom: 20,
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "__alloyId16"
    });
    $.__views.content.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createView({
        height: "55dp",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        selectionStyle: "none",
        selectedBackgroundColor: "#fff",
        id: "__alloyId17"
    });
    $.__views.__alloyId16.add($.__views.__alloyId17);
    shift_setting ? $.__views.__alloyId17.addEventListener("click", shift_setting) : __defers["$.__views.__alloyId17!click!shift_setting"] = true;
    $.__views.__alloyId18 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        left: "10dp",
        text: "シフトの設定",
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.__alloyId19 = Ti.UI.createImageView({
        right: "10dp",
        width: "14dp",
        height: "25dp",
        image: "/icons/bkgIconArrow.png",
        id: "__alloyId19"
    });
    $.__views.__alloyId17.add($.__views.__alloyId19);
    $.__views.__alloyId20 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "1",
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        backgroundColor: "#ccc",
        id: "__alloyId20"
    });
    $.__views.__alloyId16.add($.__views.__alloyId20);
    $.__views.__alloyId21 = Ti.UI.createView({
        height: "55dp",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        selectionStyle: "none",
        selectedBackgroundColor: "#fff",
        id: "__alloyId21"
    });
    $.__views.__alloyId16.add($.__views.__alloyId21);
    edit_members ? $.__views.__alloyId21.addEventListener("click", edit_members) : __defers["$.__views.__alloyId21!click!edit_members"] = true;
    $.__views.__alloyId22 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        left: "10dp",
        text: "勤務メンバーの設定",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.__alloyId23 = Ti.UI.createImageView({
        right: "10dp",
        width: "14dp",
        height: "25dp",
        image: "/icons/bkgIconArrow.png",
        id: "__alloyId23"
    });
    $.__views.__alloyId21.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "1",
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        backgroundColor: "#ccc",
        id: "__alloyId24"
    });
    $.__views.__alloyId16.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createView({
        height: "55dp",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        selectionStyle: "none",
        selectedBackgroundColor: "#fff",
        id: "__alloyId25"
    });
    $.__views.__alloyId16.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        left: "10dp",
        text: "勤務メンバーを表示する",
        id: "__alloyId26"
    });
    $.__views.__alloyId25.add($.__views.__alloyId26);
    $.__views.showMember = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "70dp",
        font: {
            fontSize: "14dp"
        },
        height: "35dp",
        backgroundColor: "#ccc",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ccc",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        zIndex: 0,
        right: "10dp",
        id: "showMember",
        title: "OFF"
    });
    $.__views.__alloyId25.add($.__views.showMember);
    showMember ? $.__views.showMember.addEventListener("click", showMember) : __defers["$.__views.showMember!click!showMember"] = true;
    $.__views.__alloyId27 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "1",
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        backgroundColor: "#ccc",
        id: "__alloyId27"
    });
    $.__views.__alloyId16.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createView({
        height: "55dp",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        selectionStyle: "none",
        selectedBackgroundColor: "#fff",
        id: "__alloyId28"
    });
    $.__views.__alloyId16.add($.__views.__alloyId28);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        left: "10dp",
        text: "カレンダーを月曜始まりにする",
        id: "__alloyId29"
    });
    $.__views.__alloyId28.add($.__views.__alloyId29);
    $.__views.monday_set = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "70dp",
        font: {
            fontSize: "14dp"
        },
        height: "35dp",
        backgroundColor: "#ccc",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ccc",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        zIndex: 0,
        right: "10dp",
        id: "monday_set",
        title: "OFF"
    });
    $.__views.__alloyId28.add($.__views.monday_set);
    changeDayOffset ? $.__views.monday_set.addEventListener("click", changeDayOffset) : __defers["$.__views.monday_set!click!changeDayOffset"] = true;
    $.__views.__alloyId30 = Ti.UI.createView({
        height: "70dp",
        width: Ti.UI.FILL,
        backgroundColor: "#f5f1e9",
        selectionStyle: "none",
        selectedBackgroundColor: "#fff",
        touchEnabled: "false",
        id: "__alloyId30"
    });
    $.__views.__alloyId16.add($.__views.__alloyId30);
    $.__views.allHospital = Ti.UI.createView({
        height: "55dp",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        id: "allHospital"
    });
    $.__views.__alloyId30.add($.__views.allHospital);
    $.__views.__alloyId31 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        left: "10dp",
        text: "全国の病院情報をみる",
        id: "__alloyId31"
    });
    $.__views.allHospital.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createImageView({
        right: "10dp",
        width: "14dp",
        height: "25dp",
        image: "/icons/bkgIconArrow.png",
        id: "__alloyId32"
    });
    $.__views.allHospital.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createView({
        height: "55dp",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        selectionStyle: "none",
        selectedBackgroundColor: "#fff",
        id: "__alloyId33"
    });
    $.__views.__alloyId16.add($.__views.__alloyId33);
    guideUseCalendar ? $.__views.__alloyId33.addEventListener("click", guideUseCalendar) : __defers["$.__views.__alloyId33!click!guideUseCalendar"] = true;
    $.__views.__alloyId34 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        left: "10dp",
        text: "カレンダーの使い方",
        id: "__alloyId34"
    });
    $.__views.__alloyId33.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createImageView({
        right: "10dp",
        width: "14dp",
        height: "25dp",
        image: "/icons/bkgIconArrow.png",
        id: "__alloyId35"
    });
    $.__views.__alloyId33.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "1",
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        backgroundColor: "#ccc",
        id: "__alloyId36"
    });
    $.__views.__alloyId16.add($.__views.__alloyId36);
    $.__views.chPlay = Ti.UI.createView({
        height: "55dp",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        selectionStyle: "none",
        selectedBackgroundColor: "#fff",
        id: "chPlay"
    });
    $.__views.__alloyId16.add($.__views.chPlay);
    $.__views.__alloyId37 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        left: "10dp",
        text: "アプリのご感想・ご要望",
        id: "__alloyId37"
    });
    $.__views.chPlay.add($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createImageView({
        right: "10dp",
        width: "14dp",
        height: "25dp",
        image: "/icons/bkgIconArrow.png",
        id: "__alloyId38"
    });
    $.__views.chPlay.add($.__views.__alloyId38);
    $.__views.__alloyId39 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "1",
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        backgroundColor: "#ccc",
        id: "__alloyId39"
    });
    $.__views.__alloyId16.add($.__views.__alloyId39);
    $.__views.report = Ti.UI.createView({
        height: "55dp",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        selectionStyle: "none",
        selectedBackgroundColor: "#fff",
        id: "report"
    });
    $.__views.__alloyId16.add($.__views.report);
    $.__views.__alloyId40 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        left: "10dp",
        text: "不具合やエラーのお問い合わせ",
        id: "__alloyId40"
    });
    $.__views.report.add($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createImageView({
        right: "10dp",
        width: "14dp",
        height: "25dp",
        image: "/icons/bkgIconArrow.png",
        id: "__alloyId41"
    });
    $.__views.report.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "1",
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        backgroundColor: "#ccc",
        id: "__alloyId42"
    });
    $.__views.__alloyId16.add($.__views.__alloyId42);
    $.__views.about = Ti.UI.createView({
        height: "55dp",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        selectionStyle: "none",
        selectedBackgroundColor: "#fff",
        id: "about"
    });
    $.__views.__alloyId16.add($.__views.about);
    $.__views.__alloyId43 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        zIndex: 0,
        left: "10dp",
        text: "ペリカレ！ついて",
        id: "__alloyId43"
    });
    $.__views.about.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createImageView({
        right: "10dp",
        width: "14dp",
        height: "25dp",
        image: "/icons/bkgIconArrow.png",
        id: "__alloyId44"
    });
    $.__views.about.add($.__views.__alloyId44);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Collections.configs = Alloy.createCollection("configs");
    var button = {
        ON: {
            text: "ON",
            bg: "#f3acbd"
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
    if ("" != configs.models[0] && 1 == (dayOffset = configs.models[0].get("cg_value"))) {
        $.monday_set.setBackgroundColor(button["ON"]["bg"]);
        $.monday_set.setTitle(button["ON"]["text"]);
    }
    if ("" != configs.models[1] && 1 == (showMember = configs.models[1].get("cg_value"))) {
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
        Titanium.Platform.openURL("http://ac.ebis.ne.jp/tr_set.php?argument=MemwrhsW&ai=a5322c6cdd990e");
    });
    $.chPlay.addEventListener("click", function() {
        Titanium.Platform.openURL("https://play.google.com/store/apps/details?id=jp.kango_oshigoto.perikare");
    });
    $.about.addEventListener("click", function() {
        openView("about");
    });
    $.report.addEventListener("click", function() {
        var myVer = L("app_name") + Ti.App.version;
        var device = Titanium.Platform;
        var info = "\n\n\n\n--------------\n" + myVer + "\n" + device.manufacturer + " " + device.model + " " + device.osname + " " + device.version;
        var mail = Titanium.UI.createEmailDialog({
            subject: "不具合やエラーのお問い合わせ",
            toRecipients: [ "info_perikare@kango-oshigoto.jp" ],
            messageBody: info
        });
        mail.open();
    });
    __defers["$.__views.__alloyId17!click!shift_setting"] && $.__views.__alloyId17.addEventListener("click", shift_setting);
    __defers["$.__views.__alloyId21!click!edit_members"] && $.__views.__alloyId21.addEventListener("click", edit_members);
    __defers["$.__views.showMember!click!showMember"] && $.__views.showMember.addEventListener("click", showMember);
    __defers["$.__views.monday_set!click!changeDayOffset"] && $.__views.monday_set.addEventListener("click", changeDayOffset);
    __defers["$.__views.__alloyId33!click!guideUseCalendar"] && $.__views.__alloyId33.addEventListener("click", guideUseCalendar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;