function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "about";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.about = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "about"
    });
    $.__views.about && $.addTopLevelView($.__views.about);
    $.__views.main = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        top: 0,
        layout: "vertical",
        id: "main"
    });
    $.__views.about.add($.__views.main);
    $.__views.title = Ti.UI.createView({
        height: "40dp",
        width: Ti.UI.FILL,
        backgroundColor: "#ed829c",
        top: 0,
        id: "title"
    });
    $.__views.main.add($.__views.title);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#fff",
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        font: {
            fontSize: "16sp"
        },
        text: "Kango について",
        id: "__alloyId0"
    });
    $.__views.title.add($.__views.__alloyId0);
    $.__views.content = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "content"
    });
    $.__views.main.add($.__views.content);
    $.__views.__alloyId1 = Ti.UI.createWebView({
        url: "/about.html",
        id: "__alloyId1"
    });
    $.__views.content.add($.__views.__alloyId1);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.about.addEventListener("android:back", function() {
        openView("setting");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;