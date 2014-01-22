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
            left: 20,
            right: 20,
            height: "auto"
        });
        var item = [];
        for (var i = 0, n = data.length; n > i; ++i) {
            var row = Ti.UI.createTableViewRow({
                title: data[i].title,
                content: data[i].content
            });
            if (data[i].img) {
                var scheduleTitle = Ti.UI.createLabel({
                    height: Ti.UI.SIZE,
                    top: "10dp",
                    text: data[i].title,
                    bottom: "10dp",
                    color: "#666",
                    font: {
                        fontSize: "20sp"
                    },
                    left: "40dp"
                });
                row.add(Ti.UI.createImageView({
                    height: "32dp",
                    image: data[i].img,
                    left: 0
                }));
            } else var scheduleTitle = Ti.UI.createLabel({
                height: Ti.UI.SIZE,
                top: "10dp",
                text: data[i].title,
                bottom: "10dp",
                color: "#666",
                font: {
                    fontSize: "20sp"
                },
                left: "0"
            });
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
                    editScheduleView();
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
        var nextWin = Alloy.createController("schedule_edit").getView();
        nextWin.callback = function() {
            refreshCalendar();
        };
        activityScreen.nextWindow(nextWin);
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
            width: TILE_WIDTH
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
    $.__views.__alloyId15 = Ti.UI.createView({
        height: "35dp",
        backgroundColor: "#ff3974",
        top: "0",
        id: "__alloyId15"
    });
    $.__views.schedule.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createView({
        top: "5dp",
        bottom: "",
        height: Ti.UI.SIZE,
        left: "10dp",
        right: "10dp",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.prevMonth = Ti.UI.createImageView({
        color: "#fff",
        height: "25dp",
        zIndex: "5",
        width: "25dp",
        image: "/icons/pre.png",
        id: "prevMonth",
        left: "0"
    });
    $.__views.__alloyId16.add($.__views.prevMonth);
    doPrevMonth ? $.__views.prevMonth.addEventListener("click", doPrevMonth) : __defers["$.__views.prevMonth!click!doPrevMonth"] = true;
    $.__views.currentDate = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#fff",
        zIndex: 1,
        textAlign: "center",
        font: {
            fontSize: "20sp"
        },
        text: "",
        id: "currentDate"
    });
    $.__views.__alloyId16.add($.__views.currentDate);
    $.__views.nextMonth = Ti.UI.createImageView({
        color: "#fff",
        height: "25dp",
        zIndex: "5",
        width: "25dp",
        image: "/icons/next.png",
        id: "nextMonth",
        right: "0"
    });
    $.__views.__alloyId16.add($.__views.nextMonth);
    doNextMonth ? $.__views.nextMonth.addEventListener("click", doNextMonth) : __defers["$.__views.nextMonth!click!doNextMonth"] = true;
    $.__views.__alloyId17 = Ti.UI.createScrollView({
        top: "35dp",
        bottom: "50dp",
        layout: "vertical",
        id: "__alloyId17"
    });
    $.__views.schedule.add($.__views.__alloyId17);
    $.__views.__alloyId18 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: Ti.UI.FILL,
        layout: "vertical",
        id: "__alloyId18"
    });
    $.__views.__alloyId17.add($.__views.__alloyId18);
    $.__views.days = Ti.UI.createView({
        layout: "horizontal",
        top: 0,
        height: Ti.UI.SIZE,
        backgroundColor: "#ff3974",
        id: "days",
        width: Ti.UI.FILL
    });
    $.__views.__alloyId18.add($.__views.days);
    $.__views.calendar = Ti.UI.createView({
        id: "calendar",
        height: Ti.UI.SIZE
    });
    $.__views.__alloyId18.add($.__views.calendar);
    clickCalendar ? $.__views.calendar.addEventListener("click", clickCalendar) : __defers["$.__views.calendar!click!clickCalendar"] = true;
    $.__views.__alloyId19 = Ti.UI.createView({
        backgroundColor: "#ff3974",
        width: Ti.UI.FILL,
        height: "2",
        id: "__alloyId19"
    });
    $.__views.__alloyId17.add($.__views.__alloyId19);
    $.__views.scheduleInfo = Ti.UI.createView({
        id: "scheduleInfo",
        height: Ti.UI.SIZE,
        layout: "vertical"
    });
    $.__views.__alloyId17.add($.__views.scheduleInfo);
    $.__views.__alloyId20 = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: "40dp",
        backgroundColor: "#e4f7ff",
        id: "__alloyId20"
    });
    $.__views.scheduleInfo.add($.__views.__alloyId20);
    $.__views.scheduleDateInfo = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#333",
        zIndex: 1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "20sp"
        },
        text: "",
        left: "5dp",
        id: "scheduleDateInfo"
    });
    $.__views.__alloyId20.add($.__views.scheduleDateInfo);
    $.__views.__alloyId21 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        font: {
            fontSize: "20sp"
        },
        zIndex: 2,
        height: Ti.UI.SIZE,
        backgroundColor: "#ff3974",
        backgroundFocusedColor: "#e4f7ff",
        backgroundSelectedColor: "#e4f7ff",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        title: "追加",
        right: "5dp",
        id: "__alloyId21"
    });
    $.__views.__alloyId20.add($.__views.__alloyId21);
    editScheduleView ? $.__views.__alloyId21.addEventListener("click", editScheduleView) : __defers["$.__views.__alloyId21!click!editScheduleView"] = true;
    $.__views.scheduleList = Ti.UI.createView({
        id: "scheduleList",
        height: Ti.UI.SIZE
    });
    $.__views.scheduleInfo.add($.__views.scheduleList);
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#ededed",
        width: Ti.UI.FILL,
        heigth: Ti.UI.SIZE,
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
    $.tabMenu.getView("schedule").setImage(Ti.API.TABMENU["schedule_active"]);
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
    __defers["$.__views.prevMonth!click!doPrevMonth"] && $.__views.prevMonth.addEventListener("click", doPrevMonth);
    __defers["$.__views.nextMonth!click!doNextMonth"] && $.__views.nextMonth.addEventListener("click", doNextMonth);
    __defers["$.__views.calendar!click!clickCalendar"] && $.__views.calendar.addEventListener("click", clickCalendar);
    __defers["$.__views.__alloyId21!click!editScheduleView"] && $.__views.__alloyId21.addEventListener("click", editScheduleView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;