var on_flag = true;
var friendList;
var args = arguments[0] || {};
loadFriend();

//add back button
$.friend.addEventListener('android:back', function(e) {

	Ti.API.activeTab = args['tab'];
	openView(args['tab'] == 2 ? 'schedule' : 'setting');
});

//add new friend
$.addFriend.addEventListener('click', function(e) {

	if ($.friendList.getChildren().length > 50) {
		alert('人数制限は50人');
		return;
	}

	var friendModel = Alloy.Collections.friend;
	var friend = Alloy.createModel('friend', {
		name : '',
		status : 1,
	});

	friendModel.add(friend);
	friend.save();
	$.friendList.add(customeRowFriend(friend.get('id'), ''), 1);
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
		$.friendList.add(createRow);
	}

}

//create row friend
function customeRowFriend(id, name, friend_status) {

	friend_status = (friend_status == 0) ? false : true;

	var row = Ti.UI.createView({
		height : Ti.UI.SIZE
	});
	row.setBackgroundColor( friend_status ? '#fff' : '#e6e3d9');

	row.label = Ti.UI.createTextField({
		left : '10dp',
		height : '40dp',
		width : '200dp',
		hintText : '名前',
		value : name,
		id : id,
		status : friend_status,
		font : {
			fontSize : '15dp'
		},
		backgroundColor : 'transparent',
		color : '#676767',
		maxLength : 8,
		zIndex : 9,
		className : 'friend-name'
	});

	row.label.addEventListener('change', function(e) {
		var data = {
			id : id,
			name : e.source.value,
			status : 1,
		};
		var friendModel = Alloy.Collections.friend;
		var friend = Alloy.createModel('friend', data);
		friendModel.add(friend);
		friend.save();
		delete_view('schedule');
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
		zIndex : 10,
		textAlign : 'center',
		className : 'button-status'
	});
	row.status.addEventListener('click', function(e) {

		var checkStatus = e.source.friend_status;

		row.status.setBackgroundColor( checkStatus ? '#ccc' : '#f3acbd');
		row.status.setTitle( checkStatus ? 'OFF' : 'ON');

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

		this.getParent().setBackgroundColor( checkStatus ? '#e6e3d9' : '#fff');
		delete_view('schedule');
	});

	row.add(row.label);
	row.add(row.status);
	row.add(Ti.UI.createLabel({
		backgroundColor : '#eeeeee',
		height : '1sp',
		width : Ti.UI.FILL,
		bottom : 0
	}));
	return row;
}

