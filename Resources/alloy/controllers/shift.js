function Controller() {
    function clickCalendar() {
        if (!activeWidget) return;
        void 0;
        var wday = activeWidget.selectedDate();
        choiceDay = wday;
        var gdate = wday.format("MM / DD");
        day = wday.format("DD");
        if (gdate != $.shiftDateInfo.getText()) {
            $.shiftDateInfo.setText(gdate);
            $.dayName.setText(lib.convertDayName(wday.format("dddd")));
            $.shiftLabel.removeAllChildren();
            shiftOfDate[day] && $.shiftLabel.add(Ti.UI.createLabel({
                text: shiftOfDate[day]["text"],
                left: "120dp",
                backgroundColor: shiftOfDate[day]["color"],
                color: "#fff",
                width: "60dp",
                font: {
                    fontSize: "16sp"
                },
                textAlign: "center",
                border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
                borderRadius: 10,
                height: Ti.UI.SIZE
            }));
        }
    }
    function doPrevMonth() {
        currentMonth = currentMonth.subtract("months", 1);
        calendar();
    }
    function doNextMonth() {
        currentMonth = currentMonth.add("months", 1);
        calendar();
    }
    function calendar() {
        shiftOfDate["18"] = {
            color: "#25b4a5",
            text: "夜勤"
        };
        shiftOfDate["19"] = {
            color: "#25b4a5",
            text: "夜勤"
        };
        shiftOfDate["12"] = {
            color: "#e68200",
            text: "日勤"
        };
        day = choiceDay ? choiceDay.format("DD") : currentMonth.format("DD");
        activeWidget && (activeWidget = null);
        var current = $.calendar.children[0];
        activeWidget = Alloy.createWidget("jp.co.mountposition.calendar", "widget", {
            period: currentMonth,
            holidays: holidaysDate,
            shiftOfDate: shiftOfDate,
            dayOffset: dayOffset
        });
        var c = activeWidget.getView();
        var gdate = activeWidget.calendarMonth().format("YYYY-MM-MMM").split("-");
        $.year.setText(gdate[0]);
        $.month.setText(gdate[1]);
        $.monthName.setText(gdate[2].toUpperCase());
        $.calendar.add(c);
        activeWidget.select(day);
        $.calendar.fireEvent("click");
        current && $.calendar.remove(current);
    }
    function _initCalendar() {
        Alloy.Collections.configs = Alloy.createCollection("configs");
        var configs = Alloy.Collections.configs;
        configs.fetch({
            query: 'select id,cg_value from configs where cg_name="dayOffset"'
        });
        dayOffset = configs.models[0].get("cg_value");
        var _ref = [ "日", "月", "火", "水", "木", "金", "土" ];
        1 == dayOffset && (_ref = [ "月", "火", "水", "木", "金", "土", "日" ]);
        var TILE_WIDTH = Math.floor(Ti.Platform.displayCaps.platformWidth / 7);
        var color;
        for (var i = 0, _len = _ref.length; _len > i; i++) {
            color = "日" == _ref[i] ? "#f08791" : "土" == _ref[i] ? "#9bb9e1" : "#676767";
            $.days.add(Ti.UI.createLabel({
                color: color,
                textAlign: "center",
                font: {
                    fontSize: "16sp"
                },
                text: _ref[i],
                width: TILE_WIDTH,
                touchEnabled: false
            }));
        }
        calendar();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "shift";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.shift = Ti.UI.createWindow({
        backgroundColor: "#fff",
        exitOnClose: "true",
        id: "shift"
    });
    $.__views.shift && $.addTopLevelView($.__views.shift);
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu",
        __parentSymbol: $.__views.shift
    });
    $.__views.tabMenu.setParent($.__views.shift);
    $.__views.main = Ti.UI.createView({
        top: "50dp",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: "#f5f1e9",
        id: "main",
        layout: "vertical"
    });
    $.__views.shift.add($.__views.main);
    $.__views.calendarTitle = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        top: 0,
        left: "10dp",
        right: "10dp",
        id: "calendarTitle"
    });
    $.__views.main.add($.__views.calendarTitle);
    $.__views.prevMonth = Ti.UI.createImageView({
        zIndex: "5",
        width: "30dp",
        height: "30dp",
        image: "/icons/prev.png",
        id: "prevMonth",
        left: "0"
    });
    $.__views.calendarTitle.add($.__views.prevMonth);
    doPrevMonth ? $.__views.prevMonth.addEventListener("click", doPrevMonth) : __defers["$.__views.prevMonth!click!doPrevMonth"] = true;
    $.__views.dateInfo = Ti.UI.createView({
        width: "110dp",
        top: 0,
        height: Ti.UI.FILL,
        touchEnabled: false,
        id: "dateInfo"
    });
    $.__views.calendarTitle.add($.__views.dateInfo);
    $.__views.year = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.FILL,
        color: "#b4a186",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16dp"
        },
        left: 0,
        top: "10dp",
        touchEnabled: false,
        text: "2013",
        id: "year"
    });
    $.__views.dateInfo.add($.__views.year);
    $.__views.month = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.FILL,
        color: "#666666",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "28dp"
        },
        left: "42dp",
        touchEnabled: false,
        text: "12",
        id: "month"
    });
    $.__views.dateInfo.add($.__views.month);
    $.__views.monthName = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.FILL,
        color: "#b4a186",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16dp"
        },
        right: 0,
        top: "10dp",
        text: "DEC",
        id: "monthName"
    });
    $.__views.dateInfo.add($.__views.monthName);
    $.__views.nextMonth = Ti.UI.createImageView({
        zIndex: "5",
        width: "30dp",
        height: "30dp",
        image: "/icons/next.png",
        id: "nextMonth",
        right: "0"
    });
    $.__views.calendarTitle.add($.__views.nextMonth);
    doNextMonth ? $.__views.nextMonth.addEventListener("click", doNextMonth) : __defers["$.__views.nextMonth!click!doNextMonth"] = true;
    $.__views.days = Ti.UI.createView({
        layout: "horizontal",
        top: 0,
        height: "22dp",
        id: "days"
    });
    $.__views.main.add($.__views.days);
    $.__views.calendar = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "5dp",
        id: "calendar"
    });
    $.__views.main.add($.__views.calendar);
    clickCalendar ? $.__views.calendar.addEventListener("click", clickCalendar) : __defers["$.__views.calendar!click!clickCalendar"] = true;
    $.__views.scheduleInfo = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "scheduleInfo"
    });
    $.__views.main.add($.__views.scheduleInfo);
    $.__views.scheduleTitle = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "40dp",
        backgroundColor: "#fff",
        top: "10dp",
        id: "scheduleTitle"
    });
    $.__views.scheduleInfo.add($.__views.scheduleTitle);
    $.__views.shiftDateInfo = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#8d8d8d",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "24sp"
        },
        left: "5dp",
        id: "shiftDateInfo"
    });
    $.__views.scheduleTitle.add($.__views.shiftDateInfo);
    $.__views.dayName = Ti.UI.createLabel({
        width: "25dp",
        height: "25dp",
        color: "#fff",
        textAlign: "center",
        font: {
            fontSize: "14dp"
        },
        backgroundImage: "/icons/bg-circle.png",
        left: "85dp",
        id: "dayName"
    });
    $.__views.scheduleTitle.add($.__views.dayName);
    $.__views.shiftLabel = Ti.UI.createView({
        id: "shiftLabel"
    });
    $.__views.scheduleTitle.add($.__views.shiftLabel);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Collections.schedule = Alloy.createCollection("schedule");
    var day, choiceDay, activeWidget, holidaysDate, shiftOfDate = [], moment = require("alloy/moment"), currentMonth = moment(), dayOffset = (Alloy.Collections.schedule, 
    "");
    _initCalendar();
    $.shift.addEventListener("android:back", function() {
        var confirm = Ti.UI.createAlertDialog({
            title: "看護アプル",
            message: "終了しますか？",
            buttonNames: [ "はい", "いいえ" ]
        });
        confirm.addEventListener("click", function(e) {
            0 == e.index && Titanium.Android.currentActivity.finish();
        });
        confirm.show();
    });
    $.calendar.addEventListener("swipe", function(e) {
        "left" == e.direction ? doNextMonth() : "right" == e.direction && doPrevMonth();
    });
    __defers["$.__views.prevMonth!click!doPrevMonth"] && $.__views.prevMonth.addEventListener("click", doPrevMonth);
    __defers["$.__views.nextMonth!click!doNextMonth"] && $.__views.nextMonth.addEventListener("click", doNextMonth);
    __defers["$.__views.calendar!click!clickCalendar"] && $.__views.calendar.addEventListener("click", clickCalendar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;