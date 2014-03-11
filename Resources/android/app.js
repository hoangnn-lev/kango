function openView(view, data) {
    var action;
    action = data ? customView[view] = Alloy.createController(view, data).getView() : customView[view] ? customView[view] : customView[view] = Alloy.createController(view).getView();
    func.nextView(action);
}

function delete_view(view) {
    customView[view] && delete customView[view];
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

require("config");

Alloy.Collections.schedule = Alloy.createCollection("schedule");

Alloy.Collections.configs = Alloy.createCollection("configs");

Alloy.Collections.shifts = Alloy.createCollection("shifts");

Alloy.Collections.calendar_shift = Alloy.createCollection("calendar_shift");

Alloy.Collections.schedule_detail = Alloy.createCollection("schedule_detail");

Alloy.Collections.friend = Alloy.createCollection("friend");

var func = require("Lib/function"), kango = require("Lib/kango");

var customView = {};

var uid = func.getUID();

"" != uid ? kango.synsDatabase(uid) : "";

var activity = Ti.Android.currentActivity;

activity.addEventListener("resume", function() {
    var uid = func.getUID();
    kango.synsDatabase(uid);
});

Alloy.createController("index");