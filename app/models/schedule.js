exports.definition = {
	config : {
		adapter : {
			"type" : "sql",
			"collection_name" : "schedule",
			"db_file" : "/kango.sqlite",
			"db_name" : "schedule",
			"idAttribute" : "id",
			"remoteBackup" : false
		}
	}
};
