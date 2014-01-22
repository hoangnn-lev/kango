exports.definition = {
    config: {
        adapter: {
            type: "sql",
            collection_name: "configs",
            db_file: "/kango.sqlite",
            db_name: "configs",
            idAttribute: "id",
            remoteBackup: false
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("configs", exports.definition, []);

collection = Alloy.C("configs", exports.definition, model);

exports.Model = model;

exports.Collection = collection;