function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tab_menu";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tab_menu = Ti.UI.createLabel({
        width: Ti.UI.FILL,
        height: "1sp",
        color: "#333",
        zIndex: 1,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "18sp"
        },
        backgroundColor: "#c3c3c3",
        bottom: "49dp",
        id: "tab_menu"
    });
    $.__views.tab_menu && $.addTopLevelView($.__views.tab_menu);
    $.__views.tabMenu = Ti.UI.createView({
        backgroundColor: "#f8f8f8",
        width: Ti.UI.FILL,
        heigth: "39dp",
        id: "tabMenu"
    });
    $.__views.tabMenu && $.addTopLevelView($.__views.tabMenu);
    $.__views.schedule = Ti.UI.createImageView({
        width: "30dp",
        height: "30dp",
        id: "schedule",
        image: Ti.API.TABMENU["schedule"],
        left: "20"
    });
    $.__views.tabMenu.add($.__views.schedule);
    $.__views.friend = Ti.UI.createImageView({
        width: "30dp",
        height: "30dp",
        id: "friend",
        image: Ti.API.TABMENU["friend"]
    });
    $.__views.tabMenu.add($.__views.friend);
    $.__views.setting = Ti.UI.createImageView({
        width: "30dp",
        height: "30dp",
        id: "setting",
        image: Ti.API.TABMENU["setting"],
        right: "20"
    });
    $.__views.tabMenu.add($.__views.setting);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var top = Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.dpi / 160);
    $.tabMenu.setTop(top - 75 + "dp");
    $.schedule.addEventListener("click", function() {
        scheduleView();
    });
    $.setting.addEventListener("click", function() {
        settingView();
    });
    $.friend.addEventListener("click", function() {
        friendView();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;