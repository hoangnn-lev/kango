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

var frd = require("Lib/friend");

var gcm = require("com.activate.gcm");

var func = require("Lib/function");

var customView = {};

Alloy.createController("index");