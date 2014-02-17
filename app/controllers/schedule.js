//create collection users
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

	if (gdate != $.scheduleDateInfo.getText()) {
		$.scheduleDateInfo.setText(gdate);
		$.dayName.setText(func.convertDayName(wday.format('dddd')));
		
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

		getListScheduleByDate(wday.format('YYYY-MM-DD'));
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
 * function getScheduleByMonthYear
 * Get schedule by month
 * input : month
 * output : void
 * */
function getScheduleByMonthYear(month, year) {
	holidaysDate = id = [];
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
		id[item._date] = item.id;
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
	if (!data)
		return;
	var tableView = Ti.UI.createTableView({
		top : 0,
		height : 'auto',
		separatorColor : '#f5f1e9'
	});
	var item = [];

	for (var i = 0, n = data.length; i < n; ++i) {
		var row = Ti.UI.createTableViewRow({
			//title : data[i].title,
			//content : data[i].content,
			data : data[i],
			id : id[date],
			selectionStyle : 'none',
			selectedBackgroundColor : 'transparent',
			backgroundColor : '#fff',
			left : '7dp',
			right : '7dp'
		});

		if (data[i].img) {
			var scheduleTitle = Ti.UI.createLabel({
				height : Ti.UI.SIZE,
				top : '10dp',
				text : data[i].title,
				bottom : '10dp',
				color : '#666',
				font : {
					fontSize : '18sp'
				},
				touchEnabled : false,
				left : '30dp'
			});

			row.add(Ti.UI.createImageView({
				height : '20dp',
				image : data[i].img,
				left : '5dp',
				touchEnabled : false,
			}));
		} else {
			var scheduleTitle = Ti.UI.createLabel({
				height : Ti.UI.SIZE,
				top : '10dp',
				text : data[i].title,
				bottom : '10dp',
				color : '#676767',
				font : {
					fontSize : '18sp'
				},
				left : '5dp',
				touchEnabled : false,
			});
		}

		row.add(Ti.UI.createLabel({
			text : '20:00',
			font : {
				fontSize : '18dp'
			},
			touchEnabled : false,
			color : '#676767',
			right : '10dp'
		}));
		row.add(scheduleTitle);
		item.push(row);
	}
	tableView.setData(item);
	tableView.addEventListener('click', function(e) {

		var postdata = e.source.data;
		postdata['day'] = choiceDay.format('YYYY-MM-DD');
		postdata['id'] = e.source.id;

		openView('edit_event', {
			data : postdata
		});

		// var confirm = Ti.UI.createAlertDialog({
		// title : e.source.title,
		// buttonNames : ['削除', '編集', 'OK'],
		// message : e.source.content
		// });
		// var index = e.index;
		// var thisRow = this;
		// var data = e.source.data;
		// confirm.addEventListener('click', function(e) {
		// if (e.index == 0) {
		// var updateData = [];
		// for (var i = 0, n = data.length; i < n; i++) {
		//
		// if (index != i)
		// updateData.push(data[i]);
		// else
		// thisRow.deleteRow(index);
		// }
		// data = updateData;
		// //update to database
		// updateRow(updateData, _id, date);
		// } else if (e.index == 1) {
		// alert(JSON.stringify(data));
		// //openView('edit_event');
		// }
		// });
		// confirm.show();

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
function addEvent(e) {

	openView('edit_event', {
		data : {
			day : choiceDay.format('YYYY-MM-DD')
		}
	});
}

/*
 * function refreshCalendar
 * force refreshing new list
 * input : null
 * output : void
 * */
function refreshCalendar() {

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
	getScheduleByMonthYear(currentMonth.format('MM'), currentMonth.format('YYYY'));
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
	refreshCalendar();
}

/*
 * function checkFriendRequest
 * friend request check and add friend
 * input : null
 * output : void
 * */
checkFriendRequest();
function checkFriendRequest() {
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

/*
 * function getListScheduleByDate
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
$.calendar.addEventListener('swipe', function(e) {
	if (e.direction == 'left')
		doNextMonth();
	else if (e.direction == 'right')
		doPrevMonth();
});

