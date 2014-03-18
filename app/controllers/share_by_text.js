var now = new Date(), allShifts = {};
var lastValue = {
	dayStart : now,
	dayEnd : new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30)
};

$.dayStart.setText(formatDate(lastValue['dayStart']));
$.dayEnd.setText(formatDate(lastValue['dayEnd']));
getAllShift();
/* create picker select date */
function showPicker(e1) {

	var picker = Titanium.UI.createPicker({
		type : Titanium.UI.PICKER_TYPE_DATE
	});

	picker.showDatePickerDialog({
		value : lastValue[e1.source.id],
		callback : function(e) {
			if (!e.cancel) {

				var result = lastValue[e1.source.id] = e.value;
				if (e1.source.id == 'dayStart') {
					var to = new Date(result.getFullYear(), result.getMonth(), result.getDate() + 30);
					lastValue['dayEnd'] = to;
					$.dayStart.setText(formatDate(e.value));
					$.dayEnd.setText(formatDate(to));
				} else {
					$.dayEnd.setText(formatDate(result));
				}
			}
		}
	});
}

/* format date japan */
function formatDate(date) {
	var format = date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
	return format + date.getDate() + '日';

}

function formatDate2(date) {

	var month = date.getMonth() + 1;
	month = month > 9 ? month : '0' + month;
	return month + '-' + date.getFullYear();
}

function getAllShift() {
	var shifts = Alloy.Collections.shifts;

	shifts.fetch({
		query : 'SELECT * from shifts'
	});

	var n = shifts.models.length;
	var data = shifts.models;

	for (var i = 0; i < n; ++i) {

		var time = data[i].get('time');
		if (time != '' && time != null) {
			time = ':' + time;
		} else {
			time = '';
		}

		allShifts[data[i].get('id')] = data[i].get('name') + time;
	}

}

function share(e) {

	//compare date
	if (+lastValue['dayStart'] > +lastValue['dayEnd']) {
		alert('終了日は開始日以降の日付を指定して下さい。');
		return;
	}

	var calendar_shift = Alloy.Collections.calendar_shift;
	var day = lastValue['dayStart'].getDate();
	var day_end = lastValue['dayEnd'].getDate();
	var fDayStart = formatDate2(lastValue['dayStart']);
	var fDayEnd = formatDate2(lastValue['dayEnd']);
	var text = '';
	//load shift by month
	calendar_shift.fetch({
		query : 'select * from calendar_shift  where month_year >= "' + fDayStart + '" and month_year <= "' + fDayEnd + '"'
	});

	if (calendar_shift.models[0]) {

		var result = calendar_shift.models, data = {};
		for (var i = 0, n = result.length; i < n; ++i) {

			var date_shift = JSON.parse(result[i].get('date_shift'));
			var mon_year = result[i].get('month_year');
			var month = mon_year.split('-');

			for (var _date in date_shift) {

				var newDate = new Date(month[1], month[0] - 1, _date);

				if ((newDate.getTime()>= lastValue['dayStart'].getTime()) && (newDate.getTime() <= lastValue['dayEnd'].getTime())) {

					var cMonth = month[0] != 10 ? month[0].replace('0', '') : 10;
					text += cMonth + '/' + _date + ':' + allShifts[date_shift[_date]] + "\n";
				}
			}

		}

		if (e.source.type == 'line')
			Ti.Platform.openURL('line://msg/text/' + text) ? '' : alert('Lineがインストールされていませんでした。。。');
		else {

			var emailDialog = Titanium.UI.createEmailDialog();
			emailDialog.setSubject('シフト共有');
			emailDialog.setMessageBody(text);
			emailDialog.open();
		}
	} else {
		alert('予定なし');
	}
}

$.share_by_text.addEventListener('android:back', function(e) {
	openView('share');
});
