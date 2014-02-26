function Controller() {
    function showPicker(e1) {
        var picker = Titanium.UI.createPicker({
            type: Titanium.UI.PICKER_TYPE_DATE
        }), label = this;
        picker.showDatePickerDialog({
            value: lastValue[e1.source.id],
            callback: function(e) {
                if (!e.cancel) {
                    var result = lastValue[e1.source.id] = e.value;
                    label.setText(formatDate(result, e1.source.id));
                }
            }
        });
    }
    function formatDate(date, type) {
        var format = date.getFullYear() + "年" + (date.getMonth() + 1) + "月";
        return "month" == type ? format : format + date.getDate() + "日";
    }
    function shareByText() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "share";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.share = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "share"
    });
    $.__views.share && $.addTopLevelView($.__views.share);
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu",
        __parentSymbol: $.__views.share
    });
    $.__views.tabMenu.setParent($.__views.share);
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: "50dp",
        id: "main"
    });
    $.__views.share.add($.__views.main);
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
    $.__views.__alloyId69 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "20dp",
        color: "#000",
        textAlign: "left",
        font: {
            fontSize: "16sp"
        },
        top: "10dp",
        zIndex: 0,
        bottom: "0",
        text: "どの方法で予定を共有しますか",
        id: "__alloyId69"
    });
    $.__views.content.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "20dp",
        bottom: "20dp",
        id: "__alloyId70"
    });
    $.__views.content.add($.__views.__alloyId70);
    $.__views.__alloyId71 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        top: 0,
        zIndex: 0,
        left: "0",
        text: "カレンダー画像",
        id: "__alloyId71"
    });
    $.__views.__alloyId70.add($.__views.__alloyId71);
    $.__views.month = Ti.UI.createLabel({
        width: "120dp",
        height: "30dp",
        color: "#676767",
        textAlign: "center",
        font: {
            fontSize: "16sp"
        },
        top: 0,
        zIndex: 0,
        left: "140dp",
        borderColor: "#ccc",
        borderWidth: 1,
        id: "month"
    });
    $.__views.__alloyId70.add($.__views.month);
    showPicker ? $.__views.month.addEventListener("click", showPicker) : __defers["$.__views.month!click!showPicker"] = true;
    $.__views.__alloyId72 = Ti.UI.createButton({
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
        title: "メールで送る",
        id: "__alloyId72"
    });
    $.__views.content.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createButton({
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
        title: "LINEで送る",
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
    $.__views.__alloyId75 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        top: 0,
        zIndex: 0,
        left: "0",
        text: "テキスト",
        id: "__alloyId75"
    });
    $.__views.__alloyId74.add($.__views.__alloyId75);
    $.__views.dayStart = Ti.UI.createLabel({
        width: "110dp",
        height: "30dp",
        color: "#676767",
        textAlign: "center",
        font: {
            fontSize: "14dp"
        },
        top: 0,
        zIndex: 0,
        left: "70dp",
        borderColor: "#ccc",
        borderWidth: 1,
        id: "dayStart"
    });
    $.__views.__alloyId74.add($.__views.dayStart);
    showPicker ? $.__views.dayStart.addEventListener("click", showPicker) : __defers["$.__views.dayStart!click!showPicker"] = true;
    $.__views.to = Ti.UI.createLabel({
        width: "20dp",
        height: "30dp",
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        top: 0,
        zIndex: 0,
        left: "190dp",
        id: "to",
        text: "～"
    });
    $.__views.__alloyId74.add($.__views.to);
    $.__views.dayEnd = Ti.UI.createLabel({
        width: "110dp",
        height: "30dp",
        color: "#676767",
        textAlign: "center",
        font: {
            fontSize: "16sp"
        },
        top: 0,
        zIndex: 0,
        left: "215dp",
        borderColor: "#ccc",
        borderWidth: 1,
        id: "dayEnd"
    });
    $.__views.__alloyId74.add($.__views.dayEnd);
    showPicker ? $.__views.dayEnd.addEventListener("click", showPicker) : __defers["$.__views.dayEnd!click!showPicker"] = true;
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
        zIndex: 0,
        borderColor: "#ed4580",
        borderWidth: 1,
        left: 0,
        type: "mail",
        title: "メールで送る",
        id: "__alloyId76"
    });
    $.__views.content.add($.__views.__alloyId76);
    shareByText ? $.__views.__alloyId76.addEventListener("click", shareByText) : __defers["$.__views.__alloyId76!click!shareByText"] = true;
    $.__views.__alloyId77 = Ti.UI.createButton({
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
        type: "line",
        title: "LINEで送る",
        id: "__alloyId77"
    });
    $.__views.content.add($.__views.__alloyId77);
    shareByText ? $.__views.__alloyId77.addEventListener("click", shareByText) : __defers["$.__views.__alloyId77!click!shareByText"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var lastValue = {
        dayStart: new Date(),
        dayEnd: new Date(),
        month: new Date()
    };
    lastValue["dayStart"].setDate(1);
    lastValue["dayEnd"].setDate(31);
    $.month.setText(formatDate(lastValue["month"], "month"));
    $.dayStart.setText(formatDate(lastValue["dayStart"]));
    $.dayEnd.setText(formatDate(lastValue["dayEnd"]));
    __defers["$.__views.month!click!showPicker"] && $.__views.month.addEventListener("click", showPicker);
    __defers["$.__views.dayStart!click!showPicker"] && $.__views.dayStart.addEventListener("click", showPicker);
    __defers["$.__views.dayEnd!click!showPicker"] && $.__views.dayEnd.addEventListener("click", showPicker);
    __defers["$.__views.__alloyId76!click!shareByText"] && $.__views.__alloyId76.addEventListener("click", shareByText);
    __defers["$.__views.__alloyId77!click!shareByText"] && $.__views.__alloyId77.addEventListener("click", shareByText);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;