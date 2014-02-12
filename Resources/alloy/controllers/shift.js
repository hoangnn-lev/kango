function Controller() {
    function doPrevMonth() {
        currentMonth = currentMonth.subtract("months", 1);
        refreshCalendar();
    }
    function doNextMonth() {
        currentMonth = currentMonth.add("months", 1);
        refreshCalendar();
    }
    function getCalendar(currentMonth) {
        activeWidget && (activeWidget = null);
        var current = $.calendar.children[0];
        activeWidget = Alloy.createWidget("jp.co.mountposition.calendar", "widget", {
            period: currentMonth,
            dayOffset: dayOffset
        });
        var c = activeWidget.getView();
        $.currentDate.setText(activeWidget.calendarMonth().format("YYYY年MM月"));
        $.calendar.add(c);
        activeWidget.select(day);
        $.calendar.fireEvent("click");
        current && $.calendar.remove(current);
    }
    function clickCalendar() {
        if (!activeWidget) return;
        void 0;
        var wday = activeWidget.selectedDate();
        choiceDay = wday;
        var gdate = wday.format("YYYY年MM月DD日");
        day = wday.format("DD");
        gdate != $.scheduleDateInfo.getText() && $.scheduleDateInfo.setText(gdate);
    }
    function refreshCalendar() {
        $.scheduleDateInfo.setText("Loading...");
        day = choiceDay ? choiceDay.format("DD") : currentMonth.format("DD");
        getCalendar(currentMonth);
    }
    function _initCalendar() {
        var _ref = [ "日", "月", "火", "水", "木", "金", "土" ];
        1 == dayOffset && (_ref = [ "月", "火", "水", "木", "金", "土", "日" ]);
        var TILE_WIDTH = Math.floor(Ti.Platform.displayCaps.platformWidth / 7);
        for (var i = 0, _len = _ref.length; _len > i; i++) $.days.add(Ti.UI.createLabel({
            color: "#fff",
            textAlign: "center",
            font: {
                fontSize: "18sp"
            },
            text: _ref[i],
            width: TILE_WIDTH,
            touchEnabled: false
        }));
    }
    function loadShift() {
        var shift_data = [ {
            name: "日勤",
            color: "#f19c98"
        }, {
            name: "夜勤",
            color: "#fff"
        }, {
            name: "休み",
            color: "#ffe498"
        }, {
            name: "早番",
            color: "#b9e0a5"
        }, {
            name: "遅番",
            color: "#ccc"
        }, {
            name: "準夜勤",
            color: "#f19c98"
        }, {
            name: "深夜",
            color: "#ffe498"
        }, {
            name: "日長",
            color: "#d3e1f5"
        }, {
            name: "入り",
            color: "#b9e0a5"
        } ];
        var column = 4, record = shift_data.length, row = Math.ceil(record / column), count = 0, height = "30", top = 0;
        for (var i = 0; row > i; i++) for (var j = 0; column > j; j++) {
            if (count >= record) return;
            i > 0 && (top = i * height + 10 * i);
            var view = Ti.UI.createView({
                backgroundColor: shift_data[count].color,
                height: height + "dp",
                width: "23%",
                left: 25 * j + "%",
                top: top + "dp",
                borderColor: "#666",
                borderWidth: 1
            });
            view.add(Ti.UI.createLabel({
                text: shift_data[count].name,
                color: "#000",
                font: {
                    fontSize: "16dp"
                }
            }));
            $.shiftList.add(view);
            count++;
        }
    }
    function shiftSetting() {
        openView("shift_setting");
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
        id: "main"
    });
    $.__views.shift.add($.__views.main);
    $.__views.__alloyId75 = Ti.UI.createView({
        height: "35dp",
        backgroundColor: "#ff3974",
        top: "0",
        id: "__alloyId75"
    });
    $.__views.main.add($.__views.__alloyId75);
    $.__views.__alloyId76 = Ti.UI.createView({
        top: "5dp",
        bottom: "5dp",
        height: Ti.UI.SIZE,
        left: "10dp",
        right: "10dp",
        id: "__alloyId76"
    });
    $.__views.__alloyId75.add($.__views.__alloyId76);
    $.__views.prevMonth = Ti.UI.createImageView({
        color: "#fff",
        height: "25dp",
        zIndex: "5",
        width: "14dp",
        image: "/icons/prev.png",
        id: "prevMonth",
        left: "0"
    });
    $.__views.__alloyId76.add($.__views.prevMonth);
    doPrevMonth ? $.__views.prevMonth.addEventListener("click", doPrevMonth) : __defers["$.__views.prevMonth!click!doPrevMonth"] = true;
    $.__views.currentDate = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#fff",
        zIndex: "0",
        textAlign: "center",
        font: {
            fontSize: "16sp"
        },
        touchEnabled: "false",
        id: "currentDate"
    });
    $.__views.__alloyId76.add($.__views.currentDate);
    $.__views.nextMonth = Ti.UI.createImageView({
        color: "#fff",
        height: "25dp",
        zIndex: "5",
        width: "14dp",
        image: "/icons/next.png",
        id: "nextMonth",
        right: "0"
    });
    $.__views.__alloyId76.add($.__views.nextMonth);
    doNextMonth ? $.__views.nextMonth.addEventListener("click", doNextMonth) : __defers["$.__views.nextMonth!click!doNextMonth"] = true;
    $.__views.__alloyId77 = Ti.UI.createView({
        layout: "vertical",
        top: "35dp",
        id: "__alloyId77"
    });
    $.__views.main.add($.__views.__alloyId77);
    $.__views.__alloyId78 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId78"
    });
    $.__views.__alloyId77.add($.__views.__alloyId78);
    $.__views.days = Ti.UI.createView({
        layout: "horizontal",
        top: 0,
        height: Ti.UI.SIZE,
        backgroundColor: "#ff3974",
        id: "days",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId78.add($.__views.days);
    $.__views.calendar = Ti.UI.createView({
        id: "calendar",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId78.add($.__views.calendar);
    clickCalendar ? $.__views.calendar.addEventListener("click", clickCalendar) : __defers["$.__views.calendar!click!clickCalendar"] = true;
    $.__views.__alloyId79 = Ti.UI.createView({
        backgroundColor: "#f0f0f0",
        width: Ti.UI.FILL,
        height: "1sp",
        id: "__alloyId79"
    });
    $.__views.__alloyId77.add($.__views.__alloyId79);
    $.__views.scheduleInfo = Ti.UI.createView({
        id: "scheduleInfo",
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    $.__views.__alloyId77.add($.__views.scheduleInfo);
    $.__views.__alloyId80 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "40dp",
        backgroundColor: "#e4f7ff",
        id: "__alloyId80"
    });
    $.__views.scheduleInfo.add($.__views.__alloyId80);
    $.__views.scheduleDateInfo = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#333",
        zIndex: 1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "18sp"
        },
        left: "5dp",
        id: "scheduleDateInfo"
    });
    $.__views.__alloyId80.add($.__views.scheduleDateInfo);
    $.__views.shiftList = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "10dp",
        id: "shiftList"
    });
    $.__views.__alloyId77.add($.__views.shiftList);
    $.__views.__alloyId81 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        font: {
            fontSize: "15dp"
        },
        zIndex: 2,
        height: "40dp",
        backgroundColor: "#a9c4eb",
        backgroundFocusedColor: "#90b5ea",
        backgroundSelectedColor: "#90b5ea",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        right: "10dp",
        title: "シフト名を変える",
        id: "__alloyId81"
    });
    $.__views.__alloyId77.add($.__views.__alloyId81);
    shiftSetting ? $.__views.__alloyId81.addEventListener("click", shiftSetting) : __defers["$.__views.__alloyId81!click!shiftSetting"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Collections.schedule = Alloy.createCollection("schedule");
    var day, choiceDay, activeWidget, dayOffset, moment = require("alloy/moment"), currentMonth = moment();
    Alloy.Collections.schedule;
    Alloy.Collections.configs = Alloy.createCollection("configs");
    var configs = Alloy.Collections.configs;
    configs.fetch({
        query: 'select id,cg_value from configs where cg_name="dayOffset"'
    });
    dayOffset = configs.models[0].get("cg_value");
    _initCalendar();
    refreshCalendar();
    $.shift.addEventListener("android:back", function() {
        openView("schedule");
    });
    $.calendar.addEventListener("swipe", function(e) {
        "left" == e.direction ? doNextMonth() : "right" == e.direction && doPrevMonth();
    });
    loadShift();
    __defers["$.__views.prevMonth!click!doPrevMonth"] && $.__views.prevMonth.addEventListener("click", doPrevMonth);
    __defers["$.__views.nextMonth!click!doNextMonth"] && $.__views.nextMonth.addEventListener("click", doNextMonth);
    __defers["$.__views.calendar!click!clickCalendar"] && $.__views.calendar.addEventListener("click", clickCalendar);
    __defers["$.__views.__alloyId81!click!shiftSetting"] && $.__views.__alloyId81.addEventListener("click", shiftSetting);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;