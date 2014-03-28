function Controller() {
    function loadColorBox(selected) {
        var count = 0, color = [ "#e68200", "#01adb3", "#69bc7b", "#e6b800", "#75a9e8", "#e86767", "#6c73cc", "#d23376", "#e0539c", "#a957a0", "#aa86c4", "#d8ba72" ];
        var colorWidth = Math.floor(Ti.API.DW / 4) - 18;
        for (var c = 0; 3 > c; c++) {
            var group = Ti.UI.createView({
                height: colorWidth + "dp",
                width: Ti.UI.FILL,
                top: "10dp"
            });
            2 == c && group.setBottom("10dp");
            for (var r = 0; 4 > r; ++r) {
                var button = Ti.UI.createButton({
                    backgroundColor: color[count],
                    height: colorWidth + "dp",
                    width: colorWidth + "dp",
                    borderColor: "#ccc",
                    color: "#676767",
                    borderWidth: 0,
                    borderRadius: 10,
                    border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
                    left: 0 == r ? "10dp" : r * (colorWidth + 10) + 10 + "dp",
                    className: "button-color"
                });
                if (selected == color[count]) {
                    selectedColor = button;
                    button.setBorderWidth(6);
                    $.shiftName.setBackgroundColor(selected);
                }
                button.addEventListener("click", function(e) {
                    selectedColor && selectedColor.setBorderWidth(0);
                    this.setBorderWidth(6);
                    $.shiftName.setBackgroundColor(e.source.backgroundColor);
                    selectedColor = this;
                });
                group.add(button);
                count++;
            }
            $.groupShiftColor.add(group);
        }
    }
    function timeSet(e1) {
        $.shiftAlias.blur();
        if ("delete" == e1.source.type) return;
        var get_time = new Date(), child = this.getChildren();
        var time = child[1].text ? child[1].text.split(":") : [ 0, 0 ];
        get_time.setHours(time[0]);
        get_time.setMinutes(time[1]);
        var picker = Titanium.UI.createPicker({
            type: Titanium.UI.PICKER_TYPE_TIME,
            format24: true,
            useSpinner: true,
            selectionIndicator: true
        });
        picker.showTimePickerDialog({
            value: get_time,
            format24: true,
            callback: function(e) {
                if (!e.cancel) {
                    var result = e.value.getHours() + ":" + pad_2(e.value.getMinutes());
                    child[1].setText(result);
                    child[2].setVisible(true);
                }
            }
        });
    }
    function clearTime(e) {
        this.setVisible(false);
        "clearStartTime" == e.source.id ? $.startTime.setText("") : $.endTime.setText("");
    }
    function pad_2(number) {
        return (10 > number ? "0" : "") + number;
    }
    function shift_setting() {
        Ti.API.activeTab = args["tab"];
        openView("shift_setting", {
            tab: args["tab"]
        });
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
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: 0,
        layout: "vertical",
        backgroundColor: "#f5f1e9",
        id: "main"
    });
    $.__views.shift_detail.add($.__views.main);
    $.__views.title = Ti.UI.createView({
        height: "50dp",
        width: Ti.UI.FILL,
        backgroundColor: "#ed829c",
        top: 0,
        id: "title"
    });
    $.__views.main.add($.__views.title);
    $.__views.__alloyId62 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: 0,
        text: "シフト設定詳細",
        id: "__alloyId62"
    });
    $.__views.title.add($.__views.__alloyId62);
    $.__views.__alloyId63 = Ti.UI.createScrollView({
        top: "0",
        bottom: 20,
        id: "__alloyId63"
    });
    $.__views.main.add($.__views.__alloyId63);
    $.__views.content = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        left: "10dp",
        right: "10dp",
        bottom: "20dp",
        layout: "vertical",
        id: "content"
    });
    $.__views.__alloyId63.add($.__views.content);
    $.__views.__alloyId64 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "10dp",
        bottom: "10dp",
        id: "__alloyId64"
    });
    $.__views.content.add($.__views.__alloyId64);
    $.__views.shiftName = Ti.UI.createLabel({
        width: "60dp",
        height: "40dp",
        color: "#fff",
        textAlign: "center",
        font: {
            fontSize: "15dp"
        },
        zIndex: 0,
        top: 0,
        left: 0,
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        id: "shiftName"
    });
    $.__views.__alloyId64.add($.__views.shiftName);
    $.__views.shiftAlias = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: "80dp",
        backgroundColor: "#fff",
        backgroundFocusedColor: "#fff",
        borderRadius: 10,
        borderColor: "#fff",
        font: {
            fontSize: "15dp"
        },
        color: "#000",
        zIndex: 0,
        top: 0,
        height: "40dp",
        left: "70dp",
        id: "shiftAlias"
    });
    $.__views.__alloyId64.add($.__views.shiftAlias);
    $.__views.__alloyId65 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "13dp"
        },
        zIndex: 0,
        top: "10dp",
        left: "160dp",
        text: "※2文字以内",
        id: "__alloyId65"
    });
    $.__views.__alloyId64.add($.__views.__alloyId65);
    $.__views.__alloyId66 = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#fff",
        type: "start",
        id: "__alloyId66"
    });
    $.__views.content.add($.__views.__alloyId66);
    timeSet ? $.__views.__alloyId66.addEventListener("click", timeSet) : __defers["$.__views.__alloyId66!click!timeSet"] = true;
    $.__views.__alloyId67 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#8d8d8d",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: 0,
        left: "10dp",
        touchEnabled: "false",
        text: "開始時間",
        id: "__alloyId67"
    });
    $.__views.__alloyId66.add($.__views.__alloyId67);
    $.__views.startTime = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: 0,
        left: "90dp",
        touchEnabled: "false",
        id: "startTime"
    });
    $.__views.__alloyId66.add($.__views.startTime);
    $.__views.clearStartTime = Ti.UI.createLabel({
        width: "55dp",
        height: "25dp",
        color: "#fff",
        textAlign: "center",
        font: {
            fontSize: "16sp"
        },
        zIndex: 5,
        right: "5dp",
        backgroundColor: "#aeaeae",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        visible: false,
        type: "delete",
        id: "clearStartTime",
        text: "削除"
    });
    $.__views.__alloyId66.add($.__views.clearStartTime);
    clearTime ? $.__views.clearStartTime.addEventListener("click", clearTime) : __defers["$.__views.clearStartTime!click!clearTime"] = true;
    $.__views.__alloyId68 = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#fff",
        type: "end",
        id: "__alloyId68"
    });
    $.__views.content.add($.__views.__alloyId68);
    timeSet ? $.__views.__alloyId68.addEventListener("click", timeSet) : __defers["$.__views.__alloyId68!click!timeSet"] = true;
    $.__views.__alloyId69 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#8d8d8d",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: 0,
        left: "10dp",
        touchEnabled: "false",
        text: "終了時間",
        id: "__alloyId69"
    });
    $.__views.__alloyId68.add($.__views.__alloyId69);
    $.__views.endTime = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: 0,
        left: "90dp",
        touchEnabled: "false",
        id: "endTime"
    });
    $.__views.__alloyId68.add($.__views.endTime);
    $.__views.clearEndTime = Ti.UI.createLabel({
        width: "55dp",
        height: "25dp",
        color: "#fff",
        textAlign: "center",
        font: {
            fontSize: "16sp"
        },
        zIndex: 5,
        right: "5dp",
        backgroundColor: "#aeaeae",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        visible: false,
        type: "delete",
        id: "clearEndTime",
        text: "削除"
    });
    $.__views.__alloyId68.add($.__views.clearEndTime);
    clearTime ? $.__views.clearEndTime.addEventListener("click", clearTime) : __defers["$.__views.clearEndTime!click!clearTime"] = true;
    $.__views.blockColor = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "blockColor"
    });
    $.__views.content.add($.__views.blockColor);
    $.__views.groupShiftColor = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        backgroundColor: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        id: "groupShiftColor"
    });
    $.__views.blockColor.add($.__views.groupShiftColor);
    $.__views.groupButton = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "20dp",
        id: "groupButton"
    });
    $.__views.content.add($.__views.groupButton);
    $.__views.__alloyId70 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "45%",
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
        left: "0",
        title: "キャンセル",
        id: "__alloyId70"
    });
    $.__views.groupButton.add($.__views.__alloyId70);
    shift_setting ? $.__views.__alloyId70.addEventListener("click", shift_setting) : __defers["$.__views.__alloyId70!click!shift_setting"] = true;
    $.__views.saveShift = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "45%",
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
        right: "0",
        title: "保存"
    });
    $.__views.groupButton.add($.__views.saveShift);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var shift, flag, name, args = arguments[0] || {}, selectedColor = "", shiftsCols = Alloy.Collections.shifts;
    shiftsCols.fetch({
        query: "SELECT * from shifts where id=" + args["id"]
    });
    shift = shiftsCols.models[0], flag = shift.get("flag"), name = shift.get("name");
    $.shiftName.setText(name);
    $.shiftAlias.setValue(name);
    if (shift.get("time_shift")) {
        var time = shift.get("time_shift").split("-");
        $.startTime.setText(time[0]);
        $.endTime.setText(time[1]);
        time[0] ? $.clearStartTime.setVisible(true) : "";
        time[1] ? $.clearEndTime.setVisible(true) : "";
    }
    loadColorBox(shift.get("color"));
    $.saveShift.addEventListener("click", function() {
        var color, time, name = $.shiftAlias.getValue(), timeStart = $.startTime.getText(), timeEnd = $.endTime.getText();
        if (!name) {
            func.alert("シフト名を入力してください");
            return;
        }
        if (name.length > 2) {
            func.alert("文字数を超えているので、2文字以内で再入力してください");
            return;
        }
        time = ("" != timeStart ? timeStart : "") + "-" + ("" != timeEnd ? timeEnd : "");
        time = "-" != time ? time : "";
        color = selectedColor.getBackgroundColor();
        var _shift_data = {
            id: args["id"],
            name: name,
            flag: flag,
            time_shift: time,
            color: color
        };
        var shift = Alloy.createModel("shifts", _shift_data);
        Alloy.Collections.shifts.add(shift);
        shift.save();
        Alloy.Collections.shifts.fetch();
        delete_view("shift_setting");
        delete_view("shift");
        delete_view("share_by_text");
        shift_setting();
    });
    $.shift_detail.addEventListener("android:back", function() {
        shift_setting();
    });
    $.shiftAlias.addEventListener("change", function(e) {
        $.shiftName.setText(e.source.value);
    });
    $.main.addEventListener("click", function(e) {
        "shiftAlias" != e.source.id && $.shiftAlias.blur();
    });
    __defers["$.__views.__alloyId66!click!timeSet"] && $.__views.__alloyId66.addEventListener("click", timeSet);
    __defers["$.__views.clearStartTime!click!clearTime"] && $.__views.clearStartTime.addEventListener("click", clearTime);
    __defers["$.__views.__alloyId68!click!timeSet"] && $.__views.__alloyId68.addEventListener("click", timeSet);
    __defers["$.__views.clearEndTime!click!clearTime"] && $.__views.clearEndTime.addEventListener("click", clearTime);
    __defers["$.__views.__alloyId70!click!shift_setting"] && $.__views.__alloyId70.addEventListener("click", shift_setting);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;