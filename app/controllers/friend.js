loadFriend();
var on_flag = false;

//add back button
$.friend.addEventListener('android:back', function(e) {
	openView('schedule');
});

$.addFriend.addEventListener('click', function(e) {
	//$.name.blur();
	var name = $.name.getValue();
	$.name.setValue('');
	if (name) {
		var friendModel = Alloy.Collections.friend;

		var friend = Alloy.createModel('friend', {
			name : name
		});

		friendModel.add(friend);
		friend.save();
		$.friendList.appendRow(func.customeRowFriend(friend.get('id'), name));
	}
});

$.edit.addEventListener('click', function(e) {
	var bottom = 0;
	// var items = $.friendList.data[0].rows;
// 
	// if (items) {
		// for (var i in items) {
			// items[i].check.setVisible(on_flag);
			// items[i].label.setLeft( on_flag ? '70dp' : '10dp');
		// }
	// }

	if (e.source.type == 'none') {
		$.viewAddFriend.setVisible(false);
	} else {
		$.viewAddFriend.setVisible(true);
		bottom = '-120dp';
	}

	$.groupButton.animate({
		bottom : bottom,
		duration : 200,
		curve : Ti.UI.ANIMATION_CURVE_EASE_IN_OUT
	});

	(e.source.type == 'none') ? e.source.type = 'edit' : e.source.type = 'none';

	// on_flag = !on_flag;
	
	$.name.blur();
});

$.deleteFriend.addEventListener('click', function(e) {
	// get checked items
	var items = $.friendList.data[0].rows;
	var checked_items = [];

	if (items) {
		for (var i in items) {
			if (items[i].check.value) {
				checked_items.push(items[i].value);
			}
		}
	}

	alert(JSON.stringify(checked_items));
});

/*load all friend*/
function loadFriend() {
	var friendCols = Alloy.Collections.friend;

	friendCols.fetch({
		query : 'SELECT * from friend'
	});

	var n = friendCols.models.length;
	var friend = friendCols.models;

	var row = [];
	for (var i = 0; i < n; i++) {
		var createRow = func.customeRowFriend(friend[i].get('id'), friend[i].get('name'));
		row.push(createRow);
	}
	$.friendList.setData(row);
}
