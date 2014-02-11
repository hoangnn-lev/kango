function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "shift_detail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.shift_detail = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "shift_detail"
    });
    $.__views.shift_detail && $.addTopLevelView($.__views.shift_detail);
    $.__views.__alloyId93 = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        backgroundColor: "#ff3974",
        top: "0",
        id: "__alloyId93"
    });
    $.__views.shift_detail.add($.__views.__alloyId93);
    $.__views.__alloyId94 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#fff",
        zIndex: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "10dp",
        text: "シフトの編集",
        id: "__alloyId94"
    });
    $.__views.__alloyId93.add($.__views.__alloyId94);
    $.__views.content = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        left: "10dp",
        right: "10dp",
        top: "40dp",
        bottom: "55dp",
        layout: "vertical",
        id: "content"
    });
    $.__views.shift_detail.add($.__views.content);
    $.__views.shiftName = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "120dp",
        font: {
            fontSize: "15dp"
        },
        zIndex: 0,
        height: "35dp",
        backgroundColor: "#f19c98",
        backgroundFocusedColor: "#e4f7ff",
        backgroundSelectedColor: "#e4f7ff",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        left: 0,
        top: "10dp",
        id: "shiftName",
        title: "日勤"
    });
    $.__views.content.add($.__views.shiftName);
    $.__views.__alloyId95 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        zIndex: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "13dp"
        },
        top: "10dp",
        text: "シフト名(最大4文字)",
        id: "__alloyId95"
    });
    $.__views.content.add($.__views.__alloyId95);
    $.__views.shiftAlias = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: "120dp",
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#fff",
        zIndex: 0,
        height: "35dp",
        left: 0,
        id: "shiftAlias"
    });
    $.__views.content.add($.__views.shiftAlias);
    $.__views.error = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "red",
        zIndex: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "12dp"
        },
        id: "error",
        text: "※文字数が多すぎます",
        top: "-33dp",
        left: "130dp"
    });
    $.__views.content.add($.__views.error);
    $.__views.__alloyId96 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        zIndex: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "13dp"
        },
        top: "10dp",
        text: "時間(任意)",
        id: "__alloyId96"
    });
    $.__views.content.add($.__views.__alloyId96);
    $.__views.__alloyId97 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId97"
    });
    $.__views.content.add($.__views.__alloyId97);
    $.__views.timeStart = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: "160dp",
        backgroundColor: "#f19c98",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#fff",
        zIndex: 0,
        left: 0,
        height: "35dp",
        font: {
            fontSize: "15dp"
        },
        id: "timeStart"
    });
    $.__views.__alloyId97.add($.__views.timeStart);
    $.__views.__alloyId98 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        zIndex: 0,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "13dp"
        },
        top: "10dp",
        text: "から",
        id: "__alloyId98"
    });
    $.__views.__alloyId97.add($.__views.__alloyId98);
    $.__views.timeEnd = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: "160dp",
        backgroundColor: "#f19c98",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#fff",
        zIndex: 0,
        right: 0,
        height: "35dp",
        font: {
            fontSize: "15dp"
        },
        id: "timeEnd"
    });
    $.__views.__alloyId97.add($.__views.timeEnd);
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f8f8f8",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu",
        __parentSymbol: $.__views.shift_detail
    });
    $.__views.tabMenu.setParent($.__views.shift_detail);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;