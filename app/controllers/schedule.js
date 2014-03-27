//create collection users
var on_flag = true, day, showMember = 1, choiceDay, activeWidget, dateIsEvent, dateIsFriendNoEvent, shiftOfMonth = [], moment = require('alloy/moment'), currentMonth = moment(), scheduleModel = Alloy.Collections.schedule, dayOffset = '', _allFriend = {}, allShifts = {}, friendOfDay = {}, args = arguments[0] || {}, friendStyle = {
	active : {
		bg : '#d7e682',
		text : '#68790b'
	},
	deactive : {
		bg : '#ccc',
		text : '#747474'
	}
};
var friendInSchedule = {};
var globalSelectedDate = func.globalSelectedDate();

if (args['date']) {
	var _date = (args['date']).split('-');
	currentMonth = moment(args['date']);
	day = _date[2];
} else if (globalSelectedDate) {
	currentMonth = moment(globalSelectedDate.format('YYYY-MM-DD'));
	choiceDay = globalSelectedDate;
}

getAllFriend();
createCalendar();

/*
 * function clickCalendar
 * event click calendar
 * input : null
 * output : void
 * */

function clickCalendar(e) {

	var wday = choiceDay = activeWidget.selectedDate();
	var gdate = wday.format('MM / DD');
	
	day = wday.format('DD');

	if (gdate != $.scheduleDateInfo.getText()) {

		$.scheduleDateInfo.setText(gdate);
		$.dayName.setText(func.convertDayName(wday.format('dddd')));

		//create shift label
		$.shiftLabel.removeAllChildren();
		var _sDate = wday.format('D');
		if (shiftOfMonth[_sDate]) {
			$.shiftLabel.add(Ti.UI.createLabel({
				text : shiftOfMonth[_sDate]['text'],
				left : '115dp',
				backgroundColor : shiftOfMonth[_sDate]['color'],
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

		//get event by day
		getEvent(day);

	}

	func.globalSelectedDate(wday, 'shift');
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

	loadFriendByDay(day);
	$.scheduleList.removeAllChildren();

	var id = dateIsEvent[day];
	if (!id) {
		$.scheduleList.add(Ti.UI.createLabel({
			id : 'empty',
			text : '予定はありません',
			font : {
				fontSize : '13dp',
			},
			color : '#676767',
			height : '30dp',
			backgroundColor : '#fff',
			width : Ti.UI.SIZE,
			left : '10dp'
		}));
		return;
	}
	var calendar_shift = Alloy.Collections.schedule_detail;
	calendar_shift.fetch({
		query : 'select * from schedule_detail  where schedule_id = ' + id
	});

	var data = calendar_shift.models;
	if (!data[0]) {
		$.scheduleList.add(Ti.UI.createLabel({
			id : 'empty',
			text : '予定はありません',
			font : {
				fontSize : '13dp',
			},
			color : '#676767',
			height : '30dp',
			backgroundColor : '#fff',
			width : Ti.UI.SIZE,
			left : '10dp'
		}));
		return;
	}

	var tableView = Ti.UI.createView({
		top : 0,
		height : Ti.UI.SIZE,
		separatorColor : '#f5f1e9',
		layout : 'vertical'
	});
	var item = [];

	for (var i = 0, n = data.length; i < n; ++i) {

		var row = Ti.UI.createView({
			id : data[i].get('id'),
			height : Ti.UI.SIZE,
			backgroundColor : '#fff',
			className : 'row-event'
		});

		var event_title = data[i].get('title');
		if (event_title.length > 12 && event_title.length != 13) {
			event_title = event_title.substr(0, 12) + '...';
		}

		var scheduleTitle = Ti.UI.createLabel({
			height : Ti.UI.SIZE,
			top : '8dp',
			text : event_title,
			bottom : '8dp',
			color : '#676767',
			font : {
				fontSize : '13dp'
			},
			touchEnabled : false,
			className : 'title-event'
		});

		if (data[i].get('img')) {

			scheduleTitle.setLeft('50dp');
			row.add(Ti.UI.createImageView({
				width : '25dp',
				image : data[i].get('img'),
				left : '10dp',
				touchEnabled : false,
				className : 'img-event'
			}));

		} else {
			scheduleTitle.setLeft('10dp');
		}

		if (data[i].get('start_time') || data[i].get('end_time')) {
			row.add(Ti.UI.createLabel({
				text : data[i].get('start_time') + '~' + data[i].get('end_time'),
				font : {
					fontSize : '13dp'
				},
				touchEnabled : false,
				color : '#676767',
				right : '10dp'
			}));
		}

		row.add(scheduleTitle);
		row.add(Ti.UI.createLabel({
			backgroundColor : '#eeeeee',
			height : '1sp',
			width : Ti.UI.FILL,
			bottom : 0
		}));
		tableView.add(row);
	}

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
	var selectedDay = currentMonth.format('D');

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

	if (choiceDay) {
		selectedDay = choiceDay.format('D');
		day = choiceDay.format('DD');
	}

	if (activeWidget) {
		activeWidget = null;
	}

	getScheduleMonth(currentMonth.format('MM'), currentMonth.format('YYYY'));

	var current = $.calendar.children[0];
	activeWidget = func.createCalendarBody(currentMonth, dateIsEvent, shiftOfMonth, dayOffset, dateIsFriendNoEvent);

	var c = activeWidget.getView();
	var gdate = activeWidget.calendarMonth().format('YYYY-MM-MMM').split('-');

	$.year.setText(gdate[0]);
	$.month.setText(gdate[1]);
	$.monthName.setText(gdate[2].toUpperCase());

	$.calendar.add(c);

	activeWidget.select(selectedDay);
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
	dateIsFriendNoEvent = {};
	dateIsFriendNoEvent = {};
	friendOfDay = {};
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
		friendOfDay[date[2]] = data[i].get('friend');
	}
}

function checkIsEvent(id) {
	var calendar_shift = Alloy.Collections.schedule_detail;
	calendar_shift.fetch({
		query : 'select id from schedule_detail  where schedule_id = ' + id
	});
	return (calendar_shift.models[0]) ? 1 : 0;
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
		query : 'select id,cg_value from configs where cg_name="dayOffset" or cg_name="showMember"'
	});

	//check start with monday
	dayOffset = configs.models[0].get('cg_value');

	if (configs.models[1] && configs.models[1].get('cg_value') != 1) {
		$.blockFriend.setVisible(false);
		$.blockFriend.setHeight(0);
	}

	func.createCalendarDay(dayOffset, $.days);
	loadCalendarBody();

}

/*
 * function loadFriendByDay
 * Get schedule list
 * input : date
 * output : void
 * */

function loadFriendByDay(date) {
	$.friend.removeAllChildren();
	friendInSchedule = {};
	if (friendOfDay[date]) {
		var friend = JSON.parse(friendOfDay[date]);

		if (friend) {
			for (var i = 0, n = friend.length; i < n; ++i) {

				if (_allFriend[friend[i]]) {
					friendInSchedule[friend[i]] = _allFriend[friend[i]];
					$.friend.add(Ti.UI.createLabel({
						text : _allFriend[friend[i]],
						width : Ti.UI.SIZE,
						id : friend[i],
						height : Ti.UI.SIZE,
						right : '5dp',
						top : '5dp',
						color : "#735832",
						textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
						font : {
							fontSize : '13sp'
						}
					}));
				}
			}
		}
	}

	var all = $.allFriend.children;

	for (var j = 0, m = all.length; j < m; ++j) {

		var status = friendInSchedule[all[j].id] ? 'active' : 'deactive';
		all[j].type = status;
		all[j].setColor(friendStyle[status]['text']);
		all[j].setBackgroundColor(friendStyle[status]['bg']);

	}
}

//add back button
$.schedule.addEventListener('android:back', function(e) {
	var confirm = Ti.UI.createAlertDialog({
		title : 'ペリカレ！',
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

function openAllFriend() {

	$.groupAllFriend.animate({
		height : on_flag ? Ti.UI.SIZE : 0,
		duration : 300,
		curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});

	$.openAllFriend.setImage( on_flag ? '/icons/btn_Close.png' : '/icons/btn_Open.png');

	on_flag = !on_flag;
	
	$.friend.animate({
		height : on_flag ? Ti.UI.SIZE : 0,
		duration : 300,
		curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});

}

$.editFriend.addEventListener('click', function() {
	openView('friend', {
		tab : 2
	});
});

function getAllFriend() {

	var friendCols = Alloy.Collections.friend;
	friendCols.fetch({
		query : 'SELECT * from friend where flag=1 and name!=""'
	});
	var getAllFriend = friendCols.models;

	for (var i = 0, n = getAllFriend.length; i < n; ++i) {

		_allFriend[getAllFriend[i].get('id')] = getAllFriend[i].get('name');

		var label = Ti.UI.createLabel({
			text : '   ' + getAllFriend[i].get('name') + '   ',
			id : getAllFriend[i].get('id'),
			color : friendStyle['deactive']['text'],
			font : {
				fontSize : '13dp'
			},
			type : 'deactive',
			backgroundColor : friendStyle['deactive']['bg'],
			height : '20dp',
			width : Ti.UI.SIZE,
			left : '5dp',
			top : '5dp',
			border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			borderRadius : 10,
			textAlign : 'center',
			className : 'friend-item'
		});
		label.addEventListener('click', function(e) {

			var type = e.source.type == 'deactive' ? 'active' : 'deactive';
			e.source.type = type;
			this.setColor(friendStyle[type]['text']);
			this.setBackgroundColor(friendStyle[type]['bg']);

			updateFriend(e.source.text, e.source.id);

		});
		$.allFriend.add(label);
	}
}

function updateFriend(name, id) {

	name = name.replace(/(^\s+|\s+$)/g, '');
	if (friendInSchedule[id]) {
		delete friendInSchedule[id];

		var getFriend = $.friend.children;

		for (var i = 0, n = getFriend.length; i < n; ++i) {
			if (getFriend[i].id == id)
				$.friend.remove(getFriend[i]);
		}
	} else {
		friendInSchedule[id] = name;
		$.friend.add(Ti.UI.createLabel({
			text : name,
			id : id,
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			right : '5dp',
			top : '5dp',
			color : "#735832",
			textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
			font : {
				fontSize : '13sp'
			}
		}));

	}

	var friendId = JSON.stringify(Object.keys(friendInSchedule));

	friendOfDay[day] = friendId;

	//save to database
	var scheduleModel = Alloy.Collections.schedule;

	var data = {
		date : choiceDay.format('YYYY-MM-DD'),
		friend : friendId
	};
	if (dateIsEvent[day]) {
		data['id'] = dateIsEvent[day];
	}

	var schedule = Alloy.createModel('schedule', data);
	scheduleModel.add(schedule);
	schedule.save();

	if (!dateIsEvent[day]) {
		dateIsEvent[day] = schedule.id;
	}

}

//add swipe left right for calendar
$.calendar.addEventListener('swipe', function(e) {
	if (e.direction == 'left')
		doNextMonth();
	else if (e.direction == 'right')
		doPrevMonth();
});
$.prevMonth.addEventListener('click', function() {
	doPrevMonth();
});
$.nextMonth.addEventListener('click', function() {
	doNextMonth();
});

