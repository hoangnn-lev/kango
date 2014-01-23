function Controller() {
    function createIconByScrollView(icon, folder) {
        var views = [];
        var iconCurrent;
        for (var i = 0, n = icon.length; n > i; i++) {
            if (0 == i || 0 == (i + 1) % 10) var view = Ti.UI.createView({
                width: Ti.UI.FILL,
                layout: "horizontal",
                height: Ti.UI.SIZE
            });
            var iconView = Ti.UI.createImageView({
                image: folder + icon[i],
                left: "15dp",
                top: "10dp",
                bottom: "10dp",
                opacity: "0.3",
                width: imgWidth + "dp",
                height: imgWidth + "dp"
            });
            if (selectedIcon == folder + icon[i]) {
                iconView.setOpacity(1);
                iconCurrent = iconView;
            }
            iconView.addEventListener("click", function(e) {
                if ("1" == this.getOpacity()) {
                    this.setOpacity(.3);
                    selectedIcon = "";
                } else {
                    iconCurrent && iconCurrent.setOpacity(.3);
                    this.setOpacity(1);
                    selectedIcon = e.source.image;
                }
                iconCurrent = this;
            });
            view.add(iconView);
            (0 == (i + 1) % 10 || i + 1 == n) && views.push(view);
        }
        return Ti.UI.createScrollableView({
            views: views
        });
    }
    function saveSchedule() {
        var title = $.title.getValue();
        if (title) {
            $.title.blur();
            $.memo.blur();
            Alloy.Collections.schedule = Alloy.createCollection("schedule");
            var scheduleModel = Alloy.Collections.schedule;
            var data = [];
            var day = Ti.API.day;
            if (Ti.API.holidayItem) var data = Ti.API.holidayItem;
            if (null != Ti.API.rowIndex) {
                data[Ti.API.rowIndex].img = selectedIcon;
                data[Ti.API.rowIndex].title = title;
                data[Ti.API.rowIndex].content = $.memo.getValue();
            } else data.push({
                img: selectedIcon,
                title: title,
                content: $.memo.getValue()
            });
            if (Ti.API.id) var row = {
                id: Ti.API.id,
                _schedule: JSON.stringify(data),
                _date: day
            }; else var row = {
                _schedule: JSON.stringify(data),
                _date: day
            };
            var schedule = Alloy.createModel("schedule", row);
            scheduleModel.add(schedule);
            schedule.save();
            resetData();
            scheduleView();
            "callback" in $.schedule_edit && $.schedule_edit.callback();
        } else Ti.UI.createAlertDialog({
            title: "お知らせ",
            message: "タイトルを入力してください。",
            buttonNames: [ "OK" ]
        }).show();
    }
    function cancelEditSchulde() {
        $.title.blur();
        $.memo.blur();
        resetData();
        scheduleView();
    }
    function resetData() {
        Ti.API.id = null;
        Ti.API.day = null;
        Ti.API.data = null;
        Ti.API.rowIndex = null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "schedule_edit";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.schedule_edit = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "schedule_edit"
    });
    $.__views.schedule_edit && $.addTopLevelView($.__views.schedule_edit);
    $.__views.top = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#ff3974",
        top: "0",
        bottom: 20,
        id: "top",
        layout: "vertical"
    });
    $.__views.schedule_edit.add($.__views.top);
    $.__views.__alloyId23 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        right: "10dp",
        left: "10dp",
        id: "__alloyId23"
    });
    $.__views.top.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createImageView({
        height: "30dp",
        width: "30dp",
        zIndex: "10",
        top: "5dp",
        bottom: "5dp",
        left: "0",
        image: "/icons/cancel.png",
        id: "__alloyId24"
    });
    $.__views.__alloyId23.add($.__views.__alloyId24);
    cancelEditSchulde ? $.__views.__alloyId24.addEventListener("click", cancelEditSchulde) : __defers["$.__views.__alloyId24!click!cancelEditSchulde"] = true;
    $.__views.__alloyId25 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#fff",
        zIndex: "0",
        textAlign: "center",
        font: {
            fontSize: "18sp"
        },
        text: "スケジュール追加",
        id: "__alloyId25"
    });
    $.__views.__alloyId23.add($.__views.__alloyId25);
    $.__views.__alloyId26 = Ti.UI.createImageView({
        height: "30dp",
        width: "30dp",
        zIndex: "10",
        top: "5dp",
        bottom: "5dp",
        right: "0",
        image: "/icons/add.png",
        id: "__alloyId26"
    });
    $.__views.__alloyId23.add($.__views.__alloyId26);
    saveSchedule ? $.__views.__alloyId26.addEventListener("click", saveSchedule) : __defers["$.__views.__alloyId26!click!saveSchedule"] = true;
    $.__views.content = Ti.UI.createScrollView({
        top: "40dp",
        bottom: "55dp",
        left: "10dp",
        right: "10dp",
        id: "content",
        layout: "vertical"
    });
    $.__views.schedule_edit.add($.__views.content);
    $.__views.__alloyId27 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#333",
        zIndex: "0",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "18sp"
        },
        text: "タイトル",
        top: "15dp",
        id: "__alloyId27"
    });
    $.__views.content.add($.__views.__alloyId27);
    $.__views.title = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#fff",
        maxLength: "30",
        id: "title",
        hintText: "タイトル"
    });
    $.__views.content.add($.__views.title);
    $.__views.__alloyId28 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#333",
        zIndex: "0",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "18sp"
        },
        text: "メモ",
        top: "5dp",
        id: "__alloyId28"
    });
    $.__views.content.add($.__views.__alloyId28);
    $.__views.memo = Ti.UI.createTextArea({
        width: Ti.UI.FILL,
        height: "80dp",
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        borderColor: "#fff",
        maxLength: "120",
        id: "memo",
        hintText: "メモ"
    });
    $.__views.content.add($.__views.memo);
    $.__views.__alloyId29 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#333",
        zIndex: "0",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "18sp"
        },
        text: "アイコン",
        top: "5dp",
        id: "__alloyId29"
    });
    $.__views.content.add($.__views.__alloyId29);
    $.__views.wicon = Ti.UI.createView({
        backgroundColor: "#e4f7ff",
        borderRadius: 10,
        borderColor: "#e4f7ff",
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "wicon",
        height: Ti.UI.SIZE
    });
    $.__views.content.add($.__views.wicon);
    $.__views.listIcon = Ti.UI.createView({
        id: "listIcon"
    });
    $.__views.wicon.add($.__views.listIcon);
    $.__views.buttonTabs = Ti.UI.createScrollView({
        top: 20,
        bottom: "0",
        scrollType: "horizontal",
        id: "buttonTabs",
        height: "40dp",
        backgroundColor: "#f3f3f3",
        width: Ti.UI.FILL,
        layout: "horizontal"
    });
    $.__views.wicon.add($.__views.buttonTabs);
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f8f8f8",
        width: Ti.UI.FILL,
        heigth: "39dp",
        id: "tabMenu",
        __parentSymbol: $.__views.schedule_edit
    });
    $.__views.tabMenu.setParent($.__views.schedule_edit);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var selectedIcon = "";
    var imgWidth = Ti.Platform.displayCaps.platformWidth / 16;
    if (null != Ti.API.rowIndex) {
        var row = Ti.API.holidayItem;
        row = row[Ti.API.rowIndex];
        $.title.setValue(row.title);
        $.memo.setValue(row.content);
        selectedIcon = row.img;
    }
    $.tabMenu.getView("schedule").setImage(Ti.API.TABMENU["schedule_active"]);
    $.schedule_edit.addEventListener("android:back", function() {
        scheduleView();
    });
    $.listIcon.setHeight(40 + 2 * imgWidth + "dp");
    var buttonTabs = Ti.API.ICON;
    var currentButton = null;
    for (var i = 0, l = buttonTabs.length; l > i; i++) {
        var buttontab = Ti.UI.createButton({
            title: buttonTabs[i].title,
            data: buttonTabs[i].icons,
            folder: buttonTabs[i].folder,
            backgroundColor: "#f3f3f3",
            height: Ti.UI.FILL,
            width: Ti.UI.SIZE
        });
        buttontab.addEventListener("click", function(e) {
            if (this !== currentButton) {
                currentButton && currentButton.setBackgroundColor("#f3f3f3");
                currentButton = this;
                currentButton.setBackgroundColor("#e4f7ff");
                $.listIcon.removeAllChildren();
                $.listIcon.add(createIconByScrollView(e.source.data, e.source.folder));
            }
        });
        if (0 == i && "" == selectedIcon) {
            currentButton = buttontab;
            currentButton.setBackgroundColor("#e4f7ff");
            $.listIcon.add(createIconByScrollView(buttonTabs[i].icons, buttonTabs[i].folder));
        } else "" != selectedIcon && "-1" != selectedIcon.indexOf(buttonTabs[i].folder) && buttontab.fireEvent("click");
        $.buttonTabs.add(buttontab);
    }
    $.buttonTabs.setContentWidth(Ti.Platform.displayCaps.platformWidth + Ti.Platform.displayCaps.platformWidth / 4);
    __defers["$.__views.__alloyId24!click!cancelEditSchulde"] && $.__views.__alloyId24.addEventListener("click", cancelEditSchulde);
    __defers["$.__views.__alloyId26!click!saveSchedule"] && $.__views.__alloyId26.addEventListener("click", saveSchedule);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;