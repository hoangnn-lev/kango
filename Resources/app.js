function openView(view, data) {
    var action;
    action = data ? customView[view] = Alloy.createController(view, data).getView() : customView[view] ? customView[view] : customView[view] = Alloy.createController(view).getView();
    func.nextView(action);
}

function delete_view(view) {
    customView[view] = "";
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

require("config");

var frd = require("Lib/friend");

var gcm = require("com.activate.gcm");

var func = require("Lib/function");

var customView = {};

Alloy.createController("index");