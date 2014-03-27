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
    var __alloyId14 = [];
    $.__views.__alloyId15 = Ti.UI.createView({
        backgroundColor: "#ccc",
        id: "__alloyId15"
    });
    __alloyId14.push($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createView({
        backgroundColor: "#000",
        id: "__alloyId16"
    });
    __alloyId14.push($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createView({
        backgroundColor: "green",
        id: "__alloyId17"
    });
    __alloyId14.push($.__views.__alloyId17);
    $.__views.__alloyId13 = Ti.UI.createScrollableView({
        views: __alloyId14,
        id: "__alloyId13"
    });
    $.__views.intro.add($.__views.__alloyId13);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;