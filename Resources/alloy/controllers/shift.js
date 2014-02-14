function Controller() {
    function createCalendar() {
        var configs = Alloy.Collections.configs;
        configs.fetch({
            query: 'select id,cg_value from configs where cg_name="dayOffset"'
        });
        dayOffset = configs.models[0].get("cg_value");
        func.createCalendarDay(dayOffset, $.days);
        loadCalendarBody();
    }
    function loadCalendarBody() {
        shiftOfMonth = [];
        shiftOfMonth["18"] = {
            color: "#25b4a5",
            text: "夜勤",
            id: 2
        };
        shiftOfMonth["19"] = {
            color: "#25b4a5",
            text: "夜勤",
            id: 1
        };
        shiftOfMonth["12"] = {
            color: "#e68200",
            text: "日勤",
            id: 3
        };
        _calendar = func.createCalendarBody(month, dateIsEvent, shiftOfMonth, dayOffset);
        var gdate = _calendar.calendarMonth().format("YYYY-MM-MMM").split("-");
        $.year.setText(gdate[0]);
        $.month.setText(gdate[1]);
        $.monthName.setText(gdate[2].toUpperCase());
        var oldCalendar = $.calendar.children[0];
        $.calendar.add(_calendar.getView());
        oldCalendar && $.calendar.remove(oldCalendar);
        if (!selectedShift[1]) {
            _calendar.select(month.format("DD"));
            $.calendar.fireEvent("click");
        }
    }
    function clickCalendar() {
        selectedDate = _calendar.selectedDate();
        updateShift(selectedDate.format("D"));
        $.shiftDateInfo.setText(selectedDate.format("MM / DD"));
        $.dayName.setText(func.convertDayName(selectedDate.format("dddd")));
        $.shiftLabel.removeAllChildren();
        var date = selectedDate.format("D");
        shiftOfMonth[date] && $.shiftLabel.add(Ti.UI.createLabel({
            text: shiftOfMonth[date]["text"],
            left: "120dp",
            backgroundColor: shiftOfMonth[date]["color"],
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
    function doPrevMonth() {
        month = month.subtract("months", 1);
        loadCalendarBody();
    }
    function doNextMonth() {
        month = month.add("months", 1);
        loadCalendarBody();
    }
    function loadShiftList() {
        var shift_data = [ {
            id: "1",
            name: "日勤",
            color: "#f19c98"
        }, {
            id: "2",
            name: "夜勤",
            color: "#ffe498"
        }, {
            id: "3",
            name: "休み",
            color: "#b9e0a5"
        }, {
            id: "4",
            name: "早番",
            color: "#25b4a5"
        }, {
            id: "5",
            name: "遅番",
            color: "#e68200"
        }, {
            id: "6",
            name: "準夜勤",
            color: "#fff"
        }, {
            id: "7",
            name: "深夜",
            color: "#d3e1f5"
        }, {
            id: "8",
            name: "日長",
            color: "#cccccc"
        }, {
            id: "9",
            name: "入り",
            color: "#fff"
        } ];
        var index = 0;
        for (var i = 0; 3 > i; ++i) for (var j = 0; 4 > j; ++j) {
            if (index >= shift_data.length) {
                var button = Ti.UI.createButton({
                    textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                    width: Ti.UI.FILL,
                    font: {
                        fontSize: "14dp"
                    },
                    height: Ti.UI.SIZE,
                    title: "シフト名を変える",
                    backgroundColor: "#f3acbd",
                    backgroundFocusedColor: "#ef8fa6",
                    backgroundSelectedColor: "#ef8fa6",
                    color: "#fff",
                    border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
                    borderRadius: 10,
                    width: "46%",
                    left: "5dp",
                    height: "30dp"
                });
                button.addEventListener("click", function() {
                    shiftSetting();
                });
                $.shiftList.add(Ti.UI.createLabel({
                    height: "30dp",
                    width: "23%",
                    top: "5dp",
                    bottom: "5dp",
                    left: "5dp"
                }));
                $.shiftList.add(button);
                return;
            }
            var label = Ti.UI.createLabel({
                text: " " + shift_data[index].name + " ",
                id: shift_data[index].id,
                color: "#676767",
                font: {
                    fontSize: "14dp"
                },
                backgroundColor: shift_data[index].color,
                height: "30dp",
                width: "23%",
                top: "5dp",
                bottom: "5dp",
                left: "5dp",
                border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#f0f0f0",
                textAlign: "center",
                className: "shift-item"
            });
            index++;
            label.addEventListener("click", function(e) {
                selectedShift[0] && selectedShift[0].setBorderColor("#f0f0f0");
                this.setBorderColor("#676767");
                selectedShift[0] = this;
                selectedShift[1] = e.source;
            });
            $.shiftList.add(label);
        }
    }
    function updateShift(date) {
        if (selectedShift[1]) {
            var _get_shift_selected = {
                text: selectedShift[1].text,
                color: selectedShift[1].backgroundColor
            };
            shiftOfMonth[date] = _get_shift_selected;
            _get_shift_selected["id"] = selectedShift[1].id;
            _calendar.setShift(date, _get_shift_selected);
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
    $.__views.shiftList = Ti.UI.createView({
        top: "2dp",
        backgroundColor: "#fff",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "shiftList"
    });
    $.__views.scheduleInfo.add($.__views.shiftList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Collections.schedule = Alloy.createCollection("schedule");
    Alloy.Collections.configs = Alloy.createCollection("configs");
    var selectedDate, _calendar, dateIsEvent, dayOffset, shiftOfMonth = [], moment = require("alloy/moment"), month = moment(), selectedShift = [];
    createCalendar();
    loadShiftList();
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