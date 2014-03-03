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
}, dayOffset = 0, showMember = 0, configs = Alloy.Collections.configs, guide_flag = false;

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
	delete_view('shift');
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
	Ti.API.activeTab = guide_flag !== false ? 4 : 2;
	guide_flag !== false ? $.setting.remove(guide_flag) : openView('schedule');
	guide_flag = false;
});

function edit_members() {
	openView('friend');
}

function shift_setting() {
	openView('shift_setting');
}

function guideUseCalendar() {

	var win = Ti.UI.createView(), view = [];

	view.push(Ti.UI.createView({
		backgroundImage : '/tutorial/step01.png',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
	}));

	view.push(Ti.UI.createView({
		backgroundImage : '/tutorial/step02.png',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
	}));

	view.push(Ti.UI.createView({
		backgroundImage : '/tutorial/step03.png',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
	}));

	var step_final = Ti.UI.createView({
		backgroundImage : '/tutorial/step04.png',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
	});

	var close = Ti.UI.createButton({
		bottom : '80dp',
		zIndex : 3,
		font : {
			fontSize : '14dp'
		},
		backgroundImage : '/tutorial/btnUse.png',
		backgroundSelectedImage : '/tutorial/btnUse_action.png',
		backgroundFocusedImage : '/tutorial/btnUse_action.png',
		width : '250dp',
		height : '39dp'
	});
	close.addEventListener('click', function(e) {
		guide_flag = false;
		openView('schedule');
		$.setting.remove(win);
	});
	step_final.add(close);

	view.push(step_final);

	var scrollView = Ti.UI.createScrollableView({
		showPagingControl : false,
		id : 'intro',
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		views : view,
		currentPage : 0,
		pagingControlColor : 'transparent',
		zIndex : 2,
		showPagingControl : true
	});
	guide_flag = win;
	win.add(scrollView);
	$.setting.add(win);
}

$.allHospital.addEventListener('click', function(e) {
	openView('hospital');
});

$.about.addEventListener('click', function(e) {
	openView('about');
});

$.report.addEventListener('click', function(e) {

	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.setSubject('Report app error');
	emailDialog.setToRecipients(['hoangnn@leverages.jp']);

	emailDialog.addEventListener('complete', function(e) {
		if (e.result == emailDialog.SENT) {
			if (Ti.Platform.osname != 'android') {
				alert("Report successfull");
			}
		}
	});
	emailDialog.open();

});

