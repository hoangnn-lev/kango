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
        top: "0",
        id: "tabMenu"
    });
    $.__views.tabMenu && $.addTopLevelView($.__views.tabMenu);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Ti.Platform.displayCaps.platformHeight / (Ti.Platform.displayCaps.dpi / 160);
    var deviceWidth = Ti.Platform.displayCaps.platformWidth / (Ti.Platform.displayCaps.dpi / 160);
    var menu = Ti.API.TABMENU, activeColor = "#ed829c";
    for (var i = 0, n = menu.length; n > i; i++) {
        var menuItemWidth = deviceWidth / n;
        var view = Ti.UI.createView({
            width: menuItemWidth + "dp",
            height: "50dp",
            left: i * menuItemWidth + "dp",
            action: menu[i].action
        });
        1 == i && view.setBackgroundColor(activeColor);
        view.add(Ti.UI.createImageView({
            image: menu[i].img,
            height: "22dp",
            width: "22dp",
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
            color: "#fff",
            zIndex: 0,
            top: "28dp",
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