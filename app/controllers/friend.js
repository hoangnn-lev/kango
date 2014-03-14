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
		flag : 1,
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

		if (friendList[i].get('name') == '') {
			Alloy.createModel('friend', {
				id : friendList[i].get('id')
			}).destroy();
		} else {
			var createRow = customeRowFriend(friendList[i].get('id'), friendList[i].get('name'), friendList[i].get('flag'));
			$.friendList.add(createRow);
		}
	}
}

//create row friend
function customeRowFriend(id, name, friend_flag) {

	friend_flag = (friend_flag == 0) ? false : true;

	var row = Ti.UI.createView({
		height : Ti.UI.SIZE
	});
	row.setBackgroundColor( friend_flag ? '#fff' : '#e6e3d9');

	row.label = Ti.UI.createTextField({
		left : '10dp',
		height : '50dp',
		width : '200dp',
		hintText : '名前',
		value : name,
		id : id,
		flag : friend_flag,
		font : {
			fontSize : '15dp'
		},
		backgroundColor : 'transparent',
		color : name == '' ? '#e2e2e2' : '#676767',
		maxLength : 8,
		zIndex : 9,
		className : 'friend-name'
	});

	row.label.addEventListener('change', function(e) {
		this.setColor(e.source.value == '' ? '#e2e2e2' : '#676767');
		var data = {
			id : id,
			name : e.source.value,
			flag : 1,
		};
		var friendModel = Alloy.Collections.friend;
		var friend = Alloy.createModel('friend', data);
		friendModel.add(friend);
		friend.save();
		delete_view('schedule');
	});
	row.flag = Ti.UI.createButton({
		height : '30dp',
		width : '60dp',
		right : '10dp',
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
	row.flag.addEventListener('click', function(e) {

		var checkflag = e.source.friend_flag;

		row.flag.setBackgroundColor( checkflag ? '#ccc' : '#f3acbd');
		row.flag.setTitle( checkflag ? 'OFF' : 'ON');

		e.source.friend_flag = !checkflag;
		var friendModel = Alloy.Collections.friend;
		var data = {
			id : id,
			name : name,
			flag : checkflag ? 0 : 1
		};

		var friend = Alloy.createModel('friend', data);
		friendModel.add(friend);
		friend.save();

		this.getParent().setBackgroundColor( checkflag ? '#e6e3d9' : '#fff');
		delete_view('schedule');
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

