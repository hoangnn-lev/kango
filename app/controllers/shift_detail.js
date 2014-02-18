var args = arguments[0] || {}, selectedColor = '', shift, shiftsCols = Alloy.Collections.shifts, status, label;

shiftsCols.fetch({
	query : 'SELECT * from shifts where id=' + args['id']
});

shift = shiftsCols.models[0];
status = shift.get('status');
label = shift.get('label');

$.shiftName.setText(label);
$.shiftAlias.setValue(shift.get('alias'));
if (shift.get('time')) {
	var time = (shift.get('time')).split('-');
	$.timeStart.setValue(time[0]);
	$.timeEnd.setValue(time[1]);
}

loadColorBox(shift.get('color'));
/*
 * function loadShift
 * load shift
 * input : null
 * output : void
 * */
function loadColorBox(selected) {

	var color = ['#f19c98', '#ffe498', '#b9e0a5', '#d3e1f5', '#ccc', '#fff'];

	var column = 3, record = color.length, row = Math.ceil(record / column), count = 0, height = '40', top = 0;

	for (var i = 0; i < row; i++) {

		for (var j = 0; j < column; j++) {

			if (count >= record)
				return;

			if (i > 0) {
				top = i * height + i * 10;
			}

			var view = Ti.UI.createButton({
				backgroundColor : color[count],
				height : height + 'dp',
				width : '30%',
				left : (j * 33) + '%',
				top : top + 'dp',
				borderColor : '#000',
				color : '#676767',
				borderWidth : 1
			});

			if (selected == color[count]) {
				selectedColor = view;
				view.setBorderWidth(3);
			}

			view.addEventListener('click', function(e) {
				if (selectedColor)
					selectedColor.setBorderWidth(1);
				this.setBorderWidth(3);
				selectedColor = this;

			});
			$.groupShiftColor.add(view);
			count++;
		}

	}

}

$.saveShift.addEventListener('click', function(e) {

	var alias = $.shiftAlias.getValue(), timeStart = $.timeStart.getValue(), timeEnd = $.timeEnd.getValue(), color, time;

	if (timeStart && timeEnd) {
		time = timeStart + '-' + timeEnd;
	} else if ((timeStart && !timeEnd) || (!timeStart && timeEnd)) {
		$.errorTime.setVisible(true);
		return;
	} else {
		$.errorTime.setVisible(false);
	}

	if (alias.length > 4) {
		$.errorLabel.setVisible(true);
		return;
	} else {
		$.errorLabel.setVisible(false);
	}

	if (selectedColor) {
		color = selectedColor.getBackgroundColor();
	}

	var _shift_data = {
		id : args['id'],
		label : label,
		status : status,
		alias : alias,
		time : time,
		color : color
	};

	var shift = Alloy.createModel('shifts', _shift_data);

	Alloy.Collections.shifts.add(shift);
	shift.save();
	Alloy.Collections.shifts.fetch();

	delete_view('shift');
	delete_view('shift_setting');
	shift_setting();

});

//add back button
$.shift_detail.addEventListener('android:back', function(e) {
	shift_setting();
});

function shift_setting() {
	openView('shift_setting');
}
