function WPATH(s) {
    var index = s.lastIndexOf("/");
    var path = -1 === index ? "jp.co.mountposition.calendar/" + s : s.substring(0, index) + "/jp.co.mountposition.calendar/" + s.substring(index + 1);
    return true && 0 !== path.indexOf("/") ? "/" + path : path;
}

function Controller() {
    new (require("alloy/widget"))("jp.co.mountposition.calendar");
    this.__widgetId = "jp.co.mountposition.calendar";
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "widget";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.view = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        id: "view",
        backgroundColor: "#f7f7f7"
    });
    $.__views.view && $.addTopLevelView($.__views.view);
    $.__views.container = Ti.UI.createView({
        width: Ti.Platform.displayCaps.platformWidth,
        height: Ti.UI.SIZE,
        top: "0",
        left: 0,
        id: "container"
    });
    $.__views.view.add($.__views.container);
    $.__views.dates = Ti.UI.createView({
        width: Ti.UI.FILL,
        height: Ti.UI.SIZE,
        layout: "vertical",
        font: {},
        id: "dates"
    });
    $.__views.container.add($.__views.dates);
    doClick ? $.__views.dates.addEventListener("click", doClick) : __defers["$.__views.dates!click!doClick"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var CALENDAR_WIDTH, DAY_COLOR, OUTDAY_COLOR, TILE_WIDTH, WEEK_COLOR, args, startDay, calendarMonth, col, createWeekView, day, dayOfWeek, doClick, i, moment, nextMonth, period, holidays, prevMonth, row, tile, weekView, _j, _k, _ref1, _ref2, dayOffset;
    moment = require("alloy/moment");
    var currentDate = moment().format("YYYY-MM-D");
    args = arguments[0] || {};
    period = null != args.period ? moment(args.period) : moment();
    holidays = null != args.holidays ? args.holidays : {};
    dayOffset = null != args.dayOffset ? args.dayOffset : 0;
    WEEK_COLOR = [ "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff" ];
    DAY_COLOR = [ "#64A515", "#333333", "#333333", "#333333", "#333333", "#333333", "#64A515" ];
    OUTDAY_COLOR = [ "#fff", "#fff", "#fff", "#fff", "#fff", "#fff", "#fff" ];
    EVENT_COLOR = [ "#00ce5c", "#00ce5c", "#00ce5c", "#00ce5c", "#00ce5c", "#00ce5c", "#00ce5c" ];
    exports.TILE_WIDTH = TILE_WIDTH = Math.floor(Ti.Platform.displayCaps.platformWidth / 7);
    if (0 == startDay) {
        DAY_COLOR[0] = "#333333";
        DAY_COLOR[5] = "#64A515";
    }
    CALENDAR_WIDTH = 7 * TILE_WIDTH;
    $.dates.width = CALENDAR_WIDTH;
    $.selected = null;
    doClick = function(e) {
        var _ref, _ref1, _ref2;
        if (null != e.source.date && !e.source._isEntry) {
            null != $.selected && null != (_ref = $.selected.children[0]);
            $.selected = e.source;
            return null != (_ref1 = $.selected) ? null != (_ref2 = _ref1.children[0]) ? 0 : void 0 : void 0;
        }
    };
    $.calendar = {};
    calendarMonth = moment(period);
    period.date(1);
    dayOfWeek = period.day() - dayOffset;
    while (0 > dayOfWeek) dayOfWeek += 7;
    prevMonth = moment(period).subtract("months", 1);
    nextMonth = moment(period).add("months", 1);
    _.defer(function() {
        var ui, _ref1;
        for (var i = 0, n = holidays.length; n > i; ++i) {
            day = holidays[i].date;
            day = moment(day, "YYYY-MM-DD").date();
            ui = null != (_ref1 = $.calendar) ? _ref1["" + day] : void 0;
            if (null != (null != ui ? ui.date : void 0)) {
                ui.add(Ti.UI.createLabel({
                    text: "★",
                    font: {
                        fontSize: "18dp"
                    },
                    color: "#666",
                    top: "5dp",
                    right: "5dp",
                    touchEnabled: false,
                    zIndex: 0
                }));
                ui.add(Ti.UI.createLabel({
                    text: "夜勤",
                    font: {
                        fontSize: "14dp"
                    },
                    color: "#666",
                    bottom: "3dp",
                    touchEnabled: false,
                    zIndex: 0
                }));
                ui.backgroundColor = "#d3e1f5";
            }
        }
    });
    col = 0;
    row = 0;
    createWeekView = function() {
        return Ti.UI.createView({
            layout: "horizontal",
            width: CALENDAR_WIDTH,
            height: TILE_WIDTH
        });
    };
    weekView = createWeekView();
    if (0 !== dayOfWeek) for (i = _j = _ref1 = dayOfWeek - 1; 0 >= _ref1 ? 0 >= _j : _j >= 0; i = 0 >= _ref1 ? ++_j : --_j) {
        weekView.add(Ti.UI.createLabel({
            color: OUTDAY_COLOR[col],
            textAlign: "center",
            width: TILE_WIDTH,
            height: TILE_WIDTH,
            prevMonth: true,
            className: "dayOfWeek"
        }));
        col++;
    }
    for (i = _k = 1, _ref2 = period.daysInMonth(); _ref2 >= 1 ? _ref2 >= _k : _k >= _ref2; i = _ref2 >= 1 ? ++_k : --_k) {
        tile = Ti.UI.createView({
            backgroundColor: "#fff",
            width: TILE_WIDTH - 2,
            height: TILE_WIDTH,
            date: period.unix(),
            left: "1sp",
            top: "1sp",
            className: "row"
        });
        i == _ref2 && tile.setRight("1sp");
        currentDate == calendarMonth.format("YYYY-MM-") + i && tile.setBackgroundColor("#ffcde2");
        tile.add(Ti.UI.createLabel({
            color: DAY_COLOR[period.day()],
            top: "5dp",
            left: "5dp",
            font: {
                fontSize: "18sp"
            },
            border: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
            borderRadius: 10,
            textAlign: "center",
            text: period.date(),
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE,
            _isEntry: false,
            touchEnabled: false,
            className: "day"
        }));
        weekView.add(tile);
        $.calendar["" + period.date()] = tile;
        period.add("days", 1);
        col++;
        if (7 === col) {
            $.dates.add(weekView);
            weekView = createWeekView();
            col = 0;
            row++;
        }
    }
    while (0 !== col) {
        nextMonth.add("days", 1);
        col++;
        if (7 === col) {
            $.dates.add(weekView);
            col = 0;
            row++;
        }
    }
    exports.setImage = function(day, image, options) {
        var _ref3;
        null == options && (options = {});
        moment.isMoment(day) && (day = day.date());
        tile = null != (_ref3 = $.calendar) ? _ref3["" + day] : void 0;
        if (null != (null != tile ? tile.date : void 0)) {
            tile.remove(tile.children[0]);
            _.extend(tile, {
                _isEntry: true
            }, options);
            return tile.add(Ti.UI.createImageView({
                image: image,
                width: TILE_WIDTH,
                height: TILE_WIDTH,
                touchEnabled: false
            }));
        }
    };
    exports.setView = function(day, view, options) {
        var _ref3;
        null == options && (options = {});
        moment.isMoment(day) && (day = day.date());
        tile = null != (_ref3 = $.calendar) ? _ref3["" + day] : void 0;
        if (null != tile) {
            _.extend(tile, options);
            return tile.add(view);
        }
    };
    exports.calendarMonth = function() {
        return calendarMonth;
    };
    exports.select = function(day) {
        var touchEvent, _ref3;
        moment.isMoment(day) && (day = day.date());
        touchEvent = "click";
        tile = null != (_ref3 = $.calendar) ? _ref3["" + day] : void 0;
        return null != tile ? $.dates.fireEvent(touchEvent, {
            source: tile
        }) : void 0;
    };
    exports.selectedDate = function() {
        return null != $.selected ? moment.unix($.selected.date) : moment();
    };
    exports.destroy = function() {
        $.calendar = null;
        $.selected = null;
        return $.destroy();
    };
    __defers["$.__views.dates!click!doClick"] && $.__views.dates.addEventListener("click", doClick);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;