var shiftsCols = Alloy.Collections.shifts;
var args = arguments[0] || {};
var btnActiveBg = '#f3acbd', textActive = 'ON', btnDeativeBg = '#e6e6e6', textDeactive = 'OFF';

shiftsCols.fetch({
	query : 'SELECT * from shifts'
});

var n = shiftsCols.models.length;
var shift = shiftsCols.models;

var row = [];
for (var i = 0; i < n; i++) {
	var item = Ti.UI.createView({
		touchEnabled : true,
		backgroundSelectedColor : '#f3f3f3',
		width : Ti.UI.FILL,
		height : '50dp',
		id : shift[i].get('id'),
		zIndex : 1
	});
	item.addEventListener('click', function(e) {
		if (e.source.className == 'button-right' || e.source.id == undefined)
			return;
		openView('shift_detail', {
			id : e.source.id,
			tab : args['tab']
		});
	});
	var button = Ti.UI.createButton({
		backgroundColor : shift[i].get('color'),
		width : '20dp',
		height : '20dp',
		touchEnabled : false,
		left : '10dp',
		className : 'row-left-name',
	});
	item.add(button);

	item.add(Ti.UI.createLabel({
		left : '40dp',
		text : shift[i].get('name'),
		font : {
			fontSize : '15dp'
		},
		touchEnabled : false,
		color : '#676767',
		className : 'label-shift'
	}));

	item.add(Ti.UI.createLabel({
		text : shift[i].get('time_shift'),
		id : shift[i].get('id'),
		font : {
			fontSize : '15dp'
		},
		color : '#676767',
		touchEnabled : false,
		className : 'time'
	}));

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

		height : '30dp',
		width : '80dp',
		backgroundColor : background,
		backgroundSelectedColor : '#bbbbbb',
		right : '10dp',
		touchEnabled : true,
		border : Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		borderRadius : 10,

		font : {
			fontSize : '15dp'
		},
		zIndex : 2,
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

