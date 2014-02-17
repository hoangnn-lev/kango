exports.definition = {
    config: {
        adapter: {
            type: "sql",
            collection_name: "calendar_shift",
            db_file: "/kango.sqlite",
            db_name: "calendar_shift",
            idAttribute: "id",
            remoteBackup: false
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("calendar_shift", exports.definition, []);

collection = Alloy.C("calendar_shift", exports.definition, model);

exports.Model = model;

exports.Collection = collection;