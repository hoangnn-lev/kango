var shiftsCols = Alloy.Collections.shifts;

shiftsCols.fetch({
	query : 'SELECT * from shifts'
});

var n = shiftsCols.models.length;
var shift = shiftsCols.models;

var row = [];
for (var i = 0; i < n; i++) {
	var item = Ti.UI.createTableViewRow({
		touchEnabled : false,
		selectionStyle : 'none',
		selectedBackgroundColor : 'transparent',

	});
	var button = Ti.UI.createButton({
		backgroundColor : shift[i].get('color'),
		width : '80dp',
		height : '30dp',
		left : '10dp',
		top : '10dp',
		bottom : '10dp',
		title : shift[i].get('label'),
		touchEnabled : true,
		id : shift[i].get('id'),
		borderColor : '#f0f0f0',
		color : '#676767',
		borderWidth : 1,
		className : 'row-left-name',
	});
	button.addEventListener('click', function(e) {
		openView('shift_detail', {
			id : e.source.id
		});
	});
	item.add(button);

	item.add(Ti.UI.createLabel({
		left : '100dp',
		text : shift[i].get('alias'),
		font : {
			fontSize : '15dp'
		},
		color : '#676767',
		touchEnabled : false,
		className : 'row-left-alias',
	}));

	row.push(item);
}
$.friendList.setData(row);

//add back button
$.friend.addEventListener('android:back', function(e) {
	openView('schedule');
});

