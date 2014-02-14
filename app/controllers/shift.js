//create collection users
Alloy.Collections.schedule = Alloy.createCollection('schedule');
Alloy.Collections.configs = Alloy.createCollection('configs');
var selectedDate, _calendar, dateIsEvent, shiftOfMonth = [], moment = require('alloy/moment'), month = moment(), dayOffset, selectedShift = [];

createCalendar();

/*
 * function createCalendar
 * Create header calendar and first build calendar
 * input : null
 * output : void
 * */
function createCalendar() {

	var configs = Alloy.Collections.configs;
	configs.fetch({
		query : 'select id,cg_value from configs where cg_name="dayOffset"'
	});
	dayOffset = configs.models[0].get('cg_value');
	func.createCalendarDay(dayOffset, $.days);
	loadCalendarBody();
}

/*
 * function calendar
 * force refreshing new list
 * input : null
 * output : void
 * */
function loadCalendarBody() {

	//reset
	shiftOfMonth = [];

	//test
	shiftOfMonth['18'] = {
		color : '#25b4a5',
		text : '夜勤',
		id : 2
	};
	shiftOfMonth['19'] = {
		color : '#25b4a5',
		text : '夜勤',
		id : 1
	};
	shiftOfMonth['12'] = {
		color : '#e68200',
		text : '日勤',
		id : 3
	};

	_calendar = func.createCalendarBody(month, dateIsEvent, shiftOfMonth, dayOffset);

	var gdate = _calendar.calendarMonth().format('YYYY-MM-MMM').split('-');

	$.year.setText(gdate[0]);
	$.month.setText(gdate[1]);
	$.monthName.setText(gdate[2].toUpperCase());

	var oldCalendar = $.calendar.children[0];
	$.calendar.add(_calendar.getView());

	//remove calendar after next/prev month
	if (oldCalendar)
		$.calendar.remove(oldCalendar);

	if (!selectedShift[1]) {
		_calendar.select(month.format('DD'));
		$.calendar.fireEvent('click');
	}

}

function clickCalendar(e) {

	selectedDate = _calendar.selectedDate();

	updateShift(selectedDate.format('D'));

	$.shiftDateInfo.setText(selectedDate.format('MM / DD'));
	$.dayName.setText(func.convertDayName(selectedDate.format('dddd')));

	$.shiftLabel.removeAllChildren();

	var date = selectedDate.format('D');
	if (shiftOfMonth[date]) {

		$.shiftLabel.add(Ti.UI.createLabel({
			text : shiftOfMonth[date]['text'],
			left : '120dp',
			backgroundColor : shiftOfMonth[date]['color'],
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

function doPrevMonth() {
	month = month.subtract('months', 1);
	loadCalendarBody();
}

function doNextMonth() {
	month = month.add('months', 1);
	loadCalendarBody();
}

/*
 * function getListScheduleByDate
 * Get schedule list
 * input : date
 * output : void
 * */

loadShiftList();
function loadShiftList() {

	var shift_data = [{
		id : '1',
		name : '日勤',
		color : '#f19c98'
	}, {
		id : '2',
		name : '夜勤',
		color : '#ffe498'
	}, {
		id : '3',
		name : '休み',
		color : '#b9e0a5'
	}, {
		id : '4',
		name : '早番',
		color : '#25b4a5'
	}, {
		id : '5',
		name : '遅番',
		color : '#e68200'
	}, {
		id : '6',
		name : '準夜勤',
		color : '#fff'
	}, {
		id : '7',
		name : '深夜',
		color : '#d3e1f5'
	}, {
		id : '8',
		name : '日長',
		color : '#cccccc'
	}, {
		id : '9',
		name : '入り',
		color : '#fff'
	}];
	var index = 0;
	for (var i = 0; i < 3; ++i) {

		for (var j = 0; j < 4; ++j) {

			if (index >= shift_data.length) {
				var button = Ti.UI.createButton({
					textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
					width : Ti.UI.FILL,
					font : {
						fontSize : '14dp'
					},
					height : Ti.UI.SIZE,
					title : 'シフト名を変える',
					backgroundColor : '#f3acbd',
					backgroundFocusedColor : '#ef8fa6',
					backgroundSelectedColor : '#ef8fa6',
					color : '#fff',
					border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
					borderRadius : 10,
					width : '46%',
					left : '5dp',
					height : '30dp',
				});
				button.addEventListener('click', function(e) {
					shiftSetting();
				});
				$.shiftList.add(Ti.UI.createLabel({
					height : '30dp',
					width : '23%',
					top : '5dp',
					bottom : '5dp',
					left : '5dp',
				}));
				$.shiftList.add(button);

				return;
			}

			var label = Ti.UI.createLabel({
				text : ' ' + shift_data[index].name + ' ',
				id : shift_data[index].id,
				color : '#676767',
				font : {
					fontSize : '14dp'
				},
				backgroundColor : shift_data[index].color,
				height : '30dp',
				width : '23%',
				top : '5dp',
				bottom : '5dp',
				left : '5dp',
				border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
				borderRadius : 10,
				borderWidth : 1,
				borderColor : '#f0f0f0',
				textAlign : 'center',
				className : 'shift-item'
			});

			index++;
			label.addEventListener('click', function(e) {

				if (selectedShift[0]) {
					selectedShift[0].setBorderColor('#f0f0f0');
				}
				this.setBorderColor('#676767');
				selectedShift[0] = this;
				selectedShift[1] = e.source;
			});
			$.shiftList.add(label);
		}

	}
}

function updateShift(date) {
	if (selectedShift[1]) {
		var _get_shift_selected = {
			text : selectedShift[1].text,
			color : selectedShift[1].backgroundColor
		};

		//update shiftOfMonth
		shiftOfMonth[date] = _get_shift_selected;
		_get_shift_selected['id'] = selectedShift[1].id;
		_calendar.setShift(date, _get_shift_selected);
	}

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

function shiftSetting(e) {
	openView('shift_setting');
}

