Alloy.Collections.configs = Alloy.createCollection('configs');
var button = {
	'ON' : {
		text : 'ON',
		bg : '#fff2cc'
	},
	'OFF' : {
		text : 'OFF',
		bg : '#ccc'
	}
}, dayOffset = 0, showMember = 0, configs = Alloy.Collections.configs;

configs.fetch({
	query : 'select id,cg_value from configs where cg_name="dayOffset" or cg_name="showMember"'
});

if (( dayOffset = configs.models[0].get('cg_value')) == 1) {
	$.monday_set.setBackgroundColor(button['ON']['bg']);
	$.monday_set.setTitle(button['ON']['text']);
}

if (( showMember = configs.models[1].get('cg_value')) == 1) {
	$.showMember.setBackgroundColor(button['ON']['bg']);
	$.showMember.setTitle(button['ON']['text']);
}
/*
 * function changedayOffset
 * Change start day for calendar
 * input : row
 * output : void
 * */
function changeDayOffset(e) {
	alert(dayOffset);
	$.monday_set.setBackgroundColor((dayOffset == 1) ? button['OFF']['bg'] : button['ON']['bg']);
	$.monday_set.setTitle((dayOffset == 1) ? button['OFF']['text'] : button['ON']['text']);

	dayOffset = (dayOffset == 1) ? 0 : 1;

	var model = Alloy.createModel('configs', {
		id : configs.models[0].get('id'),
		cg_name : 'dayOffset',
		cg_value : dayOffset
	});
	Alloy.Collections.configs.add(model);
	model.save();

	//reload schedule
	delete_view('schedule');
}

function showMember() {
	$.showMember.setBackgroundColor((showMember == 1) ? button['OFF']['bg'] : button['ON']['bg']);
	$.showMember.setTitle((showMember == 1) ? button['OFF']['text'] : button['ON']['text']);

	showMember = (showMember == 1) ? 0 : 1;

	var model = Alloy.createModel('configs', {
		id : configs.models[1].get('id'),
		cg_name : 'showMember',
		cg_value : showMember
	});
	Alloy.Collections.configs.add(model);
	model.save();

	//reload schedule
	delete_view('schedule');
}

//add back button
$.setting.addEventListener('android:back', function(e) {
	openView('schedule');
});

function edit_members() {
	openView('friend');
}

function shift_setting() {
	openView('shift_setting');
}

function guideUseCalendar() {

	var win = Ti.UI.createView();

	var view = [];

	view.push(Ti.UI.createView({
		backgroundColor : '#ccc',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
	}));

	view.push(Ti.UI.createView({
		backgroundColor : '#ffb373',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
	}));

	view.push(Ti.UI.createView({
		backgroundColor : '#075149',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
	}));
	var scrollView = Ti.UI.createScrollableView({
		showPagingControl : false,
		id : 'intro',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		views : view,
		currentPage : 0,
		pagingControlColor : 'transparent',
		zIndex : 2

	});
	var close = Ti.UI.createButton({
		opacity : .8,
		bottom : '10dp',
		title : 'クローズ',
		zIndex : 3,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		width : '100dp',
		font : {
			fontSize : '14dp'
		},
		height : '40dp',
		backgroundColor : '#fff',
		color : '#000',
		border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 10,
	});
	close.addEventListener('click', function(e) {
		$.setting.remove(win);
	});
	win.add(close);
	win.add(scrollView);
	$.setting.add(win);
}

