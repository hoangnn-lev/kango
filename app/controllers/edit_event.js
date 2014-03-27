var args = arguments[0] || {}, date = (args['data'].day).split('-'), get_data;
var scheduleDetailModel = Alloy.Collections.schedule_detail;
Ti.API.selectedIcon = '';
Ti.API.activeTab = 2;
if (args['data'].id) {

	scheduleDetailModel.fetch({
		query : 'SELECT * from schedule_detail where id=' + args['data'].id
	});

	get_data = scheduleDetailModel.models[0];

	$.title.setValue(get_data.get('title'));
	$.startTime.setText(get_data.get('start_time'));

	$.endTime.setText(get_data.get('end_time'));
	$.memo.setValue(get_data.get('content'));
	if (get_data.get('img'))
		Ti.API.selectedIcon = get_data.get('img');

	get_data.get('start_time') ? $.clearStartTime.setVisible(true) : '';
	get_data.get('end_time') ? $.clearEndTime.setVisible(true) : '';

	$.cancel.setTitle('削除');
	$.cancel.type = 'delete';
}

$.date.setText(date[1] + ' / ' + date[2]);
$.dayName.setText(func.convertDayName((new Date(args['data'].day)).getDay()));

func.createBoxIcon($.buttonTabs, $.listIcon, Ti.API.selectedIcon);

/*
 * function addSchedule
 * add new schedule
 * input : null
 * output : void
 * */
function saveSchedule(e) {
	var title = $.title.getValue(), startTime = $.startTime.getText(), endTime = $.endTime.getText(), content = $.memo.getValue();

	Titanium.App.fireEvent("hideKeyboardToolbar");
	Ti.UI.Android.hideSoftKeyboard();

	if (!title && !startTime && !endTime && !content && !Ti.API.selectedIcon) {
		func.alert('内容を入力しないと保存できません');
		return;
	}

	//create collection users
	var scheduleDetailModel = Alloy.Collections.schedule_detail;

	var data = {
		schedule_id : func.getScheduleId(args['data'].day),
		title : title,
		start_time : startTime,
		end_time : endTime,
		content : content,
		img : Ti.API.selectedIcon
	};
	if (Ti.API.selectedIcon) {
		func.writeLogImg(Ti.API.selectedIcon);
	}
	if (args['data'].id) {
		data['id'] = args['data'].id;
	}
	var detail = Alloy.createModel('schedule_detail', data);
	scheduleDetailModel.add(detail);
	detail.save();

	openView('schedule', {
		date : args['data'].day
	});

}

function timeSet(e) {
	Titanium.App.fireEvent("hideKeyboardToolbar");
	Ti.UI.Android.hideSoftKeyboard();
	if (e.source.type == 'delete')
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

function pad_2(number) {
	return (number < 10 ? '0' : '') + number;
}

//add back button
$.edit_event.addEventListener('android:back', function(e) {
	Titanium.App.fireEvent("hideKeyboardToolbar");
	Ti.UI.Android.hideSoftKeyboard();
	openView('schedule');
});

function clearTime(e) {
	this.setVisible(false);
	e.source.id == 'clearStartTime' ? $.startTime.setText('') : $.endTime.setText('');
}

$.cancel.addEventListener('click', function(e) {
	if (e.source.type == 'delete') {

		//delete record
		Alloy.createModel('schedule_detail', {
			id : args['data'].id
		}).destroy();

		scheduleDetailModel.fetch({
			query : 'SELECT * from schedule_detail where id=' + args['data'].id
		});

		//check records on table schedule and delete
		scheduleDetailModel.fetch({
			query : 'SELECT * from schedule_detail where schedule_id=' + get_data.get('schedule_id')
		});
		if (scheduleDetailModel.models.length == 0) {
			Alloy.createModel('schedule', {
				id : get_data.get('schedule_id')
			}).destroy();
		}

		delete_view('schedule');
		openView('schedule', {
			date : args['data'].day
		});

	} else {
		Titanium.App.fireEvent("hideKeyboardToolbar");
		Ti.UI.Android.hideSoftKeyboard();
		openView('schedule');
	}

});

$.main.addEventListener('click', function(e) {
	if (e.source.id != 'title' && e.source.id != 'memo') {
		$.memo.value = $.memo.value;
		Titanium.App.fireEvent("hideKeyboardToolbar");
		Ti.UI.Android.hideSoftKeyboard();
	}
});

$.memo.addEventListener('change', function(e) {
	if (e.value.length > 200) {
		e.source.value = e.source.oldValue;
	} else {
		e.source.oldValue = e.value;
	}

});

//set button group on bottom
var top = Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.dpi / 160);
$.groupButton.setTop(top - 90 + 'dp');
