exports.definition = {
    config: {
        adapter: {
            type: "sql",
            collection_name: "shifts",
            db_file: "/kango.sqlite",
            db_name: "shifts",
            idAttribute: "id",
            remoteBackup: false
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("shifts", exports.definition, []);

collection = Alloy.C("shifts", exports.definition, model);

exports.Model = model;

exports.Collection = collection;