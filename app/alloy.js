require('config');

var frd = require('friend');
var gcm = require('com.activate.gcm');

var viewObj = [];

function openView(view) {
	var action;
	for (var i = 0, n = viewObj.length; i < n; ++i) {

		if (viewObj[i].name == view) {
			action = viewObj[i].action;
			activityScreen.nextWindow(action);
			return;
		}
	}
	action = Alloy.createController(view).getView();
	viewObj.push({
		name : view,
		action : action
	});
	activityScreen.nextWindow(action);
}
