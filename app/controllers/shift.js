//create collection users
Alloy.Collections.schedule = Alloy.createCollection('schedule');
var day, choiceDay, activeWidget, id, holidaysDate, shiftOfDate = [], holidayItem, moment = require('alloy/moment'), currentMonth = moment(), scheduleModel = Alloy.Collections.schedule, dayOffset = '';

_initCalendar();

/*
 * function clickCalendar
 * event click calendar
 * input : null
 * output : void
 * */

function clickCalendar(e) {
	if (!activeWidget)
		return
		void 0;

	var wday = activeWidget.selectedDate();
	choiceDay = wday;
	var gdate = wday.format('MM / DD');
	day = wday.format('DD');

	if (gdate != $.shiftDateInfo.getText()) {
		$.shiftDateInfo.setText(gdate);
		$.dayName.setText(lib.convertDayName(wday.format('dddd')));
		//create shift label
		$.shiftLabel.removeAllChildren();
		if (shiftOfDate[day]) {
			$.shiftLabel.add(Ti.UI.createLabel({
				text : shiftOfDate[day]['text'],
				left : '120dp',
				backgroundColor : shiftOfDate[day]['color'],
				color : '#fff',
				width : '60dp',
				font : {
					fontSize : '16sp'
				},
				textAlign : 'center',
				border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
				borderRadius : 10,
				height : Ti.UI.SIZE
			}));
		}

	}
}

/*
 * function doPrevMonth
 * pre month calendar
 * input : null
 * output : void
 * */
function doPrevMonth() {
	currentMonth = currentMonth.subtract('months', 1);
	calendar();
}

/*
 * function doNextMonth
 * back month calendar
 * input : null
 * output : void
 * */
function doNextMonth() {
	currentMonth = currentMonth.add('months', 1);
	calendar();
}



/*
 * function calendar
 * force refreshing new list
 * input : null
 * output : void
 * */
function calendar() {

	//test
	shiftOfDate['18'] = {
		color : '#25b4a5',
		text : '夜勤'
	};
	shiftOfDate['19'] = {
		color : '#25b4a5',
		text : '夜勤'
	};
	shiftOfDate['12'] = {
		color : '#e68200',
		text : '日勤'
	};

	if (choiceDay)
		day = choiceDay.format('DD');
	else
		day = currentMonth.format('DD');

	if (activeWidget) {
		activeWidget = null;
	}

	//get day schedule
	
	var current = $.calendar.children[0];

	activeWidget = Alloy.createWidget('jp.co.mountposition.calendar', 'widget', {
		period : currentMonth,
		holidays : holidaysDate,
		shiftOfDate : shiftOfDate,
		dayOffset : dayOffset
	});

	var c = activeWidget.getView();
	var gdate = activeWidget.calendarMonth().format('YYYY-MM-MMM').split('-');

	$.year.setText(gdate[0]);
	$.month.setText(gdate[1]);
	$.monthName.setText(gdate[2].toUpperCase());

	$.calendar.add(c);

	activeWidget.select(day);
	$.calendar.fireEvent('click');

	if (current)
		$.calendar.remove(current);
}

/*
 * function _initCalendar
 * render week by config
 * input : null
 * output : void
 * */
function _initCalendar() {

	//create collection configs and get start day
	Alloy.Collections.configs = Alloy.createCollection('configs');
	var configs = Alloy.Collections.configs;
	configs.fetch({
		query : 'select id,cg_value from configs where cg_name="dayOffset"'
	});

	//check start with monday
	dayOffset = configs.models[0].get('cg_value');

	var _ref = ['日', '月', '火', '水', '木', '金', '土'];
	if (dayOffset == 1) {
		_ref = ['月', '火', '水', '木', '金', '土', '日'];
	}
	var TILE_WIDTH = Math.floor(Ti.Platform.displayCaps.platformWidth / 7);
	var color;
	for (var i = 0, _len = _ref.length; i < _len; i++) {
		if (_ref[i] == '日') {
			color = '#f08791';
		} else if (_ref[i] == '土') {
			color = '#9bb9e1';
		} else {
			color = '#676767';
		}
		$.days.add(Ti.UI.createLabel({
			color : color,
			textAlign : 'center',
			font : {
				fontSize : '16sp',
			},
			text : _ref[i],
			width : TILE_WIDTH,
			touchEnabled : false
		}));
	}
	calendar();
}

//add back button
$.shift.addEventListener('android:back', function(e) {
	var confirm = Ti.UI.createAlertDialog({
		title : '看護アプル',
		message : '終了しますか？',
		buttonNames : ['はい', 'いいえ']
	});
	confirm.addEventListener('click', function(e) {
		if (e.index == 0) {
			Titanium.Android.currentActivity.finish();
		}
	});
	confirm.show();
});

//add swipe left right for calendar
$.calendar.addEventListener('swipe', function(e) {
	if (e.direction == 'left')
		doNextMonth();
	else if (e.direction == 'right')
		doPrevMonth();
});

