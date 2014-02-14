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