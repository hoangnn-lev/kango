var shiftsCols = Alloy.Collections.shifts;

var btnActiveBg = '#f3acbd', textActive = '使う', btnDeativeBg = '#e6e6e6', textDeactive = '要らない';

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

	item.add(Ti.UI.createLabel({
		left : '160dp',
		text : shift[i].get('time'),
		font : {
			fontSize : '15dp'
		},
		color : '#676767',
		className : 'time',
		touchEnabled : false,
	}));

	var background = btnDeativeBg, text = textDeactive;

	if (shift[i].get('status') == 1) {
		background = btnActiveBg;
		text = textActive;
	}
	var button = Ti.UI.createButton({
		id : shift[i].get('id'),
		title : text,
		label : shift[i].get('label'),
		alias : shift[i].get('alias'),
		time : shift[i].get('time'),
		shiftcolor : shift[i].get('color'),
		status : shift[i].get('status'),

		height : '35dp',
		width : '75dp',
		backgroundColor : background,
		backgroundSelectedColor : background,
		right : '10dp',
		touchEnabled : true,
		border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 10,

		font : {
			fontSize : '15dp'
		},
		zIndex : 1,
		color : '#fff',
		className : 'button-right'
	});
	button.addEventListener('click', function(e) {
		if (e.source.status == 1) {
			this.setBackgroundColor(btnDeativeBg);
			this.setTitle(textDeactive);
			e.source.status = 0;
		} else {
			this.setBackgroundColor(btnActiveBg);
			this.setTitle(textActive);
			e.source.status = 1;
		}

		var shift = Alloy.createModel('shifts', {
			id : e.source.id,
			status : e.source.status,
			label : e.source.label,
			alias : e.source.alias,
			time : e.source.time,
			color : e.source.shiftcolor
		});

		Alloy.Collections.shifts.add(shift);
		shift.save();
		Alloy.Collections.shifts.fetch();
		delete_view('schedule');
		delete_view('shift');
	});
	item.add(button);
	row.push(item);
}
$.shift.setData(row);

//add back button
$.shift_setting.addEventListener('android:back', function(e) {
	openView('shift');
});

