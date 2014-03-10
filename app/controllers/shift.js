//create collection users
var selectedDate, _calendar, dateIsEvent, shiftOfMonth = [], moment = require('alloy/moment'), month = moment(), dayOffset, selectedShift = [], dateShiftDB = {}, shiftMonthId, allShifts = {}, args = arguments[0] || {};

if (args['date']) {
	var _date = (args['date']).split('-');
	month = moment(args['date']);
	$.scheduleInfo.setVisible(false);
	$.prevMonth.setVisible(false);
	$.nextMonth.setVisible(false);
	$.scheduleInfo.removeAllChildren();
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
	allShifts = func.loadShiftsList($.shiftList, selectedShift);

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

		//update shift to database
		dateShiftDB[date] = selectedShift[1].id;
		if (selectedShift[1].id == 9) {
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

