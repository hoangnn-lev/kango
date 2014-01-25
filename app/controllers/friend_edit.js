var friend = [{
	name : '日勤'
}, {
	name : '夜勤'
}, {
	name : '休み'
}, {
	name : '早番'
}, {
	name : '遅番'
}, {
	name : '準夜勤'
}, {
	name : '入り'
}];
var row = [];
for (var i = 0, n = friend.length; i < n; i++) {
	var item = Ti.UI.createTableViewRow({
		touchEnabled : false,
		selectionStyle : 'none',
		selectedBackgroundColor : 'transparent'
	});
	item.add(Ti.UI.createLabel({
		left : '10dp',
		text : friend[i].name,
		color : '#666',
		font : {
			fontSize : '18dp'
		},
		top : '10dp',
		bottom : '10dp',
		className : 'row-left',
		idf : 'name'
	}));
	var color = '#fff', background = '#51b11c', text = '使う';

	if (i > 3) {
		color = '#3c3e40';
		background = '#9c9c9c';
		text = '要らない';
	}

	var box = Ti.UI.createView({
		height : '25dp',
		width : '70dp',
		backgroundColor : background,
		right : '10dp',
		className : 'box'
	});

	box.add(Ti.UI.createLabel({
		text : text,
		color : color,
		font : {
			fontSize : '15dp'
		},
		className : 'row-right',
		idf : 'button'
	}));
	item.add(box);
	row.push(item);
}
$.friend.setData(row);

function edit(e) {
	if (e.source.idf == 'name') {
		$.dialog.show();
	}
}
