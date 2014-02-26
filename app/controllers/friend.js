var on_flag = true;
var friendList;

loadFriend();

//add back button
$.friend.addEventListener('android:back', function(e) {
	openView('schedule');
});

$.back.addEventListener('click', function() {
	openView('schedule');
});

//add new friend
$.addFriend.addEventListener('click', function(e) {

	var name = $.name.getValue();
	$.name.blur();
	$.name.setValue('');

	if (name) {
		var friendModel = Alloy.Collections.friend;
		var friend = Alloy.createModel('friend', {
			name : name,
			status : 1,
		});

		friendModel.add(friend);
		friend.save();
		$.friendList.appendRow(customeRowFriend(friend.get('id'), name), 1);
		delete_view('schedule');
	}
});

//select friend delete
function editFriend(e) {

	$.name.blur();
	$.groupButton.animate({
		bottom : on_flag ? '0' : '-120dp',
		duration : 200,
		curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});

	$.blockFriend.setLeft( on_flag ? '0' : '-50dp');

	on_flag = !on_flag;
	$.viewAddFriend.setVisible(on_flag);

}

//delete friend in list
$.deleteFriend.addEventListener('click', function(e) {

	// get checked items
	var items = $.friendList.data[0].rows;

	if (items) {
		for (var i = items.length - 1; i >= 0; i--) {
			if (items[i].check.value) {

				$.friendList.deleteRow(i);
				var rowModel = Alloy.createModel('friend', {
					id : items[i].check.id
				});
				rowModel.destroy();
			}
		}
	}
	delete_view('schedule');
});

//cancel editing
function cancelEditing(e) {

	editFriend();

	var items = $.friendList.data[0].rows;

	if (items) {
		for (var i = items.length - 1; i >= 0; i--) {
			if (items[i].check.value) {
				items[i].check.setValue(false);
			}
		}
	}

};

//load all friend
function loadFriend() {
	var friendCols = Alloy.Collections.friend;

	friendCols.fetch({
		query : 'SELECT * from friend'
	});

	var n = friendCols.models.length;
	friendList = friendCols.models;
	var row = [];
	row.push(Ti.UI.createTableView());

	for (var i = 0; i < n; i++) {
		var createRow = customeRowFriend(friendList[i].get('id'), friendList[i].get('name'), friendList[i].get('status'));
		row.push(createRow);
	}

	$.friendList.setData(row);
}

//create row friend
function customeRowFriend(id, name, friend_status) {

	friend_status = (friend_status == 0) ? false : true;

	var row = Ti.UI.createTableViewRow({
		selectionStyle : 'none',
		selectedBackgroundColor : 'transparent'
	});

	row.setBackgroundColor( friend_status ? '#fff' : '#f0f0f0');

	row.check = Ti.UI.createSwitch({
		style : Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		left : '10dp',
		height : '40dp',
		id : id,
		width : '40dp',
		type : 'checkbox',
		className : 'checkbox-delete'
	});

	row.check.addEventListener('click', function(e) {
		var items = $.friendList.data[0].rows;

		if (items) {
			for (var i = items.length - 1; i >= 0; i--) {
				if (items[i].check.value) {
					$.deleteFriend.setEnabled(true);
					$.deleteFriend.setBackgroundColor('#cfba9c');
					return;
				}
			}
		}
		$.deleteFriend.setBackgroundColor('#ccc');
		$.deleteFriend.setEnabled(false);
	});

	row.label = Ti.UI.createTextField({
		left : '50dp',
		height : '40dp',
		width : Ti.UI.FILL,
		left : '80dp',
		value : name,
		id : id,
		font : {
			fontSize : '15dp'
		},
		backgroundColor : 'transparent',
		color : '#676767',
		maxLength : 8,
		className : 'friend-name',
	});
	row.label.addEventListener('focus', function(e) {
		on_flag ? '' : cancelEditing();
	});
	row.label.addEventListener('change', function(e) {
		alert(e.source.value);
	});
	row.status = Ti.UI.createButton({
		height : '30dp',
		width : '60dp',
		right : '10dp',
		font : {
			fontSize : '14dp'
		},
		title : friend_status ? 'ON' : 'OFF',
		friend_status : friend_status,
		backgroundColor : friend_status ? '#f3acbd' : '#ccc',
		color : '#fff',
		border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 10,
		zIndex : '10',
		className : 'button-status'
	});
	row.status.addEventListener('click', function(e) {

		var checkStatus = e.source.friend_status;

		row.setBackgroundColor( checkStatus ? '#f0f0f0' : '#fff');
		this.setTitle( checkStatus ? 'OFF' : 'ON');
		this.setBackgroundColor( checkStatus ? '#ccc' : '#f3acbd');

		e.source.friend_status = !checkStatus;

		var friendModel = Alloy.Collections.friend;

		var data = {
			id : id,
			name : name,
			status : checkStatus ? 0 : 1
		};

		var friend = Alloy.createModel('friend', data);
		friendModel.add(friend);
		friend.save();
		delete_view('schedule');
	});

	row.add(row.check);
	row.add(row.label);
	row.add(row.status);
	return row;
}
