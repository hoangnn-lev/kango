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
	});

	picker.showDatePickerDialog({
		value : lastValue['month'],
		callback : function(e) {
			if (!e.cancel) {
				var result = lastValue['month'] = e.value;
				$.month.setText(formatDate(result));
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

/* share shift by image */
function share(e) {

	var day = lastValue['month'];
	var f = Alloy.createController('shift', {
		date : day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
	}).getView('main').toImage().media;

	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, 'shift.png');
	file.write(f);

	if (e.source.type == 'line')
		Ti.Platform.openURL('line://msg/image/' + file.nativePath) ? '' : alert('LINEがインストールされていません');
	else {
		var emailDialog = Titanium.UI.createEmailDialog();
		emailDialog.addAttachment(file);
		emailDialog.setSubject('シフト共有');
		emailDialog.open();
	}
}

