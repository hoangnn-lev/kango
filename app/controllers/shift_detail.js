loadShift();
/*
 * function loadShift
 * load shift
 * input : null
 * output : void
 * */
function loadShift() {

	var shift_data = [{
		id : '',
		color : '#f19c98'
	}, {
		id : '',
		color : '#ffe498'
	}, {
		id : '',
		color : '#b9e0a5'
	}, {
		id : '',
		color : '#d3e1f5'
	}, {
		id : '',
		color : '#ccc'
	}, {
		id : '',
		color : '#fff'
	}];

	var column = 3, record = shift_data.length, row = Math.ceil(record / column), count = 0, height = '40', top = 0, selectedColor = '';

	for (var i = 0; i < row; i++) {

		for (var j = 0; j < column; j++) {

			if (count >= record)
				return;

			if (i > 0) {
				top = i * height + i * 10;
			}

			var view = Ti.UI.createButton({
				backgroundColor : shift_data[count].color,
				height : height + 'dp',
				width : '30%',
				left : (j * 33) + '%',
				top : top + 'dp',
				borderColor : '#666',
				borderWidth : 1
			});

			if (i == 0 && j == 0) {
				selectedColor = view;
				view.setBorderWidth(5);
			}

			view.addEventListener('click', function(e) {
				selectedColor.setBorderWidth(1);
				this.setBorderWidth(5);
				selectedColor = this;

			});
			$.groupShiftColor.add(view);
			count++;
		}

	}

}
