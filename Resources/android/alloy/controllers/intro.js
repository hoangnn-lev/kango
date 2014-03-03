function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "intro";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.intro = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "intro"
    });
    $.__views.intro && $.addTopLevelView($.__views.intro);
    var __alloyId38 = [];
    $.__views.__alloyId39 = Ti.UI.createView({
        backgroundColor: "#ccc",
        id: "__alloyId39"
    });
    __alloyId38.push($.__views.__alloyId39);
    $.__views.__alloyId40 = Ti.UI.createView({
        backgroundColor: "#000",
        id: "__alloyId40"
    });
    __alloyId38.push($.__views.__alloyId40);
    $.__views.__alloyId41 = Ti.UI.createView({
        backgroundColor: "green",
        id: "__alloyId41"
    });
    __alloyId38.push($.__views.__alloyId41);
    $.__views.__alloyId37 = Ti.UI.createScrollableView({
        views: __alloyId38,
        id: "__alloyId37"
    });
    $.__views.intro.add($.__views.__alloyId37);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;