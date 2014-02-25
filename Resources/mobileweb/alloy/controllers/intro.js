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
    var __alloyId32 = [];
    $.__views.__alloyId33 = Ti.UI.createView({
        backgroundColor: "#ccc",
        id: "__alloyId33"
    });
    __alloyId32.push($.__views.__alloyId33);
    $.__views.__alloyId34 = Ti.UI.createView({
        backgroundColor: "#000",
        id: "__alloyId34"
    });
    __alloyId32.push($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createView({
        backgroundColor: "green",
        id: "__alloyId35"
    });
    __alloyId32.push($.__views.__alloyId35);
    $.__views.__alloyId31 = Ti.UI.createScrollableView({
        views: __alloyId32,
        id: "__alloyId31"
    });
    $.__views.intro.add($.__views.__alloyId31);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;