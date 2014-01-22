exports.definition = {
	config : {
		adapter : {
			"type" : "sql",
			"collection_name" : "configs",
			"db_file" : "/kango.sqlite",
			"db_name" : "configs",
			"idAttribute" : "id",
			"remoteBackup" : false
		}
	}
};
