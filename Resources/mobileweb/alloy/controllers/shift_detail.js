function Controller() {
    function loadColorBox(selected) {
        var color = [ "#f19c98", "#ffe498", "#b9e0a5", "#d3e1f5", "#ccc", "#fff" ];
        var column = 3, record = color.length, row = Math.ceil(record / column), count = 0, height = "40", top = 0;
        for (var i = 0; row > i; i++) for (var j = 0; column > j; j++) {
            if (count >= record) return;
            i > 0 && (top = i * height + 10 * i);
            var view = Ti.UI.createButton({
                backgroundColor: color[count],
                height: height + "dp",
                width: "30%",
                left: 33 * j + "%",
                top: top + "dp",
                borderColor: "#000",
                color: "#676767",
                borderWidth: 1
            });
            if (selected == color[count]) {
                selectedColor = view;
                view.setBorderWidth(3);
            }
            view.addEventListener("click", function() {
                selectedColor && selectedColor.setBorderWidth(1);
                this.setBorderWidth(3);
                selectedColor = this;
            });
            $.groupShiftColor.add(view);
            count++;
        }
    }
    function shift_setting() {
        openView("shift_setting");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "shift_detail";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
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
    $.__views.__alloyId71 = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        top: "0",
        id: "__alloyId71"
    });
    $.__views.main.add($.__views.__alloyId71);
    $.__views.__alloyId72 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: 0,
        left: "10dp",
        text: "シフトの編集",
        id: "__alloyId72"
    });
    $.__views.__alloyId71.add($.__views.__alloyId72);
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
        borderColor: "#f0f0f0",
        borderWidth: 1,
        left: 0,
        top: "10dp",
        id: "shiftName",
        text: "日勤"
    });
    $.__views.content.add($.__views.shiftName);
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
        text: "シフト名(最大4文字)",
        id: "__alloyId73"
    });
    $.__views.content.add($.__views.__alloyId73);
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
        maxLength: "4",
        hintText: "日勤",
        id: "shiftAlias"
    });
    $.__views.content.add($.__views.shiftAlias);
    $.__views.errorLabel = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "red",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "12dp"
        },
        zIndex: 0,
        visible: false,
        id: "errorLabel",
        bottom: "10dp",
        text: "※文字数が多すぎます",
        top: "-33dp",
        left: "130dp"
    });
    $.__views.content.add($.__views.errorLabel);
    $.__views.__alloyId74 = Ti.UI.createLabel({
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
        id: "__alloyId74"
    });
    $.__views.content.add($.__views.__alloyId74);
    $.__views.__alloyId75 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId75"
    });
    $.__views.content.add($.__views.__alloyId75);
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
        id: "timeStart"
    });
    $.__views.__alloyId75.add($.__views.timeStart);
    $.__views.__alloyId76 = Ti.UI.createLabel({
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
        id: "__alloyId76"
    });
    $.__views.__alloyId75.add($.__views.__alloyId76);
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
        id: "timeEnd"
    });
    $.__views.__alloyId75.add($.__views.timeEnd);
    $.__views.errorTime = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "red",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "12dp"
        },
        zIndex: 0,
        visible: false,
        id: "errorTime",
        text: "※シフト終了時間が入力されていません",
        left: "0"
    });
    $.__views.content.add($.__views.errorTime);
    $.__views.__alloyId77 = Ti.UI.createLabel({
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
        id: "__alloyId77"
    });
    $.__views.content.add($.__views.__alloyId77);
    $.__views.groupShiftColor = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "groupShiftColor"
    });
    $.__views.content.add($.__views.groupShiftColor);
    $.__views.groupButton = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        top: "20dp",
        id: "groupButton"
    });
    $.__views.content.add($.__views.groupButton);
    $.__views.saveShift = Ti.UI.createButton({
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
        zIndex: 0,
        top: "15dp",
        id: "saveShift",
        title: "キャンセル"
    });
    $.__views.groupButton.add($.__views.saveShift);
    $.__views.__alloyId78 = Ti.UI.createButton({
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
        zIndex: 0,
        top: "15dp",
        title: "保存する",
        id: "__alloyId78"
    });
    $.__views.groupButton.add($.__views.__alloyId78);
    shift_setting ? $.__views.__alloyId78.addEventListener("click", shift_setting) : __defers["$.__views.__alloyId78!click!shift_setting"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var shift, status, label, args = arguments[0] || {}, selectedColor = "", shiftsCols = Alloy.Collections.shifts;
    shiftsCols.fetch({
        query: "SELECT * from shifts where id=" + args["id"]
    });
    shift = shiftsCols.models[0];
    status = shift.get("status");
    label = shift.get("label");
    $.shiftName.setText(label);
    $.shiftAlias.setValue(shift.get("alias"));
    if (shift.get("time")) {
        var time = shift.get("time").split("-");
        $.timeStart.setValue(time[0]);
        $.timeEnd.setValue(time[1]);
    }
    loadColorBox(shift.get("color"));
    $.saveShift.addEventListener("click", function() {
        var color, time, alias = $.shiftAlias.getValue(), timeStart = $.timeStart.getValue(), timeEnd = $.timeEnd.getValue();
        if (timeStart && timeEnd) time = timeStart + "-" + timeEnd; else {
            if (timeStart && !timeEnd || !timeStart && timeEnd) {
                $.errorTime.setVisible(true);
                return;
            }
            $.errorTime.setVisible(false);
        }
        if (alias.length > 4) {
            $.errorLabel.setVisible(true);
            return;
        }
        $.errorLabel.setVisible(false);
        selectedColor && (color = selectedColor.getBackgroundColor());
        var _shift_data = {
            id: args["id"],
            label: label,
            status: status,
            alias: alias,
            time: time,
            color: color
        };
        var shift = Alloy.createModel("shifts", _shift_data);
        Alloy.Collections.shifts.add(shift);
        shift.save();
        Alloy.Collections.shifts.fetch();
        delete_view("shift");
        delete_view("shift_setting");
        shift_setting();
    });
    $.shift_detail.addEventListener("android:back", function() {
        shift_setting();
    });
    __defers["$.__views.__alloyId78!click!shift_setting"] && $.__views.__alloyId78.addEventListener("click", shift_setting);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;