require('config');

var frd = require('friend');
var gcm = require('com.activate.gcm');
require('lib');


var viewObj = [];

/*
 * function openView
 * open new window and cached
 * input : null
 * output : void
 * */
function openView(view, callback) {
	var action;
	for (var i = 0, n = viewObj.length; i < n; ++i) {

		if (viewObj[i].name == view) {
			action = viewObj[i].action;
			if (callback) {
				action.callback = function() {
					callback();
				};
			}
			activityScreen.nextWindow(action);
			return;
		}
	}
	action = Alloy.createController(view).getView();
	viewObj.push({
		name : view,
		action : action
	});
	if (callback) {
		action.callback = function() {
			callback();
		};
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
	var temp = [];
	for (var i = 0, n = viewObj.length; i < n; ++i) {
		if (viewObj[i].name != view) {
			temp.push(viewObj[i]);
		}
	}
	viewObj = temp;
	temp = '';
}
