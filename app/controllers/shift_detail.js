var args = arguments[0] || {}, selectedColor = '', shift, shiftsCols = Alloy.Collections.shifts, flag, name;

shiftsCols.fetch({
	query : 'SELECT * from shifts where id=' + args['id']
});

shift = shiftsCols.models[0], flag = shift.get('flag'), name = shift.get('name');

$.shiftName.setText(name);
$.shiftAlias.setValue(name);

if (shift.get('time_shift')) {
	var time = (shift.get('time_shift')).split('-');
	$.startTime.setText(time[0]);
	$.endTime.setText(time[1]);

	time[0] ? $.clearStartTime.setVisible(true) : '';
	time[1] ? $.clearEndTime.setVisible(true) : '';
}

loadColorBox(shift.get('color'));
/*
 * function loadShift
 * load shift
 * input : null
 * output : void
 * */
function loadColorBox(selected) {

	var count = 0, color = ['#e68200', '#01adb3', '#69bc7b', '#e6b800', '#75a9e8', '#e86767', '#6c73cc', '#d23376', '#e0539c', '#a957a0', '#aa86c4', '#d8ba72'];

	var colorWidth = Math.floor(Ti.API.DW / 4) - 18;

	for (var c = 0; c < 3; c++) {

		var group = Ti.UI.createView({
			height : colorWidth + 'dp',
			width : Ti.UI.FILL,
			top : '10dp'
		});

		if (c == 2)
			group.setBottom('10dp');

		for (var r = 0; r < 4; ++r) {

			var button = Ti.UI.createButton({
				backgroundColor : color[count],
				height : colorWidth + 'dp',
				width : colorWidth + 'dp',
				borderColor : '#ccc',
				color : '#676767',
				borderWidth : 0,
				left : (r == 0) ? '10dp' : (r * (colorWidth + 10) + 10) + 'dp',
				className : 'button-color'
			});

			if (selected == color[count]) {
				selectedColor = button;
				button.setBorderWidth(6);
				$.shiftName.setBackgroundColor(selected);
			}

			button.addEventListener('click', function(e) {
				if (selectedColor)
					selectedColor.setBorderWidth(0);
				this.setBorderWidth(6);
				$.shiftName.setBackgroundColor(e.source.backgroundColor);
				selectedColor = this;

			});
			group.add(button);
			count++;
		}

		$.groupShiftColor.add(group);
	}
}

function timeSet(e1) {
	$.shiftAlias.blur();
	if (e1.source.type == 'delete')
		return;

	var get_time = new Date(), child = this.getChildren();

	var time = child[1].text ? (child[1].text).split(':') : [0, 0];
	get_time.setHours(time[0]);
	get_time.setMinutes(time[1]);

	var picker = Titanium.UI.createPicker({
		type : Titanium.UI.PICKER_TYPE_TIME,
		format24 : true,
		useSpinner : true,
		selectionIndicator : true
	});

	picker.showTimePickerDialog({
		value : get_time,
		format24 : true,
		callback : function(e) {
			if (!e.cancel) {

				var result = e.value.getHours() + ':' + pad_2(e.value.getMinutes());
				child[1].setText(result);
				child[2].setVisible(true);
			}
		}
	});
}

function clearTime(e) {
	this.setVisible(false);
	e.source.id == 'clearStartTime' ? $.startTime.setText('') : $.endTime.setText('');
}

function pad_2(number) {
	return (number < 10 ? '0' : '') + number;
}

$.saveShift.addEventListener('click', function(e) {

	var name = $.shiftAlias.getValue(), timeStart = $.startTime.getText(), timeEnd = $.endTime.getText(), color, time;

	if (!name) {
		alert('シフト名を入力してください');
		return;
	} else if (name.length > 2) {
		alert('2文字を超えましたが、再入力してください。');
		return;
	}

	time = (timeStart != '' ? timeStart : '') + '-' + (timeEnd != '' ? timeEnd : '');
	time = time != '-' ? time : '';

	color = selectedColor.getBackgroundColor();

	var _shift_data = {
		id : args['id'],
		name : name,
		flag : flag,
		time_shift : time,
		color : color
	};

	var shift = Alloy.createModel('shifts', _shift_data);

	Alloy.Collections.shifts.add(shift);
	shift.save();
	Alloy.Collections.shifts.fetch();
	delete_view('shift_setting');
	delete_view('shift');
	delete_view('share_by_text');
	shift_setting();

});

//add back button
$.shift_detail.addEventListener('android:back', function(e) {
	shift_setting();
});

$.shiftAlias.addEventListener('change', function(e) {
	$.shiftName.setText(e.source.value);
});

function shift_setting() {
	Ti.API.activeTab = args['tab'];
	openView('shift_setting', {
		tab : args['tab']
	});
}
