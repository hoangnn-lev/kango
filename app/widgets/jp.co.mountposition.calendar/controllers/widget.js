var CALENDAR_WIDTH, DAY_COLOR, OUTDAY_COLOR, TILE_WIDTH, WEEK_COLOR, args, startDay, calendarMonth, col, createWeekView, day, dayOfWeek, doClick, i, moment, nextMonth, period, dateIsEvent, prevMonth, row, tile, weekView, _i, _j, _k, _len, _ref, _ref1, _ref2, dayOffset, shiftOfDate;

moment = require('alloy/moment');

var currentDate = moment().format('YYYY-MM-D');

args = arguments[0] || {};

period = args.period != null ? moment(args.period) : moment();
dateIsEvent = args.dateIsEvent != null ? args.dateIsEvent : {};
shiftOfDate = args.shiftOfDate != null ? args.shiftOfDate : {};

dayOffset = args.dayOffset != null ? args.dayOffset : 0;

WEEK_COLOR = ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'];
DAY_COLOR = ['#f08791', '#676767', '#676767', '#676767', '#676767', '#676767', '#9bb9e1'];

OUTDAY_COLOR = ['#ebebeb', '#ebebeb', '#ebebeb', '#ebebeb', '#ebebeb', '#d1d9e4', '#f0c7ca'];
EVENT_COLOR = ['#f08791', '#f08791', '#f08791', '#f08791', '#f08791', '#f08791', '#f08791'];
exports.TILE_WIDTH = TILE_WIDTH = Math.floor(Ti.Platform.displayCaps.platformWidth / 7);

if (dayOffset == 0) {
	OUTDAY_COLOR[0] = '#f0c7ca';
	OUTDAY_COLOR[5] = '#ebebeb';
	OUTDAY_COLOR[6] = '#d1d9e4';
}

CALENDAR_WIDTH = TILE_WIDTH * 7;
$.dates.width = CALENDAR_WIDTH;

$.selected = null;

doClick = function(e) {

	var _ref, _ref1, _ref2;

	if ((e.source.date != null)) {

		if ($.selected != null) {
			if (( _ref = $.selected.children[0]) != null) {
				_ref.getParent().borderColor = '#fff';
			}
		}

		$.selected = e.source;

		return ( _ref1 = $.selected) != null ? ( _ref2 = _ref1.children[0]) != null ? _ref2.getParent().borderColor = '#a1a1a0' :
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
	return require(WPATH('holiday')).fetch(calendarMonth, function(holidays) {
		var name, ui, _ref1;
		for (name in holidays) {
			day = holidays[name];
			day = moment(day, 'YYYY-MM-DD').date();
			ui = ( _ref1 = $.calendar) != null ? _ref1["" + day] :
			void 0;
			if ((ui != null ? ui.date :
			void 0) != null) {
				ui.children[0].color = DAY_COLOR[0];
			}
		}
	});
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

		tile = Ti.UI.createView({
			backgroundColor : '#fff',
			width : TILE_WIDTH - 4,
			height : TILE_WIDTH - 4,
			date : period.unix(),
			left : '2sp',
			top : '2sp',
			border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			borderRadius : 10,
			borderWidth : 1,
			borderColor : '#fff',
			touchEnabled : false,
			className : 'row-dayOffWeek'
		});
		tile.add(Ti.UI.createLabel({
			color : OUTDAY_COLOR[col],
			text : prevMonth.daysInMonth() - i,
			font : {
				fontSize : '18sp'
			},
			top : '3dp',
			left : '3dp',
			touchEnabled : false,
			className : 'dayOfWeek-label'
		}));
		weekView.add(tile);
		col++;
	}
}

for ( i = _k = 1, _ref2 = period.daysInMonth(); 1 <= _ref2 ? _k <= _ref2 : _k >= _ref2; i = 1 <= _ref2 ? ++_k : --_k) {
	tile = Ti.UI.createView({
		backgroundColor : '#fff',
		width : TILE_WIDTH - 4,
		height : TILE_WIDTH - 4,
		date : period.unix(),
		left : '2sp',
		top : '2sp',
		border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 10,
		borderColor : '#fff',
		borderWidth : '1',
		className : 'row'
	});

	if (currentDate == (calendarMonth.format('YYYY-MM-') + i)) {
		tile.setBackgroundColor('#fffeb3');
	}
	var _perodDay = period.date();
	tile.add(Ti.UI.createLabel({
		color : DAY_COLOR[period.day()],
		top : '3dp',
		left : '3dp',
		font : {
			fontSize : '18sp'
		},
		text : _perodDay,
		width : Ti.UI.SIZE,
		height : Ti.UI.SIZE,
		_isEntry : false,
		touchEnabled : false,
		className : 'day'
	}));

	//label shift
	if (shiftOfDate[_perodDay]) {

		tile.add(Ti.UI.createLabel({
			text : shiftOfDate[_perodDay]['text'],
			font : {
				fontSize : '12dp'
			},
			backgroundColor : shiftOfDate[_perodDay]['color'],
			border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			id : shiftOfDate[_perodDay]['id'],
			borderRadius : 10,
			width : Ti.UI.FILL,
			left : '3dp',
			right : '3dp',
			color : '#fff',
			bottom : '3dp',
			touchEnabled : false,
			zIndex : 0,
			textAlign : 'center',
			className : 'label-calendar'
		}));

	}

	//event
	if (dateIsEvent[_perodDay] || dateIsEvent['0' + _perodDay]) {

		tile.add(Ti.UI.createLabel({
			text : '◆',
			font : {
				fontSize : '10dp'
			},
			color : '#ed829c',
			top : '3dp',
			right : '5dp',
			touchEnabled : false,
			zIndex : 0,
			className : 'label-event'
		}));
	}

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

	tile = Ti.UI.createView({
		backgroundColor : '#fff',
		width : TILE_WIDTH - 4,
		height : TILE_WIDTH - 4,
		date : period.unix(),
		left : '2sp',
		top : '2sp',
		border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 10,
		borderColor : '#fff',
		touchEnabled : false,
		className : 'row-next-day'
	});
	tile.add(Ti.UI.createLabel({
		color : OUTDAY_COLOR[col],
		textAlign : 'center',
		text : nextMonth.date(),
		touchEnabled : false,
		top : '3dp',
		left : '3dp',
		font : {
			fontSize : '18sp'
		},
		nextMonth : true,
		className : 'label-next-day'
	}));
	weekView.add(tile);

	nextMonth.add('days', 1);
	col++;
	if (col === 7) {
		$.dates.add(weekView);
		col = 0;
		row++;
	}
}
//need optimization

exports.setShift = function(day, options) {

	var _ref3;
	var _isAdd = true;
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

		if (tile.children[1] && tile.children[1].id != options.id) {
			if (tile.children[1].className != 'label-event')
				tile.remove(tile.children[1]);
		}
		if (tile.children[2] && tile.children[2].id != options.id) {
			tile.remove(tile.children[2]);
		}
		if (options.id == 13)
			_isAdd = false;

		//check label empty/null
		if (_isAdd) {
			return tile.add(Ti.UI.createLabel({
				text : options.text,
				font : {
					fontSize : '12dp'
				},
				backgroundColor : options.color,
				border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
				borderRadius : 10,
				width : Ti.UI.FILL,
				left : '3dp',
				right : '3dp',
				color : '#fff',
				id : options.id,
				bottom : '3dp',
				touchEnabled : false,
				zIndex : 0,
				textAlign : 'center',
				className : 'set-label-calendar'
			}));
		}

	}
};

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
