//create collection users
var selectedDate, selectedDay, lastDayOfMonth = 0, _calendar, dateIsEvent, dateIsFriendNoEvent, shiftOfMonth = [], moment = require('alloy/moment'), month = moment(), dayOffset, dateShiftDB = {}, shiftMonthId, allShifts = {}, args = arguments[0] || {};
var globalSelectedDate = func.globalSelectedDate();

if (args['date']) {
	var _date = (args['date']).split('-');
	month = moment(args['date']);
	$.scheduleInfo.setVisible(false);
	$.prevMonth.setVisible(false);
	$.nextMonth.setVisible(false);
	$.scheduleInfo.removeAllChildren();
} else if (globalSelectedDate) {
	month = moment(globalSelectedDate.format('YYYY-MM-DD'));
}

createCalendar();

/*
 * function createCalendar
 * Create header calendar and first build calendar
 * input : null
 * output : void
 * */
function createCalendar() {

	//create shift list
	allShifts = func.loadShiftsList($.shiftList);

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
	dateShiftDB = {};
	shiftMonthId = null;

	var calendar_shift = Alloy.Collections.calendar_shift;

	//load shift by month
	calendar_shift.fetch({
		query : 'select * from calendar_shift  where month_year="' + month.format('MM-YYYY') + '"'
	});

	var data = [];

	if (calendar_shift.models[0]) {

		shiftMonthId = calendar_shift.models[0].get('id');
		data = JSON.parse(calendar_shift.models[0].get('date_shift'));

		for (var key in data) {

			dateShiftDB[key] = data[key];
			shiftOfMonth[key] = allShifts[data[key]];
			shiftOfMonth[key]['id'] = data[key];
		}

	}
	getScheduleMonth(month.format('MM'), month.format('YYYY'));

	_calendar = func.createCalendarBody(month, dateIsEvent, shiftOfMonth, dayOffset, dateIsFriendNoEvent);
	var gdate = _calendar.calendarMonth().format('YYYY-MM-MMM').split('-');

	$.year.setText(gdate[0]);
	$.month.setText(gdate[1]);
	$.monthName.setText(gdate[2].toUpperCase());

	var oldCalendar = $.calendar.children[0];
	$.calendar.add(_calendar.getView());

	//remove calendar after next/prev month
	if (oldCalendar)
		$.calendar.remove(oldCalendar);

	if (!selectedDay) {
		selectedDay = month.format('D');
	}

	_calendar.select(selectedDay);
	$.calendar.fireEvent('click');

	lastDayOfMonth = month.add('months', 1).date(1).subtract('days', 1).format('DD');
}

/*
 * function getScheduleMonth
 * Get schedule by month
 * input : month
 * output : void
 * */
function getScheduleMonth(month, year) {

	var scheduleModel = Alloy.Collections.schedule;
	dateIsEvent = {};
	dateIsFriendNoEvent = {};
	scheduleModel.fetch({
		query : 'SELECT * from schedule where date BETWEEN  "' + year + '-' + month + '-01" and "' + year + '-' + month + '-31"'
	});

	var data = scheduleModel.models, n = data.length;

	for (var i = 0; i < n; ++i) {
		var date = (data[i].get('date')).split('-');
		dateIsEvent[date[2]] = data[i].get('id');
		if (!checkIsEvent(data[i].get('id'))) {
			dateIsFriendNoEvent[date[2]] = '1';
		}
	}
}

function checkIsEvent(id) {
	var calendar_shift = Alloy.Collections.schedule_detail;
	calendar_shift.fetch({
		query : 'select id from schedule_detail  where schedule_id = ' + id
	});
	return (calendar_shift.models[0]) ? 1 : 0;
}

function clickCalendar(e) {

	selectedDate = _calendar.selectedDate();
	selectedDay = selectedDate.format('D');

	$.shiftDateInfo.setText(selectedDate.format('MM / DD'));
	$.dayName.setText(func.convertDayName(selectedDate.format('dddd')));
	$.shiftLabel.removeAllChildren();

	var date = selectedDate.format('D');
	if (shiftOfMonth[date]) {

		$.shiftLabel.add(Ti.UI.createLabel({
			text : shiftOfMonth[date]['text'],
			left : '115dp',
			backgroundColor : shiftOfMonth[date]['color'],
			color : '#fff',
			width : '50dp',
			font : {
				fontSize : '12sp'
			},
			textAlign : 'center',
			border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			borderRadius : 10,
			height : Ti.UI.SIZE
		}));

	}
	func.globalSelectedDate(selectedDate, 'schedule');
}

function doPrevMonth() {

	month = month.subtract('months', 1);

	if (month.format('YYYY') < 2010) {
		month = month.add('months', 1);
		return;
	}

	loadCalendarBody();
}

function doNextMonth() {
	month = month.add('months', 1);
	loadCalendarBody();
}

function updateShift(date, shift_source) {

	var _get_shift_selected = {
		text : shift_source.title,
		color : shift_source.backgroundColor
	};

	//update shiftOfMonth
	shiftOfMonth[date] = _get_shift_selected;
	_get_shift_selected['id'] = shift_source.id;
	_calendar.setShift(date, _get_shift_selected);

	//update shift to database
	dateShiftDB[date] = shift_source.id;
	if (shift_source.id == 13) {
		delete shiftOfMonth[date];
		delete dateShiftDB[date];
	}

	Alloy.Collections.calendar_shift.fetch();

	var _shift_data = {
		month_year : month.format('MM-YYYY'),
		date_shift : JSON.stringify(dateShiftDB)
	};
	if (shiftMonthId) {
		_shift_data['id'] = shiftMonthId;
	}

	var shift = Alloy.createModel('calendar_shift', _shift_data);

	Alloy.Collections.calendar_shift.add(shift);
	shift.save();

	if (!shiftMonthId)
		shiftMonthId = shift.get('id');

	delete_view('schedule');

}

$.shiftList.addEventListener('click', function(e) {
	if (e.source.id != 'shiftList') {

		updateShift(selectedDay, e.source);
		selectedDay = parseInt(selectedDay, 10) + 1;

		if (selectedDay > lastDayOfMonth) {
			doNextMonth();
			selectedDay = selectedDay = 1;
		}
		_calendar.select(selectedDay);
		$.calendar.fireEvent('click');
	}

});
//add back button
$.shift.addEventListener('android:back', function(e) {
	Ti.API.activeTab = 2;
	openView('schedule');
});

//add swipe left right for calendar
$.calendar.addEventListener('swipe', function(e) {
	if (e.direction == 'left')
		doNextMonth();
	else if (e.direction == 'right')
		doPrevMonth();
});
$.shiftSetting.addEventListener('click', function(e) {
	openView('shift_setting', {
		tab : 1
	});
});

$.prevMonth.addEventListener('click', function() {
	doPrevMonth();
});
$.nextMonth.addEventListener('click', function() {
	doNextMonth();
});

