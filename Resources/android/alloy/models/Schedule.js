exports.definition = {
    config: {
        adapter: {
            type: "sql",
            collection_name: "schedule",
            db_file: "/kango.sqlite",
            db_name: "schedule",
            idAttribute: "id",
            remoteBackup: false
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("schedule", exports.definition, []);

collection = Alloy.C("schedule", exports.definition, model);

exports.Model = model;

exports.Collection = collection;