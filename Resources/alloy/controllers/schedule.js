function Controller() {
    function clickCalendar() {
        if (!activeWidget) return;
        void 0;
        var wday = activeWidget.selectedDate();
        choiceDay = wday;
        var gdate = wday.format("MM / DD");
        day = wday.format("DD");
        if (gdate != $.scheduleDateInfo.getText()) {
            $.scheduleDateInfo.setText(gdate);
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
            getListScheduleByDate(wday.format("YYYY-MM-DD"));
        }
    }
    function doPrevMonth() {
        currentMonth = currentMonth.subtract("months", 1);
        refreshCalendar();
    }
    function doNextMonth() {
        currentMonth = currentMonth.add("months", 1);
        refreshCalendar();
    }
    function getScheduleByMonthYear(month, year) {
        holidaysDate = id = [];
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
            id[item._date] = item.id;
        }
    }
    function getListScheduleByDate(date) {
        $.scheduleList.removeAllChildren();
        var data = holidayItem[date];
        if (!data) return;
        var tableView = Ti.UI.createTableView({
            top: 0,
            height: "auto",
            separatorColor: "#f5f1e9"
        });
        var item = [];
        for (var i = 0, n = data.length; n > i; ++i) {
            var row = Ti.UI.createTableViewRow({
                data: data[i],
                id: id[date],
                selectionStyle: "none",
                selectedBackgroundColor: "transparent",
                backgroundColor: "#fff",
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
                color: "#676767",
                font: {
                    fontSize: "18sp"
                },
                left: "5dp",
                touchEnabled: false
            });
            row.add(Ti.UI.createLabel({
                text: "20:00",
                font: {
                    fontSize: "18dp"
                },
                touchEnabled: false,
                color: "#676767",
                right: "10dp"
            }));
            row.add(scheduleTitle);
            item.push(row);
        }
        tableView.setData(item);
        tableView.addEventListener("click", function(e) {
            var postdata = e.source.data;
            postdata["day"] = choiceDay.format("YYYY-MM-DD");
            postdata["id"] = e.source.id;
            openView("edit_event", {
                data: postdata
            });
        });
        $.scheduleList.add(tableView);
    }
    function addEvent() {
        openView("edit_event", {
            data: {
                day: choiceDay.format("YYYY-MM-DD")
            }
        });
    }
    function refreshCalendar() {
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
        getScheduleByMonthYear(currentMonth.format("MM"), currentMonth.format("YYYY"));
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
        refreshCalendar();
    }
    function checkFriendRequest() {
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
        var friend_data = [ "大島", "黒運", "上野", "春" ];
        for (var i = 0; 4 > i; ++i) {
            var left = "0";
            i > 0 && (left = 25 * i);
            var label = Ti.UI.createLabel({
                text: " " + friend_data[i] + " ",
                color: "#68790b",
                font: {
                    fontSize: "16dp"
                },
                backgroundColor: "#d7e682",
                height: "30dp",
                width: Ti.UI.SIZE,
                left: "5dp",
                border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
                borderRadius: 10,
                textAlign: "center",
                className: "friend-item"
            });
            $.friend.add(label);
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
    $.__views.tabMenu = Alloy.createController("tab_menu", {
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu",
        __parentSymbol: $.__views.schedule
    });
    $.__views.tabMenu.setParent($.__views.schedule);
    $.__views.main = Ti.UI.createView({
        top: "50dp",
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: "#f5f1e9",
        id: "main",
        layout: "vertical"
    });
    $.__views.schedule.add($.__views.main);
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
    $.__views.scheduleDateInfo = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#8d8d8d",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "24sp"
        },
        left: "5dp",
        id: "scheduleDateInfo"
    });
    $.__views.scheduleTitle.add($.__views.scheduleDateInfo);
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
    $.__views.__alloyId30 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        font: {
            fontSize: "16sp"
        },
        height: Ti.UI.SIZE,
        backgroundColor: "#f3acbd",
        backgroundFocusedColor: "#e4f7ff",
        backgroundSelectedColor: "#e4f7ff",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        right: "5dp",
        title: "＋予定を追加",
        id: "__alloyId30"
    });
    $.__views.scheduleTitle.add($.__views.__alloyId30);
    addEvent ? $.__views.__alloyId30.addEventListener("click", addEvent) : __defers["$.__views.__alloyId30!click!addEvent"] = true;
    $.__views.blockFriend = Ti.UI.createView({
        top: "2dp",
        backgroundColor: "#fff",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "blockFriend"
    });
    $.__views.scheduleInfo.add($.__views.blockFriend);
    $.__views.__alloyId31 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "10dp",
        id: "__alloyId31"
    });
    $.__views.blockFriend.add($.__views.__alloyId31);
    $.__views.__alloyId32 = Ti.UI.createImageView({
        width: "20dp",
        height: "20dp",
        touchEnabled: false,
        image: "/icons/friend.png",
        left: "10dp",
        id: "__alloyId32"
    });
    $.__views.__alloyId31.add($.__views.__alloyId32);
    $.__views.__alloyId33 = Ti.UI.createImageView({
        image: "/icons/btn_Open.png",
        width: "25dp",
        height: "25dp",
        right: "10dp",
        id: "__alloyId33"
    });
    $.__views.__alloyId31.add($.__views.__alloyId33);
    $.__views.serviceMember = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#757575",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp"
        },
        left: "35dp",
        id: "serviceMember",
        text: "勤務メンバー"
    });
    $.__views.__alloyId31.add($.__views.serviceMember);
    $.__views.friend = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "7dp",
        top: "10dp",
        bottom: "10dp",
        layout: "horizontal",
        id: "friend"
    });
    $.__views.blockFriend.add($.__views.friend);
    $.__views.scheduleList = Ti.UI.createView({
        top: "1dp",
        id: "scheduleList",
        height: Ti.UI.SIZE
    });
    $.__views.scheduleInfo.add($.__views.scheduleList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.Collections.schedule = Alloy.createCollection("schedule");
    var day, choiceDay, activeWidget, id, holidaysDate, holidayItem, shiftOfDate = [], moment = require("alloy/moment"), currentMonth = moment(), scheduleModel = Alloy.Collections.schedule, dayOffset = "";
    _initCalendar();
    checkFriendRequest();
    loadFriendByDay();
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
    __defers["$.__views.prevMonth!click!doPrevMonth"] && $.__views.prevMonth.addEventListener("click", doPrevMonth);
    __defers["$.__views.nextMonth!click!doNextMonth"] && $.__views.nextMonth.addEventListener("click", doNextMonth);
    __defers["$.__views.calendar!click!clickCalendar"] && $.__views.calendar.addEventListener("click", clickCalendar);
    __defers["$.__views.__alloyId30!click!addEvent"] && $.__views.__alloyId30.addEventListener("click", addEvent);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;