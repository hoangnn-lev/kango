function Controller() {
    function loadColorBox(selected) {
        var color = [ "#e68200", "#f19c98", "#ffe498", "#25b4a5", "#51b11d ", "#b9e0a5", "#d7e682", "#286bcc", "#f3acbd", "#d3e1f5", "#cccccc", "#fff" ];
        var column = 4, record = color.length, row = Math.ceil(record / column), count = 0;
        for (var i = 0; row > i; i++) for (var j = 0; column > j; j++) {
            if (count >= record) return;
            var view = Ti.UI.createButton({
                backgroundColor: color[count],
                height: "40dp",
                width: "70dp",
                left: "5dp",
                top: "5dp",
                borderColor: "#000",
                color: "#676767",
                borderWidth: 1
            });
            if (selected == color[count]) {
                selectedColor = view;
                view.setBorderWidth(3);
                $.shiftName.setBackgroundColor(selected);
            }
            view.addEventListener("click", function(e) {
                selectedColor && selectedColor.setBorderWidth(1);
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
        var get_time = new Date();
        var picker = Titanium.UI.createPicker({
            type: Titanium.UI.PICKER_TYPE_TIME,
            format24: true,
            useSpinner: true,
            selectionIndicator: true
        });
        if ("開始時間" != e1.source.text || "終了時間" != e1.source.text) {
            getTime = e1.source.text.split(":");
            get_time.setHours(getTime[0]);
            get_time.setMinutes(getTime[1]);
        }
        picker.showTimePickerDialog({
            value: get_time,
            format24: true,
            callback: function(e) {
                if (!e.cancel) {
                    var end, start, result = e.value;
                    var hours = pad_2(result.getHours()), min = ":" + pad_2(result.getMinutes());
                    end = result.getHours() + 8 > 23 ? result.getHours() - 16 : result.getHours() + 8;
                    start = result.getHours() - 9 >= 0 ? result.getHours() - 9 : result.getHours() + 15;
                    e1.source.text = hours + min;
                    "start" == e1.source.type ? $.timeEnd.setText(pad_2(end) + min) : $.timeStart.setText(pad_2(start) + min);
                }
            }
        });
    }
    function pad_2(number) {
        return (10 > number ? "0" : "") + number;
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
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: 0,
        layout: "vertical",
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
    $.__views.__alloyId86 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        zIndex: 0,
        text: "シフト設定詳細",
        id: "__alloyId86"
    });
    $.__views.title.add($.__views.__alloyId86);
    $.__views.content = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        left: "10dp",
        right: "10dp",
        layout: "vertical",
        id: "content"
    });
    $.__views.main.add($.__views.content);
    $.__views.__alloyId87 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "10dp",
        bottom: "10dp",
        id: "__alloyId87"
    });
    $.__views.content.add($.__views.__alloyId87);
    $.__views.shiftName = Ti.UI.createLabel({
        width: "80dp",
        height: "35dp",
        color: "#676767",
        textAlign: "center",
        font: {
            fontSize: "15dp"
        },
        zIndex: 0,
        top: 0,
        backgroundColor: "#f19c98",
        borderColor: "#f0f0f0",
        borderWidth: 1,
        left: 0,
        id: "shiftName"
    });
    $.__views.__alloyId87.add($.__views.shiftName);
    $.__views.shiftAlias = Ti.UI.createTextField({
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10",
        width: "100dp",
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 0,
        borderColor: "#fff",
        zIndex: 0,
        top: 0,
        font: {
            fontSize: "16dp"
        },
        height: "35dp",
        left: "120dp",
        hintText: "日勤",
        id: "shiftAlias"
    });
    $.__views.__alloyId87.add($.__views.shiftAlias);
    $.__views.__alloyId88 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#000",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "13dp"
        },
        zIndex: 0,
        top: "10dp",
        left: "230dp",
        text: "2文字以内",
        id: "__alloyId88"
    });
    $.__views.__alloyId87.add($.__views.__alloyId88);
    $.__views.__alloyId89 = Ti.UI.createView({
        height: "35dp",
        width: Ti.UI.FILL,
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10dp",
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#fff",
        id: "__alloyId89"
    });
    $.__views.content.add($.__views.__alloyId89);
    $.__views.timeStart = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16dp"
        },
        zIndex: 0,
        left: "10dp",
        type: "start",
        id: "timeStart"
    });
    $.__views.__alloyId89.add($.__views.timeStart);
    timeSet ? $.__views.timeStart.addEventListener("click", timeSet) : __defers["$.__views.timeStart!click!timeSet"] = true;
    $.__views.__alloyId90 = Ti.UI.createView({
        height: "35dp",
        width: Ti.UI.FILL,
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        bottom: "10dp",
        backgroundColor: "#f8ecee",
        backgroundFocusedColor: "#f0f0f0",
        borderRadius: 10,
        borderColor: "#fff",
        id: "__alloyId90"
    });
    $.__views.content.add($.__views.__alloyId90);
    $.__views.timeEnd = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16dp"
        },
        zIndex: 0,
        left: "10dp",
        type: "end",
        id: "timeEnd"
    });
    $.__views.__alloyId90.add($.__views.timeEnd);
    timeSet ? $.__views.timeEnd.addEventListener("click", timeSet) : __defers["$.__views.timeEnd!click!timeSet"] = true;
    $.__views.__alloyId91 = Ti.UI.createLabel({
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
        id: "__alloyId91"
    });
    $.__views.content.add($.__views.__alloyId91);
    $.__views.groupShiftColor = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "horizontal",
        id: "groupShiftColor"
    });
    $.__views.content.add($.__views.groupShiftColor);
    $.__views.groupButton = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "20dp",
        id: "groupButton"
    });
    $.__views.content.add($.__views.groupButton);
    $.__views.__alloyId92 = Ti.UI.createButton({
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
        left: "0",
        title: "キャンセル",
        id: "__alloyId92"
    });
    $.__views.groupButton.add($.__views.__alloyId92);
    shift_setting ? $.__views.__alloyId92.addEventListener("click", shift_setting) : __defers["$.__views.__alloyId92!click!shift_setting"] = true;
    $.__views.saveShift = Ti.UI.createButton({
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
        id: "saveShift",
        right: "0",
        title: "保存する"
    });
    $.__views.groupButton.add($.__views.saveShift);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var shift, status, alias, label, args = arguments[0] || {}, selectedColor = "", shiftsCols = Alloy.Collections.shifts;
    shiftsCols.fetch({
        query: "SELECT * from shifts where id=" + args["id"]
    });
    shift = shiftsCols.models[0], status = shift.get("status"), alias = shift.get("alias"), 
    label = shift.get("label");
    $.shiftName.setText(alias);
    $.shiftAlias.setValue(alias);
    if (shift.get("time")) {
        var time = shift.get("time").split("-");
        $.timeStart.setText(time[0]);
        $.timeEnd.setText(time[1]);
    } else {
        $.timeStart.setText("開始時間");
        $.timeEnd.setText("終了時間");
    }
    loadColorBox(shift.get("color"));
    $.saveShift.addEventListener("click", function() {
        var color, time, alias = $.shiftAlias.getValue(), timeStart = $.timeStart.getText(), timeEnd = $.timeEnd.getText();
        if (!alias) {
            alert("シフト名を入力してください");
            return;
        }
        if (alias.length > 2) {
            alert("2文字を超えましたが、再入力してください。");
            return;
        }
        time = ("開始時間" != timeStart ? timeStart : "") + "-" + ("終了時間" != timeEnd ? timeEnd : "");
        time = "-" != time ? time : "";
        color = selectedColor.getBackgroundColor();
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
    __defers["$.__views.timeStart!click!timeSet"] && $.__views.timeStart.addEventListener("click", timeSet);
    __defers["$.__views.timeEnd!click!timeSet"] && $.__views.timeEnd.addEventListener("click", timeSet);
    __defers["$.__views.__alloyId92!click!shift_setting"] && $.__views.__alloyId92.addEventListener("click", shift_setting);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;