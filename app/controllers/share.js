var lastValue = {
	dayStart : new Date(),
	dayEnd : new Date(),
	month : new Date()
};
lastValue['dayStart'].setDate(1);
lastValue['dayEnd'].setDate(31);

$.month.setText(formatDate(lastValue['month'], 'month'));
$.dayStart.setText(formatDate(lastValue['dayStart']));
$.dayEnd.setText(formatDate(lastValue['dayEnd']));

/* create picker select date */ 
function showPicker(e1) {

	var picker = Titanium.UI.createPicker({
		type : Titanium.UI.PICKER_TYPE_DATE
	}), label = this;

	picker.showDatePickerDialog({
		value : lastValue[e1.source.id],
		callback : function(e) {
			if (!e.cancel) {
				var result = lastValue[e1.source.id] = e.value;
				label.setText(formatDate(result, e1.source.id));
			}
		}
	});
}

/* format date japan */
function formatDate(date, type) {
	var format = date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
	return (type == 'month') ? format : format + date.getDate() + '日';

}

/* share schedule by text */
function shareByText(e){
	
}
