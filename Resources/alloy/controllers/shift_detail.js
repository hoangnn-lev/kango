function Controller() {
    function loadShift() {
        var shift_data = [ {
            id: "",
            color: "#f19c98"
        }, {
            id: "",
            color: "#ffe498"
        }, {
            id: "",
            color: "#b9e0a5"
        }, {
            id: "",
            color: "#d3e1f5"
        }, {
            id: "",
            color: "#ccc"
        }, {
            id: "",
            color: "#fff"
        } ];
        var column = 3, record = shift_data.length, row = Math.ceil(record / column), count = 0, height = "40", top = 0, selectedColor = "";
        for (var i = 0; row > i; i++) for (var j = 0; column > j; j++) {
            if (count >= record) return;
            i > 0 && (top = i * height + 10 * i);
            var view = Ti.UI.createButton({
                backgroundColor: shift_data[count].color,
                height: height + "dp",
                width: "30%",
                left: 33 * j + "%",
                top: top + "dp",
                borderColor: "#666",
                borderWidth: 1
            });
            if (0 == i && 0 == j) {
                selectedColor = view;
                view.setBorderWidth(5);
            }
            view.addEventListener("click", function() {
                selectedColor.setBorderWidth(1);
                this.setBorderWidth(5);
                selectedColor = this;
            });
            $.groupShiftColor.add(view);
            count++;
        }
    }
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
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu",
        __parentSymbol: $.__views.shift_detail
    });
    $.__views.tabMenu.setParent($.__views.shift_detail);
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: "50dp",
        id: "main"
    });
    $.__views.shift_detail.add($.__views.main);
    $.__views.__alloyId66 = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        backgroundColor: "#ff3974",
        top: "0",
        id: "__alloyId66"
    });
    $.__views.main.add($.__views.__alloyId66);
    $.__views.__alloyId67 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: 0,
        left: "10dp",
        text: "シフトの編集",
        id: "__alloyId67"
    });
    $.__views.__alloyId66.add($.__views.__alloyId67);
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
    $.__views.main.add($.__views.content);
    $.__views.shiftName = Ti.UI.createLabel({
        width: "80dp",
        height: "35dp",
        color: "#676767",
        textAlign: "center",
        font: {
            fontSize: "15dp"
        },
        zIndex: 0,
        backgroundColor: "#f19c98",
        borderColor: "#666",
        borderWidth: 1,
        left: 0,
        top: "10dp",
        id: "shiftName",
        text: "日勤"
    });
    $.__views.content.add($.__views.shiftName);
    $.__views.__alloyId68 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "13dp"
        },
        zIndex: 0,
        top: "10dp",
        text: "シフト名(最大4文字)",
        id: "__alloyId68"
    });
    $.__views.content.add($.__views.__alloyId68);
    $.__views.shiftAlias = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: "100dp",
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#fff",
        zIndex: 0,
        font: {
            fontSize: "16dp"
        },
        left: 0,
        hintText: "日勤",
        id: "shiftAlias"
    });
    $.__views.content.add($.__views.shiftAlias);
    $.__views.error = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "red",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "12dp"
        },
        zIndex: 0,
        id: "error",
        bottom: "10dp",
        text: "※文字数が多すぎます",
        top: "-33dp",
        left: "130dp"
    });
    $.__views.content.add($.__views.error);
    $.__views.__alloyId69 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "13dp"
        },
        zIndex: 0,
        top: "10dp",
        text: "時間(任意)",
        id: "__alloyId69"
    });
    $.__views.content.add($.__views.__alloyId69);
    $.__views.__alloyId70 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId70"
    });
    $.__views.content.add($.__views.__alloyId70);
    $.__views.timeStart = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: "120dp",
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#fff",
        zIndex: 0,
        left: 0,
        font: {
            fontSize: "16dp"
        },
        textAlign: "center",
        hintText: "8:00",
        id: "timeStart"
    });
    $.__views.__alloyId70.add($.__views.timeStart);
    $.__views.__alloyId71 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "13dp"
        },
        zIndex: 0,
        top: "10dp",
        touchEnabled: "false",
        text: "から",
        id: "__alloyId71"
    });
    $.__views.__alloyId70.add($.__views.__alloyId71);
    $.__views.timeEnd = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: "120dp",
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#fff",
        zIndex: 0,
        right: 0,
        font: {
            fontSize: "16dp"
        },
        textAlign: "center",
        hintText: "17:00",
        id: "timeEnd"
    });
    $.__views.__alloyId70.add($.__views.timeEnd);
    $.__views.__alloyId72 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "red",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "12dp"
        },
        zIndex: 0,
        text: "※シフト終了時間が入力されていません",
        left: "0",
        id: "__alloyId72"
    });
    $.__views.content.add($.__views.__alloyId72);
    $.__views.__alloyId73 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "13dp"
        },
        zIndex: 0,
        top: "10dp",
        text: "スタンプ",
        id: "__alloyId73"
    });
    $.__views.content.add($.__views.__alloyId73);
    $.__views.groupShiftColor = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "groupShiftColor"
    });
    $.__views.content.add($.__views.groupShiftColor);
    $.__views.groupButton = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "15dp",
        id: "groupButton"
    });
    $.__views.content.add($.__views.groupButton);
    $.__views.__alloyId74 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "45%",
        font: {
            fontSize: "16dp"
        },
        height: "40dp",
        backgroundColor: "#d1463f",
        backgroundFocusedColor: "#c2433d",
        backgroundSelectedColor: "#c2433d",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "15",
        zIndex: 0,
        top: 0,
        left: "0",
        title: "キャンセル",
        id: "__alloyId74"
    });
    $.__views.groupButton.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "45%",
        font: {
            fontSize: "16dp"
        },
        height: "40dp",
        backgroundColor: "#4bcd61",
        backgroundFocusedColor: "#48c25d",
        backgroundSelectedColor: "#48c25d",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: "15",
        zIndex: 0,
        top: 0,
        right: "0",
        title: "保存する",
        id: "__alloyId75"
    });
    $.__views.groupButton.add($.__views.__alloyId75);
    exports.destroy = function() {};
    _.extend($, $.__views);
    loadShift();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;