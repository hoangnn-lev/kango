exports.definition = {
    config: {
        adapter: {
            type: "sql",
            collection_name: "friend",
            db_file: "/kango.sqlite",
            db_name: "friend",
            idAttribute: "id",
            remoteBackup: false
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("friend", exports.definition, []);

collection = Alloy.C("friend", exports.definition, model);

exports.Model = model;

exports.Collection = collection;