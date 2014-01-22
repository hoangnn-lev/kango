var CALENDAR_WIDTH, DAY_COLOR, OUTDAY_COLOR, TILE_WIDTH, WEEK_COLOR, args, startDay, calendarMonth, col, createWeekView, day, dayOfWeek, doClick, i, moment, nextMonth, period, holidays, prevMonth, row, tile, weekView, _i, _j, _k, _len, _ref, _ref1, _ref2, dayOffset;

moment = require('alloy/moment');

var currentDate = moment().format('YYYY-MM-D');

args = arguments[0] || {};

period = args.period != null ? moment(args.period) : moment();
holidays = args.holidays != null ? args.holidays : {};
dayOffset = args.dayOffset != null ? args.dayOffset : 0;

WEEK_COLOR = ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'];
DAY_COLOR = ['#64A515', '#333333', '#333333', '#333333', '#333333', '#333333', '#64A515'];

OUTDAY_COLOR = ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'];
EVENT_COLOR = ['#00ce5c', '#00ce5c', '#00ce5c', '#00ce5c', '#00ce5c', '#00ce5c', '#00ce5c'];
exports.TILE_WIDTH = TILE_WIDTH = Math.floor(Ti.Platform.displayCaps.platformWidth / 7);

if (startDay == 0) {
	DAY_COLOR[0] = '#333333';
	DAY_COLOR[5] = '#64A515';
}

CALENDAR_WIDTH = TILE_WIDTH * 7;
$.dates.width = CALENDAR_WIDTH;

$.selected = null;

doClick = function(e) {
	var _ref, _ref1, _ref2;

	if ((e.source.date != null) && !e.source._isEntry) {

		if ($.selected != null) {
			if (( _ref = $.selected.children[0]) != null) {
				_ref.backgroundImage = WPATH('/images/calendar/tile.png');
			}
		}

		$.selected = e.source;
		return ( _ref1 = $.selected) != null ? ( _ref2 = _ref1.children[0]) != null ? _ref2.backgroundImage = WPATH('/images/calendar/selected.png') :
		void 0 :
		void 0;
	}
};

$.calendar = {};

calendarMonth = moment(period);

period.date(1);

dayOfWeek = period.day() - dayOffset;

while(dayOfWeek < 0) dayOfWeek += 7;

prevMonth = moment(period).subtract('months', 1);

nextMonth = moment(period).add('months', 1);

_.defer(function() {
	//require(WPATH('holiday')).fetch(calendarMonth, function(holidays) {

	var name, ui, _ref1;
	for (var i = 0, n = holidays.length; i < n; ++i) {
		day = holidays[i].date;
		day = moment(day, 'YYYY-MM-DD').date();
		ui = ( _ref1 = $.calendar) != null ? _ref1["" + day] :
		void 0;
		if ((ui != null ? ui.date :
		void 0) != null) {
			// ui.add(Ti.UI.createLabel({
			// //text : name,
			// text : '★',
			// font : {
			// fontSize : '20dp'
			// },
			// //color : EVENT_COLOR[0],
			// color : '#ff3974',
			// top : 0,
			// textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
			// touchEnabled : false,
			// width : Ti.UI.FILL,
			// height : Ti.UI.FILL,
			// zIndex : 0
			// }));
			//ui.children[0].backgroundImage = WPATH('/images/calendar/event.png');
			//ui.children[0].color = DAY_COLOR[0];
			ui.children[0].color = '#ff3974';
		}
	}
	//});
});

col = 0;

row = 0;

createWeekView = function() {
	return Ti.UI.createView({
		layout : 'horizontal',
		width : CALENDAR_WIDTH,
		height : TILE_WIDTH
	});
};

weekView = createWeekView();
//need optimization

if (dayOfWeek !== 0) {
	for ( i = _j = _ref1 = dayOfWeek - 1; _ref1 <= 0 ? _j <= 0 : _j >= 0; i = _ref1 <= 0 ? ++_j : --_j) {

		weekView.add(Ti.UI.createLabel({
			color : OUTDAY_COLOR[col],
			textAlign : 'center',
			text : prevMonth.daysInMonth() - i,
			font : {
				fontSize : '22sp'
			},
			//backgroundImage : WPATH('/images/calendar/inactive.png'),
			width : TILE_WIDTH,
			height : TILE_WIDTH,
			prevMonth : true
		}));
		col++;
	}
}

var tileImg = WPATH('/images/calendar/tile.png');

for ( i = _k = 1, _ref2 = period.daysInMonth(); 1 <= _ref2 ? _k <= _ref2 : _k >= _ref2; i = 1 <= _ref2 ? ++_k : --_k) {
	tile = Ti.UI.createView({
		backgroundColor : 'transparent',
		width : TILE_WIDTH,
		height : TILE_WIDTH,
		date : period.unix()
	});

	if (currentDate == (calendarMonth.format('YYYY-MM-') + i)) {
		tile.setBackgroundImage(WPATH('/images/calendar/current.png'));
	}
	tile.add(Ti.UI.createLabel({
		color : DAY_COLOR[period.day()],
		backgroundImage : tileImg,
		font : {
			fontSize : '22sp'
		},
		textAlign : 'center',
		text : period.date(),
		width : TILE_WIDTH,
		height : TILE_WIDTH,
		_isEntry : false,
		touchEnabled : false
	}));
	weekView.add(tile);
	$.calendar["" + (period.date())] = tile;
	period.add('days', 1);
	col++;
	if (col === 7) {
		$.dates.add(weekView);
		weekView = createWeekView();
		col = 0;
		row++;
	}
}

while (col !== 0) {
	weekView.add(Ti.UI.createLabel({
		color : OUTDAY_COLOR[col],
		textAlign : 'center',
		text : nextMonth.date(),
		font : {
			fontSize : '22sp'
		},
		//backgroundImage : WPATH('/images/calendar/inactive.png'),
		width : TILE_WIDTH,
		height : TILE_WIDTH,
		nextMonth : true
	}));
	nextMonth.add('days', 1);
	col++;
	if (col === 7) {
		$.dates.add(weekView);
		col = 0;
		row++;
	}
}
//need optimization
exports.setImage = function(day, image, options) {
	var _ref3;
	if (options == null) {
		options = {};
	}
	if (moment.isMoment(day)) {
		day = day.date();
	}
	tile = ( _ref3 = $.calendar) != null ? _ref3["" + day] :
	void 0;
	if ((tile != null ? tile.date :
	void 0) != null) {
		tile.remove(tile.children[0]);
		_.extend(tile, {
			_isEntry : true
		}, options);

		return tile.add(Ti.UI.createImageView({
			image : image,
			width : TILE_WIDTH,
			height : TILE_WIDTH,
			touchEnabled : false
		}));
	}
};

exports.setView = function(day, view, options) {
	var _ref3;
	if (options == null) {
		options = {};
	}
	if (moment.isMoment(day)) {
		day = day.date();
	}
	tile = ( _ref3 = $.calendar) != null ? _ref3["" + day] :
	void 0;
	if (tile != null) {
		_.extend(tile, options);
		return tile.add(view);
	}
};

exports.calendarMonth = function() {
	return calendarMonth;
};

exports.select = function(day) {

	var touchEvent, _ref3;
	if (moment.isMoment(day)) {
		day = day.date();
	}
	touchEvent = 'click';
	tile = ( _ref3 = $.calendar) != null ? _ref3["" + day] :
	void 0;

	return tile != null ? $.dates.fireEvent(touchEvent, {
		source : tile
	}) :
	void 0;
};

exports.selectedDate = function() {
	if ($.selected != null) {
		return moment.unix($.selected.date);
	} else {
		return moment();
	}
};

exports.destroy = function() {
	$.calendar = null;
	$.selected = null;
	return $.destroy();
};
