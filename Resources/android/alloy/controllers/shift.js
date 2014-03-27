function Controller() {
    function createCalendar() {
        allShifts = func.loadShiftsList($.shiftList);
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
        getScheduleMonth(month.format("MM"), month.format("YYYY"));
        _calendar = func.createCalendarBody(month, dateIsEvent, shiftOfMonth, dayOffset, dateIsFriendNoEvent);
        var gdate = _calendar.calendarMonth().format("YYYY-MM-MMM").split("-");
        $.year.setText(gdate[0]);
        $.month.setText(gdate[1]);
        $.monthName.setText(gdate[2].toUpperCase());
        var oldCalendar = $.calendar.children[0];
        $.calendar.add(_calendar.getView());
        oldCalendar && $.calendar.remove(oldCalendar);
        selectedDay || (selectedDay = month.format("D"));
        _calendar.select(selectedDay);
        $.calendar.fireEvent("click");
        lastDayOfMonth = month.add("months", 1).date(1).subtract("days", 1).format("DD");
    }
    function getScheduleMonth(month, year) {
        var scheduleModel = Alloy.Collections.schedule;
        dateIsEvent = {};
        dateIsFriendNoEvent = {};
        scheduleModel.fetch({
            query: 'SELECT * from schedule where date BETWEEN  "' + year + "-" + month + '-01" and "' + year + "-" + month + '-31"'
        });
        var data = scheduleModel.models, n = data.length;
        for (var i = 0; n > i; ++i) {
            var date = data[i].get("date").split("-");
            dateIsEvent[date[2]] = data[i].get("id");
            checkIsEvent(data[i].get("id")) || (dateIsFriendNoEvent[date[2]] = "1");
        }
    }
    function checkIsEvent(id) {
        var calendar_shift = Alloy.Collections.schedule_detail;
        calendar_shift.fetch({
            query: "select id from schedule_detail  where schedule_id = " + id
        });
        return calendar_shift.models[0] ? 1 : 0;
    }
    function clickCalendar() {
        selectedDate = _calendar.selectedDate();
        selectedDay = selectedDate.format("D");
        $.shiftDateInfo.setText(selectedDate.format("MM / DD"));
        $.dayName.setText(func.convertDayName(selectedDate.format("dddd")));
        $.shiftLabel.removeAllChildren();
        var date = selectedDate.format("D");
        shiftOfMonth[date] && $.shiftLabel.add(Ti.UI.createLabel({
            text: shiftOfMonth[date]["text"],
            left: "115dp",
            backgroundColor: shiftOfMonth[date]["color"],
            color: "#fff",
            width: "50dp",
            font: {
                fontSize: "12sp"
            },
            textAlign: "center",
            border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            borderRadius: 10,
            height: Ti.UI.SIZE
        }));
        func.globalSelectedDate(selectedDate, "schedule");
    }
    function doPrevMonth() {
        month = month.subtract("months", 1);
        loadCalendarBody();
    }
    function doNextMonth() {
        month = month.add("months", 1);
        loadCalendarBody();
    }
    function updateShift(date, shift_source) {
        var _get_shift_selected = {
            text: shift_source.text,
            color: shift_source.backgroundColor
        };
        shiftOfMonth[date] = _get_shift_selected;
        _get_shift_selected["id"] = shift_source.id;
        _calendar.setShift(date, _get_shift_selected);
        dateShiftDB[date] = shift_source.id;
        if (13 == shift_source.id) {
            delete shiftOfMonth[date];
            delete dateShiftDB[date];
        }
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
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        backgroundColor: "#f5f1e9",
        id: "main",
        layout: "vertical"
    });
    $.__views.shift.add($.__views.main);
    $.__views.calendarTitle = Ti.UI.createView({
        height: "32dp",
        width: Ti.UI.FILL,
        top: 0,
        left: "10dp",
        right: "10dp",
        id: "calendarTitle"
    });
    $.__views.main.add($.__views.calendarTitle);
    $.__views.prevMonth = Ti.UI.createImageView({
        zIndex: 9999,
        width: "25dp",
        height: "25dp",
        top: "5dp",
        image: "/icons/prev.png",
        id: "prevMonth",
        left: "0"
    });
    $.__views.calendarTitle.add($.__views.prevMonth);
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
            fontSize: "24dp"
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
        zIndex: 9999,
        width: "25dp",
        height: "25dp",
        top: "5dp",
        image: "/icons/next.png",
        id: "nextMonth",
        right: "0"
    });
    $.__views.calendarTitle.add($.__views.nextMonth);
    $.__views.days = Ti.UI.createView({
        top: "5dp",
        height: "15dp",
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
    $.__views.scheduleInfo = Ti.UI.createScrollView({
        top: 20,
        bottom: 20,
        height: Ti.UI.FILL,
        layout: "vertical",
        id: "scheduleInfo"
    });
    $.__views.main.add($.__views.scheduleInfo);
    $.__views.scheduleTitle = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "30dp",
        backgroundColor: "#fff",
        id: "scheduleTitle"
    });
    $.__views.scheduleInfo.add($.__views.scheduleTitle);
    $.__views.shiftDateInfo = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#8d8d8d",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "18sp"
        },
        left: "20dp",
        id: "shiftDateInfo"
    });
    $.__views.scheduleTitle.add($.__views.shiftDateInfo);
    $.__views.dayName = Ti.UI.createLabel({
        width: "20dp",
        height: "20dp",
        color: "#fff",
        textAlign: "center",
        font: {
            fontSize: "12dp"
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
    $.__views.__alloyId66 = Ti.UI.createView({
        backgroundColor: "#fff",
        height: Ti.UI.FILL,
        layout: "vertical",
        top: "2dp",
        id: "__alloyId66"
    });
    $.__views.scheduleInfo.add($.__views.__alloyId66);
    $.__views.shiftList = Ti.UI.createView({
        backgroundColor: "#fff",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "shiftList"
    });
    $.__views.__alloyId66.add($.__views.shiftList);
    $.__views.__alloyId67 = Ti.UI.createView({
        backgroundColor: "#fff",
        height: Ti.UI.SIZE,
        id: "__alloyId67"
    });
    $.__views.__alloyId66.add($.__views.__alloyId67);
    $.__views.shiftSetting = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "120dp",
        font: {
            fontSize: "14dp"
        },
        height: "25dp",
        backgroundColor: "#f3acbd",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        right: "20dp",
        top: "20dp",
        title: "シフト設定",
        id: "shiftSetting"
    });
    $.__views.__alloyId67.add($.__views.shiftSetting);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var selectedDate, selectedDay, _calendar, dateIsEvent, dateIsFriendNoEvent, dayOffset, shiftMonthId, lastDayOfMonth = 0, shiftOfMonth = [], moment = require("alloy/moment"), month = moment(), dateShiftDB = {}, allShifts = {}, args = arguments[0] || {};
    var globalSelectedDate = func.globalSelectedDate();
    if (args["date"]) {
        args["date"].split("-");
        month = moment(args["date"]);
        $.scheduleInfo.setVisible(false);
        $.prevMonth.setVisible(false);
        $.nextMonth.setVisible(false);
        $.scheduleInfo.removeAllChildren();
    } else globalSelectedDate && (month = moment(globalSelectedDate.format("YYYY-MM-DD")));
    createCalendar();
    $.shiftList.addEventListener("click", function(e) {
        if ("shiftList" != e.source.id) {
            updateShift(selectedDay, e.source);
            selectedDay = parseInt(selectedDay, 10) + 1;
            if (selectedDay > lastDayOfMonth) {
                doNextMonth();
                selectedDay = selectedDay = 1;
            }
            _calendar.select(selectedDay);
            $.calendar.fireEvent("click");
        }
    });
    $.shift.addEventListener("android:back", function() {
        Ti.API.activeTab = 2;
        openView("schedule");
    });
    $.calendar.addEventListener("swipe", function(e) {
        "left" == e.direction ? doNextMonth() : "right" == e.direction && doPrevMonth();
    });
    $.shiftSetting.addEventListener("click", function() {
        openView("shift_setting", {
            tab: 1
        });
    });
    $.prevMonth.addEventListener("click", function() {
        doPrevMonth();
    });
    $.nextMonth.addEventListener("click", function() {
        doNextMonth();
    });
    __defers["$.__views.calendar!click!clickCalendar"] && $.__views.calendar.addEventListener("click", clickCalendar);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;