exports.definition = {
	config : {
		adapter : {
			"type" : "sql",
			"collection_name" : "shifts",
			"db_file" : "/kango.sqlite",
			"db_name" : "shifts",
			"idAttribute" : "id",
			"remoteBackup" : false
		}
	}
};
