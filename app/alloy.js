require('config');

Alloy.Collections.schedule = Alloy.createCollection('schedule');
Alloy.Collections.configs = Alloy.createCollection('configs');
Alloy.Collections.shifts = Alloy.createCollection('shifts');
Alloy.Collections.calendar_shift = Alloy.createCollection('calendar_shift');

var frd = require('Lib/friend');
var gcm = require('com.activate.gcm');
var func = require('Lib/function');

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
	customView[view] = '';
}
