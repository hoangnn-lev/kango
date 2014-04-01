var selected_date = new Date();

var pad_2 = function(number) {
	return (number < 10 ? '0' + number : number);
};

var formatDate = function(date) {
	return date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
};

exports.formatDate = formatDate;
exports.pad_2 = pad_2;

exports.showPicker = function(date) {

	if (date)
		selected_date = date;

	var popup = Ti.UI.createView({
		backgroundColor : '#000',
		layout : 'vertical',
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE
	});

	//label show time info
	var label = Ti.UI.createLabel({
		text : '年・月を入力してください。',
		font : {
			fontSize : '18dp'
		},
		textAlign : 'left',
		bottom : '10dp',
		top : '10dp',
		color : '#fff',
		height : Ti.UI.SIZE,
		left : '10dp'
	});

	//line delimited
	var line = Ti.UI.createLabel({
		backgroundColor : '#1c1c1c',
		height : '1sp',
		width : Ti.UI.FILL
	});

	popup.add(label);
	popup.add(line);

	//create picker
	var picker = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		top : '10dp',
		bottom : '10dp',
		left : '10dp',
		right : '10dp'
	});

	var year = exports.createColumn(date.getFullYear(), {
		left : '18%'
	});
	year.btnUp.addEventListener('click', function(e) {
		var v = parseInt(year.label.getText(), 10) + 1;
		selected_date.setYear(v);
		year.label.setText(v);
	});
	year.btnDown.addEventListener('click', function(e) {
		var v = parseInt(year.label.getText(), 10) - 1;
		if (v < 1)
			v = 9999;
		selected_date.setYear(v);
		year.label.setText(v);
	});

	var month = exports.createColumn(pad_2(date.getMonth() + 1) + '月', {
		right : '18%'
	});
	month.btnUp.addEventListener('click', function(e) {
		var v = month.label.getText().replace('月');
		v = parseInt(v, 10) + 1;
		if (v > 12)
			v = 1;
		selected_date.setMonth(v - 1);
		month.label.setText(pad_2(v) + '月');
	});
	month.btnDown.addEventListener('click', function(e) {
		var v = month.label.getText().replace('月');
		v = parseInt(v, 10) - 1;
		if (v < 1)
			v = 12;
		selected_date.setMonth(v - 1);
		month.label.setText(pad_2(v) + '月');
	});

	picker.add(year);
	picker.add(month);
	popup.add(picker);

	//setview
	var dialog = Ti.UI.createAlertDialog({
		androidView : popup,
		buttonNames : ['設定', 'キャンセル']
	});
	return dialog;
};

exports.getSelectedDate = function() {
	return selected_date;
};

exports.createColumn = function(v, options) {

	var p = {
		height : Ti.UI.SIZE,
		width : '30%',
		layout : 'vertical'
	};
	if (options) {
		for (key in options) {
			p[key] = options[key];
		}
	}

	var column = Ti.UI.createView(p);

	column.btnUp = Ti.UI.createButton({
		width : '80dp',
		height : '45dp',
		backgroundImage : '/icons/custom/plus.png',
		backgroundSelectedImage : '/icons/custom/plus_selected.png'
	});

	column.label = Ti.UI.createLabel({
		width : '80dp',
		height : '50dp',
		text : v,
		font : {
			fontSize : '30dp'
		},
		color : '#000',
		textAlign : 'center',
		backgroundImage : '/icons/custom/picker_bg.png'
	});

	column.btnDown = Ti.UI.createButton({
		width : '80dp',
		height : '45dp',
		backgroundImage : '/icons/custom/minus.png',
		backgroundSelectedImage : '/icons/custom/minus_selected.png'
	});

	column.add(column.btnUp);
	column.add(column.label);
	column.add(column.btnDown);
	return column;
};

