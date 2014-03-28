require('config');

var colls = ['schedule', 'configs', 'shifts', 'calendar_shift', 'schedule_detail', 'friend'], customView = {};
var func = require('Lib/function'), kango = require('Lib/kango'), gaModule = require('Lib/Ti.Google.Analytics');
var analytics = new gaModule('UA-49393515-1');

for (var i = 0; i < colls.length; i++) {
	Alloy.Collections[colls[i]] = Alloy.createCollection(colls[i]);
}

Ti.App.addEventListener('analytics_trackPageview', function(e) {
	analytics.trackPageview('/android' + e.pageUrl);
});

Ti.App.addEventListener('analytics_trackEvent', function(e) {
	analytics.trackEvent(e.category, e.action, e.label, e.value);
});

// Function takes an integer which is the dispatch interval in seconds
analytics.start(10, true);

Titanium.App.addEventListener('close', function(e) {
	analytics.stop();
});

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

	//open next page
	func.nextView(action);
	
	//google track page view
	analytics.trackPageview('/' + view);
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

var uid = func.getUID();
uid != '' ? kango.synsDatabase(uid) : '';

var activity = Ti.Android.currentActivity;
activity.addEventListener('resume', function() {
	var uid = func.getUID();
	kango.synsDatabase(uid);
});

