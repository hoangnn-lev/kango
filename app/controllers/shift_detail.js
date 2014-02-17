var args = arguments[0] || {};

var shiftsCols = Alloy.Collections.shifts;

shiftsCols.fetch({
	query : 'SELECT * from shifts where id=' + args['id']
});

var shift = shiftsCols.models[0];

$.shiftName.setText(shift.get('label'));
$.shiftAlias.setValue(shift.get('alias'));
if (shift.get('time')) {
	var time = (shift.get('time')).split('-');
	$.timeStart.setValue(time[0]);
	$.timeEnd.setValue(time[1]);
}

loadColorBox();
/*
 * function loadShift
 * load shift
 * input : null
 * output : void
 * */
function loadColorBox(selected) {

	var color = ['#f19c98', '#ffe498', '#b9e0a5', '#d3e1f5', '#ccc', '#fff'];

	var column = 3, record = color.length, row = Math.ceil(record / column), count = 0, height = '40', top = 0, selectedColor = '';

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

			if ((i == 0 && j == 0) || selected == color[count]) {
				selectedColor = view;
				view.setBorderWidth(3);
			}

			view.addEventListener('click', function(e) {
				selectedColor.setBorderWidth(1);
				this.setBorderWidth(3);
				selectedColor = this;

			});
			$.groupShiftColor.add(view);
			count++;
		}

	}

}

$.timeStart.addEventListener('focus', function(e) {
	var transformPicker = Titanium.UI.create2DMatrix().scale(0.7);
	var picker = Titanium.UI.createPicker({
		type : Titanium.UI.PICKER_TYPE_TIME,
		maxDate : new Date(),
		heigth : 85,
		//top:10,
		bottom : 0,
		transform : transformPicker
	});
	$.shift_detail.add(picker);
});

//add back button
$.shift_detail.addEventListener('android:back', function(e) {
	shift_setting();
});

function shift_setting() {
	openView('shift_setting');
}
