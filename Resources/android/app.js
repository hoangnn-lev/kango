function openView(view, data) {
    var action;
    action = data ? customView[view] = Alloy.createController(view, data).getView() : customView[view] ? customView[view] : customView[view] = Alloy.createController(view).getView();
    func.nextView(action);
    analytics.trackPageview("/" + view);
}

function delete_view(view) {
    customView[view] && delete customView[view];
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

require("config");

var colls = [ "schedule", "configs", "shifts", "calendar_shift", "schedule_detail", "friend" ], customView = {};

var func = require("Lib/function"), kango = require("Lib/kango"), gaModule = require("Lib/Ti.Google.Analytics");

var analytics = new gaModule("UA-49393515-1");

for (var i = 0; colls.length > i; i++) Alloy.Collections[colls[i]] = Alloy.createCollection(colls[i]);

Ti.App.addEventListener("analytics_trackPageview", function(e) {
    analytics.trackPageview("/android" + e.pageUrl);
});

Ti.App.addEventListener("analytics_trackEvent", function(e) {
    analytics.trackEvent(e.category, e.action, e.label, e.value);
});

analytics.start(10, true);

Titanium.App.addEventListener("close", function() {
    analytics.stop();
});

var uid = func.getUID();

"" != uid ? kango.synsDatabase(uid) : "";

var activity = Ti.Android.currentActivity;

activity.addEventListener("resume", function() {
    var uid = func.getUID();
    kango.synsDatabase(uid);
});

Alloy.createController("index");