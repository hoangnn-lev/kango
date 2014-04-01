var pc = require('Lib/picker');
var lastValue = new Date();

$.month.setText(pc.formatDate(lastValue));

/* create picker select date */
function showPicker(e1) {

	var p = pc.showPicker(lastValue);
	p.addEventListener('click', function(e) {
		if (e.index == 0) {
			lastValue = pc.getSelectedDate();
			$.month.text = pc.formatDate(lastValue);
		}
	});
	p.show();
}

$.share_by_image.addEventListener('android:back', function(e) {
	openView('share');
});

/* share shift by image */
function share(e) {

	var day = lastValue;
	var f = Alloy.createController('shift', {
		date : day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate()
	}).getView('main').toImage().media;

	var file = Titanium.Filesystem.getFile(Titanium.Filesystem.externalStorageDirectory, 'shift.png');
	file.write(f);

	if (e.source.type == 'line')
		Ti.Platform.openURL('line://msg/image/' + file.nativePath) ? '' : func.alert('LINEがインストールされていません');
	else {
		var emailDialog = Titanium.UI.createEmailDialog();
		emailDialog.addAttachment(file);
		emailDialog.setSubject('シフト共有');
		emailDialog.open();
	}
}
