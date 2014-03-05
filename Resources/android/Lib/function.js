var currentWindow, deviceWidth = Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);

exports.createCalendarBody = function(_month, _dateIsEvent, _shift, _dayOffset) {
    var calendar = Alloy.createWidget("jp.co.mountposition.calendar", "widget", {
        period: _month,
        dateIsEvent: _dateIsEvent,
        shiftOfDate: _shift,
        dayOffset: _dayOffset
    });
    return calendar;
};

exports.createCalendarDay = function(_dayOffset, _view) {
    var _ref = [ "日", "月", "火", "水", "木", "金", "土" ];
    1 == _dayOffset && (_ref = [ "月", "火", "水", "木", "金", "土", "日" ]);
    var TILE_WIDTH = Math.floor(Ti.Platform.displayCaps.platformWidth / 7);
    for (var i = 0, _len = _ref.length; _len > i; i++) {
        color = "日" == _ref[i] ? "#f08791" : "土" == _ref[i] ? "#9bb9e1" : "#676767";
        _view.add(Ti.UI.createLabel({
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
};

exports.convertDayName = function(str) {
    switch (str) {
      case "Monday":
      case 1:
        return "月";

      case "Tuesday":
      case 2:
        return "火";

      case "Wednesday":
      case 3:
        return "水";

      case "Thursday":
      case 4:
        return "木";

      case "Friday":
      case 5:
        return "金";

      case "Saturday":
      case 6:
        return "土";

      case "Sunday":
      case 0:
        return "日";
    }
    return;
};

exports.nextView = function(nextWindow) {
    nextWindow.open();
    currentWindow && currentWindow != nextWindow && currentWindow.close();
    currentWindow = nextWindow;
};

exports.loadShiftsList = function(view, selectedShift) {
    var shifts = Alloy.Collections.shifts;
    var allShifts = {};
    shifts.fetch({
        query: "SELECT * from shifts"
    });
    var n = shifts.models.length;
    var data = shifts.models, shift_data = [];
    for (var i = 0; n > i; ++i) {
        allShifts[data[i].get("id")] = {
            color: data[i].get("color"),
            text: data[i].get("alias")
        };
        1 == data[i].get("status") && shift_data.push(data[i]);
    }
    if (!view && !selectedShift) return allShifts;
    var index = 0, n = shift_data.length;
    for (var i = 0; 3 > i; ++i) for (var j = 0; 4 > j; ++j) {
        if (index >= n) {
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
                height: "30dp",
                bottom: "5dp",
                className: "button-status"
            });
            button.addEventListener("click", function() {
                openView("shift_setting", {
                    tab: 1
                });
            });
            var nt = 0;
            2 == n || 6 == n ? nt = 0 : 1 == n || 5 == n || 9 == n ? nt = 1 : 4 == n || 8 == n || 0 == n ? nt = 2 : (3 == n || 7 == n) && (nt = 3);
            for (var t = 0; nt > t; ++t) view.add(Ti.UI.createLabel({
                height: "30dp",
                width: "23%",
                top: "5dp",
                bottom: "5dp",
                left: "5dp"
            }));
            view.add(button);
            return allShifts;
        }
        var label = Ti.UI.createLabel({
            text: " " + shift_data[index].get("alias") + " ",
            id: shift_data[index].get("id"),
            color: "#676767",
            font: {
                fontSize: "14dp"
            },
            backgroundColor: shift_data[index].get("color"),
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
        view.add(label);
    }
};

exports.checkFriendRequest = function() {
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
};

exports.createBoxIcon = function(button, viewIcon, selectedIcon) {
    var currentButton, buttonTabs = Ti.API.ICON;
    var l = buttonTabs.length;
    buttonTabs[0]["icons"] = func.readLogImg();
    for (var i = 0; l > i; i++) {
        var buttontab = Ti.UI.createImageView({
            width: "25%",
            height: "45dp",
            image: buttonTabs[i].folder + "deactive.png",
            data: buttonTabs[i].icons,
            folder: buttonTabs[i].folder,
            left: 25 * i + "%",
            top: 0,
            className: "buttonTabs"
        });
        buttontab.addEventListener("click", function(e) {
            if (this !== currentButton) {
                currentButton && currentButton.setImage(currentButton.folder + "deactive.png");
                currentButton = this;
                currentButton.setImage(e.source.folder + "active.png");
                viewIcon.removeAllChildren();
                viewIcon.add(exports.createScrollViewIcon(e.source.data, e.source.folder, viewIcon, selectedIcon));
            }
        });
        if (0 == i && "" == selectedIcon) {
            currentButton = buttontab;
            currentButton.setImage(buttonTabs[i].folder + "active.png");
            viewIcon.add(exports.createScrollViewIcon(buttonTabs[i].icons, buttonTabs[i].folder, viewIcon, selectedIcon));
        } else "" != selectedIcon && "-1" != selectedIcon.indexOf(buttonTabs[i].folder) && buttontab.fireEvent("click");
        button.add(buttontab);
    }
};

exports.createScrollViewIcon = function(icon, folder, viewIcon, selectedIcon) {
    var deviceWidth = Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);
    var views = [];
    var iconCurrent;
    var column = 5, row = 2, num = column * row, m = (icon.length, Math.ceil(icon.length / num)), imgSize = deviceWidth / column, icon_index = 0;
    for (var i = 0; m > i; ++i) {
        var view = Ti.UI.createView({
            width: Ti.UI.FILL,
            height: Ti.UI.SIZE
        });
        for (var r = 0; row > r; ++r) for (var c = 0; column > c; ++c) {
            var left = 0;
            c > 0 && (left = imgSize * c - 12);
            var img = "";
            img = folder == Ti.API.ICON[0]["folder"] ? icon[icon_index] : folder + icon[icon_index];
            if (img) {
                var iconView = Ti.UI.createImageView({
                    image: img,
                    left: left + "dp",
                    top: imgSize * r + 5 + "dp",
                    bottom: "10dp",
                    width: imgSize - 20 + "dp",
                    height: imgSize - 20 + "dp",
                    right: "3dp",
                    borderColor: "#fff",
                    borderWidth: 5
                });
                if (selectedIcon == folder + icon[icon_index]) {
                    iconView.setBorderColor("#ed829c");
                    iconCurrent = iconView;
                }
                iconView.addEventListener("click", function(e) {
                    if ("#ed829c" == this.getBorderColor()) {
                        this.setBorderColor("#fff");
                        Ti.API.selectedIcon = selectedIcon = "";
                    } else {
                        iconCurrent && iconCurrent.setBorderColor("#fff");
                        this.setBorderColor("#ed829c");
                        Ti.API.selectedIcon = selectedIcon = e.source.image;
                    }
                    iconCurrent = this;
                });
                icon_index++;
                view.add(iconView);
            }
        }
        views.push(view);
    }
    viewIcon.setHeight(imgSize * row + "dp");
    return Ti.UI.createScrollableView({
        views: views
    });
};

exports.getScheduleId = function(date) {
    var scheduleModel = Alloy.Collections.schedule;
    scheduleModel.fetch({
        query: 'SELECT * from schedule where date = "' + date + '"'
    });
    if (scheduleModel.models.length > 0) return scheduleModel.models[0].get("id");
    var schedule = Alloy.createModel("schedule", {
        date: date
    });
    scheduleModel.add(schedule);
    schedule.save();
    return schedule.get("id");
};

exports.writeLogImg = function(img) {
    var list_img = [ img ];
    var myFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "log_selected_img.txt");
    if (myFile.exists()) {
        var get_img = JSON.parse(myFile.read().toString()), temp = [];
        for (var i = 0; 9 > i; i++) get_img[i] && get_img[i] != img && temp.push(get_img[i]);
        temp.unshift(img);
        myFile.write(JSON.stringify(temp));
    } else myFile.write(JSON.stringify(list_img));
};

exports.readLogImg = function() {
    var myFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, "log_selected_img.txt");
    return myFile.exists() ? JSON.parse(myFile.read().toString()) : [];
};

exports.pagingControl = function(scrollableView) {
    var container = Titanium.UI.createView({
        height: Ti.UI.FILL,
        backgroundColor: "tranparent"
    });
    var viewLeftArrow = Ti.UI.createView({
        height: "40dp",
        width: "40dp",
        left: "16dp",
        selected: false
    });
    var imageLeftArrow = Ti.UI.createImageView({
        image: "/tutorial/btnPrev.png",
        height: "40dp",
        width: "40dp"
    });
    viewLeftArrow.add(imageLeftArrow);
    container.add(viewLeftArrow);
    var bulletContainer = Ti.UI.createView({
        height: "13dp",
        width: Ti.UI.SIZE,
        bottom: "20dp"
    });
    container.add(bulletContainer);
    var viewRightArrow = Ti.UI.createView({
        height: "40dp",
        width: "40dp",
        right: "16dp",
        selected: true
    });
    var imageRightArrow = Ti.UI.createImageView({
        image: "/rightBlueArrow.png",
        height: "40dp",
        width: "40dp"
    });
    viewRightArrow.add(imageRightArrow);
    container.add(viewRightArrow);
    var numberOfPages = scrollableView.getViews().length;
    var pages = [];
    for (var i = 0; numberOfPages > i; i++) {
        var page = Titanium.UI.createView({
            borderRadius: 13,
            width: "13dp",
            height: "13dp",
            left: 25 * i + "dp",
            backgroundColor: "#fff"
        });
        pages.push(page);
        bulletContainer.add(page);
    }
    pages[scrollableView.getCurrentPage()].setBackgroundColor("#ed829c");
    if (1 == pages.length) {
        imageLeftArrow.image = "/tutorial/empty.png";
        imageRightArrow.image = "/tutorial/empty.png";
        viewLeftArrow.selected = false;
        viewRightArrow.selected = false;
    } else {
        imageLeftArrow.image = "/tutorial/empty.png";
        imageRightArrow.image = "/tutorial/btnNxt.png";
        viewLeftArrow.selected = false;
        viewRightArrow.selected = true;
    }
    viewLeftArrow.addEventListener("click", function() {
        this.selected && (scrollableView.currentPage -= 1);
    });
    viewRightArrow.addEventListener("click", function() {
        this.selected && (scrollableView.currentPage += 1);
    });
    onScroll = function(event) {
        if (event.currentPage || 0 == event.currentPage) {
            for (var i = 0; numberOfPages > i; i++) pages[i].setBackgroundColor("#fff");
            pages[event.currentPage].setBackgroundColor("#ed829c");
            if (0 == event.currentPage) if (event.currentPage < pages.length - 1) {
                imageLeftArrow.image = "/tutorial/empty.png";
                imageRightArrow.image = "/tutorial/btnNxt.png";
                viewLeftArrow.selected = false;
                viewRightArrow.selected = true;
            } else {
                imageLeftArrow.image = "/tutorial/empty.png";
                imageRightArrow.image = "/tutorial/empty.png";
                viewLeftArrow.selected = false;
                viewRightArrow.selected = false;
            } else if (event.currentPage < pages.length - 1) {
                imageLeftArrow.image = "/tutorial/btnPrev.png";
                imageRightArrow.image = "/tutorial/btnNxt.png";
                viewLeftArrow.selected = true;
                viewRightArrow.selected = true;
            } else {
                imageLeftArrow.image = "/tutorial/btnPrev.png";
                imageRightArrow.image = "/tutorial/empty.png";
                viewLeftArrow.selected = true;
                viewRightArrow.selected = false;
            }
        }
    };
    scrollableView.addEventListener("scroll", onScroll);
    return container;
};