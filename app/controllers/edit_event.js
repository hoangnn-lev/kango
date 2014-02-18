var args = arguments[0] || {}, date = (args['data'].day).split('-');
Ti.API.selectedIcon = '';

if (args['data'].id) {

	var scheduleDetailModel = Alloy.Collections.schedule_detail;
	scheduleDetailModel.fetch({
		query : 'SELECT * from schedule_detail where id=' + args['data'].id
	});

	var data = scheduleDetailModel.models[0];

	$.title.setValue(data.get('title'));
	$.startTime.setValue(data.get('start_time'));
	$.endTime.setValue(data.get('end_time'));
	$.memo.setValue(data.get('content'));
	Ti.API.selectedIcon = data.get('img');

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
	var title = $.title.getValue(), startTime = $.startTime.getValue(), endTime = $.endTime.getValue(), content = $.memo.getValue();

	$.title.blur();
	$.memo.blur();

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

	if (args['data'].id) {
		data['id'] = args['data'].id;
	}

	var detail = Alloy.createModel('schedule_detail', data);
	scheduleDetailModel.add(detail);
	detail.save();

	if (e.source.type == 'next') {
		delete_view('schedule');
		openView('edit_event', {
			data : {
				day : args['data'].day
			}
		});
	} else {
		openView('schedule', {
			date : args['data'].day
		});
	}

}

//add back button
$.edit_event.addEventListener('android:back', function(e) {
	openView('schedule');
});

