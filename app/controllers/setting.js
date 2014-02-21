//active tab
//$.tabMenu.getView('setting').setImage(Ti.API.TABMENU['setting_active']);

//create collection configs and get data
Alloy.Collections.configs = Alloy.createCollection('configs');
var configs = Alloy.Collections.configs;
configs.fetch({
	query : 'select id,cg_value from configs where cg_name="dayOffset"'
});

var dayOffset = configs.models[0].get('cg_value');

//set data
//$.uid.setText(Ti.API.UID['id']);
//$.name.setText(Ti.API.UID['name']);

if (dayOffset == 1) {
	$.monday_set.setBackgroundColor('#fff2cc');
	$.monday_set.setTitle('ON');
}

/*
 * function changedayOffset
 * Change start day for calendar
 * input : row
 * output : void
 * */
function changeDayOffset(e) {

	if (dayOffset == 0) {
		$.monday_set.setBackgroundColor('#fff2cc');
		$.monday_set.setTitle('ON');
		dayOffset = 1;
	} else {
		$.monday_set.setBackgroundColor('#cccccc');
		$.monday_set.setTitle('OFF');
		dayOffset = 0;
	}

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

//add back button
$.setting.addEventListener('android:back', function(e) {
	openView('schedule');
});

//copy uid user
// $.uid.addEventListener('click', function() {
// var confirm = Ti.UI.createAlertDialog({
// title : Ti.API.UID['name'],
// message : 'UID ' + Ti.API.UID['id'],
// buttonNames : ['コピー', 'キャンセル']
// });
// confirm.addEventListener('click', function(e) {
// if (e.index == 0)
// Ti.UI.Clipboard.setText(Ti.API.UID['id']);
// });
// confirm.show();
// });

//change name
// $.name.addEventListener('click', function(e) {
// var textfield = Ti.UI.createTextField({
// maxLength : 40,
// value : $.name.getText()
// });
// var dialog = Ti.UI.createAlertDialog({
// title : '名前変更',
// androidView : textfield,
// buttonNames : ['はい', 'いいえ']
// });
// dialog.addEventListener('click', function(e) {
// if (e.index == 0) {
// var newName = textfield.getValue();
// if (newName != Ti.API.UID['name']) {
// var progressIndicator = Ti.UI.Android.createProgressIndicator({
// message : '処理中。。。',
// location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
// type : Ti.UI.Android.PROGRESS_INDICATOR_STATUS_BAR,
// });
// progressIndicator.show();
//
// var client = Ti.Network.createHTTPClient({
// onload : function(e) {
//
// //get id
// configs.fetch({
// query : 'select id from configs where cg_name="usrname"'
// });
//
// //update name for sqlite
// var model = Alloy.createModel('configs', {
// id : configs.models[0].get('id'),
// cg_name : 'usrname',
// cg_value : newName
// });
// Alloy.Collections.configs.add(model);
// model.save();
// $.name.setText(newName);
// Ti.API.UID['name'] = newName;
// progressIndicator.hide();
// },
// onerror : function(e) {
//
// progressIndicator.hide();
// Ti.UI.createAlertDialog({
// buttonNames : ['OK'],
// message : 'エラーが発生しました！',
// title : 'お知らせ'
// }).show();
// }
// });
// client.open('POST', Ti.API.KANGO_API_CHANGE_NAME);
// client.send({
// uid : Ti.API.UID['id'],
// name : newName
// });
// }
// }
// });
// dialog.show();
// });

function edit_members() {
	openView('friend');
}

function shift_setting() {
	openView('shift_setting');
}

createIntro();
function createIntro() {

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
		backgroundColor : 'gray',
		opacity : 0.8,
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
		top : 0,
		right : 0,
		title : 'close',
		zIndex : 3,
	});
	close.addEventListener('click', function(e) {
		
	});
	$.setting.add(close);
	$.setting.add(scrollView);
}
