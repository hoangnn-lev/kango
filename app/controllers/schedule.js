//create collection users
Alloy.Collections.schedule = Alloy.createCollection('schedule');
var day, choiceDay, activeWidget, dayId, holidaysDate, holidayItem, moment = require('alloy/moment'), currentMonth = moment(), scheduleModel = Alloy.Collections.schedule, dayOffset;

//create collection configs and get start day
Alloy.Collections.configs = Alloy.createCollection('configs');
var configs = Alloy.Collections.configs;
configs.fetch({
	query : 'select id,cg_value from configs where cg_name="dayOffset"'
});

dayOffset = configs.models[0].get('cg_value');

_initCalendar();
refreshCalendar();

_initFriend();

//set activetab
$.tabMenu.getView('schedule').setImage(Ti.API.TABMENU['schedule_active']);

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
	getScheduleByMonthYear(currentMonth.format('MM'), currentMonth.format('YYYY'));
	var current = $.calendar.children[0];
	activeWidget = Alloy.createWidget('jp.co.mountposition.calendar', 'widget', {
		period : currentMonth,
		holidays : holidaysDate,
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
		getListScheduleByDate(wday.format('YYYY-MM-DD'));
	}
}

/*
 * function getScheduleByMonthYear
 * Get schedule by month
 * input : month
 * output : void
 * */
function getScheduleByMonthYear(month, year) {
	holidaysDate = dayId = [];
	holidayItem = {};

	scheduleModel.fetch({
		query : 'SELECT * from schedule where _date BETWEEN  "' + year + '-' + month + '-01" and "' + year + '-' + month + '-31"'
	});

	var n = scheduleModel.models.length;
	var data = scheduleModel.models;
	for (var i = 0; i < n; ++i) {
		var item = data[i].toJSON();
		holidaysDate.push({
			'date' : item._date
		});
		//item = JSON.parse(item._schedule);
		holidayItem[item._date] = JSON.parse(item._schedule);
		dayId[item._date] = item.id;
	}
}

/*
 * function getListScheduleByDate
 * Get schedule list
 * input : date
 * output : void
 * */
function getListScheduleByDate(date) {
	$.scheduleList.removeAllChildren();

	var data = holidayItem[date];
	var _id = dayId[date];
	if (!data)
		return;
	var tableView = Ti.UI.createTableView({
		top : 0,
		left : 20,
		right : 20,
		height : 'auto'
	});
	var item = [];

	for (var i = 0, n = data.length; i < n; ++i) {
		var row = Ti.UI.createTableViewRow({
			title : data[i].title,
			content : data[i].content,

		});

		if (data[i].img) {
			var scheduleTitle = Ti.UI.createLabel({
				height : Ti.UI.SIZE,
				top : '10dp',
				text : data[i].title,
				bottom : '10dp',
				color : '#666',
				font : {
					fontSize : '20sp'
				},
				left : '40dp'
			});

			row.add(Ti.UI.createImageView({
				height : '32dp',
				image : data[i].img,
				left : 0
			}));
		} else {
			var scheduleTitle = Ti.UI.createLabel({
				height : Ti.UI.SIZE,
				top : '10dp',
				text : data[i].title,
				bottom : '10dp',
				color : '#666',
				font : {
					fontSize : '20sp'
				},
				left : '0'
			});
		}

		row.add(scheduleTitle);
		item.push(row);
	}
	tableView.setData(item);
	tableView.addEventListener('click', function(e) {

		var confirm = Ti.UI.createAlertDialog({
			title : e.source.title,
			buttonNames : ['削除', '編集', 'OK'],
			message : e.source.content
		});
		var index = e.index;
		var thisRow = this;
		confirm.addEventListener('click', function(e) {
			if (e.index == 0) {
				var updateData = [];
				for (var i = 0, n = data.length; i < n; i++) {

					if (index != i)
						updateData.push(data[i]);
					else
						thisRow.deleteRow(index);
				}
				data = updateData;
				//update to database
				updateRow(updateData, _id, date);
			} else if (e.index == 1) {
				Ti.API.rowIndex = index;
				editScheduleView();
			}
		});
		confirm.show();

	});
	$.scheduleList.add(tableView);
}

/*
 * function updateRow
 * update row when delete
 * input : object
 * output : void
 * */
function updateRow(data, _id, _date) {
	scheduleModel.fetch();

	var _schedule = JSON.stringify(data);

	var schedule = Alloy.createModel('schedule', {
		id : _id,
		_schedule : _schedule,
		_date : _date
	});

	scheduleModel.add(schedule);

	if (data.length > 0) {
		schedule.save();
	} else {
		schedule.destroy();
	}
	refreshCalendar();
}

/*
 * function editScheduleView
 * add schedule on date
 * input : date, object
 * output : void
 * */
function editScheduleView(e) {
	Ti.API.day = choiceDay.format('YYYY-MM-DD');
	Ti.API.holidayItem = holidayItem[Ti.API.day];
	Ti.API.id = dayId[Ti.API.day];
	var nextWin = Alloy.createController('schedule_edit').getView();
	nextWin.callback = function() {
		refreshCalendar();
	};
	activityScreen.nextWindow(nextWin);
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
		}));
	}
}

/*
 * function _initFriend
 * friend request check and add friend
 * input : null
 * output : void
 * */
function _initFriend() {
	//check friend request onload
	frd.checkFriendRequest();

	//add friend request onload
	var currentIntentData = [];
	var currentActivity = Ti.Android.currentActivity;

	//add friend request from url
	frd.addNewFriend(currentActivity.getIntent().getData());

	//check and friend request from url
	currentActivity.addEventListener('newintent', function(e) {
		var newintent = e.intent;
		currentIntentData = newintent.getData();
		frd.addNewFriend(currentIntentData);
	});

	//pending push data
	gcm.registerC2dm({
		callback : function(e) {
			var data = e.data;
			if (data.channel == 'friend_request') {
				frd.friendRequestC2dm(data);
			}
		}
	});
}

