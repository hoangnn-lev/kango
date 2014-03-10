exports.definition = {
	config : {
		adapter : {
			"type" : "sql",
			"collection_name" : "calendar_shift",
			"db_file" : "/kango.sqlite",
			"db_name" : "calendar_shift",
			"idAttribute" : "id",
			"remoteBackup" : false
		}
	}
};
//
// exports.definition = {
// config : {
// "columns" : {
// "id" : "INTEGER PRIMARY KEY",
// "month_year" : "text",
// "date_shift" : "text"
// },
// "URL" : "http://192.168.1.224/kango/users/test.json",
// "debug" : 1, //debug mode enabled
// "useStrictValidation" : 1, // validates each item if all columns are present
// "adapter" : {
// "type" : "sqlrest",
// "collection_name" : "calendar_shift",
// "idAttribute" : "id",
// //"db_file" : "/kango.sqlite",
// // optimise the amount of data transfer from remote server to app
// "addModifedToUrl" : true,
// "lastModifiedColumn" : "modified"
// },
//
// //optional
// "headers" : {//your custom headers
// "Accept" : "application/vnd.stackmob+json; version=0",
// "X-StackMob-API-Key" : "your-stackmob-key"
// },
//
// // delete all models on fetch
// "deleteAllOnFetch" : true
// },
// extendModel : function(Model) {
// _.extend(Model.prototype, {});
// return Model;
// },
// extendCollection : function(Collection) {
// _.extend(Collection.prototype, {});
// return Collection;
// }
// };
