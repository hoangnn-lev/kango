function Controller() {
    function showPicker() {
        var picker = Titanium.UI.createPicker({
            type: Titanium.UI.PICKER_TYPE_DATE
        });
        picker.showDatePickerDialog({
            value: lastValue["dayStart"],
            callback: function(e) {
                if (!e.cancel) {
                    var result = lastValue["dayStart"] = e.value;
                    var to = new Date(result.getFullYear(), result.getMonth(), result.getDate() + 30);
                    lastValue["dayEnd"] = to;
                    $.dayStart.setText(formatDate(e.value));
                    $.dayEnd.setText(formatDate(to));
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
        var calendar_shift = Alloy.Collections.calendar_shift;
        var day = lastValue["dayStart"].getDate();
        var text = "";
        calendar_shift.fetch({
            query: 'select * from calendar_shift  where month_year="' + formatDate2(lastValue["dayStart"]) + '" or month_year="' + formatDate2(lastValue["dayEnd"]) + '"'
        });
        if (calendar_shift.models[0]) {
            var result = calendar_shift.models;
            for (var i = 0, n = result.length; n > i; ++i) {
                var date_shift = JSON.parse(result[i].get("date_shift"));
                for (var _date in date_shift) if (0 == i && _date >= day || 1 == i && day >= _date) {
                    var month = result[i].get("month_year").split("-");
                    month = 10 != month[0] ? month[0].replace("0", "") : 10;
                    text += month + "/" + _date + ":" + allShifts[date_shift[_date]] + "\n";
                }
            }
            if ("line" == e.source.type) Ti.Platform.openURL("line://msg/text/" + text) ? "" : alert("Lineがインストールされていませんでした。。。"); else {
                var emailDialog = Titanium.UI.createEmailDialog();
                emailDialog.setSubject("シフト共有");
                emailDialog.setMessageBody(text);
                emailDialog.open();
            }
        } else alert("シフトデータがありません。");
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
    $.__views.__alloyId75 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "テキストで共有",
        id: "__alloyId75"
    });
    $.__views.title.add($.__views.__alloyId75);
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
    $.__views.__alloyId76 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "0",
        text: "共有する期間を選ぶ",
        id: "__alloyId76"
    });
    $.__views.content.add($.__views.__alloyId76);
    $.__views.__alloyId77 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "20dp",
        bottom: "20dp",
        layout: "vertical",
        id: "__alloyId77"
    });
    $.__views.content.add($.__views.__alloyId77);
    showPicker ? $.__views.__alloyId77.addEventListener("click", showPicker) : __defers["$.__views.__alloyId77!click!showPicker"] = true;
    $.__views.__alloyId78 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        id: "__alloyId78"
    });
    $.__views.__alloyId77.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#888",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "20dp",
        text: "開始日",
        id: "__alloyId79"
    });
    $.__views.__alloyId78.add($.__views.__alloyId79);
    $.__views.dayStart = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "90dp",
        id: "dayStart"
    });
    $.__views.__alloyId78.add($.__views.dayStart);
    $.__views.__alloyId80 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "10dp",
        id: "__alloyId80"
    });
    $.__views.__alloyId77.add($.__views.__alloyId80);
    $.__views.__alloyId81 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#888",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "20dp",
        text: "終了日",
        id: "__alloyId81"
    });
    $.__views.__alloyId80.add($.__views.__alloyId81);
    $.__views.dayEnd = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "90dp",
        id: "dayEnd"
    });
    $.__views.__alloyId80.add($.__views.dayEnd);
    $.__views.groupButton = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "groupButton"
    });
    $.__views.content.add($.__views.groupButton);
    $.__views.__alloyId82 = Ti.UI.createButton({
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
        title: "メールで送る",
        id: "__alloyId82"
    });
    $.__views.groupButton.add($.__views.__alloyId82);
    share ? $.__views.__alloyId82.addEventListener("click", share) : __defers["$.__views.__alloyId82!click!share"] = true;
    $.__views.__alloyId83 = Ti.UI.createButton({
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
        title: "LINEで送る",
        id: "__alloyId83"
    });
    $.__views.groupButton.add($.__views.__alloyId83);
    share ? $.__views.__alloyId83.addEventListener("click", share) : __defers["$.__views.__alloyId83!click!share"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var now = new Date(), allShifts = {};
    var lastValue = {
        dayStart: now,
        dayEnd: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30)
    };
    $.dayStart.setText(formatDate(lastValue["dayStart"]));
    $.dayEnd.setText(formatDate(lastValue["dayEnd"]));
    getAllShift();
    $.share_by_text.addEventListener("android:back", function() {
        openView("share");
    });
    __defers["$.__views.__alloyId77!click!showPicker"] && $.__views.__alloyId77.addEventListener("click", showPicker);
    __defers["$.__views.__alloyId82!click!share"] && $.__views.__alloyId82.addEventListener("click", share);
    __defers["$.__views.__alloyId83!click!share"] && $.__views.__alloyId83.addEventListener("click", share);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;