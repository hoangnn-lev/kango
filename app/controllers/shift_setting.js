var shift = [{
	name : '日勤',
	alias : '日勤',
	color : '#ccc',
	time : '9:00-18:00',
	status : 1
}, {
	name : '夜勤',
	alias : '夜勤',
	color : '#d3e1f5',
	time : '22:00-10:00',
	status : 1
}, {
	name : '休み',
	alias : '休み',
	color : '#b9e0a5',
	time : '99:99-99:99',
	status : 1
}, {
	name : '早番',
	alias : '早番',
	color : '#f19c98',
	time : '5:00-15:00',
	status : 1
}, {
	name : '入り',
	alias : '入り',
	color : '#ccc',
	time : '99:99-99:99',
	status : -1
}];
var row = [];
for (var i = 0, n = shift.length; i < n; i++) {
	var item = Ti.UI.createTableViewRow({
		touchEnabled : false,
		selectionStyle : 'none',
		selectedBackgroundColor : 'transparent',

	});

	item.add(Ti.UI.createButton({
		backgroundColor : shift[i].color,
		width : '80dp',
		height : '30dp',
		left : '10dp',
		top : '10dp',
		bottom : '10dp',
		title : shift[i].name,
		touchEnabled : true,
		id : i,
		borderColor : '#f0f0f0',
		color : '#676767',
		borderWidth : 1,
		className : 'row-left-name',
	}));

	item.add(Ti.UI.createLabel({
		left : '100dp',
		text : shift[i].alias,
		font : {
			fontSize : '15dp'
		},
		color : '#676767',
		touchEnabled : false,
		className : 'row-left-alias',
	}));

	item.add(Ti.UI.createLabel({
		left : '160dp',
		text : shift[i].time,
		font : {
			fontSize : '15dp'
		},
		color : '#676767',
		className : 'time',
		touchEnabled : false,
	}));

	var background = '#e6e6e6', selectedColor = '#dadada', text = '要らない';

	if (shift[i].status == 1) {
		background = '#f3acbd';
		selectedColor = '#ef8fa6';
		text = '使う';
	}

	item.add(Ti.UI.createButton({
		height : '35dp',
		width : '75dp',
		backgroundColor : background,
		backgroundSelectedColor : selectedColor,
		right : '10dp',
		touchEnabled : true,
		border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 10,
		status : shift[i].status,
		id : i,
		title : text,
		font : {
			fontSize : '15dp'
		},
		zIndex : 1,
		color : '#fff',
		className : 'button-right'
	}));
	row.push(item);
}
$.shift.setData(row);

function edit(e) {
	if (e.source.status) {
		alert(e.source.id + 'status' + e.source.status);
	} else {
		openView('shift_detail');
	}

}

