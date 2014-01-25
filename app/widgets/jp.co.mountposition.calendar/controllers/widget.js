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
				//_ref.backgroundColor = 'transparent';
			}
		}

		$.selected = e.source;

		return ( _ref1 = $.selected) != null ? ( _ref2 = _ref1.children[0]) != null ? /*_ref2.backgroundColor = '#74c149'*/ 0 :
		void 0 :
		void 0;
	}
};

$.calendar = {};

calendarMonth = moment(period);

period.date(1);

dayOfWeek = period.day() - dayOffset;

while (dayOfWeek < 0)
dayOfWeek += 7;

prevMonth = moment(period).subtract('months', 1);

nextMonth = moment(period).add('months', 1);

_.defer(function() {
	var name, ui, _ref1;
	for (var i = 0, n = holidays.length; i < n; ++i) {
		day = holidays[i].date;
		day = moment(day, 'YYYY-MM-DD').date();
		ui = ( _ref1 = $.calendar) != null ? _ref1["" + day] :
		void 0;
		if ((ui != null ? ui.date :
		void 0) != null) {

			ui.add(Ti.UI.createLabel({
				text : '★',
				font : {
					fontSize : '18dp'
				},
				color : '#666',
				top : '5dp',
				right : '5dp',
				touchEnabled : false,
				zIndex : 0
			}));

			ui.add(Ti.UI.createLabel({
				text : '夜勤',
				font : {
					fontSize : '14dp'
				},
				color : '#666',
				bottom : '3dp',
				touchEnabled : false,
				zIndex : 0
			}));

			ui.backgroundColor = '#d3e1f5';
		}
	}
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
			width : TILE_WIDTH,
			height : TILE_WIDTH,
			prevMonth : true,
			className : 'dayOfWeek'
		}));
		col++;
	}
}

for ( i = _k = 1, _ref2 = period.daysInMonth(); 1 <= _ref2 ? _k <= _ref2 : _k >= _ref2; i = 1 <= _ref2 ? ++_k : --_k) {
	tile = Ti.UI.createView({
		backgroundColor : '#fff',
		width : TILE_WIDTH - 2,
		height : TILE_WIDTH,
		date : period.unix(),
		left : '1sp',
		top : '1sp',
		className : 'row'
	});

	if (i == _ref2) {
		tile.setRight('1sp');
	}

	if (currentDate == (calendarMonth.format('YYYY-MM-') + i)) {
		tile.setBackgroundColor('#ffcde2');
	}
	tile.add(Ti.UI.createLabel({
		color : DAY_COLOR[period.day()],
		top : '5dp',
		left : '5dp',
		font : {
			fontSize : '18sp'
		},
		border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 10,
		textAlign : 'center',
		text : period.date(),
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		_isEntry : false,
		touchEnabled : false,
		className : 'day'
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
