var on_flag = true;
var friendList;
var args = arguments[0] || {};
var hiddenField, max = 0;
loadFriend();

//add back button
$.friend.addEventListener('android:back', function(e) {

	Ti.API.activeTab = args['tab'];
	openView(args['tab'] == 2 ? 'schedule' : 'setting');
});

//add new friend
$.addFriend.addEventListener('click', function(e) {

	if ($.friendList.getChildren().length > 50) {
		func.alert('人数制限は50人');
		return;
	}

	var friendModel = Alloy.Collections.friend;
	var friend = Alloy.createModel('friend', {
		name : '',
		flag : 1,
	});

	friendModel.add(friend);
	friend.save();

	var newRow = customeRowFriend(friend.get('id'), '');

	$.friendList.add(newRow, 1);
	addEventForRow(newRow);
	newRow.label.focus();

	delete_view('schedule');

});

//load all friend
function loadFriend() {

	hiddenField = Ti.UI.createTextField({
		height : 0,
		width : 0,
		id : 'hidden'
	});
	$.friendList.add(hiddenField);

	var friendCols = Alloy.Collections.friend;

	friendCols.fetch({
		query : 'SELECT * from friend'
	});

	var n = friendCols.models.length;
	friendList = friendCols.models;

	var row = [];
	row.push(Ti.UI.createTableView());

	for (var i = 0; i < n; i++) {

		if (friendList[i].get('name') == '') {
			Alloy.createModel('friend', {
				id : friendList[i].get('id')
			}).destroy();
		} else {
			var createRow = customeRowFriend(friendList[i].get('id'), friendList[i].get('name'), friendList[i].get('flag'));
			$.friendList.add(createRow);
			addEventForRow(createRow);
		}
	}
}

function addEventForRow(row) {

	row.label.addEventListener('change', function(e) {
		var data = {
			id : e.source.id,
			name : e.source.value,
			flag : 1,
		};

		var friendModel = Alloy.Collections.friend;
		var friend = Alloy.createModel('friend', data);

		friendModel.add(friend);
		friend.save();

		delete_view('schedule');
	});

	//hide cursor when last field click done
	row.label.addEventListener('return', function(e) {
		if (e.source.id == max) {
			hiddenField.focus();
		}
	});

	row.flag.addEventListener('click', function(e) {

		var checkflag = e.source.friend_flag;

		row.flag.setBackgroundColor( checkflag ? '#ccc' : '#f3acbd');
		row.flag.setTitle( checkflag ? 'OFF' : 'ON');

		e.source.friend_flag = !checkflag;
		var friendModel = Alloy.Collections.friend;
		var data = {
			id : e.source.id,
			name : row.label.value,
			flag : checkflag ? 0 : 1
		};

		var friend = Alloy.createModel('friend', data);
		friendModel.add(friend);
		friend.save();
		delete_view('schedule');
	});
}

//create row friend
function customeRowFriend(id, name, friend_flag) {

	max = id;
	friend_flag = (friend_flag == 0) ? false : true;

	var row = Ti.UI.createView({
		height : Ti.UI.SIZE,
		backgroundColor : '#fff'
	});

	row.label = Ti.UI.createTextField({
		left : '10dp',
		height : '50dp',
		width : Ti.UI.FILL,
		hintText : 'タップで名前入力',
		softKeyboardOnFocus : Titanium.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS,
		value : name,
		id : id,
		flag : friend_flag,
		font : {
			fontSize : '15dp'
		},
		backgroundColor : 'transparent',
		color : '#000',
		maxLength : 8,
		zIndex : 9,
		className : 'friend-name'
	});

	row.flag = Ti.UI.createButton({
		id : id,
		height : '30dp',
		width : '80dp',
		right : '10dp',
		name : name,
		font : {
			fontSize : '14dp'
		},
		title : friend_flag ? 'ON' : 'OFF',
		friend_flag : friend_flag,
		backgroundColor : friend_flag ? '#f3acbd' : '#ccc',
		color : '#fff',
		border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 10,
		zIndex : 10,
		textAlign : 'center',
		className : 'button-flag'
	});

	row.add(row.label);
	row.add(row.flag);
	row.add(Ti.UI.createLabel({
		backgroundColor : '#eeeeee',
		height : '1sp',
		width : Ti.UI.FILL,
		bottom : 0
	}));
	return row;
}

$.main.addEventListener('click', function(e) {
	if (e.source.className != 'friend-name' && e.source.id != 'addFriend') {
		Titanium.App.fireEvent("hideKeyboardToolbar");
		Ti.UI.Android.hideSoftKeyboard();
		hiddenField.focus();
	}
});
