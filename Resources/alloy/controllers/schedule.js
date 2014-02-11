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
        getScheduleByMonthYear(currentMonth.format("MM"), currentMonth.format("YYYY"));
        var current = $.calendar.children[0];
        activeWidget = Alloy.createWidget("jp.co.mountposition.calendar", "widget", {
            period: currentMonth,
            holidays: holidaysDate,
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
        if (gdate != $.scheduleDateInfo.getText()) {
            $.scheduleDateInfo.setText(gdate);
            getListScheduleByDate(wday.format("YYYY-MM-DD"));
        }
    }
    function getScheduleByMonthYear(month, year) {
        holidaysDate = dayId = [];
        holidayItem = {};
        scheduleModel.fetch({
            query: 'SELECT * from schedule where _date BETWEEN  "' + year + "-" + month + '-01" and "' + year + "-" + month + '-31"'
        });
        var n = scheduleModel.models.length;
        var data = scheduleModel.models;
        for (var i = 0; n > i; ++i) {
            var item = data[i].toJSON();
            holidaysDate.push({
                date: item._date
            });
            holidayItem[item._date] = JSON.parse(item._schedule);
            dayId[item._date] = item.id;
        }
    }
    function getListScheduleByDate(date) {
        $.scheduleList.removeAllChildren();
        var data = holidayItem[date];
        var _id = dayId[date];
        if (!data) return;
        var tableView = Ti.UI.createTableView({
            top: 0,
            height: "auto",
            separatorColor: "#fff"
        });
        var item = [];
        for (var i = 0, n = data.length; n > i; ++i) {
            var row = Ti.UI.createTableViewRow({
                title: data[i].title,
                content: data[i].content,
                selectionStyle: "none",
                selectedBackgroundColor: "transparent",
                backgroundColor: "#f0f0f0",
                left: "7dp",
                right: "7dp"
            });
            if (data[i].img) {
                var scheduleTitle = Ti.UI.createLabel({
                    height: Ti.UI.SIZE,
                    top: "10dp",
                    text: data[i].title,
                    bottom: "10dp",
                    color: "#666",
                    font: {
                        fontSize: "18sp"
                    },
                    touchEnabled: false,
                    left: "30dp"
                });
                row.add(Ti.UI.createImageView({
                    height: "20dp",
                    image: data[i].img,
                    left: "5dp",
                    touchEnabled: false
                }));
            } else var scheduleTitle = Ti.UI.createLabel({
                height: Ti.UI.SIZE,
                top: "10dp",
                text: data[i].title,
                bottom: "10dp",
                color: "#666",
                font: {
                    fontSize: "18sp"
                },
                left: "5dp",
                touchEnabled: false
            });
            row.add(Ti.UI.createLabel({
                text: "| 20:00",
                font: {
                    fontSize: "18dp"
                },
                touchEnabled: false,
                color: "#666",
                right: "10dp"
            }));
            row.add(scheduleTitle);
            item.push(row);
        }
        tableView.setData(item);
        tableView.addEventListener("click", function(e) {
            var confirm = Ti.UI.createAlertDialog({
                title: e.source.title,
                buttonNames: [ "削除", "編集", "OK" ],
                message: e.source.content
            });
            var index = e.index;
            var thisRow = this;
            confirm.addEventListener("click", function(e) {
                if (0 == e.index) {
                    var updateData = [];
                    for (var i = 0, n = data.length; n > i; i++) index != i ? updateData.push(data[i]) : thisRow.deleteRow(index);
                    data = updateData;
                    updateRow(updateData, _id, date);
                } else if (1 == e.index) {
                    Ti.API.rowIndex = index;
                    openView("schedule_detail");
                }
            });
            confirm.show();
        });
        $.scheduleList.add(tableView);
    }
    function updateRow(data, _id, _date) {
        scheduleModel.fetch();
        var _schedule = JSON.stringify(data);
        var schedule = Alloy.createModel("schedule", {
            id: _id,
            _schedule: _schedule,
            _date: _date
        });
        scheduleModel.add(schedule);
        data.length > 0 ? schedule.save() : schedule.destroy();
        refreshCalendar();
    }
    function editScheduleView() {
        Ti.API.day = choiceDay.format("YYYY-MM-DD");
        Ti.API.holidayItem = holidayItem[Ti.API.day];
        Ti.API.id = dayId[Ti.API.day];
        openView("schedule_detail", "refreshCalendar");
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
    function _initFriend() {
        frd.checkFriendRequest();
        var currentIntentData = [];
        var currentActivity = Ti.Android.currentActivity;
        frd.addNewFriend(currentActivity.getIntent().getData());
        currentActivity.addEventListener("newintent", function(e) {
            var newintent = e.intent;
            currentIntentData = newintent.getData();
            frd.addNewFriend(currentIntentData);
        });
        gcm.registerC2dm({
            callback: function(e) {
                var data = e.data;
                "friend_request" == data.channel && frd.friendRequestC2dm(data);
            }
        });
    }
    function loadFriendByDay() {
        for (var i = 0; 4 > i; ++i) {
            var left = "0";
            i > 0 && (left = 25 * i);
            var view = Ti.UI.createView({
                backgroundColor: "#f19c98",
                height: "30dp",
                width: "23%",
                left: left + "%"
            });
            2 == i && view.setBackgroundColor("#c3c3c3");
            view.add(Ti.UI.createLabel({
                text: "Aさん",
                color: "#000",
                font: {
                    fontSize: "16dp"
                }
            }));
            $.friend.add(view);
        }
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "schedule";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.schedule = Ti.UI.createWindow({
        backgroundColor: "#fff",
        exitOnClose: "true",
        id: "schedule"
    });
    $.__views.schedule && $.addTopLevelView($.__views.schedule);
    $.__views.__alloyId39 = Ti.UI.createView({
        height: "35dp",
        backgroundColor: "#ff3974",
        top: "0",
        id: "__alloyId39"
    });
    $.__views.schedule.add($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createView({
        top: "5dp",
        bottom: "5dp",
        height: Ti.UI.SIZE,
        left: "10dp",
        right: "10dp",
        id: "__alloyId40"
    });
    $.__views.__alloyId39.add($.__views.__alloyId40);
    $.__views.prevMonth = Ti.UI.createImageView({
        color: "#fff",
        height: "25dp",
        zIndex: "5",
        width: "14dp",
        image: "/icons/prev.png",
        id: "prevMonth",
        left: "0"
    });
    $.__views.__alloyId40.add($.__views.prevMonth);
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
    $.__views.__alloyId40.add($.__views.currentDate);
    $.__views.nextMonth = Ti.UI.createImageView({
        color: "#fff",
        height: "25dp",
        zIndex: "5",
        width: "14dp",
        image: "/icons/next.png",
        id: "nextMonth",
        right: "0"
    });
    $.__views.__alloyId40.add($.__views.nextMonth);
    doNextMonth ? $.__views.nextMonth.addEventListener("click", doNextMonth) : __defers["$.__views.nextMonth!click!doNextMonth"] = true;
    $.__views.__alloyId41 = Ti.UI.createView({
        layout: "vertical",
        top: "35dp",
        bottom: "50dp",
        id: "__alloyId41"
    });
    $.__views.schedule.add($.__views.__alloyId41);
    $.__views.__alloyId42 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId42"
    });
    $.__views.__alloyId41.add($.__views.__alloyId42);
    $.__views.days = Ti.UI.createView({
        layout: "horizontal",
        top: 0,
        height: Ti.UI.SIZE,
        backgroundColor: "#ff3974",
        id: "days",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId42.add($.__views.days);
    $.__views.calendar = Ti.UI.createView({
        id: "calendar",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId42.add($.__views.calendar);
    clickCalendar ? $.__views.calendar.addEventListener("click", clickCalendar) : __defers["$.__views.calendar!click!clickCalendar"] = true;
    $.__views.__alloyId43 = Ti.UI.createView({
        backgroundColor: "#f0f0f0",
        width: Ti.UI.FILL,
        height: "1sp",
        id: "__alloyId43"
    });
    $.__views.__alloyId41.add($.__views.__alloyId43);
    $.__views.scheduleInfo = Ti.UI.createView({
        id: "scheduleInfo",
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    $.__views.__alloyId41.add($.__views.scheduleInfo);
    $.__views.__alloyId44 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "40dp",
        backgroundColor: "#e4f7ff",
        id: "__alloyId44"
    });
    $.__views.scheduleInfo.add($.__views.__alloyId44);
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
    $.__views.__alloyId44.add($.__views.scheduleDateInfo);
    $.__views.__alloyId45 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: "25dp",
        color: "#000",
        zIndex: 1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        left: "145dp",
        backgroundColor: "#ffbf00",
        text: " 日勤 ",
        id: "__alloyId45"
    });
    $.__views.__alloyId44.add($.__views.__alloyId45);
    $.__views.__alloyId46 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        font: {
            fontSize: "18sp"
        },
        zIndex: 2,
        height: Ti.UI.SIZE,
        backgroundColor: "#ff3974",
        backgroundFocusedColor: "#e4f7ff",
        backgroundSelectedColor: "#e4f7ff",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        right: "5dp",
        title: "追加",
        id: "__alloyId46"
    });
    $.__views.__alloyId44.add($.__views.__alloyId46);
    editScheduleView ? $.__views.__alloyId46.addEventListener("click", editScheduleView) : __defers["$.__views.__alloyId46!click!editScheduleView"] = true;
    $.__views.friend = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "10dp",
        left: "7dp",
        id: "friend"
    });
    $.__views.scheduleInfo.add($.__views.friend);
    $.__views.__alloyId47 = Ti.UI.createView({
        backgroundColor: "#ffbf00",
        width: Ti.UI.FILL,
        top: "10dp",
        height: "1sp",
        id: "__alloyId47"
    });
    $.__views.scheduleInfo.add($.__views.__alloyId47);
    $.__views.scheduleList = Ti.UI.createView({
        id: "scheduleList",
        height: Ti.UI.SIZE
    });
    $.__views.scheduleInfo.add($.__views.scheduleList);
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f8f8f8",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu",
        __parentSymbol: $.__views.schedule
    });
    $.__views.tabMenu.setParent($.__views.schedule);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Collections.schedule = Alloy.createCollection("schedule");
    var day, choiceDay, activeWidget, dayId, holidaysDate, holidayItem, dayOffset, moment = require("alloy/moment"), currentMonth = moment(), scheduleModel = Alloy.Collections.schedule;
    Alloy.Collections.configs = Alloy.createCollection("configs");
    var configs = Alloy.Collections.configs;
    configs.fetch({
        query: 'select id,cg_value from configs where cg_name="dayOffset"'
    });
    dayOffset = configs.models[0].get("cg_value");
    _initCalendar();
    refreshCalendar();
    _initFriend();
    $.schedule.addEventListener("android:back", function() {
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
    loadFriendByDay();
    __defers["$.__views.prevMonth!click!doPrevMonth"] && $.__views.prevMonth.addEventListener("click", doPrevMonth);
    __defers["$.__views.nextMonth!click!doNextMonth"] && $.__views.nextMonth.addEventListener("click", doNextMonth);
    __defers["$.__views.calendar!click!clickCalendar"] && $.__views.calendar.addEventListener("click", clickCalendar);
    __defers["$.__views.__alloyId46!click!editScheduleView"] && $.__views.__alloyId46.addEventListener("click", editScheduleView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;