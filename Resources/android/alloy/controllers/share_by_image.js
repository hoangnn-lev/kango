function Controller() {
    function showPicker() {
        var picker = Titanium.UI.createPicker({
            type: Titanium.UI.PICKER_TYPE_DATE,
            selectionIndicator: true
        });
        picker.showDatePickerDialog({
            value: lastValue["month"],
            callback: function(e) {
                if (!e.cancel) {
                    var result = lastValue["month"] = e.value;
                    $.month.setText(formatDate(result));
                }
            }
        });
    }
    function formatDate(date) {
        return date.getFullYear() + "年" + (date.getMonth() + 1) + "月";
    }
    function share(e) {
        var day = lastValue["month"];
        var f = Alloy.createController("shift", {
            date: day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate()
        }).getView("main").toImage().media;
        var file = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, "shift.png");
        file.write(f);
        if ("line" == e.source.type) Ti.Platform.openURL("line://msg/image/" + file.nativePath) ? "" : func.alert("LINEがインストールされていません"); else {
            var emailDialog = Titanium.UI.createEmailDialog();
            emailDialog.addAttachment(file);
            emailDialog.setSubject("シフト共有");
            emailDialog.open();
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "share_by_image";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.share_by_image = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "share_by_image"
    });
    $.__views.share_by_image && $.addTopLevelView($.__views.share_by_image);
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: 0,
        layout: "vertical",
        backgroundColor: "#f5f1e9",
        id: "main"
    });
    $.__views.share_by_image.add($.__views.main);
    $.__views.title = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        backgroundColor: "#ed829c",
        id: "title"
    });
    $.__views.main.add($.__views.title);
    $.__views.__alloyId94 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "画像で共有",
        id: "__alloyId94"
    });
    $.__views.title.add($.__views.__alloyId94);
    $.__views.content = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        left: "10dp",
        right: "10dp",
        top: "10dp",
        layout: "vertical",
        id: "content"
    });
    $.__views.main.add($.__views.content);
    $.__views.__alloyId95 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "0",
        text: "共有する月カレンダーを選ぶ",
        id: "__alloyId95"
    });
    $.__views.content.add($.__views.__alloyId95);
    $.__views.__alloyId96 = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        top: "20dp",
        bottom: "20dp",
        backgroundColor: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        id: "__alloyId96"
    });
    $.__views.content.add($.__views.__alloyId96);
    showPicker ? $.__views.__alloyId96.addEventListener("click", showPicker) : __defers["$.__views.__alloyId96!click!showPicker"] = true;
    $.__views.month = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "30dp",
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "10dp",
        id: "month"
    });
    $.__views.__alloyId96.add($.__views.month);
    $.__views.groupButton = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "groupButton"
    });
    $.__views.content.add($.__views.groupButton);
    $.__views.__alloyId97 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "100%",
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
        left: "0",
        type: "mail",
        title: "メールで送信",
        id: "__alloyId97"
    });
    $.__views.groupButton.add($.__views.__alloyId97);
    share ? $.__views.__alloyId97.addEventListener("click", share) : __defers["$.__views.__alloyId97!click!share"] = true;
    $.__views.__alloyId98 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "100%",
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
        right: "0",
        type: "line",
        title: "LINEで送信",
        id: "__alloyId98"
    });
    $.__views.groupButton.add($.__views.__alloyId98);
    share ? $.__views.__alloyId98.addEventListener("click", share) : __defers["$.__views.__alloyId98!click!share"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var lastValue = {
        month: new Date()
    };
    lastValue["month"].setDate(1);
    $.month.setText(formatDate(lastValue["month"]));
    $.share_by_image.addEventListener("android:back", function() {
        openView("share");
    });
    __defers["$.__views.__alloyId96!click!showPicker"] && $.__views.__alloyId96.addEventListener("click", showPicker);
    __defers["$.__views.__alloyId97!click!share"] && $.__views.__alloyId97.addEventListener("click", share);
    __defers["$.__views.__alloyId98!click!share"] && $.__views.__alloyId98.addEventListener("click", share);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;