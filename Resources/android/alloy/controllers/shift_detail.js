function Controller() {
    function loadColorBox(selected) {
        var color = [ "#e68200", "#01adb3", "#69bc7b", "#e6b800", "#75a9e8", "#e86767", "#6c73cc", "#d23376", "#e0539c", "#a957a0", "#aa86c4", "#d8ba72" ];
        var column = 4, record = color.length, row = Math.ceil(record / column), count = 0;
        for (var i = 0; row > i; i++) for (var j = 0; column > j; j++) {
            if (count >= record) return;
            var view = Ti.UI.createButton({
                backgroundColor: color[count],
                height: "50dp",
                width: "50dp",
                left: "15dp",
                top: "15dp",
                right: "15dp",
                bottom: "15dp",
                borderColor: "#666",
                color: "#676767",
                borderWidth: 0
            });
            if (selected == color[count]) {
                selectedColor = view;
                view.setBorderWidth(3);
                $.shiftName.setBackgroundColor(selected);
            }
            view.addEventListener("click", function(e) {
                selectedColor && selectedColor.setBorderWidth(0);
                this.setBorderWidth(3);
                $.shiftName.setBackgroundColor(e.source.backgroundColor);
                selectedColor = this;
            });
            $.groupShiftColor.add(view);
            count++;
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
                    $.clearEndTime.setVisible(true);
                    $.clearStartTime.setVisible(true);
                    var end, start, result = e.value;
                    var min = (pad_2(result.getHours()), ":" + pad_2(result.getMinutes()));
                    end = result.getHours() + 8 > 23 ? result.getHours() - 16 : result.getHours() + 8;
                    start = result.getHours() - 9 >= 0 ? result.getHours() - 9 : result.getHours() + 15;
                    "start" == e1.source.type ? $.endTime.setText(end + min) : $.startTime.setText(start + min);
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
        height: "40dp",
        width: Ti.UI.FILL,
        backgroundColor: "#ed829c",
        top: 0,
        id: "title"
    });
    $.__views.main.add($.__views.title);
    $.__views.__alloyId109 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: 0,
        text: "シフト設定詳細",
        id: "__alloyId109"
    });
    $.__views.title.add($.__views.__alloyId109);
    $.__views.__alloyId110 = Ti.UI.createScrollView({
        top: "0",
        bottom: 20,
        id: "__alloyId110"
    });
    $.__views.main.add($.__views.__alloyId110);
    $.__views.content = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        left: "10dp",
        right: "10dp",
        bottom: "20dp",
        layout: "vertical",
        id: "content"
    });
    $.__views.__alloyId110.add($.__views.content);
    $.__views.__alloyId111 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "10dp",
        bottom: "10dp",
        id: "__alloyId111"
    });
    $.__views.content.add($.__views.__alloyId111);
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
    $.__views.__alloyId111.add($.__views.shiftName);
    $.__views.shiftAlias = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: "80dp",
        backgroundColor: "#fff",
        backgroundFocusedColor: "#fff",
        borderRadius: 10,
        borderColor: "#fff",
        zIndex: 0,
        top: 0,
        font: {
            fontSize: "15dp"
        },
        height: "40dp",
        left: "70dp",
        id: "shiftAlias"
    });
    $.__views.__alloyId111.add($.__views.shiftAlias);
    $.__views.__alloyId112 = Ti.UI.createLabel({
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
        id: "__alloyId112"
    });
    $.__views.__alloyId111.add($.__views.__alloyId112);
    $.__views.__alloyId113 = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#fff",
        type: "start",
        id: "__alloyId113"
    });
    $.__views.content.add($.__views.__alloyId113);
    timeSet ? $.__views.__alloyId113.addEventListener("click", timeSet) : __defers["$.__views.__alloyId113!click!timeSet"] = true;
    $.__views.__alloyId114 = Ti.UI.createLabel({
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
        id: "__alloyId114"
    });
    $.__views.__alloyId113.add($.__views.__alloyId114);
    $.__views.startTime = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: 0,
        left: "90dp",
        touchEnabled: "false",
        id: "startTime"
    });
    $.__views.__alloyId113.add($.__views.startTime);
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
    $.__views.__alloyId113.add($.__views.clearStartTime);
    clearTime ? $.__views.clearStartTime.addEventListener("click", clearTime) : __defers["$.__views.clearStartTime!click!clearTime"] = true;
    $.__views.__alloyId115 = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        backgroundColor: "#fff",
        borderRadius: 10,
        borderColor: "#fff",
        type: "end",
        id: "__alloyId115"
    });
    $.__views.content.add($.__views.__alloyId115);
    timeSet ? $.__views.__alloyId115.addEventListener("click", timeSet) : __defers["$.__views.__alloyId115!click!timeSet"] = true;
    $.__views.__alloyId116 = Ti.UI.createLabel({
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
        id: "__alloyId116"
    });
    $.__views.__alloyId115.add($.__views.__alloyId116);
    $.__views.endTime = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: 0,
        left: "90dp",
        touchEnabled: "false",
        id: "endTime"
    });
    $.__views.__alloyId115.add($.__views.endTime);
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
    $.__views.__alloyId115.add($.__views.clearEndTime);
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
        layout: "horizontal",
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
    $.__views.__alloyId117 = Ti.UI.createButton({
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
        id: "__alloyId117"
    });
    $.__views.groupButton.add($.__views.__alloyId117);
    shift_setting ? $.__views.__alloyId117.addEventListener("click", shift_setting) : __defers["$.__views.__alloyId117!click!shift_setting"] = true;
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
            alert("シフト名を入力してください");
            return;
        }
        if (name.length > 2) {
            alert("2文字を超えましたが、再入力してください。");
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
    __defers["$.__views.__alloyId113!click!timeSet"] && $.__views.__alloyId113.addEventListener("click", timeSet);
    __defers["$.__views.clearStartTime!click!clearTime"] && $.__views.clearStartTime.addEventListener("click", clearTime);
    __defers["$.__views.__alloyId115!click!timeSet"] && $.__views.__alloyId115.addEventListener("click", timeSet);
    __defers["$.__views.clearEndTime!click!clearTime"] && $.__views.clearEndTime.addEventListener("click", clearTime);
    __defers["$.__views.__alloyId117!click!shift_setting"] && $.__views.__alloyId117.addEventListener("click", shift_setting);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;