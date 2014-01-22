function scheduleView() {
    scheduleViewObj || (scheduleViewObj = Alloy.createController("schedule").getView());
    activityScreen.nextWindowByLoading(scheduleViewObj);
}

function settingView() {
    settingViewObj = Alloy.createController("setting").getView();
    activityScreen.nextWindow(settingViewObj);
}

function friendView() {
    friendViewObj || (friendViewObj = Alloy.createController("friend").getView());
    activityScreen.nextWindow(friendViewObj);
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

require("config");

var frd = require("friend");

var gcm = require("com.activate.gcm");

var scheduleViewObj, settingViewObj, friendViewObj, scheduleEditViewObj;

Alloy.createController("index");