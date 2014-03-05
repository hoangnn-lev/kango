function Controller() {
    function clickCalendar() {
        var wday = activeWidget.selectedDate();
        choiceDay = wday;
        var gdate = wday.format("MM / DD");
        day = wday.format("DD");
        if (gdate != $.scheduleDateInfo.getText()) {
            $.scheduleDateInfo.setText(gdate);
            $.dayName.setText(func.convertDayName(wday.format("dddd")));
            $.shiftLabel.removeAllChildren();
            shiftOfMonth[day] && $.shiftLabel.add(Ti.UI.createLabel({
                text: shiftOfMonth[day]["text"],
                left: "120dp",
                backgroundColor: shiftOfMonth[day]["color"],
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
            getEvent(day);
        }
    }
    function doPrevMonth() {
        currentMonth = currentMonth.subtract("months", 1);
        loadCalendarBody();
    }
    function doNextMonth() {
        currentMonth = currentMonth.add("months", 1);
        loadCalendarBody();
    }
    function getEvent(day) {
        loadFriendByDay(day);
        $.scheduleList.removeAllChildren();
        var id = dateIsEvent[day];
        if (!id) return;
        var calendar_shift = Alloy.Collections.schedule_detail;
        calendar_shift.fetch({
            query: "select * from schedule_detail  where schedule_id = " + id
        });
        var data = calendar_shift.models;
        var tableView = Ti.UI.createTableView({
            top: 0,
            height: "auto",
            separatorColor: "#f5f1e9"
        });
        var item = [];
        for (var i = 0, n = data.length; n > i; ++i) {
            var row = Ti.UI.createTableViewRow({
                id: data[i].get("id"),
                selectionStyle: "none",
                selectedBackgroundColor: "transparent",
                backgroundColor: "#fff",
                left: "7dp",
                right: "7dp",
                className: "row-event"
            });
            if (data[i].get("img")) {
                var scheduleTitle = Ti.UI.createLabel({
                    height: Ti.UI.SIZE,
                    top: "10dp",
                    text: data[i].get("title"),
                    bottom: "10dp",
                    color: "#676767",
                    font: {
                        fontSize: "16sp"
                    },
                    touchEnabled: false,
                    left: "50dp",
                    className: "title-event"
                });
                row.add(Ti.UI.createImageView({
                    width: "40dp",
                    image: data[i].get("img"),
                    left: "10dp",
                    touchEnabled: false,
                    className: "img-event"
                }));
            } else var scheduleTitle = Ti.UI.createLabel({
                height: Ti.UI.SIZE,
                top: "10dp",
                text: data[i].get("title"),
                bottom: "10dp",
                color: "#676767",
                font: {
                    fontSize: "16sp"
                },
                left: "10dp",
                touchEnabled: false,
                className: "title-event-no-img"
            });
            data[i].get("start_time") && row.add(Ti.UI.createLabel({
                text: data[i].get("start_time") + "~" + data[i].get("end_time"),
                font: {
                    fontSize: "16dp"
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
            var postdata = {
                day: choiceDay.format("YYYY-MM-DD"),
                id: e.source.id
            };
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
    function loadCalendarBody() {
        var calendar_shift = Alloy.Collections.calendar_shift;
        day = currentMonth.format("DD");
        calendar_shift.fetch({
            query: 'select * from calendar_shift  where month_year="' + currentMonth.format("MM-YYYY") + '"'
        });
        var data = [];
        shiftOfMonth = [];
        if (calendar_shift.models[0]) {
            data = JSON.parse(calendar_shift.models[0].get("date_shift"));
            for (var key in data) shiftOfMonth[key] = allShifts[data[key]];
        }
        choiceDay && (day = choiceDay.format("DD"));
        activeWidget && (activeWidget = null);
        getScheduleMonth(currentMonth.format("MM"), currentMonth.format("YYYY"));
        var current = $.calendar.children[0];
        activeWidget = func.createCalendarBody(currentMonth, dateIsEvent, shiftOfMonth, dayOffset);
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
    function getScheduleMonth(month, year) {
        dateIsEvent = {};
        friendOfDay = {};
        scheduleModel.fetch({
            query: 'SELECT * from schedule where date BETWEEN  "' + year + "-" + month + '-01" and "' + year + "-" + month + '-31"'
        });
        var data = scheduleModel.models, n = data.length;
        for (var i = 0; n > i; ++i) {
            var date = data[i].get("date").split("-");
            dateIsEvent[date[2]] = data[i].get("id");
            friendOfDay[date[2]] = data[i].get("friend");
        }
    }
    function createCalendar() {
        allShifts = func.loadShiftsList();
        Alloy.Collections.configs = Alloy.createCollection("configs");
        var configs = Alloy.Collections.configs;
        configs.fetch({
            query: 'select id,cg_value from configs where cg_name="dayOffset" or cg_name="showMember"'
        });
        dayOffset = configs.models[0].get("cg_value");
        if (configs.models[1] && 1 != configs.models[1].get("cg_value")) {
            $.blockFriend.setVisible(false);
            $.blockFriend.setHeight(0);
        }
        func.createCalendarDay(dayOffset, $.days);
        loadCalendarBody();
    }
    function loadFriendByDay(date) {
        $.friend.removeAllChildren();
        friendInSchedule = {};
        if (friendOfDay[date]) {
            var friend = JSON.parse(friendOfDay[date]);
            if (friend) for (var i = 0, n = friend.length; n > i; ++i) if (_allFriend[friend[i]]) {
                friendInSchedule[friend[i]] = _allFriend[friend[i]];
                $.friend.add(Ti.UI.createLabel({
                    text: _allFriend[friend[i]],
                    width: Ti.UI.SIZE,
                    id: friend[i],
                    height: Ti.UI.SIZE,
                    right: "5dp",
                    top: "5dp",
                    color: "#676767",
                    textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                    font: {
                        fontSize: "16sp"
                    }
                }));
            }
        }
        var all = $.allFriend.children;
        for (var j = 0, m = all.length; m > j; ++j) {
            var status = friendInSchedule[all[j].id] ? "active" : "deactive";
            all[j].type = status;
            all[j].setColor(friendStyle[status]["text"]);
            all[j].setBackgroundColor(friendStyle[status]["bg"]);
        }
    }
    function openAllFriend() {
        $.groupAllFriend.animate({
            height: on_flag ? Ti.UI.SIZE : 0,
            duration: 300,
            curve: Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
        });
        $.openAllFriend.setImage(on_flag ? "/icons/btn_Close.png" : "/icons/btn_Open.png");
        on_flag = !on_flag;
    }
    function getAllFriend() {
        var friendCols = Alloy.Collections.friend;
        friendCols.fetch({
            query: 'SELECT * from friend where status=1 and name!=""'
        });
        var getAllFriend = friendCols.models;
        for (var i = 0, n = getAllFriend.length; n > i; ++i) {
            _allFriend[getAllFriend[i].get("id")] = getAllFriend[i].get("name");
            var label = Ti.UI.createLabel({
                text: " " + getAllFriend[i].get("name") + " ",
                id: getAllFriend[i].get("id"),
                color: friendStyle["deactive"]["text"],
                font: {
                    fontSize: "16dp"
                },
                type: "deactive",
                backgroundColor: friendStyle["deactive"]["bg"],
                height: "30dp",
                width: Ti.UI.SIZE,
                left: "5dp",
                top: "5dp",
                border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
                borderRadius: 10,
                textAlign: "center",
                className: "friend-item"
            });
            label.addEventListener("click", function(e) {
                if (0 == $.scheduleList.getChildren().length) return;
                var type = "deactive" == e.source.type ? "active" : "deactive";
                e.source.type = type;
                this.setColor(friendStyle[type]["text"]);
                this.setBackgroundColor(friendStyle[type]["bg"]);
                updateFriend(e.source.text, e.source.id);
            });
            $.allFriend.add(label);
        }
    }
    function updateFriend(name, id) {
        if (friendInSchedule[id]) {
            delete friendInSchedule[id];
            var getFriend = $.friend.children;
            for (var i = 0, n = getFriend.length; n > i; ++i) getFriend[i].id == id && $.friend.remove(getFriend[i]);
        } else {
            friendInSchedule[id] = name;
            $.friend.add(Ti.UI.createLabel({
                text: name,
                id: id,
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE,
                right: "5dp",
                top: "5dp",
                color: "#676767",
                textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
                font: {
                    fontSize: "16sp"
                }
            }));
        }
        var friendId = JSON.stringify(Object.keys(friendInSchedule));
        friendOfDay[day] = friendId;
        var scheduleModel = Alloy.Collections.schedule;
        var data = {
            id: dateIsEvent[day],
            date: choiceDay.format("YYYY-MM-DD"),
            friend: friendId
        };
        var schedule = Alloy.createModel("schedule", data);
        scheduleModel.add(schedule);
        schedule.save();
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
        layout: "horizontal",
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
    $.__views.scheduleInfo = Ti.UI.createScrollView({
        top: 0,
        bottom: 20,
        height: Ti.UI.FILL,
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
    $.__views.__alloyId42 = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: Ti.UI.SIZE,
        font: {
            fontSize: "16sp"
        },
        height: Ti.UI.SIZE,
        backgroundColor: "#f3acbd",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        right: "5dp",
        title: "＋予定を追加",
        id: "__alloyId42"
    });
    $.__views.scheduleTitle.add($.__views.__alloyId42);
    addEvent ? $.__views.__alloyId42.addEventListener("click", addEvent) : __defers["$.__views.__alloyId42!click!addEvent"] = true;
    $.__views.blockFriend = Ti.UI.createView({
        top: "2dp",
        backgroundColor: "#fff",
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        id: "blockFriend"
    });
    $.__views.scheduleInfo.add($.__views.blockFriend);
    $.__views.__alloyId43 = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "10dp",
        id: "__alloyId43"
    });
    $.__views.blockFriend.add($.__views.__alloyId43);
    $.__views.__alloyId44 = Ti.UI.createImageView({
        width: "20dp",
        height: "20dp",
        touchEnabled: false,
        image: "/icons/friend.png",
        left: "10dp",
        id: "__alloyId44"
    });
    $.__views.__alloyId43.add($.__views.__alloyId44);
    $.__views.openAllFriend = Ti.UI.createImageView({
        width: "40dp",
        height: "40dp",
        right: "10dp",
        touchEnabled: true,
        zIndex: 5,
        image: "/icons/btn_Open.png",
        id: "openAllFriend",
        type: "open"
    });
    $.__views.__alloyId43.add($.__views.openAllFriend);
    openAllFriend ? $.__views.openAllFriend.addEventListener("click", openAllFriend) : __defers["$.__views.openAllFriend!click!openAllFriend"] = true;
    $.__views.serviceMember = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        color: "#757575",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "14dp",
            fontWeight: "bold"
        },
        left: "35dp",
        id: "serviceMember",
        text: "勤務メンバー"
    });
    $.__views.__alloyId43.add($.__views.serviceMember);
    $.__views.friend = Ti.UI.createView({
        height: Ti.UI.SIZE,
        left: "10dp",
        top: "10dp",
        bottom: "10dp",
        layout: "horizontal",
        id: "friend"
    });
    $.__views.blockFriend.add($.__views.friend);
    $.__views.__alloyId45 = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "1sp",
        color: "#676767",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        backgroundColor: "#ccc",
        id: "__alloyId45"
    });
    $.__views.blockFriend.add($.__views.__alloyId45);
    $.__views.groupAllFriend = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: 0,
        layout: "vertical",
        id: "groupAllFriend"
    });
    $.__views.blockFriend.add($.__views.groupAllFriend);
    $.__views.allFriend = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "horizontal",
        id: "allFriend"
    });
    $.__views.groupAllFriend.add($.__views.allFriend);
    $.__views.editFriend = Ti.UI.createButton({
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        width: "120dp",
        font: {
            fontSize: "14dp"
        },
        height: "30dp",
        backgroundColor: "#f3acbd",
        backgroundFocusedColor: "#ef8fa6",
        backgroundSelectedColor: "#ef8fa6",
        color: "#fff",
        border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        borderRadius: 10,
        right: "5dp",
        bottom: "10dp",
        top: "10dp",
        title: "メンバー編集",
        id: "editFriend"
    });
    $.__views.groupAllFriend.add($.__views.editFriend);
    $.__views.scheduleList = Ti.UI.createView({
        top: "1dp",
        id: "scheduleList",
        height: Ti.UI.SIZE
    });
    $.__views.scheduleInfo.add($.__views.scheduleList);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var day, choiceDay, activeWidget, dateIsEvent, on_flag = true, shiftOfMonth = [], moment = require("alloy/moment"), currentMonth = moment(), scheduleModel = Alloy.Collections.schedule, dayOffset = "", _allFriend = {}, allShifts = {}, friendOfDay = {}, args = arguments[0] || {}, friendStyle = {
        active: {
            bg: "#d7e682",
            text: "#68790b"
        },
        deactive: {
            bg: "#ccc",
            text: "#747474"
        }
    };
    var friendInSchedule = {};
    if (args["date"]) {
        var _date = args["date"].split("-");
        currentMonth = moment(args["date"]);
        day = _date[2];
    }
    getAllFriend();
    createCalendar();
    func.checkFriendRequest();
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
    $.editFriend.addEventListener("click", function() {
        openView("friend");
    });
    __defers["$.__views.prevMonth!click!doPrevMonth"] && $.__views.prevMonth.addEventListener("click", doPrevMonth);
    __defers["$.__views.nextMonth!click!doNextMonth"] && $.__views.nextMonth.addEventListener("click", doNextMonth);
    __defers["$.__views.calendar!click!clickCalendar"] && $.__views.calendar.addEventListener("click", clickCalendar);
    __defers["$.__views.__alloyId42!click!addEvent"] && $.__views.__alloyId42.addEventListener("click", addEvent);
    __defers["$.__views.openAllFriend!click!openAllFriend"] && $.__views.openAllFriend.addEventListener("click", openAllFriend);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;