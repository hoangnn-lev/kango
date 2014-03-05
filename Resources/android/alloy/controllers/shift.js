function Controller() {
    function createCalendar() {
        allShifts = func.loadShiftsList($.shiftList, selectedShift);
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
        dateShiftDB = {};
        shiftMonthId = null;
        var calendar_shift = Alloy.Collections.calendar_shift;
        calendar_shift.fetch({
            query: 'select * from calendar_shift  where month_year="' + month.format("MM-YYYY") + '"'
        });
        var data = [];
        if (calendar_shift.models[0]) {
            shiftMonthId = calendar_shift.models[0].get("id");
            data = JSON.parse(calendar_shift.models[0].get("date_shift"));
            for (var key in data) {
                dateShiftDB[key] = data[key];
                shiftOfMonth[key] = allShifts[data[key]];
                shiftOfMonth[key]["id"] = data[key];
            }
        }
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
    function updateShift(date) {
        if (selectedShift[1]) {
            var _get_shift_selected = {
                text: selectedShift[1].text,
                color: selectedShift[1].backgroundColor
            };
            shiftOfMonth[date] = _get_shift_selected;
            _get_shift_selected["id"] = selectedShift[1].id;
            _calendar.setShift(date, _get_shift_selected);
            dateShiftDB[date] = selectedShift[1].id;
            9 == selectedShift[1].id && delete dateShiftDB[date];
            Alloy.Collections.calendar_shift.fetch();
            var _shift_data = {
                month_year: month.format("MM-YYYY"),
                date_shift: JSON.stringify(dateShiftDB)
            };
            shiftMonthId && (_shift_data["id"] = shiftMonthId);
            var shift = Alloy.createModel("calendar_shift", _shift_data);
            Alloy.Collections.calendar_shift.add(shift);
            shift.save();
            shiftMonthId || (shiftMonthId = shift.get("id"));
            delete_view("schedule");
        }
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
        layout: "horizontal",
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
        top: 0,
        height: "22dp",
        width: Ti.UI.FILL,
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
    var selectedDate, _calendar, dateIsEvent, dayOffset, shiftMonthId, shiftOfMonth = [], moment = require("alloy/moment"), month = moment(), selectedShift = [], dateShiftDB = {}, allShifts = {}, args = arguments[0] || {};
    if (args["date"]) {
        args["date"].split("-");
        month = moment(args["date"]);
    }
    createCalendar();
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
    __defers["$.__views.prevMonth!click!doPrevMonth"] && $.__views.prevMonth.addEventListener("click", doPrevMonth);
    __defers["$.__views.nextMonth!click!doNextMonth"] && $.__views.nextMonth.addEventListener("click", doNextMonth);
    __defers["$.__views.calendar!click!clickCalendar"] && $.__views.calendar.addEventListener("click", clickCalendar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;