function openView(view, callback) {
    var action;
    for (var i = 0, n = viewObj.length; n > i; ++i) if (viewObj[i].name == view) {
        action = viewObj[i].action;
        callback && (action.callback = function() {
            callback();
        });
        activityScreen.nextWindow(action);
        return;
    }
    action = Alloy.createController(view).getView();
    viewObj.push({
        name: view,
        action: action
    });
    callback && (action.callback = function() {
        callback();
    });
    activityScreen.nextWindow(action);
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

require("config");

var frd = require("friend");

var gcm = require("com.activate.gcm");

var viewObj = [];

Alloy.createController("index");