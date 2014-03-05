var lastValue = {
	month : new Date()
};
lastValue['month'].setDate(1);

$.month.setText(formatDate(lastValue['month']));

/* create picker select date */
function showPicker(e1) {

	var picker = Titanium.UI.createPicker({
		type : Titanium.UI.PICKER_TYPE_DATE,
		selectionIndicator : true
	}), label = this;

	picker.showDatePickerDialog({
		value : lastValue[e1.source.id],
		callback : function(e) {
			if (!e.cancel) {
				var result = lastValue[e1.source.id] = e.value;
				label.setText(formatDate(result));
			}
		}
	});
}

/* format date japan */
function formatDate(date) {
	return date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
}

$.share_by_image.addEventListener('android:back', function(e) {
	openView('share');
});

function share(e) {
	var day = lastValue['month'];

	var f = Alloy.createController('shift', {
		date : day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
	}).getView('calendar').toImage();

	$.save.setImage(f);
	//Ti.Platform.openURL('line://msg/image/' + f);

	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.addAttachment(f);
	emailDialog.open();
}

