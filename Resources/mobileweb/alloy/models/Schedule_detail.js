exports.definition = {
    config: {
        adapter: {
            type: "sql",
            collection_name: "schedule_detail",
            db_file: "/kango.sqlite",
            db_name: "schedule_detail",
            idAttribute: "id",
            remoteBackup: false
        }
    }
};

var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

model = Alloy.M("schedule_detail", exports.definition, []);

collection = Alloy.C("schedule_detail", exports.definition, model);

exports.Model = model;

exports.Collection = collection;