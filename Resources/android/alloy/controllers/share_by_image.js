function Controller() {
    function showPicker(e1) {
        var picker = Titanium.UI.createPicker({
            type: Titanium.UI.PICKER_TYPE_DATE,
            selectionIndicator: true
        }), label = this;
        picker.showDatePickerDialog({
            value: lastValue[e1.source.id],
            callback: function(e) {
                if (!e.cancel) {
                    var result = lastValue[e1.source.id] = e.value;
                    label.setText(formatDate(result));
                }
            }
        });
    }
    function formatDate(date) {
        return date.getFullYear() + "年" + (date.getMonth() + 1) + "月";
    }
    function share(e) {
        var day = lastValue["month"];
        var f = Alloy.createController("schedule", {
            date: day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate()
        }).getView("calendar").toImage().media;
        var file = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, "shift.png");
        file.write(f);
        if ("line" == e.source.type) Ti.Platform.openURL("line://msg/image/" + file.nativePath) ? "" : alert("Lineがインストールされていませんでした。。。"); else {
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
        id: "main"
    });
    $.__views.share_by_image.add($.__views.main);
    $.__views.title = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        backgroundColor: "#ed829c",
        id: "title"
    });
    $.__views.main.add($.__views.title);
    $.__views.__alloyId72 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "画像で共有",
        id: "__alloyId72"
    });
    $.__views.title.add($.__views.__alloyId72);
    $.__views.save = Ti.UI.createImageView({
        width: "120dp",
        id: "save"
    });
    $.__views.main.add($.__views.save);
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
    $.__views.__alloyId73 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "0",
        text: "期間を選ぶ",
        id: "__alloyId73"
    });
    $.__views.content.add($.__views.__alloyId73);
    $.__views.__alloyId74 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "20dp",
        bottom: "20dp",
        id: "__alloyId74"
    });
    $.__views.content.add($.__views.__alloyId74);
    $.__views.month = Ti.UI.createLabel({
        width: "120dp",
        height: "30dp",
        color: "#676767",
        textAlign: "center",
        font: {
            fontSize: "16sp"
        },
        borderColor: "#ccc",
        borderWidth: 1,
        id: "month"
    });
    $.__views.__alloyId74.add($.__views.month);
    showPicker ? $.__views.month.addEventListener("click", showPicker) : __defers["$.__views.month!click!showPicker"] = true;
    $.__views.__alloyId75 = Ti.UI.createButton({
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
        borderColor: "#ed4580",
        borderWidth: 1,
        left: 0,
        bottom: "20dp",
        type: "mail",
        title: "メールで送る",
        id: "__alloyId75"
    });
    $.__views.content.add($.__views.__alloyId75);
    share ? $.__views.__alloyId75.addEventListener("click", share) : __defers["$.__views.__alloyId75!click!share"] = true;
    $.__views.__alloyId76 = Ti.UI.createButton({
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
        borderColor: "#ed4580",
        borderWidth: 1,
        left: 0,
        bottom: "20dp",
        type: "line",
        title: "LINEで送る",
        id: "__alloyId76"
    });
    $.__views.content.add($.__views.__alloyId76);
    share ? $.__views.__alloyId76.addEventListener("click", share) : __defers["$.__views.__alloyId76!click!share"] = true;
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
    __defers["$.__views.month!click!showPicker"] && $.__views.month.addEventListener("click", showPicker);
    __defers["$.__views.__alloyId75!click!share"] && $.__views.__alloyId75.addEventListener("click", share);
    __defers["$.__views.__alloyId76!click!share"] && $.__views.__alloyId76.addEventListener("click", share);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;