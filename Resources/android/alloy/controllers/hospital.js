function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "hospital";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.hospital = Ti.UI.createWindow({
        backgroundColor: "#fff",
        id: "hospital"
    });
    $.__views.hospital && $.addTopLevelView($.__views.hospital);
    $.__views.main = Ti.UI.createView({
        top: 0,
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        id: "main"
    });
    $.__views.hospital.add($.__views.main);
    $.__views.__alloyId34 = Ti.UI.createWebView({
        url: "http://kango-oshigoto.jp/hospital/",
        id: "__alloyId34"
    });
    $.__views.main.add($.__views.__alloyId34);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.hospital.addEventListener("android:back", function() {
        openView("setting");
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;