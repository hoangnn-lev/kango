var shiftsCols = Alloy.Collections.shifts;
var args = arguments[0] || {};
var btnActiveBg = '#f3acbd', textActive = '使う', btnDeativeBg = '#e6e6e6', textDeactive = '要らない';

shiftsCols.fetch({
	query : 'SELECT * from shifts'
});

var n = shiftsCols.models.length;
var shift = shiftsCols.models;

var row = [];
for (var i = 0; i < n; i++) {
	var item = Ti.UI.createView({
		touchEnabled : false,
		selectedBackgroundColor : 'transparent',
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});
	var button = Ti.UI.createButton({
		backgroundColor : shift[i].get('color'),
		width : '80dp',
		height : '30dp',
		left : '10dp',
		top : '10dp',
		bottom : '10dp',
		title : shift[i].get('name'),
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

	var time = Ti.UI.createLabel({
		text : shift[i].get('time_shift'),
		id : shift[i].get('id'),
		font : {
			fontSize : '15dp'
		},
		color : '#676767',
		className : 'time'
	});
	time.addEventListener('click', function(e) {
		openView('shift_detail', {
			id : e.source.id
		});
	});
	item.add(time);

	var background = btnDeativeBg, text = textDeactive;

	if (shift[i].get('flag') == 1) {
		background = btnActiveBg;
		text = textActive;
	}
	var button = Ti.UI.createButton({
		id : shift[i].get('id'),
		title : text,
		name : shift[i].get('name'),
		time_shift : shift[i].get('time_shift'),
		shiftcolor : shift[i].get('color'),
		flag : shift[i].get('flag'),

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
		if (e.source.flag == 1) {
			this.setBackgroundColor(btnDeativeBg);
			this.setTitle(textDeactive);
			e.source.flag = 0;
		} else {
			this.setBackgroundColor(btnActiveBg);
			this.setTitle(textActive);
			e.source.flag = 1;
		}

		var shift = Alloy.createModel('shifts', {
			id : e.source.id,
			flag : e.source.flag,
			name : e.source.name,
			time_shift : e.source.time_shift,
			color : e.source.shiftcolor
		});

		Alloy.Collections.shifts.add(shift);
		shift.save();
		Alloy.Collections.shifts.fetch();
		delete_view('schedule');
		delete_view('shift');
	});
	item.add(button);
	item.add(Ti.UI.createLabel({
		backgroundColor : '#eeeeee',
		height : '1sp',
		width : Ti.UI.FILL,
		bottom : 0
	}));

	$.shift.add(item);
}

//add back button
$.shift_setting.addEventListener('android:back', function(e) {
	Ti.API.activeTab = args['tab'];
	openView(args['tab'] == 1 ? 'shift' : 'setting');
});

