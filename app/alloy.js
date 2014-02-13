require('config');

var frd = require('friend');
var gcm = require('com.activate.gcm');
var lib = require('lib');

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

	
	activityScreen.nextWindow(action);
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
