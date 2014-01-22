require('config');

var frd = require('friend');
var gcm = require('com.activate.gcm');

var scheduleViewObj, settingViewObj, friendViewObj, scheduleEditViewObj;

function scheduleView(e) {

	if (!scheduleViewObj)
		scheduleViewObj = Alloy.createController('schedule').getView();
	activityScreen.nextWindowByLoading(scheduleViewObj);
}

function settingView(e) {

	settingViewObj = Alloy.createController('setting').getView();
	activityScreen.nextWindow(settingViewObj);
}

function friendView() {

	if (!friendViewObj)
		friendViewObj = Alloy.createController('friend').getView();
	activityScreen.nextWindow(friendViewObj);
}
