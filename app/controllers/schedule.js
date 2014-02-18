//create collection users
var day, choiceDay, activeWidget, dateIsEvent, shiftOfMonth = [], moment = require('alloy/moment'), currentMonth = moment(), scheduleModel = Alloy.Collections.schedule, dayOffset = '', allShifts = {}, args = arguments[0] || {};

if (args['date']) {
	var _date = (args['date']).split('-');
	currentMonth = moment(args['date']);
	day = _date[2];
}

createCalendar();
func.checkFriendRequest();

/*
 * function clickCalendar
 * event click calendar
 * input : null
 * output : void
 * */

function clickCalendar(e) {

	var wday = activeWidget.selectedDate();
	choiceDay = wday;
	var gdate = wday.format('MM / DD');
	day = wday.format('DD');

	if (gdate != $.scheduleDateInfo.getText()) {

		$.scheduleDateInfo.setText(gdate);
		$.dayName.setText(func.convertDayName(wday.format('dddd')));

		//create shift label
		$.shiftLabel.removeAllChildren();
		if (shiftOfMonth[day]) {
			$.shiftLabel.add(Ti.UI.createLabel({
				text : shiftOfMonth[day]['text'],
				left : '120dp',
				backgroundColor : shiftOfMonth[day]['color'],
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

		//get event by day
		getEvent(day);
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
	loadCalendarBody();
}

/*
 * function doNextMonth
 * back month calendar
 * input : null
 * output : void
 * */
function doNextMonth() {
	currentMonth = currentMonth.add('months', 1);
	loadCalendarBody();
}

/*
 * function getEvent
 * Get schedule list
 * input : date
 * output : void
 * */
function getEvent(day) {

	$.scheduleList.removeAllChildren();
	var id = dateIsEvent[day];
	if (!id)
		return;

	var calendar_shift = Alloy.Collections.schedule_detail;
	calendar_shift.fetch({
		query : 'select * from schedule_detail  where schedule_id = ' + id
	});

	var data = calendar_shift.models;

	var tableView = Ti.UI.createTableView({
		top : 0,
		height : 'auto',
		separatorColor : '#f5f1e9'
	});
	var item = [];

	for (var i = 0, n = data.length; i < n; ++i) {
		var row = Ti.UI.createTableViewRow({
			id : data[i].get('id'),
			selectionStyle : 'none',
			selectedBackgroundColor : 'transparent',
			backgroundColor : '#fff',
			left : '7dp',
			right : '7dp',
			className : 'row-event'
		});

		if (data[i].get('img')) {
			var scheduleTitle = Ti.UI.createLabel({
				height : Ti.UI.SIZE,
				top : '10dp',
				text : data[i].get('title'),
				bottom : '10dp',
				color : '#676767',
				font : {
					fontSize : '16sp'
				},
				touchEnabled : false,
				left : '35dp',
				className : 'title-event'
			});

			row.add(Ti.UI.createImageView({
				height : '20dp',
				image : data[i].get('img'),
				left : '10dp',
				touchEnabled : false,
				className : 'img-event'
			}));
		} else {
			var scheduleTitle = Ti.UI.createLabel({
				height : Ti.UI.SIZE,
				top : '10dp',
				text : data[i].get('title'),
				bottom : '10dp',
				color : '#676767',
				font : {
					fontSize : '16sp'
				},
				left : '10dp',
				touchEnabled : false,
				className : 'title-event-no-img'
			});
		}

		if (data[i].get('start_time')) {
			row.add(Ti.UI.createLabel({
				text : data[i].get('start_time') + '~' + data[i].get('end_time'),
				font : {
					fontSize : '16dp'
				},
				touchEnabled : false,
				color : '#676767',
				right : '10dp'
			}));
		}

		row.add(scheduleTitle);
		item.push(row);
	}
	tableView.setData(item);
	tableView.addEventListener('click', function(e) {

		var postdata = {
			day : choiceDay.format('YYYY-MM-DD'),
			id : e.source.id
		};
		openView('edit_event', {
			data : postdata
		});

	});
	$.scheduleList.add(tableView);
}

/*
 * function editScheduleView
 * add schedule on date
 * input : date, object
 * output : void
 * */
function addEvent(e) {

	openView('edit_event', {
		data : {
			day : choiceDay.format('YYYY-MM-DD')
		}
	});
}

/*
 * function loadCalendarBody
 * force refreshing new list
 * input : null
 * output : void
 * */
function loadCalendarBody() {

	var calendar_shift = Alloy.Collections.calendar_shift;
	day = currentMonth.format('DD');
	//load shift by month
	calendar_shift.fetch({
		query : 'select * from calendar_shift  where month_year="' + currentMonth.format('MM-YYYY') + '"'
	});

	var data = [];
	//reset
	shiftOfMonth = [];

	if (calendar_shift.models[0]) {

		data = JSON.parse(calendar_shift.models[0].get('date_shift'));
		for (var key in data) {
			shiftOfMonth[key] = allShifts[data[key]];
		}

	}

	if (choiceDay)
		day = choiceDay.format('DD');

	if (activeWidget) {
		activeWidget = null;
	}

	getScheduleMonth(currentMonth.format('MM'), currentMonth.format('YYYY'));

	var current = $.calendar.children[0];
	activeWidget = func.createCalendarBody(currentMonth, dateIsEvent, shiftOfMonth, dayOffset);

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
 * function getScheduleMonth
 * Get schedule by month
 * input : month
 * output : void
 * */
function getScheduleMonth(month, year) {

	dateIsEvent = {};

	scheduleModel.fetch({
		query : 'SELECT * from schedule where date BETWEEN  "' + year + '-' + month + '-01" and "' + year + '-' + month + '-31"'
	});

	var data = scheduleModel.models, n = data.length;

	for (var i = 0; i < n; ++i) {
		var date = (data[i].get('date')).split('-');
		dateIsEvent[date[2]] = data[i].get('id');
	}

}

/*
 * function createCalendar
 * render week by config
 * input : null
 * output : void
 * */
function createCalendar() {

	allShifts = func.loadShiftsList();

	//create collection configs and get start day
	Alloy.Collections.configs = Alloy.createCollection('configs');
	var configs = Alloy.Collections.configs;
	configs.fetch({
		query : 'select id,cg_value from configs where cg_name="dayOffset"'
	});

	//check start with monday
	dayOffset = configs.models[0].get('cg_value');

	func.createCalendarDay(dayOffset, $.days);
	loadCalendarBody();
}

/*
 * function loadFriendByDay
 * Get schedule list
 * input : date
 * output : void
 * */
loadFriendByDay();
function loadFriendByDay() {

	var friend_data = ['大島', '黒運', '上野', '春'];

	for (var i = 0; i < 4; ++i) {
		var left = '0';
		if (i > 0) {
			left = i * 25;
		}
		var label = Ti.UI.createLabel({
			text : ' ' + friend_data[i] + ' ',
			color : '#68790b',
			font : {
				fontSize : '16dp'
			},
			backgroundColor : '#d7e682',
			height : '30dp',
			//width : '23%',
			width : Ti.UI.SIZE,

			left : '5dp',
			border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			borderRadius : 10,
			textAlign : 'center',
			className : 'friend-item'
		});

		$.friend.add(label);
	}
}

//add back button
$.schedule.addEventListener('android:back', function(e) {
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
// $.calendar.addEventListener('swipe', function(e) {
// if (e.direction == 'left')
// doNextMonth();
// else if (e.direction == 'right')
// doPrevMonth();
// });

