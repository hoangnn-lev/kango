function Controller() {
    function createIconByScrollView(icon, folder) {
        var views = [];
        var iconCurrent;
        var column = 7, row = 2, num = column * row, m = (icon.length, Math.ceil(icon.length / num)), imgSize = deviceWidth / column, icon_index = 0;
        for (var i = 0; m > i; ++i) {
            var view = Ti.UI.createView({
                width: Ti.UI.FILL,
                height: Ti.UI.SIZE
            });
            for (var r = 0; row > r; ++r) for (var c = 0; column > c; ++c) {
                var left = 0;
                c > 0 && (left = imgSize * c - 12);
                var iconView = Ti.UI.createImageView({
                    image: folder + icon[icon_index],
                    left: left + "dp",
                    top: imgSize * r + 5 + "dp",
                    bottom: "10dp",
                    opacity: "0.1",
                    width: imgSize - 15 + "dp",
                    height: imgSize - 15 + "dp",
                    right: "3dp"
                });
                if (selectedIcon == folder + icon[icon_index]) {
                    iconView.setOpacity(1);
                    iconCurrent = iconView;
                }
                iconView.addEventListener("click", function(e) {
                    if ("1" == this.getOpacity()) {
                        this.setOpacity(.1);
                        selectedIcon = "";
                    } else {
                        iconCurrent && iconCurrent.setOpacity(.1);
                        this.setOpacity(1);
                        selectedIcon = e.source.image;
                    }
                    iconCurrent = this;
                });
                icon_index++;
                view.add(iconView);
            }
            views.push(view);
        }
        $.listIcon.setHeight(imgSize * row + "dp");
        return Ti.UI.createScrollableView({
            views: views
        });
    }
    function timePicker() {
        $.time.setText("20:00~21:00");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "edit_event";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.edit_event = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "edit_event"
    });
    $.__views.edit_event && $.addTopLevelView($.__views.edit_event);
    $.__views.top = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        backgroundColor: "#ff3974",
        top: "0",
        bottom: 20,
        id: "top",
        layout: "vertical"
    });
    $.__views.edit_event.add($.__views.top);
    $.__views.__alloyId0 = Ti.UI.createView({
        height: "40dp",
        id: "__alloyId0"
    });
    $.__views.top.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#fff",
        zIndex: "0",
        textAlign: "center",
        font: {
            fontSize: "16sp"
        },
        text: "スケジュール追加",
        id: "__alloyId1"
    });
    $.__views.__alloyId0.add($.__views.__alloyId1);
    $.__views.content = Ti.UI.createScrollView({
        top: "40dp",
        bottom: "55dp",
        left: "10dp",
        right: "10dp",
        id: "content",
        layout: "vertical"
    });
    $.__views.edit_event.add($.__views.content);
    $.__views.__alloyId2 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#333",
        zIndex: "0",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "何の予定？",
        top: "10dp",
        id: "__alloyId2"
    });
    $.__views.content.add($.__views.__alloyId2);
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
    $.__views.__alloyId3 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "red",
        zIndex: "0",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "12dp"
        },
        text: "文字量が多すぎます（最大●文字）",
        id: "__alloyId3"
    });
    $.__views.content.add($.__views.__alloyId3);
    $.__views.__alloyId4 = Ti.UI.createView({
        height: "45dp",
        width: Ti.UI.FILL,
        top: "10dp",
        id: "__alloyId4"
    });
    $.__views.content.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createView({
        height: "35dp",
        width: "55dp",
        backgroundColor: "#ccc",
        left: 0,
        id: "__alloyId5"
    });
    $.__views.__alloyId4.add($.__views.__alloyId5);
    $.__views.__alloyId6 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#333",
        zIndex: 1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "10dp",
        text: "時間",
        id: "__alloyId6"
    });
    $.__views.__alloyId5.add($.__views.__alloyId6);
    $.__views.time = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "35dp",
        color: "#333",
        zIndex: 1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontWeight: "bold",
            fontSize: "20dp"
        },
        left: "60dp",
        text: "--:-- ~ --:--",
        id: "time"
    });
    $.__views.__alloyId4.add($.__views.time);
    timePicker ? $.__views.time.addEventListener("click", timePicker) : __defers["$.__views.time!click!timePicker"] = true;
    $.__views.__alloyId7 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#333",
        zIndex: "0",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        top: "10dp",
        text: "メモ",
        id: "__alloyId7"
    });
    $.__views.content.add($.__views.__alloyId7);
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
    $.__views.__alloyId8 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "red",
        zIndex: "0",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "12dp"
        },
        text: "文字量が多すぎます（最大●文字）",
        id: "__alloyId8"
    });
    $.__views.content.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#333",
        zIndex: "0",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "アイコン",
        top: "10dp",
        id: "__alloyId9"
    });
    $.__views.content.add($.__views.__alloyId9);
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
        top: "5dp",
        bottom: "5dp",
        left: "5dp",
        right: "5dp",
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
    $.__views.groupButton = Ti.UI.createView({
        top: "15dp",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "groupButton"
    });
    $.__views.content.add($.__views.groupButton);
    $.__views.__alloyId10 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "45%",
        font: {
            fontSize: "16dp"
        },
        zIndex: 2,
        height: "40dp",
        backgroundColor: "#d1463f",
        backgroundFocusedColor: "#c2433d",
        backgroundSelectedColor: "#c2433d",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "15",
        top: 0,
        left: "0",
        title: "キャンセル",
        id: "__alloyId10"
    });
    $.__views.groupButton.add($.__views.__alloyId10);
    $.__views.__alloyId11 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "45%",
        font: {
            fontSize: "16dp"
        },
        zIndex: 2,
        height: "40dp",
        backgroundColor: "#4bcd61",
        backgroundFocusedColor: "#48c25d",
        backgroundSelectedColor: "#48c25d",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "15",
        top: 0,
        right: "0",
        title: "保存する",
        id: "__alloyId11"
    });
    $.__views.groupButton.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "16dp"
        },
        zIndex: 2,
        height: "40dp",
        backgroundColor: "#afd7e3",
        backgroundFocusedColor: "#69c0db",
        backgroundSelectedColor: "#69c0db",
        color: "#000",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "15",
        top: "50dp",
        title: "保存して次の日の予定を入力",
        id: "__alloyId12"
    });
    $.__views.groupButton.add($.__views.__alloyId12);
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f8f8f8",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu",
        __parentSymbol: $.__views.edit_event
    });
    $.__views.tabMenu.setParent($.__views.edit_event);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var selectedIcon = "";
    var deviceWidth = Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);
    if (null != Ti.API.rowIndex) {
        var row = Ti.API.holidayItem;
        row = row[Ti.API.rowIndex];
        $.title.setValue(row.title);
        $.memo.setValue(row.content);
        selectedIcon = row.img;
    }
    $.edit_event.addEventListener("android:back", function() {
        openView("schedule");
    });
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
    __defers["$.__views.time!click!timePicker"] && $.__views.time.addEventListener("click", timePicker);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;