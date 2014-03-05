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
                    var to = new Date(result.getFullYear(), result.getMonth() + 1, result.getDate());
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
        for (var i = 0; n > i; ++i) allShifts[data[i].get("id")] = data[i].get("alias") + (null == data[i].get("time") ? "" : ":" + data[i].get("time"));
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
    $.__views.__alloyId77 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "テキストで共有",
        id: "__alloyId77"
    });
    $.__views.title.add($.__views.__alloyId77);
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
    $.__views.__alloyId78 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "0",
        text: "期間を選ぶ",
        id: "__alloyId78"
    });
    $.__views.content.add($.__views.__alloyId78);
    $.__views.__alloyId79 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        top: "20dp",
        bottom: "20dp",
        id: "__alloyId79"
    });
    $.__views.content.add($.__views.__alloyId79);
    showPicker ? $.__views.__alloyId79.addEventListener("click", showPicker) : __defers["$.__views.__alloyId79!click!showPicker"] = true;
    $.__views.dayStart = Ti.UI.createLabel({
        width: "40%",
        height: "35dp",
        color: "#676767",
        textAlign: "center",
        font: {
            fontSize: "14dp"
        },
        left: "0",
        borderColor: "#ccc",
        borderWidth: 1,
        id: "dayStart"
    });
    $.__views.__alloyId79.add($.__views.dayStart);
    $.__views.to = Ti.UI.createLabel({
        width: "10%",
        height: "35dp",
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        id: "to",
        text: "～"
    });
    $.__views.__alloyId79.add($.__views.to);
    $.__views.dayEnd = Ti.UI.createLabel({
        width: "40%",
        height: "35dp",
        color: "#676767",
        textAlign: "center",
        font: {
            fontSize: "16sp"
        },
        right: "0",
        borderColor: "#ccc",
        borderWidth: 1,
        id: "dayEnd"
    });
    $.__views.__alloyId79.add($.__views.dayEnd);
    $.__views.__alloyId80 = Ti.UI.createButton({
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
        id: "__alloyId80"
    });
    $.__views.content.add($.__views.__alloyId80);
    share ? $.__views.__alloyId80.addEventListener("click", share) : __defers["$.__views.__alloyId80!click!share"] = true;
    $.__views.__alloyId81 = Ti.UI.createButton({
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
        id: "__alloyId81"
    });
    $.__views.content.add($.__views.__alloyId81);
    share ? $.__views.__alloyId81.addEventListener("click", share) : __defers["$.__views.__alloyId81!click!share"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var now = new Date(), allShifts = {};
    var lastValue = {
        dayStart: now,
        dayEnd: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate())
    };
    $.dayStart.setText(formatDate(lastValue["dayStart"]));
    $.dayEnd.setText(formatDate(lastValue["dayEnd"]));
    getAllShift();
    $.share_by_text.addEventListener("android:back", function() {
        openView("share");
    });
    __defers["$.__views.__alloyId79!click!showPicker"] && $.__views.__alloyId79.addEventListener("click", showPicker);
    __defers["$.__views.__alloyId80!click!share"] && $.__views.__alloyId80.addEventListener("click", share);
    __defers["$.__views.__alloyId81!click!share"] && $.__views.__alloyId81.addEventListener("click", share);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;