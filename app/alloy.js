require('config');

Alloy.Collections.schedule = Alloy.createCollection('schedule');
Alloy.Collections.configs = Alloy.createCollection('configs');
Alloy.Collections.shifts = Alloy.createCollection('shifts');
Alloy.Collections.calendar_shift = Alloy.createCollection('calendar_shift');
Alloy.Collections.schedule_detail = Alloy.createCollection('schedule_detail');
Alloy.Collections.friend = Alloy.createCollection('friend');

var func = require('Lib/function'), kango = require('Lib/kango');

var customView = {};

/*
 * function openView
 * open new window and cached
 * input : null
 * output : void
 * */
function openView(view, data) {

	var action;
	if (data) {
		action = customView[view] = Alloy.createController(view, data).getView();
	} else if (customView[view]) {
		action = customView[view];
	} else {
		action = customView[view] = Alloy.createController(view).getView();
	}

	func.nextView(action);
}

/*
 * function delete_view
 * delete view or reload new view
 * input : null
 * output : void
 * */
function delete_view(view) {
	if (customView[view])
		delete customView[view];
}

//syns database remote
var activity = Ti.Android.currentActivity;

activity.addEventListener('resume', function() {
	kango.synsDatabase();
});
