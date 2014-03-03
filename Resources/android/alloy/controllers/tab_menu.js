function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "tab_menu";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.tabMenu = Ti.UI.createView({
        backgroundColor: "#f3acbd",
        width: Ti.UI.FILL,
        height: "50dp",
        layout: "horizontal",
        top: "0",
        id: "tabMenu"
    });
    $.__views.tabMenu && $.addTopLevelView($.__views.tabMenu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.dpi / 160);
    Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);
    var activeTab;
    var menu = Ti.API.TABMENU;
    for (var i = 0, n = menu.length; n > i; i++) {
        activeTab = i + 1;
        var button = Ti.UI.createImageView({
            width: "25%",
            height: "50dp",
            image: menu[i].img,
            action: menu[i].action,
            tab: activeTab
        });
        if (Ti.API.activeTab || 1 != i) Ti.API.activeTab && i + 1 == Ti.API.activeTab && button.setImage(menu[i].img_active); else {
            Ti.API.activeTab = activeTab;
            button.setImage(menu[i].img_active);
        }
        button.addEventListener("click", function(e) {
            Ti.API.activeTab = e.source.tab;
            openView(e.source.action);
        });
        $.tabMenu.add(button);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;