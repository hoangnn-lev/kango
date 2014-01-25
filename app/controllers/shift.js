//create collection users
Alloy.Collections.schedule = Alloy.createCollection('schedule');
var day, choiceDay, activeWidget, moment = require('alloy/moment'), currentMonth = moment(), scheduleModel = Alloy.Collections.schedule, dayOffset;

//create collection configs and get start day
Alloy.Collections.configs = Alloy.createCollection('configs');
var configs = Alloy.Collections.configs;
configs.fetch({
	query : 'select id,cg_value from configs where cg_name="dayOffset"'
});

dayOffset = configs.models[0].get('cg_value');

_initCalendar();
refreshCalendar();

//set activetab
//$.tabMenu.getView('schedule').setImage(Ti.API.TABMENU['schedule_active']);

//add back button
$.shift.addEventListener('android:back', function(e) {
	openView('schedule');
});

//add swipe left right for calendar
$.calendar.addEventListener('swipe', function(e) {
	if (e.direction == 'left')
		doNextMonth();
	else if (e.direction == 'right')
		doPrevMonth();
});

/*
 * function doPrevMonth
 * pre month calendar
 * input : null
 * output : void
 * */
function doPrevMonth() {
	currentMonth = currentMonth.subtract('months', 1);
	refreshCalendar();
}

/*
 * function doNextMonth
 * back month calendar
 * input : null
 * output : void
 * */
function doNextMonth() {
	currentMonth = currentMonth.add('months', 1);
	refreshCalendar();
}

/*
 * function getCalendar
 * Create caledar
 * input : month
 * output : void
 * */
function getCalendar(currentMonth) {
	if (activeWidget) {
		activeWidget = null;
	}

	//get day schedule
	var current = $.calendar.children[0];
	activeWidget = Alloy.createWidget('jp.co.mountposition.calendar', 'widget', {
		period : currentMonth,
		//holidays : holidaysDate,
		dayOffset : dayOffset
	});

	var c = activeWidget.getView();
	$.currentDate.setText(activeWidget.calendarMonth().format('YYYY年MM月'));
	$.calendar.add(c);

	activeWidget.select(day);
	$.calendar.fireEvent('click');

	if (current)
		$.calendar.remove(current);
}

/*
 * function clickCalendar
 * Create event click caledar
 * input : e
 * output : void
 * */
function clickCalendar(e) {
	if (!activeWidget)
		return
		void 0;

	var wday = activeWidget.selectedDate();
	choiceDay = wday;
	var gdate = wday.format('YYYY年MM月DD日');
	day = wday.format('DD');
	if (gdate != $.scheduleDateInfo.getText()) {
		$.scheduleDateInfo.setText(gdate);
	}
}

/*
 * function refreshCalendar
 * force refreshing new list
 * input : null
 * output : void
 * */
function refreshCalendar() {
	$.scheduleDateInfo.setText('Loading...');
	if (choiceDay)
		day = choiceDay.format('DD');
	else
		day = currentMonth.format('DD');

	getCalendar(currentMonth);
}

/*
 * function _initCalendar
 * render week by config
 * input : null
 * output : void
 * */
function _initCalendar() {
	var _ref = ['日', '月', '火', '水', '木', '金', '土'];
	if (dayOffset == 1) {
		_ref = ['月', '火', '水', '木', '金', '土', '日'];
	}
	var TILE_WIDTH = Math.floor(Ti.Platform.displayCaps.platformWidth / 7);

	for (var i = 0, _len = _ref.length; i < _len; i++) {

		$.days.add(Ti.UI.createLabel({
			color : '#fff',
			textAlign : 'center',
			font : {
				fontSize : '18sp',
			},
			text : _ref[i],
			width : TILE_WIDTH,
			touchEnabled : false
		}));
	}
}

