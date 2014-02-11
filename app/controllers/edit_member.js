var members = [{
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
for (var i = 0, n = members.length; i < n; i++) {
	var item = Ti.UI.createTableViewRow({
		touchEnabled : false,
		selectionStyle : 'none',
		selectedBackgroundColor : 'transparent'
	});
	item.add(Ti.UI.createLabel({
		left : '10dp',
		text : members[i].name,
		color : '#000',
		font : {
			fontSize : '15dp'
		},
		className : 'row-left',
		width : Ti.UI.FILL,
		right : '90dp',
		idf : 'name'
	}));
	var background = '#4bcd61', text = '使う';

	if (i > 3) {
		background = '#9c9c9c';
		text = '要らない';
	}

	var box = Ti.UI.createView({
		height : '35dp',
		width : '75dp',
		backgroundColor : background,
		right : '10dp',
		border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 10,
		top : '10dp',
		bottom : '10dp',
		className : 'box'
	});

	box.add(Ti.UI.createLabel({
		text : text,
		color : '#fff',
		font : {
			fontSize : '15dp'
		},
		className : 'row-right',
		idf : 'button'
	}));
	item.add(box);
	row.push(item);
}
$.members.setData(row);

function edit(e) {
	if (e.source.idf == 'name') {
		$.dialog.show();
	}
}
