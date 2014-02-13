function Controller() {
    function createIconByScrollView(icon, folder) {
        var views = [];
        var iconCurrent;
        var column = 5, row = 2, num = column * row, m = (icon.length, Math.ceil(icon.length / num)), imgSize = deviceWidth / column, icon_index = 0;
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "edit_event";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.edit_event = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "edit_event"
    });
    $.__views.edit_event && $.addTopLevelView($.__views.edit_event);
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu",
        __parentSymbol: $.__views.edit_event
    });
    $.__views.tabMenu.setParent($.__views.edit_event);
    $.__views.main = Ti.UI.createView({
        top: "50dp",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: "#f5f1e9",
        id: "main"
    });
    $.__views.edit_event.add($.__views.main);
    $.__views.content = Ti.UI.createScrollView({
        top: 0,
        bottom: 20,
        left: "10dp",
        right: "10dp",
        id: "content",
        layout: "vertical"
    });
    $.__views.main.add($.__views.content);
    $.__views.__alloyId0 = Ti.UI.createView({
        height: "60dp",
        width: "120dp",
        id: "__alloyId0"
    });
    $.__views.content.add($.__views.__alloyId0);
    $.__views.date = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#8d8d8d",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "20dp"
        },
        left: "5dp",
        id: "date"
    });
    $.__views.__alloyId0.add($.__views.date);
    $.__views.dayName = Ti.UI.createLabel({
        width: "25dp",
        height: "25dp",
        color: "#fff",
        textAlign: "center",
        font: {
            fontSize: "14dp"
        },
        backgroundImage: "/icons/bg-circle.png",
        left: "85dp",
        id: "dayName"
    });
    $.__views.__alloyId0.add($.__views.dayName);
    $.__views.title = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        backgroundFocusedColor: "#fff",
        borderRadius: 10,
        borderColor: "#fff",
        color: "#999999",
        maxLength: "30",
        id: "title",
        hintText: "タイトル"
    });
    $.__views.content.add($.__views.title);
    $.__views.startTime = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        backgroundFocusedColor: "#fff",
        borderRadius: 10,
        borderColor: "#fff",
        color: "#999999",
        maxLength: "30",
        id: "startTime",
        hintText: "開始時間"
    });
    $.__views.content.add($.__views.startTime);
    $.__views.endTime = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: Ti.UI.FILL,
        backgroundColor: "#fff",
        backgroundFocusedColor: "#fff",
        borderRadius: 10,
        borderColor: "#fff",
        color: "#999999",
        maxLength: "30",
        id: "endTime",
        hintText: "終了時間"
    });
    $.__views.content.add($.__views.endTime);
    $.__views.memo = Ti.UI.createTextArea({
        width: Ti.UI.FILL,
        height: "80dp",
        backgroundColor: "#fff",
        backgroundFocusedColor: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        borderColor: "#fff",
        color: "#999999",
        maxLength: "120",
        id: "memo",
        hintText: "メモ"
    });
    $.__views.content.add($.__views.memo);
    $.__views.wicon = Ti.UI.createView({
        top: "10dp",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#e4f7ff",
        width: Ti.UI.FILL,
        layout: "vertical",
        height: Ti.UI.SIZE,
        id: "wicon"
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
        height: "40dp",
        backgroundColor: "#f9dce3",
        width: Ti.UI.FILL,
        layout: "horizontal",
        scrollType: "horizontal",
        id: "buttonTabs"
    });
    $.__views.wicon.add($.__views.buttonTabs);
    $.__views.groupButton = Ti.UI.createView({
        layout: "vertical",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "groupButton"
    });
    $.__views.content.add($.__views.groupButton);
    $.__views.__alloyId1 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "16dp"
        },
        height: "40dp",
        backgroundColor: "#f3acbd",
        backgroundFocusedColor: "#e6a3b3",
        backgroundSelectedColor: "#e6a3b3",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "15",
        top: "15dp",
        title: "保存してカレンダーに戻る",
        id: "__alloyId1"
    });
    $.__views.groupButton.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.FILL,
        font: {
            fontSize: "16dp"
        },
        height: "40dp",
        backgroundColor: "#cfba9c",
        backgroundFocusedColor: "#c0ad91",
        backgroundSelectedColor: "#c0ad91",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "15",
        top: "15dp",
        title: "保存して別の予定を入力",
        id: "__alloyId2"
    });
    $.__views.groupButton.add($.__views.__alloyId2);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var selectedIcon = "";
    var deviceWidth = Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);
    var args = arguments[0] || {};
    var date = args["data"].day.split("-");
    $.date.setText(date[1] + " / " + date[2]);
    $.dayName.setText(lib.convertDayName(new Date(args["data"].day).getDay()));
    var buttonTabs = Ti.API.ICON;
    var currentButton = null;
    for (var i = 0, l = buttonTabs.length; l > i; i++) {
        var buttontab = Ti.UI.createButton({
            title: buttonTabs[i].title,
            data: buttonTabs[i].icons,
            folder: buttonTabs[i].folder,
            backgroundColor: "#f9dce3",
            color: "#ed829c",
            height: Ti.UI.FILL,
            width: "20%",
            textAlign: "center",
            className: "buttonTabs"
        });
        buttontab.addEventListener("click", function(e) {
            if (this !== currentButton) {
                currentButton && currentButton.setBackgroundColor("#f9dce3");
                currentButton = this;
                currentButton.setBackgroundColor("#fff");
                $.listIcon.removeAllChildren();
                $.listIcon.add(createIconByScrollView(e.source.data, e.source.folder));
            }
        });
        if (0 == i && "" == selectedIcon) {
            currentButton = buttontab;
            currentButton.setBackgroundColor("#fff");
            $.listIcon.add(createIconByScrollView(buttonTabs[i].icons, buttonTabs[i].folder));
        } else "" != selectedIcon && "-1" != selectedIcon.indexOf(buttonTabs[i].folder) && buttontab.fireEvent("click");
        $.buttonTabs.add(buttontab);
    }
    $.buttonTabs.setContentWidth(Ti.Platform.displayCaps.platformWidth + Ti.Platform.displayCaps.platformWidth / 4);
    $.edit_event.addEventListener("android:back", function() {
        openView("schedule");
    });
    $.startTime.addEventListener("click", function() {
        var picker1 = Titanium.UI.createPicker({
            type: Titanium.UI.PICKER_TYPE_TIME,
            format24: true
        });
        $.edit_event.add(picker1);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;