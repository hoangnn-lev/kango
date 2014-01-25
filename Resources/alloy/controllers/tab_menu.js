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
            fontSize: "16sp"
        },
        backgroundColor: "#c3c3c3",
        bottom: "49dp",
        id: "tab_menu"
    });
    $.__views.tab_menu && $.addTopLevelView($.__views.tab_menu);
    $.__views.tabMenu = Ti.UI.createView({
        backgroundColor: "#f8f8f8",
        width: Ti.UI.FILL,
        height: "50dp",
        id: "tabMenu"
    });
    $.__views.tabMenu && $.addTopLevelView($.__views.tabMenu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var top = Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.dpi / 160);
    var deviceWidth = Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);
    $.tabMenu.setTop(top - 75 + "dp");
    var menu = Ti.API.TABMENU;
    for (var i = 0, n = menu.length; n > i; i++) {
        var menuItemWidth = deviceWidth / n;
        var view = Ti.UI.createView({
            width: menuItemWidth + "dp",
            height: "50dp",
            left: i * menuItemWidth + "dp",
            action: menu[i].action
        });
        view.add(Ti.UI.createImageView({
            image: menu[i].img,
            height: "27dp",
            width: "27dp",
            zIndex: 0,
            top: "3dp",
            touchEnabled: false,
            className: "menu"
        }));
        view.add(Ti.UI.createLabel({
            text: menu[i].text,
            font: {
                fontSize: "11dp"
            },
            color: "#666",
            zIndex: 0,
            top: "32dp",
            touchEnabled: false,
            className: "menu-text"
        }));
        view.addEventListener("click", function(e) {
            openView(e.source.action);
        });
        $.tabMenu.add(view);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;