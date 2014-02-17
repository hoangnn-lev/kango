var currentWindow;

exports.createCalendarBody = function(_month, _dateIsEvent, _shift, _dayOffset) {
    var calendar = Alloy.createWidget("jp.co.mountposition.calendar", "widget", {
        period: _month,
        holidays: _dateIsEvent,
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
                openView("shift_setting");
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