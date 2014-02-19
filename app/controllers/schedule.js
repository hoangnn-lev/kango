//create collection users
var day, choiceDay, activeWidget, dateIsEvent, shiftOfMonth = [], moment = require('alloy/moment'), currentMonth = moment(), scheduleModel = Alloy.Collections.schedule, dayOffset = '', allShifts = {}, friendOfDay = {}, args = arguments[0] || {}, friendStyle = {
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
if (args['date']) {
	var _date = (args['date']).split('-');
	currentMonth = moment(args['date']);
	day = _date[2];
}

createCalendar();
func.checkFriendRequest();
getAllFriend();

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
	loadFriendByDay(day);
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
		friendOfDay[date[2]] = data[i].get('friend');
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

function loadFriendByDay(date) {

	var friend_name = friendOfDay[date];

	alert(friend_name);

	//
	// $.friend.removeAllChildren();
	// for (var i = 0, n = friend_name.length; i < n; ++i) {
	// $.friend.add(Ti.UI.createLabel({
	// text : friend_name[i],
	// width : Ti.UI.SIZE,
	// height : Ti.UI.SIZE,
	// right : '5dp',
	// top : '5dp',
	// color : "#676767",
	// textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
	// font : {
	// fontSize : '16sp'
	// }
	// }));
	// }

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

$.openAllFriend.addEventListener('click', function(e) {

	var r = 180;
	if (e.source.type == 'open') {
		e.source.type = 'close';
		$.groupAllFriend.setVisible(true);
		$.groupAllFriend.setHeight(Ti.UI.SIZE);
	} else {
		e.source.type = 'open';
		$.groupAllFriend.setVisible(false);
		$.groupAllFriend.setHeight(0);
		r = 0;
	}

	var t = Ti.UI.create2DMatrix();
	var spin = Titanium.UI.createAnimation();
	t = t.rotate(r);
	spin.transform = t;
	spin.duration = 200;
	this.animate(spin);

});

$.editFriend.addEventListener('click', function() {
	openView('friend');
});

function getAllFriend() {

	var friendCols = Alloy.Collections.friend;
	friendCols.fetch({
		query : 'SELECT * from friend'
	});
	var allFriend = friendCols.models;

	for (var i = 0, n = allFriend.length; i < n; ++i) {

		var label = Ti.UI.createLabel({
			text : ' ' + allFriend[i].get('name') + ' ',
			id : allFriend[i].get('id'),
			color : friendStyle['deactive']['text'],
			font : {
				fontSize : '16dp'
			},
			type : 'deactive',
			backgroundColor : friendStyle['deactive']['bg'],
			height : '30dp',
			width : Ti.UI.SIZE,
			left : '5dp',
			top : '5dp',
			border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
			borderRadius : 10,
			textAlign : 'center',
			className : 'friend-item'
		});
		label.addEventListener('click', function(e) {

			if (e.source.type == 'deactive') {
				e.source.type = 'active';
				this.setColor(friendStyle['active']['text']);
				this.setBackgroundColor(friendStyle['active']['bg']);
			} else {
				e.source.type = 'deactive';
				this.setColor(friendStyle['deactive']['text']);
				this.setBackgroundColor(friendStyle['deactive']['bg']);
			}
			updateFriend(e.source.text, e.source.id);

		});
		$.allFriend.add(label);
	}
}

function updateFriend(name, id) {
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
			color : "#676767",
			textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
			font : {
				fontSize : '16sp'
			}
		}));

	}
	var friendId = JSON.stringify(Object.keys(friendInSchedule));

}

//add swipe left right for calendar
// $.calendar.addEventListener('swipe', function(e) {
// if (e.direction == 'left')
// doNextMonth();
// else if (e.direction == 'right')
// doPrevMonth();
// });
