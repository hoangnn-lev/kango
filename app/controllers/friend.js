var on_flag = true;
var friendList;

loadFriend();

//add back button
$.friend.addEventListener('android:back', function(e) {
	openView('schedule');
});

//add new friend
$.addFriend.addEventListener('click', function(e) {

	if ($.friendList.data[0] && $.friendList.data[0].rows.length > 50) {
		alert('You can add max 50 friend');
		return;
	}

	var friendModel = Alloy.Collections.friend;
	var friend = Alloy.createModel('friend', {
		name : '',
		status : 1,
	});

	friendModel.add(friend);
	friend.save();
	$.friendList.appendRow(customeRowFriend(friend.get('id'), ''), 1);
	delete_view('schedule');

});

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
		selectedBackgroundColor : 'transparent',
		className : 'row-friend'
	});

	row.setBackgroundColor( friend_status ? '#fff' : '#f0f0f0');

	row.label = Ti.UI.createTextField({
		left : '10dp',
		height : '40dp',
		width : Ti.UI.FILL,
		hintText : 'Enter name',
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

	row.label.addEventListener('change', function(e) {

		// setTimeout(function save() {
		//
		// alert(e.source.value);
		//
		// }, 2000);

	});
	row.status = Ti.UI.createButton({
		height : '25dp',
		width : '70dp',
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

	row.add(row.label);
	row.add(row.status);
	return row;
}

