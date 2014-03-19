function Controller() {
    function showPicker(e1) {
        var picker = Titanium.UI.createPicker({
            type: Titanium.UI.PICKER_TYPE_DATE
        });
        picker.showDatePickerDialog({
            value: lastValue[e1.source.id],
            callback: function(e) {
                if (!e.cancel) {
                    var result = lastValue[e1.source.id] = e.value;
                    if ("dayStart" == e1.source.id) {
                        var from = new Date(result.getFullYear(), result.getMonth(), result.getDate());
                        var to = new Date(result.getFullYear(), result.getMonth(), result.getDate() + 30);
                        lastValue["dayStart"] = from;
                        lastValue["dayEnd"] = to;
                        $.dayStart.setText(formatDate(from));
                        $.dayEnd.setText(formatDate(to));
                    } else {
                        lastValue["dayEnd"] = new Date(result.getFullYear(), result.getMonth(), result.getDate());
                        $.dayEnd.setText(formatDate(result));
                    }
                }
            }
        });
    }
    function formatDate(date) {
        var format = date.getFullYear() + "年" + (date.getMonth() + 1) + "月";
        return format + date.getDate() + "日";
    }
    function formatDate2(date) {
        var month = date.getMonth() + 1;
        month = month > 9 ? month : "0" + month;
        return month + "-" + date.getFullYear();
    }
    function getAllShift() {
        var shifts = Alloy.Collections.shifts;
        shifts.fetch({
            query: "SELECT * from shifts"
        });
        var n = shifts.models.length;
        var data = shifts.models;
        for (var i = 0; n > i; ++i) {
            var time = data[i].get("time");
            time = "" != time && null != time ? ":" + time : "";
            allShifts[data[i].get("id")] = data[i].get("name") + time;
        }
    }
    function share(e) {
        if (+lastValue["dayStart"] > +lastValue["dayEnd"]) {
            alert("終了日は開始日以降の日付を指定して下さい。");
            return;
        }
        var currentDate = lastValue["dayStart"];
        var endDate = lastValue["dayEnd"];
        var text = [];
        var results = getShiftByDate();
        while (endDate >= currentDate) {
            var date = currentDate.getMonth() + 1 + "/" + currentDate.getDate() + "(" + func.convertDayName(currentDate.getDay()) + ")";
            var format = currentDate.getFullYear() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate();
            results[format] ? text.push(date + results[format]) : text.push(date + "予定なし");
            currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        }
        text = text.join("\n");
        if ("line" == e.source.type) Ti.Platform.openURL("line://msg/text/" + text) ? "" : alert("LINEがインストールされていません"); else {
            var emailDialog = Titanium.UI.createEmailDialog();
            emailDialog.setSubject("シフト共有");
            emailDialog.setMessageBody(text);
            emailDialog.open();
        }
    }
    function getShiftByDate() {
        var calendar_shift = Alloy.Collections.calendar_shift;
        lastValue["dayStart"].getDate();
        lastValue["dayEnd"].getDate();
        var fDayStart = formatDate2(lastValue["dayStart"]);
        var fDayEnd = formatDate2(lastValue["dayEnd"]);
        var results = {};
        var conditions = func.rangeDate(fDayStart, fDayEnd);
        calendar_shift.fetch({
            query: "select * from calendar_shift  where month_year in(" + conditions + ")"
        });
        if (calendar_shift.models[0]) {
            var result = calendar_shift.models;
            for (var i = 0, n = result.length; n > i; ++i) {
                var date_shift = JSON.parse(result[i].get("date_shift"));
                var mon_year = result[i].get("month_year");
                var month = mon_year.split("-");
                for (var _date in date_shift) {
                    var newDate = new Date(month[1], month[0] - 1, parseInt(_date));
                    if (lastValue["dayStart"] > newDate) continue;
                    if (newDate > lastValue["dayEnd"]) break;
                    results[month[1] + "/" + parseInt(month[0]) + "/" + _date] = allShifts[date_shift[_date]];
                }
            }
        }
        return results;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "share_by_text";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.share_by_text = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "share_by_text"
    });
    $.__views.share_by_text && $.addTopLevelView($.__views.share_by_text);
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: 0,
        layout: "vertical",
        backgroundColor: "#f5f1e9",
        id: "main"
    });
    $.__views.share_by_text.add($.__views.main);
    $.__views.title = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        backgroundColor: "#ed829c",
        id: "title"
    });
    $.__views.main.add($.__views.title);
    $.__views.__alloyId99 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "テキストで共有",
        id: "__alloyId99"
    });
    $.__views.title.add($.__views.__alloyId99);
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
    $.__views.__alloyId100 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "0",
        text: "共有する期間を選ぶ",
        id: "__alloyId100"
    });
    $.__views.content.add($.__views.__alloyId100);
    $.__views.__alloyId101 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "20dp",
        bottom: "20dp",
        layout: "vertical",
        id: "__alloyId101"
    });
    $.__views.content.add($.__views.__alloyId101);
    $.__views.__alloyId102 = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        top: "10dp",
        backgroundColor: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        id: "__alloyId102"
    });
    $.__views.__alloyId101.add($.__views.__alloyId102);
    $.__views.__alloyId103 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#888",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "10dp",
        text: "開始日",
        id: "__alloyId103"
    });
    $.__views.__alloyId102.add($.__views.__alloyId103);
    $.__views.dayStart = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "70dp",
        id: "dayStart"
    });
    $.__views.__alloyId102.add($.__views.dayStart);
    showPicker ? $.__views.dayStart.addEventListener("click", showPicker) : __defers["$.__views.dayStart!click!showPicker"] = true;
    $.__views.__alloyId104 = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        top: "10dp",
        backgroundColor: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        id: "__alloyId104"
    });
    $.__views.__alloyId101.add($.__views.__alloyId104);
    $.__views.__alloyId105 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#888",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "10dp",
        text: "終了日",
        id: "__alloyId105"
    });
    $.__views.__alloyId104.add($.__views.__alloyId105);
    $.__views.dayEnd = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "70dp",
        id: "dayEnd"
    });
    $.__views.__alloyId104.add($.__views.dayEnd);
    showPicker ? $.__views.dayEnd.addEventListener("click", showPicker) : __defers["$.__views.dayEnd!click!showPicker"] = true;
    $.__views.groupButton = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "groupButton"
    });
    $.__views.content.add($.__views.groupButton);
    $.__views.__alloyId106 = Ti.UI.createButton({
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
        id: "__alloyId106"
    });
    $.__views.groupButton.add($.__views.__alloyId106);
    share ? $.__views.__alloyId106.addEventListener("click", share) : __defers["$.__views.__alloyId106!click!share"] = true;
    $.__views.__alloyId107 = Ti.UI.createButton({
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
        id: "__alloyId107"
    });
    $.__views.groupButton.add($.__views.__alloyId107);
    share ? $.__views.__alloyId107.addEventListener("click", share) : __defers["$.__views.__alloyId107!click!share"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var now = new Date(), allShifts = {};
    var lastValue = {
        dayStart: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        dayEnd: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30)
    };
    $.dayStart.setText(formatDate(lastValue["dayStart"]));
    $.dayEnd.setText(formatDate(lastValue["dayEnd"]));
    getAllShift();
    $.share_by_text.addEventListener("android:back", function() {
        openView("share");
    });
    __defers["$.__views.dayStart!click!showPicker"] && $.__views.dayStart.addEventListener("click", showPicker);
    __defers["$.__views.dayEnd!click!showPicker"] && $.__views.dayEnd.addEventListener("click", showPicker);
    __defers["$.__views.__alloyId106!click!share"] && $.__views.__alloyId106.addEventListener("click", share);
    __defers["$.__views.__alloyId107!click!share"] && $.__views.__alloyId107.addEventListener("click", share);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;