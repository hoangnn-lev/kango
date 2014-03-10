var args = arguments[0] || {}, selectedColor = '', shift, shiftsCols = Alloy.Collections.shifts, flag, name;

shiftsCols.fetch({
	query : 'SELECT * from shifts where id=' + args['id']
});

shift = shiftsCols.models[0], flag = shift.get('flag'), name = shift.get('name');

$.shiftName.setText(name);
$.shiftAlias.setValue(name);

if (shift.get('time_shift')) {
	var time = (shift.get('time_shift')).split('-');
	$.timeStart.setText(time[0]);
	$.timeEnd.setText(time[1]);
} else {
	$.timeStart.setText('開始時間');
	$.timeEnd.setText('終了時間');
}

loadColorBox(shift.get('color'));
/*
 * function loadShift
 * load shift
 * input : null
 * output : void
 * */
function loadColorBox(selected) {

	var color = ['#e68200', '#f19c98', '#ffe498', '#25b4a5', '#51b11d ', '#b9e0a5', '#d7e682', '#286bcc', '#f3acbd', '#d3e1f5', '#cccccc', '#fff'];
	var column = 4, record = color.length, row = Math.ceil(record / column), count = 0, top = 0;

	for (var i = 0; i < row; i++) {

		for (var j = 0; j < column; j++) {

			if (count >= record)
				return;

			var view = Ti.UI.createButton({
				backgroundColor : color[count],
				height : '40dp',
				width : '70dp',
				left : '5dp',
				top : '5dp',
				borderColor : '#000',
				color : '#676767',
				borderWidth : 1
			});

			if (selected == color[count]) {
				selectedColor = view;
				view.setBorderWidth(3);
				//set background review
				$.shiftName.setBackgroundColor(selected);
			}

			view.addEventListener('click', function(e) {
				if (selectedColor)
					selectedColor.setBorderWidth(1);
				this.setBorderWidth(3);
				$.shiftName.setBackgroundColor(e.source.backgroundColor);
				selectedColor = this;

			});
			$.groupShiftColor.add(view);
			count++;
		}
	}
}

function timeSet(e1) {

	$.shiftAlias.blur();

	var get_time = new Date();

	var picker = Titanium.UI.createPicker({
		type : Titanium.UI.PICKER_TYPE_TIME,
		format24 : true,
		useSpinner : true,
		selectionIndicator : true
	});

	if (e1.source.text != '開始時間' || e1.source.text != '終了時間') {
		getTime = e1.source.text.split(':');
		get_time.setHours(getTime[0]);
		get_time.setMinutes(getTime[1]);
	}

	picker.showTimePickerDialog({
		value : get_time,
		format24 : true,
		callback : function(e) {
			if (!e.cancel) {

				var result = e.value, end, start;
				var hours = pad_2(result.getHours()), min = ":" + pad_2(result.getMinutes());

				end = (result.getHours() + 8) > 23 ? result.getHours() - 16 : result.getHours() + 8;
				start = (result.getHours() - 9) >= 0 ? result.getHours() - 9 : result.getHours() + 15;

				e1.source.text = hours + min;
				e1.source.type == 'start' ? $.timeEnd.setText(pad_2(end) + min) : $.timeStart.setText(pad_2(start) + min);
			}
		}
	});
}

function pad_2(number) {
	return (number < 10 ? '0' : '') + number;
}

$.saveShift.addEventListener('click', function(e) {

	var name = $.shiftAlias.getValue(), timeStart = $.timeStart.getText(), timeEnd = $.timeEnd.getText(), color, time;

	if (!name) {
		alert('シフト名を入力してください');
		return;
	} else if (name.length > 2) {
		alert('2文字を超えましたが、再入力してください。');
		return;
	}

	time = (timeStart != '開始時間' ? timeStart : '') + '-' + (timeEnd != '終了時間' ? timeEnd : '');
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
	openView('shift_setting');
}
